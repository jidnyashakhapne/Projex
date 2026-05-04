import { motion } from 'framer-motion';
import { ClipboardList, GripVertical, Calendar } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import PriorityBadge from '../components/PriorityBadge';
import { AppDataController, TaskStatus } from '../types';

const columns: { status: TaskStatus; label: string; accent: string }[] = [
  { status: 'todo', label: 'To Do', accent: 'from-gray-500/20 to-gray-600/20' },
  { status: 'in-progress', label: 'In Progress', accent: 'from-blue-500/20 to-cyan-500/20' },
  { status: 'completed', label: 'Completed', accent: 'from-emerald-500/20 to-green-500/20' },
];

interface TaskBoardPageProps {
  appData: AppDataController;
}

export default function TaskBoardPage({ appData }: TaskBoardPageProps) {
  const { tasks, teamMembers, updateTaskStatus } = appData;
  return (
    <div className="min-h-screen pt-20 pb-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Task Board</h1>
          <p className="text-gray-400">Visualize and manage your team's workflow.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col, colIdx) => {
            const columnTasks = tasks.filter(t => t.status === col.status);
            return (
              <div key={col.status}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${col.accent} flex items-center justify-center`}>
                    <ClipboardList className="w-4 h-4 text-gray-300" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">{col.label}</h2>
                  <span className="ml-auto px-2.5 py-0.5 rounded-full bg-white/5 text-xs text-gray-400 font-medium">
                    {columnTasks.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {columnTasks.map((task, i) => {
                    const assignee = teamMembers.find(m => m.id === task.assigneeId);
                    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: colIdx * 0.1 + i * 0.05 }}
                      >
                        <GlassCard
                          className={`p-4 cursor-pointer ${isOverdue ? 'border-red-500/30' : ''}`}
                          onClick={() => updateTaskStatus(task.id, col.status === 'completed' ? 'todo' : 'completed')}
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <GripVertical className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-white mb-1">{task.title}</h3>
                              <p className="text-xs text-gray-500 line-clamp-2">{task.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3 pl-6">
                            <PriorityBadge priority={task.priority} />
                            <div className="flex items-center gap-2">
                              <div className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-400' : 'text-gray-500'}`}>
                                <Calendar className="w-3 h-3" />
                                {task.dueDate.slice(5)}
                              </div>
                              {assignee && (
                                <div
                                  className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-[10px] font-bold"
                                  title={assignee.name}
                                >
                                  {assignee.name.charAt(0)}
                                </div>
                              )}
                            </div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
