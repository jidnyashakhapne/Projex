import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderKanban, ClipboardList, Users, AlertTriangle, Plus, X,
  Calendar, ArrowUpRight
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { AppDataController } from '../types';

interface AdminDashboardProps {
  appData: AppDataController;
}

export default function AdminDashboard({ appData }: AdminDashboardProps) {
  const { activities, createTask, projects, tasks, teamMembers } = appData;
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTask, setNewTask] = useState<{ title: string; description: string; assigneeId: string; projectId: string; priority: 'low' | 'medium' | 'high'; dueDate: string }>({ title: '', description: '', assigneeId: '', projectId: projects[0]?.id ?? 'p1', priority: 'medium', dueDate: '' });

  const totalTasks = tasks.length;
  const totalProjects = projects.length;
  const totalMembers = teamMembers.length;
  const overdueCount = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length;

  const stats = [
    { label: 'Total Projects', value: totalProjects, icon: FolderKanban, color: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400', change: '+2 this month' },
    { label: 'Total Tasks', value: totalTasks, icon: ClipboardList, color: 'from-cyan-500/20 to-teal-500/20', iconColor: 'text-cyan-400', change: '+8 this week' },
    { label: 'Members', value: totalMembers, icon: Users, color: 'from-emerald-500/20 to-green-500/20', iconColor: 'text-emerald-400', change: '+1 this month' },
    { label: 'Overdue', value: overdueCount, icon: AlertTriangle, color: 'from-red-500/20 to-orange-500/20', iconColor: 'text-red-400', change: 'Needs attention' },
  ];

  const handleCreateTask = async () => {
    await createTask(newTask);
    setShowCreateModal(false);
    setNewTask({ title: '', description: '', assigneeId: '', projectId: projects[0]?.id ?? 'p1', priority: 'medium', dueDate: '' });
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">Overview of your team's performance and activity.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all self-start"
          >
            <Plus className="w-4 h-4" />
            Create Task
          </motion.button>
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
                  <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4">Projects</h2>
            <div className="space-y-3">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlassCard className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: project.color }}
                      />
                      <h3 className="text-white font-medium">{project.name}</h3>
                      <span className="ml-auto text-sm text-gray-500">{project.taskCount} tasks</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{project.description}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: project.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-10 text-right">{project.progress}%</span>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <GlassCard hover={false} className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
              {activities.map((activity, i) => {
                const member = teamMembers.find(m => m.id === activity.userId);
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                      {member?.name.charAt(0) || '?'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-300">
                        <span className="font-medium text-white">{member?.name}</span>{' '}
                        {activity.action}{' '}
                        <span className="text-gray-400">{activity.target}</span>
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {new Date(activity.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </GlassCard>
          </div>
        </div>

        {/* Task Management */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Task Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.slice(0, 6).map((task, i) => {
              const assignee = teamMembers.find(m => m.id === task.assigneeId);
              const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlassCard className={`p-4 ${isOverdue ? 'border-red-500/30' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-medium text-sm">{task.title}</h3>
                      <PriorityBadge priority={task.priority} />
                    </div>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-1">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={task.status} />
                        {assignee && (
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-[10px] font-bold">
                              {assignee.name.charAt(0)}
                            </div>
                            <span className="text-xs text-gray-500">{assignee.name.split(' ')[0]}</span>
                          </div>
                        )}
                      </div>
                      <div className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-400' : 'text-gray-500'}`}>
                        <Calendar className="w-3 h-3" />
                        {task.dueDate}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Team Members */}
        <div className="mt-8">
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
                    <p className="text-xs text-gray-500">{member.email}</p>
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

      {/* Create Task Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg backdrop-blur-xl bg-[#111827]/90 border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Create New Task</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Task title"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Task description"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Project</label>
                    <select
                      value={newTask.projectId}
                      onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all appearance-none"
                    >
                      {projects.map(project => (
                        <option key={project.id} value={project.id} className="bg-gray-900">{project.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Assign To</label>
                    <select
                      value={newTask.assigneeId}
                      onChange={(e) => setNewTask({ ...newTask, assigneeId: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all appearance-none"
                    >
                      <option value="" className="bg-gray-900">Select member</option>
                      {teamMembers.map(m => (
                        <option key={m.id} value={m.id} className="bg-gray-900">{m.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all appearance-none"
                    >
                      <option value="low" className="bg-gray-900">Low</option>
                      <option value="medium" className="bg-gray-900">Medium</option>
                      <option value="high" className="bg-gray-900">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Due Date</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateTask}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
