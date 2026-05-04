import { motion } from 'framer-motion';
import { Zap, ArrowRight, CheckCircle2, BarChart3, Shield, Users, FolderKanban, ClipboardList } from 'lucide-react';
import GlassCard from '../components/GlassCard';

interface HomePageProps {
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
}

const features = [
  { icon: ClipboardList, title: 'Task Tracking', description: 'Track every task from creation to completion with real-time status updates and priority management.' },
  { icon: Shield, title: 'Role-Based Access', description: 'Control who sees what with granular admin and member roles. Keep sensitive data protected.' },
  { icon: BarChart3, title: 'Smart Dashboard', description: 'Visualize team progress with interactive dashboards showing key metrics and overdue alerts.' },
  { icon: Users, title: 'Team Collaboration', description: 'Assign tasks, share updates, and keep everyone aligned with seamless team workflows.' },
  { icon: FolderKanban, title: 'Project Management', description: 'Organize work into projects with progress tracking and team assignment capabilities.' },
  { icon: CheckCircle2, title: 'Kanban Board', description: 'Drag-style kanban view to visualize workflow and move tasks through stages effortlessly.' },
];

export default function HomePage({ onNavigate, isAuthenticated }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, #3b82f6 0%, transparent 60%)',
              top: '20%',
              left: '30%',
            }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, #8b5cf6 0%, transparent 60%)',
              bottom: '10%',
              right: '20%',
            }}
            animate={{ scale: [1, 0.8, 1], rotate: [0, -5, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8">
              <Zap className="w-4 h-4 text-cyan-400" />
              Built for modern teams
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Where teams turn{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                chaos
              </span>{' '}
              into{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                shipped work
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Projex brings clarity to your team's workflow. Track tasks, manage projects, and deliver results -- all in one beautifully designed platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'signup')}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('login')}
                className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all"
              >
                Login
              </motion.button>
            </div>
          </motion.div>

          {/* Floating 3D shapes */}
          <motion.div
            className="absolute -top-10 -left-10 w-20 h-20 rounded-2xl border border-blue-500/20 bg-blue-500/5"
            animate={{ rotate: [0, 360], y: [0, -20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -bottom-10 -right-10 w-16 h-16 rounded-full border border-cyan-500/20 bg-cyan-500/5"
            animate={{ rotate: [360, 0], y: [0, 15, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-1/3 -right-20 w-12 h-12 rounded-lg border border-teal-500/20 bg-teal-500/5 rotate-45"
            animate={{ rotate: [45, 405], y: [0, -10, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything your team needs
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Powerful features designed to keep your team organized, focused, and delivering on time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <GlassCard className="p-6 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard hover={false} className="p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Ready to transform your workflow?
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                  Join thousands of teams already using Projex to ship better work, faster.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'signup')}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all inline-flex items-center gap-2"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-400">Projex</span>
          </div>
          <p className="text-sm text-gray-600">2026 Projex. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
