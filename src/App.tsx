import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from './hooks/useAuth';
import { useAppData } from './hooks/useAppData';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import MemberDashboard from './pages/MemberDashboard';
import ProjectsPage from './pages/ProjectsPage';
import TaskBoardPage from './pages/TaskBoardPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const { user, isAuthenticated, login, demoLogin, signup, logout } = useAuth();
  const appData = useAppData();
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = useCallback((page: string) => {
    if (!isAuthenticated && ['dashboard', 'projects', 'board', 'profile'].includes(page)) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
  }, [isAuthenticated]);

  const handleLogin = useCallback(async (payload: { email: string; password: string }) => {
    await login(payload);
    setCurrentPage('dashboard');
  }, [login]);

  const handleDemoLogin = useCallback(async (role: 'admin' | 'member') => {
    await demoLogin(role);
    setCurrentPage('dashboard');
  }, [demoLogin]);

  const handleSignup = useCallback(async (payload: { name: string; email: string; password: string }) => {
    await signup(payload);
    setCurrentPage('dashboard');
  }, [signup]);

  const handleLogout = useCallback(() => {
    logout();
    setCurrentPage('home');
  }, [logout]);

  const isDashboardPage = ['dashboard', 'projects', 'board', 'profile'].includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onDemoLogin={handleDemoLogin} onNavigate={handleNavigate} />;
      case 'signup':
        return <SignupPage onSignup={handleSignup} onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'dashboard':
        return user?.role === 'admin'
          ? <AdminDashboard appData={appData} />
          : <MemberDashboard user={user!} appData={appData} />;
      case 'projects':
        return <ProjectsPage appData={appData} />;
      case 'board':
        return <TaskBoardPage appData={appData} />;
      case 'profile':
        return <ProfilePage user={user!} />;
      default:
        return <HomePage onNavigate={handleNavigate} isAuthenticated={isAuthenticated} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <AnimatedBackground />
      <Navbar
        user={user}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      {isDashboardPage && isAuthenticated ? (
        <div className="flex">
          <Sidebar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            role={user?.role || 'member'}
          />
          <main className="flex-1 min-h-screen">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
