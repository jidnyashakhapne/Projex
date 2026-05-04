const priorityConfig = {
  low: { label: 'Low', className: 'bg-slate-500/20 text-slate-300 border-slate-500/30' },
  medium: { label: 'Medium', className: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  high: { label: 'High', className: 'bg-red-500/20 text-red-300 border-red-500/30' },
};

export default function PriorityBadge({ priority }: { priority: 'low' | 'medium' | 'high' }) {
  const config = priorityConfig[priority];
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  );
}
