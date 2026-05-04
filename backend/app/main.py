import os
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from supabase import Client, create_client

from .seed import ACTIVITIES, CURRENT_USER, PROJECTS, TASKS, TEAM_MEMBERS

BACKEND_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BACKEND_DIR / ".env")

UserRole = Literal["admin", "member"]
TaskStatus = Literal["todo", "in-progress", "completed"]
Priority = Literal["low", "medium", "high"]


class DemoLoginRequest(BaseModel):
    role: UserRole


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class CreateTaskRequest(BaseModel):
    title: str
    description: str
    assigneeId: str
    projectId: str = "p1"
    dueDate: str
    priority: Priority = "medium"


class UpdateTaskRequest(BaseModel):
    status: TaskStatus


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str


def get_supabase() -> Client | None:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    if not url or not key:
        return None
    return create_client(url, key)


supabase = get_supabase()
app = FastAPI(title="Projex API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def from_db_user(row: dict) -> dict:
    return {
        "id": row["id"],
        "name": row["name"],
        "email": row["email"],
        "role": row["role"],
        "avatar": row.get("avatar"),
    }


def from_db_member(row: dict) -> dict:
    member = from_db_user(row)
    member["taskCount"] = row.get("task_count", 0)
    return member


def from_db_project(row: dict) -> dict:
    return {
        "id": row["id"],
        "name": row["name"],
        "description": row["description"],
        "color": row["color"],
        "memberIds": row.get("member_ids", []),
        "taskCount": row.get("task_count", 0),
        "progress": row.get("progress", 0),
    }


def from_db_task(row: dict) -> dict:
    return {
        "id": row["id"],
        "title": row["title"],
        "description": row["description"],
        "status": row["status"],
        "assigneeId": row["assignee_id"],
        "projectId": row["project_id"],
        "dueDate": row["due_date"],
        "priority": row["priority"],
    }


def from_db_activity(row: dict) -> dict:
    return {
        "id": row["id"],
        "userId": row["user_id"],
        "action": row["action"],
        "target": row["target"],
        "timestamp": row["timestamp"],
    }


def require_supabase() -> Client:
    if not supabase:
        raise HTTPException(status_code=503, detail="Supabase is not configured")
    return supabase


def get_profile_by_email(email: str) -> dict | None:
    client = require_supabase()
    result = client.table("team_members").select("*").eq("email", email).limit(1).execute()
    if result.data:
        return from_db_user(result.data[0])
    return None


@app.get("/health")
def health() -> dict:
    return {"ok": True, "database": "supabase" if supabase else "memory"}


@app.post("/auth/demo-login")
def demo_login(payload: DemoLoginRequest) -> dict:
    if supabase:
        table = "team_members"
        query = supabase.table(table).select("*").eq("role", payload.role).limit(1).execute()
        if query.data:
            return {"user": from_db_user(query.data[0])}

    if payload.role == "member":
        member = next(member for member in TEAM_MEMBERS if member["role"] == "member")
        return {"user": {key: member[key] for key in ("id", "name", "email", "role")}}
    return {"user": {**CURRENT_USER, "role": "admin"}}


@app.post("/auth/login")
def login(payload: LoginRequest) -> dict:
    client = require_supabase()
    try:
        auth_response = client.auth.sign_in_with_password({
            "email": payload.email,
            "password": payload.password,
        })
    except Exception as exc:
        raise HTTPException(status_code=401, detail="Invalid email or password") from exc

    auth_user = auth_response.user
    if not auth_user or not auth_user.email:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    profile = get_profile_by_email(auth_user.email)
    if profile:
        return {"user": profile}

    user = {
        "id": auth_user.id,
        "name": auth_user.email.split("@")[0],
        "email": auth_user.email,
        "role": "member",
    }
    client.table("team_members").insert({**user, "task_count": 0}).execute()
    return {"user": user}


@app.post("/auth/signup")
def signup(payload: SignupRequest) -> dict:
    client = require_supabase()
    if len(payload.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")

    try:
        auth_response = client.auth.admin.create_user({
            "email": payload.email,
            "password": payload.password,
            "email_confirm": True,
            "user_metadata": {"name": payload.name},
        })
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Unable to create account. The email may already be registered.") from exc

    if not auth_response.user or not auth_response.user.email:
        raise HTTPException(status_code=400, detail="Unable to create account")

    user = {
        "id": auth_response.user.id,
        "name": payload.name,
        "email": auth_response.user.email,
        "role": "member",
    }
    row = {**user, "task_count": 0}
    client.table("team_members").insert(row).execute()
    return {"user": user}


@app.get("/team-members")
def list_team_members() -> list[dict]:
    if supabase:
        result = supabase.table("team_members").select("*").order("name").execute()
        return [from_db_member(row) for row in result.data]
    return TEAM_MEMBERS


@app.get("/projects")
def list_projects() -> list[dict]:
    if supabase:
        result = supabase.table("projects").select("*").order("name").execute()
        return [from_db_project(row) for row in result.data]
    return PROJECTS


@app.get("/tasks")
def list_tasks() -> list[dict]:
    if supabase:
        result = supabase.table("tasks").select("*").order("due_date").execute()
        return [from_db_task(row) for row in result.data]
    return TASKS


@app.post("/tasks")
def create_task(payload: CreateTaskRequest) -> dict:
    task = {
        "id": f"t-{uuid.uuid4().hex[:8]}",
        "title": payload.title,
        "description": payload.description,
        "status": "todo",
        "assigneeId": payload.assigneeId,
        "projectId": payload.projectId,
        "dueDate": payload.dueDate,
        "priority": payload.priority,
    }
    if supabase:
        row = {
            "id": task["id"],
            "title": task["title"],
            "description": task["description"],
            "status": task["status"],
            "assignee_id": task["assigneeId"],
            "project_id": task["projectId"],
            "due_date": task["dueDate"],
            "priority": task["priority"],
        }
        supabase.table("tasks").insert(row).execute()
    else:
        TASKS.append(task)
    return task


@app.patch("/tasks/{task_id}")
def update_task(task_id: str, payload: UpdateTaskRequest) -> dict:
    if supabase:
        result = supabase.table("tasks").update({"status": payload.status}).eq("id", task_id).execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Task not found")
        return from_db_task(result.data[0])

    for task in TASKS:
        if task["id"] == task_id:
            task["status"] = payload.status
            return task
    raise HTTPException(status_code=404, detail="Task not found")


@app.get("/activities")
def list_activities() -> list[dict]:
    if supabase:
        result = supabase.table("activities").select("*").order("timestamp", desc=True).execute()
        return [from_db_activity(row) for row in result.data]
    return sorted(ACTIVITIES, key=lambda row: row["timestamp"], reverse=True)


@app.post("/contact")
def create_contact_message(payload: ContactRequest) -> dict:
    message = {
        "id": f"msg-{uuid.uuid4().hex[:8]}",
        "name": payload.name,
        "email": payload.email,
        "message": payload.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    if supabase:
        supabase.table("contact_messages").insert(message).execute()
    return {"ok": True, "message": message}
