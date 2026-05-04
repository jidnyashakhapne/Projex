import { Activity, ContactPayload, CreateTaskPayload, LoginPayload, Project, SignupPayload, Task, TeamMember, User, UserRole } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const body = await response.text();
    let message = body;
    try {
      const parsed = JSON.parse(body) as { detail?: string };
      message = parsed.detail ?? body;
    } catch {
      message = body;
    }
    throw new Error(message || `API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  async login(payload: LoginPayload) {
    return request<{ user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async demoLogin(role: UserRole) {
    return request<{ user: User }>('/auth/demo-login', {
      method: 'POST',
      body: JSON.stringify({ role }),
    });
  },

  async signup(payload: SignupPayload) {
    return request<{ user: User }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  getProjects() {
    return request<Project[]>('/projects');
  },

  getTasks() {
    return request<Task[]>('/tasks');
  },

  getTeamMembers() {
    return request<TeamMember[]>('/team-members');
  },

  getActivities() {
    return request<Activity[]>('/activities');
  },

  createTask(payload: CreateTaskPayload) {
    return request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  updateTaskStatus(taskId: string, status: Task['status']) {
    return request<Task>(`/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  submitContact(payload: ContactPayload) {
    return request<{ ok: boolean }>('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
