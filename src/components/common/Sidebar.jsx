import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Cpu, 
  BarChart3, 
  Calculator,
  User,
  LogOut,
  Menu,
  X,
  Zap,
  Target,
  BookOpen,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Brain,
  Trophy,
  FolderOpen,
  Gamepad2  // Added gamepad icon
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={22} /> },
    { path: '/simulation', label: 'Simulation', icon: <Cpu size={22} /> },
    { path: '/games', label: 'Games', icon: <Gamepad2 size={22} /> },  
    { path: '/graphs', label: 'Graphs', icon: <BarChart3 size={22} /> },
    { path: '/saved-simulations', label: 'My Simulations', icon: <FolderOpen size={22} /> },
    { path: '/calculations', label: 'Calculations', icon: <Calculator size={22} /> },
    { path: '/quiz', label: 'Quiz', icon: <Trophy size={22} /> },
    { path: '/tutorials', label: 'Tutorials', icon: <BookOpen size={22} /> },
    { path: '/help', label: 'Help', icon: <HelpCircle size={22} /> },
  ];

  const simulationTypes = [
    { type: 'spring', label: 'Spring-Mass', icon: <Zap size={18} />, color: 'text-pink-400' },
    { type: 'pendulum', label: 'Pendulum', icon: <Target size={18} />, color: 'text-emerald-400' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-2xl shadow-pink-300/50 hover:shadow-pink-300/75 transition-all"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -64 }}
        animate={{ 
          x: isMobileOpen ? 0 : (!isOpen ? -64 : 0),
          width: isOpen ? 240 : 64
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen z-40 hidden lg:block bg-gradient-to-b from-white/95 to-pink-50/95 backdrop-blur-xl border-r border-pink-200 shadow-lg"
      >
        <div className="h-full flex flex-col">
          {/* Logo/Header */}
          <div className="p-4 border-b border-pink-200">
            <div className="flex items-center justify-between">
              <NavLink to="/dashboard" className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-sm">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1"
                  >
                    <h1 className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-display">
                      Physics Lab
                    </h1>
                    <p className="text-xs text-gray-600">SHM Simulator</p>
                  </motion.div>
                )}
              </NavLink>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 rounded-lg bg-white/60 hover:bg-pink-50 transition-colors border border-pink-200 shadow-sm"
              >
                {isOpen ? <ChevronLeft size={16} className="text-gray-700" /> : <ChevronRight size={16} className="text-gray-700" />}
              </button>
            </div>
          </div>

          {/* User Info - Only show when sidebar is open */}
          {isOpen && user && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border-b border-pink-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-sm">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-gray-800 font-medium text-sm truncate">{user.name}</p>
                  <p className="text-gray-600 text-xs truncate">{user.email}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Simulation Types - Only show when sidebar is open */}
          {isOpen && (
            <div className="p-4 border-b border-pink-200">
              <h3 className="text-xs uppercase text-gray-700 font-medium mb-3">Types</h3>
              <div className="space-y-2">
                {simulationTypes.map((item) => (
                  <div
                    key={item.type}
                    className="flex items-center gap-3 p-2 rounded-lg bg-white/60 hover:bg-pink-50/80 transition-colors border border-pink-100"
                  >
                    <div className={item.color}>{item.icon}</div>
                    <span className="text-gray-800 text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Navigation with themed scrollbar */}
          <nav className="flex-1 p-2 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-gray-800 border border-pink-300 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-pink-50 border border-transparent'
                      }`
                    }
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="font-medium text-sm whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer with Logout - Fixed to bottom */}
          <div className="p-4 border-t border-pink-200 mt-auto">
            <button
              onClick={logout}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors ${
                !isOpen ? 'justify-center' : ''
              }`}
            >
              <LogOut size={20} />
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-medium text-sm"
                >
                  Logout
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Sidebar with themed scrollbar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden fixed left-0 top-0 h-screen w-64 z-50 bg-gradient-to-b from-white/95 to-pink-50/95 backdrop-blur-xl border-r border-pink-200 shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b border-pink-200">
              <div className="flex items-center justify-between">
                <NavLink 
                  to="/dashboard" 
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-sm">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-display">
                      Physics Lab
                    </h1>
                    <p className="text-xs text-gray-600">SHM Simulator</p>
                  </div>
                </NavLink>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg bg-white/60 border border-pink-200 shadow-sm hover:bg-pink-50 transition-colors"
                >
                  <X size={20} className="text-gray-700" />
                </button>
              </div>
            </div>

            {/* User Info */}
            {user && (
              <div className="p-4 border-b border-pink-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-sm">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium text-sm">{user.name}</p>
                    <p className="text-gray-600 text-xs">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation with themed scrollbar */}
            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-xl transition-colors border ${
                          isActive
                            ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-gray-800 border-pink-300 shadow-sm'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-pink-50 border-transparent'
                        }`
                      }
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Fixed Logout at bottom */}
            <div className="p-4 border-t border-pink-200 mt-auto">
              <button
                onClick={() => {
                  logout();
                  setIsMobileOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Sidebar Toggle Indicator for collapsed state */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="hidden lg:block fixed left-2 top-1/2 transform -translate-y-1/2 z-30 p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-xl hover:shadow-2xl hover:shadow-pink-300/50 transition-shadow"
        >
          <ChevronRight size={30} />
        </button>
      )}

      {/* Custom scrollbar styles */}
      <style jsx>{`
        @media (min-width: 1024px) {
          body {
            transition: padding-left 0.3s ease;
            padding-left: ${isOpen ? '240px' : '2px'};
          }
        }

        /* Custom scrollbar styling */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(249, 168, 212, 0.1);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.3));
          border-radius: 10px;
          border: 1px solid rgba(236, 72, 153, 0.2);
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgba(236, 72, 153, 0.5), rgba(139, 92, 246, 0.5));
        }

        /* For Firefox */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: rgba(236, 72, 153, 0.3) rgba(249, 168, 212, 0.1);
        }

        /* Hide scrollbar when sidebar is collapsed */
        .fixed.left-0.top-0.h-screen.z-40.hidden.lg\\:block:not([style*="width: 240px"]) .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
        
        .fixed.left-0.top-0.h-screen.z-40.hidden.lg\\:block:not([style*="width: 240px"]) .overflow-y-auto {
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default Sidebar;