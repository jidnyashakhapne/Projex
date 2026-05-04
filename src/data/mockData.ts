import { Task, Project, TeamMember, Activity, User } from '../types';

export const currentUser: User = {
  id: 'u1',
  name: 'Alex Morgan',
  email: 'alex@projex.io',
  role: 'admin',
};

export const teamMembers: TeamMember[] = [
  { id: 'u1', name: 'Alex Morgan', email: 'alex@projex.io', role: 'admin', taskCount: 5 },
  { id: 'u2', name: 'Jordan Lee', email: 'jordan@projex.io', role: 'member', taskCount: 8 },
  { id: 'u3', name: 'Sam Rivera', email: 'sam@projex.io', role: 'member', taskCount: 3 },
  { id: 'u4', name: 'Casey Kim', email: 'casey@projex.io', role: 'member', taskCount: 6 },
  { id: 'u5', name: 'Riley Chen', email: 'riley@projex.io', role: 'member', taskCount: 4 },
];

export const projects: Project[] = [
  { id: 'p1', name: 'Website Redesign', description: 'Complete overhaul of the company website with modern UI/UX', color: '#3b82f6', memberIds: ['u1', 'u2', 'u3'], taskCount: 12, progress: 65 },
  { id: 'p2', name: 'Mobile App v2', description: 'Second version of the mobile application with new features', color: '#8b5cf6', memberIds: ['u1', 'u4', 'u5'], taskCount: 18, progress: 40 },
  { id: 'p3', name: 'API Integration', description: 'Third-party API integrations for payment and analytics', color: '#06b6d4', memberIds: ['u2', 'u4'], taskCount: 8, progress: 80 },
  { id: 'p4', name: 'Marketing Dashboard', description: 'Internal dashboard for marketing metrics and campaigns', color: '#f59e0b', memberIds: ['u1', 'u3', 'u5'], taskCount: 6, progress: 20 },
  { id: 'p5', name: 'Security Audit', description: 'Comprehensive security review and vulnerability patching', color: '#ef4444', memberIds: ['u2', 'u3', 'u4'], taskCount: 10, progress: 55 },
];

export const tasks: Task[] = [
  { id: 't1', title: 'Design homepage mockup', description: 'Create high-fidelity mockup for the new homepage layout', status: 'completed', assigneeId: 'u2', projectId: 'p1', dueDate: '2026-04-28', priority: 'high' },
  { id: 't2', title: 'Implement auth flow', description: 'Build login/signup pages with form validation', status: 'in-progress', assigneeId: 'u1', projectId: 'p1', dueDate: '2026-05-10', priority: 'high' },
  { id: 't3', title: 'Set up CI/CD pipeline', description: 'Configure GitHub Actions for automated deployments', status: 'todo', assigneeId: 'u4', projectId: 'p2', dueDate: '2026-05-15', priority: 'medium' },
  { id: 't4', title: 'Write API documentation', description: 'Document all REST endpoints with examples', status: 'in-progress', assigneeId: 'u3', projectId: 'p3', dueDate: '2026-05-08', priority: 'medium' },
  { id: 't5', title: 'Fix payment webhook', description: 'Resolve Stripe webhook timeout issues', status: 'todo', assigneeId: 'u4', projectId: 'p3', dueDate: '2026-04-30', priority: 'high' },
  { id: 't6', title: 'Create onboarding screens', description: 'Design and implement mobile onboarding flow', status: 'completed', assigneeId: 'u5', projectId: 'p2', dueDate: '2026-04-25', priority: 'low' },
  { id: 't7', title: 'Performance optimization', description: 'Reduce bundle size and improve load times', status: 'in-progress', assigneeId: 'u2', projectId: 'p1', dueDate: '2026-05-12', priority: 'medium' },
  { id: 't8', title: 'Add push notifications', description: 'Implement Firebase push notifications for mobile', status: 'todo', assigneeId: 'u5', projectId: 'p2', dueDate: '2026-05-20', priority: 'low' },
  { id: 't9', title: 'Security scan report', description: 'Run automated security scan and compile report', status: 'in-progress', assigneeId: 'u3', projectId: 'p5', dueDate: '2026-04-29', priority: 'high' },
  { id: 't10', title: 'Dashboard charts', description: 'Build interactive charts for marketing metrics', status: 'todo', assigneeId: 'u1', projectId: 'p4', dueDate: '2026-05-18', priority: 'medium' },
  { id: 't11', title: 'User feedback survey', description: 'Create and distribute post-launch feedback survey', status: 'todo', assigneeId: 'u3', projectId: 'p4', dueDate: '2026-05-25', priority: 'low' },
  { id: 't12', title: 'Refactor state management', description: 'Migrate from Redux to Zustand for simpler state', status: 'in-progress', assigneeId: 'u2', projectId: 'p2', dueDate: '2026-05-05', priority: 'high' },
];

export const activities: Activity[] = [
  { id: 'a1', userId: 'u2', action: 'completed', target: 'Design homepage mockup', timestamp: '2026-04-28T14:30:00Z' },
  { id: 'a2', userId: 'u1', action: 'started', target: 'Implement auth flow', timestamp: '2026-04-29T09:15:00Z' },
  { id: 'a3', userId: 'u5', action: 'completed', target: 'Create onboarding screens', timestamp: '2026-04-25T16:45:00Z' },
  { id: 'a4', userId: 'u3', action: 'commented on', target: 'Write API documentation', timestamp: '2026-04-30T11:20:00Z' },
  { id: 'a5', userId: 'u4', action: 'created', target: 'Set up CI/CD pipeline', timestamp: '2026-05-01T08:00:00Z' },
  { id: 'a6', userId: 'u2', action: 'started', target: 'Performance optimization', timestamp: '2026-05-02T10:30:00Z' },
  { id: 'a7', userId: 'u1', action: 'assigned', target: 'Dashboard charts to Alex Morgan', timestamp: '2026-05-03T13:00:00Z' },
];

export const memberTasks = tasks.filter(t => t.assigneeId === 'u2');
