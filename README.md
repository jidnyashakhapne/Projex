# Projex

Projex is a team project management web app built with a React + TypeScript frontend, a Python FastAPI backend, and Supabase for authentication and database storage.

## Features

- Email/password authentication with Supabase Auth
- Admin and member dashboards
- Project and task management views
- Task status and priority tracking
- Contact form storage
- Supabase Postgres database integration
- Railway deployment support

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion
- Backend: Python, FastAPI, Uvicorn
- Database/Auth: Supabase Postgres + Supabase Auth
- Deployment: Railway

## Project Structure

```text
.
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   └── seed.py
│   ├── requirements.txt
│   ├── schema.sql
│   └── railway.json
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   └── types/
├── package.json
├── railway.json
└── README.md
```

## System Screenshot
<img width="1919" height="895" alt="image" src="https://github.com/user-attachments/assets/e11516cd-9e61-4c70-8872-0e110e164da1" />
<br>
<img width="1919" height="899" alt="image" src="https://github.com/user-attachments/assets/01399627-6036-4631-930e-68217e794eb8" />

<br>
<img width="1919" height="909" alt="image" src="https://github.com/user-attachments/assets/478376a5-2a43-44fb-aff0-d50ce32da36e" />
<br>
<img width="1919" height="906" alt="image" src="https://github.com/user-attachments/assets/66d21f82-fc28-474c-9b40-a3a09958105c" />
<br>
<br>




## Local Setup

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
pip install -r requirements.txt
```

Create a backend environment file:

```bash
backend/.env
```

Add:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
FRONTEND_ORIGIN=http://localhost:5173
```

Create a frontend environment file if needed:

```bash
.env
```

Add:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Run the backend:

```bash
cd backend
python -m uvicorn app.main:app --reload
```

Run the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend health check:

```text
http://localhost:8000/health
```

Expected response when Supabase is configured:

```json
{"ok":true,"database":"supabase"}
```

## Supabase Setup

1. Create a Supabase project.
2. Open **SQL Editor**.
3. Run the SQL from:

```text
backend/schema.sql
```

4. Go to **Project Settings → Data API / API**.
5. Copy the project URL:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
```

6. Copy the service role key:

```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Do not expose the service role key in frontend code or public screenshots.

Passwords are stored by Supabase Auth, not in the `team_members` table. The `team_members` table stores app profile data only.

## Railway Deployment

Deploy this project as two Railway services from the same GitHub repository.

### Backend Service

Root directory:

```text
backend
```

Start command:

```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Variables:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
FRONTEND_ORIGIN=https://your-frontend-domain.up.railway.app
```

Generate a public Railway domain, then test:

```text
https://your-backend-domain.up.railway.app/health
```

### Frontend Service

Root directory:

```text
/
```

Variables:

```env
VITE_API_BASE_URL=https://your-backend-domain.up.railway.app
```

The value must include `https://`.

After adding or changing `VITE_API_BASE_URL`, redeploy the frontend service.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
npm run dev:api
```

## Notes

- Use Supabase Auth for passwords.
- Do not add a password column to app tables.
- If login shows `Failed to fetch`, check `VITE_API_BASE_URL`.
- If login shows CORS errors, check backend `FRONTEND_ORIGIN`.
- If `/health` returns `memory`, the backend is not reading Supabase environment variables.
