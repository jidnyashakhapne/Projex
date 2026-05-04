import { motion } from 'framer-motion';
import { LayoutDashboard, FolderKanban, ClipboardList, User } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  role: 'admin' | 'member';
}

const adminItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'board', label: 'Task Board', icon: ClipboardList },
  { id: 'profile', label: 'Profile', icon: User },
];

const memberItems = [
  { id: 'dashboard', label: 'My Tasks', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'board', label: 'Task Board', icon: ClipboardList },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function Sidebar({ currentPage, onNavigate, role }: SidebarProps) {
  const items = role === 'admin' ? adminItems : memberItems;

  return (
    <motion.aside
      initial={{ x: -240 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="hidden lg:flex flex-col w-60 min-h-screen pt-20 border-r border-white/5 bg-[#0a0e1a]/50 backdrop-blur-sm"
    >
      <div className="flex-1 px-3 py-6 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-white border border-blue-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="px-4 py-6 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-white">Alex Morgan</p>
            <p className="text-xs text-gray-500">{role === 'admin' ? 'Administrator' : 'Team Member'}</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
