import { motion } from 'framer-motion';
import { Clock, AlertTriangle, CheckCircle2, TrendingUp, Calendar } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { AppDataController, User } from '../types';

interface MemberDashboardProps {
  user: User;
  appData: AppDataController;
}

export default function MemberDashboard({ user, appData }: MemberDashboardProps) {
  const { tasks, teamMembers } = appData;
  const memberTasks = tasks.filter(t => t.assigneeId === user.id);
  const todoCount = memberTasks.filter(t => t.status === 'todo').length;
  const inProgressCount = memberTasks.filter(t => t.status === 'in-progress').length;
  const completedCount = memberTasks.filter(t => t.status === 'completed').length;
  const overdueTasks = memberTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed');

  const stats = [
    { label: 'To Do', value: todoCount, icon: Clock, color: 'from-gray-500/20 to-gray-600/20', iconColor: 'text-gray-400' },
    { label: 'In Progress', value: inProgressCount, icon: TrendingUp, color: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400' },
    { label: 'Completed', value: completedCount, icon: CheckCircle2, color: 'from-emerald-500/20 to-green-500/20', iconColor: 'text-emerald-400' },
    { label: 'Overdue', value: overdueTasks.length, icon: AlertTriangle, color: 'from-red-500/20 to-orange-500/20', iconColor: 'text-red-400' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{user.name}</span>
          </h1>
          <p className="text-gray-400">Here's an overview of your tasks and progress.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                    </div>
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Overdue Alert */}
        {overdueTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <GlassCard hover={false} className="p-4 border-red-500/20 bg-red-500/5">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <p className="text-sm text-red-300">
                  You have <span className="font-semibold">{overdueTasks.length}</span> overdue task{overdueTasks.length > 1 ? 's' : ''} that need attention.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Task Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Your Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {memberTasks.map((task, i) => {
              const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlassCard className={`p-5 ${isOverdue ? 'border-red-500/30' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-white font-medium">{task.title}</h3>
                      <PriorityBadge priority={task.priority} />
                    </div>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <StatusBadge status={task.status} />
                      <div className={`flex items-center gap-1.5 text-xs ${isOverdue ? 'text-red-400' : 'text-gray-500'}`}>
                        <Calendar className="w-3.5 h-3.5" />
                        {task.dueDate}
                        {isOverdue && <AlertTriangle className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Team Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {member.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.taskCount} tasks</p>
                  </div>
                  <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${
                    member.role === 'admin'
                      ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                      : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                  }`}>
                    {member.role}
                  </span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
