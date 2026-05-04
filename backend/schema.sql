create table if not exists team_members (
  id text primary key,
  name text not null,
  email text not null unique,
  role text not null check (role in ('admin', 'member')),
  avatar text,
  task_count integer not null default 0
);

create table if not exists projects (
  id text primary key,
  name text not null,
  description text not null,
  color text not null,
  member_ids text[] not null default '{}',
  task_count integer not null default 0,
  progress integer not null default 0 check (progress between 0 and 100)
);

create table if not exists tasks (
  id text primary key,
  title text not null,
  description text not null,
  status text not null default 'todo' check (status in ('todo', 'in-progress', 'completed')),
  assignee_id text not null references team_members(id),
  project_id text not null references projects(id),
  due_date date not null,
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high'))
);

create table if not exists activities (
  id text primary key,
  user_id text not null references team_members(id),
  action text not null,
  target text not null,
  timestamp timestamptz not null default now()
);

create table if not exists contact_messages (
  id text primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

insert into team_members (id, name, email, role, task_count) values
  ('u1', 'niraj ', 'nirajdoihode2004@gmail.com', 'admin', 5),
  ('u2', 'Jagdish ', 'Jagdish@gmail.com', 'member', 8),
  ('u3', ' Rivera', 'ravera@gmail.com', 'member', 3),
  ('u4', 'Ram', 'ram@gmail.com', 'member', 6),
  ('u5', 'Komal', 'komal@gmail.com', 'member', 4)
on conflict (id) do nothing;

insert into projects (id, name, description, color, member_ids, task_count, progress) values
  ('p1', 'Website Redesign', 'Complete overhaul of the company website with modern UI/UX', '#3b82f6', array['u1', 'u2', 'u3'], 12, 65),
  ('p2', 'Mobile App v2', 'Second version of the mobile application with new features', '#8b5cf6', array['u1', 'u4', 'u5'], 18, 40),
  ('p3', 'API Integration', 'Third-party API integrations for payment and analytics', '#06b6d4', array['u2', 'u4'], 8, 80),
  ('p4', 'Marketing Dashboard', 'Internal dashboard for marketing metrics and campaigns', '#f59e0b', array['u1', 'u3', 'u5'], 6, 20),
  ('p5', 'Security Audit', 'Comprehensive security review and vulnerability patching', '#ef4444', array['u2', 'u3', 'u4'], 10, 55)
on conflict (id) do nothing;

insert into tasks (id, title, description, status, assignee_id, project_id, due_date, priority) values
  ('t1', 'Design homepage mockup', 'Create high-fidelity mockup for the new homepage layout', 'completed', 'u2', 'p1', '2026-04-28', 'high'),
  ('t2', 'Implement auth flow', 'Build login/signup pages with form validation', 'in-progress', 'u1', 'p1', '2026-05-10', 'high'),
  ('t3', 'Set up CI/CD pipeline', 'Configure GitHub Actions for automated deployments', 'todo', 'u4', 'p2', '2026-05-15', 'medium'),
  ('t4', 'Write API documentation', 'Document all REST endpoints with examples', 'in-progress', 'u3', 'p3', '2026-05-08', 'medium'),
  ('t5', 'Fix payment webhook', 'Resolve Stripe webhook timeout issues', 'todo', 'u4', 'p3', '2026-04-30', 'high'),
  ('t6', 'Create onboarding screens', 'Design and implement mobile onboarding flow', 'completed', 'u5', 'p2', '2026-04-25', 'low'),
  ('t7', 'Performance optimization', 'Reduce bundle size and improve load times', 'in-progress', 'u2', 'p1', '2026-05-12', 'medium'),
  ('t8', 'Add push notifications', 'Implement Firebase push notifications for mobile', 'todo', 'u5', 'p2', '2026-05-20', 'low'),
  ('t9', 'Security scan report', 'Run automated security scan and compile report', 'in-progress', 'u3', 'p5', '2026-04-29', 'high'),
  ('t10', 'Dashboard charts', 'Build interactive charts for marketing metrics', 'todo', 'u1', 'p4', '2026-05-18', 'medium'),
  ('t11', 'User feedback survey', 'Create and distribute post-launch feedback survey', 'todo', 'u3', 'p4', '2026-05-25', 'low'),
  ('t12', 'Refactor state management', 'Migrate from Redux to Zustand for simpler state', 'in-progress', 'u2', 'p2', '2026-05-05', 'high')
on conflict (id) do nothing;

insert into activities (id, user_id, action, target, timestamp) values
  ('a1', 'u2', 'completed', 'Design homepage mockup', '2026-04-28T14:30:00Z'),
  ('a2', 'u1', 'started', 'Implement auth flow', '2026-04-29T09:15:00Z'),
  ('a3', 'u5', 'completed', 'Create onboarding screens', '2026-04-25T16:45:00Z'),
  ('a4', 'u3', 'commented on', 'Write API documentation', '2026-04-30T11:20:00Z'),
  ('a5', 'u4', 'created', 'Set up CI/CD pipeline', '2026-05-01T08:00:00Z'),
  ('a6', 'u2', 'started', 'Performance optimization', '2026-05-02T10:30:00Z'),
  ('a7', 'u1', 'assigned', 'Dashboard charts to Alex Morgan', '2026-05-03T13:00:00Z')
on conflict (id) do nothing;
