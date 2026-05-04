export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assigneeId: string;
  projectId: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  memberIds: string[];
  taskCount: number;
  progress: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  taskCount: number;
}

export interface Activity {
  id: string;
  userId: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface AppData {
  projects: Project[];
  tasks: Task[];
  teamMembers: TeamMember[];
  activities: Activity[];
}

export interface AppDataController extends AppData {
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createTask: (payload: CreateTaskPayload) => Promise<Task>;
  updateTaskStatus: (taskId: string, status: TaskStatus) => Promise<Task>;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  assigneeId: string;
  projectId: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}
