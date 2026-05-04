import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Bell, Palette, Save } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { User as UserType } from '../types';

interface ProfilePageProps {
  user: UserType;
}

export default function ProfilePage({ user }: ProfilePageProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Profile & Settings</h1>
          <p className="text-gray-400">Manage your account preferences and settings.</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard hover={false} className="p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                <p className="text-gray-400 text-sm">{user.email}</p>
                <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.role === 'admin'
                    ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                    : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                }`}>
                  {user.role === 'admin' ? 'Administrator' : 'Team Member'}
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Edit Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard hover={false} className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Edit Profile</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Role</label>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-500">
                  <Shield className="w-4 h-4" />
                  {user.role === 'admin' ? 'Administrator' : 'Team Member'}
                  <span className="text-xs text-gray-600 ml-auto">Contact admin to change</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </motion.button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard hover={false} className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Palette className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Preferences</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Email Notifications</p>
                    <p className="text-xs text-gray-500">Receive task updates via email</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-11 h-6 rounded-full transition-all duration-200 ${
                    notifications ? 'bg-blue-500' : 'bg-white/10'
                  }`}
                >
                  <motion.div
                    className="w-5 h-5 rounded-full bg-white shadow-sm"
                    animate={{ x: notifications ? 22 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Dark Mode</p>
                    <p className="text-xs text-gray-500">Use dark theme across the app</p>
                  </div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-11 h-6 rounded-full transition-all duration-200 ${
                    darkMode ? 'bg-blue-500' : 'bg-white/10'
                  }`}
                >
                  <motion.div
                    className="w-5 h-5 rounded-full bg-white shadow-sm"
                    animate={{ x: darkMode ? 22 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
