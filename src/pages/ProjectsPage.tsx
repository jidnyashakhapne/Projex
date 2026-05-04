import { motion } from 'framer-motion';
import { FolderKanban, Users, ClipboardList } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { AppDataController } from '../types';

interface ProjectsPageProps {
  appData: AppDataController;
}

export default function ProjectsPage({ appData }: ProjectsPageProps) {
  const { projects, teamMembers, tasks } = appData;
  return (
    <div className="min-h-screen pt-20 pb-8 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-400">Manage and track all your team projects.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const projectMembers = teamMembers.filter(m => project.memberIds.includes(m.id));
            const projectTasks = tasks.filter(t => t.projectId === project.id);
            const completedTasks = projectTasks.filter(t => t.status === 'completed').length;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${project.color}20`, border: `1px solid ${project.color}40` }}
                    >
                      <FolderKanban className="w-5 h-5" style={{ color: project.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{project.name}</h3>
                      <p className="text-xs text-gray-500">{project.taskCount} tasks</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-4 flex-1">{project.description}</p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-gray-400">{project.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: project.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <ClipboardList className="w-3.5 h-3.5" />
                      {completedTasks}/{projectTasks.length} done
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {projectMembers.length} members
                    </div>
                  </div>

                  {/* Members */}
                  <div className="flex items-center -space-x-2">
                    {projectMembers.slice(0, 4).map((member) => (
                      <div
                        key={member.id}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold border-2 border-[#111827]"
                        title={member.name}
                      >
                        {member.name.charAt(0)}
                      </div>
                    ))}
                    {projectMembers.length > 4 && (
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 text-xs font-bold border-2 border-[#111827]">
                        +{projectMembers.length - 4}
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
