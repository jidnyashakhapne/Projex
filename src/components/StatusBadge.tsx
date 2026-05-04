import { TaskStatus } from '../types';

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  'todo': { label: 'To Do', className: 'bg-gray-500/20 text-gray-300 border-gray-500/30' },
  'in-progress': { label: 'In Progress', className: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  'completed': { label: 'Completed', className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
};

export default function StatusBadge({ status }: { status: TaskStatus }) {
  const config = statusConfig[status];
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  );
}
