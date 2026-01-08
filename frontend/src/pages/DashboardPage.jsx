// pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Cpu, BarChart3, Clock, TrendingUp,
  Zap, Sparkles, Star, Plus,
  Search, Target, Activity, Award,
  Edit, Trash2, Brain, Calculator,
  AlertCircle
} from 'lucide-react';

const DashboardPage = () => {
  const { user, getSavedSimulations } = useAuth();
  const [simulations, setSimulations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSimulations = () => {
      try {
        // Use a small delay for better UX
        setTimeout(() => {
          // Check if getSavedSimulations exists and is a function
          if (getSavedSimulations && typeof getSavedSimulations === 'function') {
            const savedSimulations = getSavedSimulations();
            setSimulations(savedSimulations || []);
          } else {
            // Fallback: Load from localStorage directly
            const saved = localStorage.getItem('simulations');
            if (saved) {
              setSimulations(JSON.parse(saved));
            } else {
              // Default mock data for initial state
              setSimulations([
                {
                  id: '1',
                  title: 'Spring-Mass Demo',
                  type: 'spring',
                  createdAt: new Date().toISOString()
                },
                {
                  id: '2', 
                  title: 'Pendulum Demo',
                  type: 'pendulum',
                  createdAt: new Date(Date.now() - 86400000).toISOString()
                }
              ]);
            }
          }
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error loading simulations:', error);
        setSimulations([]);
        setLoading(false);
      }
    };

    loadSimulations();
  }, [getSavedSimulations]);

  const stats = [
    {
      title: 'Total Simulations',
      value: simulations.length,
      change: '+12%',
      icon: <Cpu className="w-6 h-6" />,
      gradient: 'from-pink-500 to-purple-500'
    },
    {
      title: 'Accuracy Score',
      value: '96.5%',
      change: '+2.3%',
      icon: <Target className="w-6 h-6" />,
      gradient: 'from-emerald-500 to-cyan-500'
    },
    {
      title: 'Simulation Time',
      value: '42h',
      change: '+18%',
      icon: <Clock className="w-6 h-6" />,
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      title: 'Energy Calculated',
      value: '1.2K J',
      change: '+32%',
      icon: <Zap className="w-6 h-6" />,
      gradient: 'from-blue-500 to-indigo-500'
    }
  ];

  const quickActions = [
    {
      title: 'New Simulation',
      description: 'Create spring-mass oscillator',
      icon: <Plus className="w-6 h-6" />,
      gradient: 'from-pink-500 to-purple-500',
      link: '/simulation'
    },
    {
      title: 'Pendulum Analysis',
      description: 'Analyze pendulum motion',
      icon: <Target className="w-6 h-6" />,
      gradient: 'from-emerald-500 to-cyan-500',
      link: '/simulation?type=pendulum'
    },
    {
      title: 'View Graphs',
      description: 'Energy distribution analysis',
      icon: <BarChart3 className="w-6 h-6" />,
      gradient: 'from-orange-500 to-amber-500',
      link: '/graphs'
    },
    {
      title: 'Take Quiz',
      description: 'Test your physics knowledge',
      icon: <Brain className="w-6 h-6" />,
      gradient: 'from-blue-500 to-indigo-500',
      link: '/quiz'
    }
  ];

  const achievements = [
    { title: 'First Simulation', progress: simulations.length > 0 ? 100 : 0, color: 'from-pink-500 to-purple-500', icon: '🎯' },
    { title: 'Energy Expert', progress: 75, color: 'from-emerald-500 to-cyan-500', icon: '⚡' },
    { title: 'Physics Pro', progress: 50, color: 'from-orange-500 to-amber-500', icon: '🧠' },
    { title: 'Data Analyst', progress: 25, color: 'from-blue-500 to-indigo-500', icon: '📊' },
  ];

  const recentActivity = [
    { action: 'Created simulation', time: '2 hours ago', icon: '🔄' },
    { action: 'Exported graph data', time: 'Yesterday', icon: '📊' },
    { action: 'Achieved 95% accuracy', time: '2 days ago', icon: '🎯' },
    { action: 'Completed tutorial', time: '1 week ago', icon: '✅' },
  ];

  const filteredSimulations = simulations.filter(sim => {
    const matchesSearch = sim.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         sim.type?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || sim.type === filter;
    return matchesSearch && matchesFilter;
  });

  // Handle simulation deletion
  const handleDeleteSimulation = (id) => {
    setSimulations(prev => prev.filter(sim => sim.id !== id));
    // Update localStorage
    const updated = simulations.filter(sim => sim.id !== id);
    localStorage.setItem('simulations', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-display">
                Welcome back, <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  {user?.name || 'Physicist'}
                </span>
              </h1>
              <p className="text-gray-600 text-lg">
                Simple Harmonic Motion Simulator Dashboard
              </p>
            </div>
            <Link to="/simulation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-pink-300 transition-all"
              >
                <Plus size={20} />
                New Simulation
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 hover:border-pink-300 transition-all shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 rounded-full">
                  <TrendingUp size={12} className="text-emerald-500" />
                  <span className="text-emerald-600 text-xs font-semibold">{stat.change}</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 font-display">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Quick Actions
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Activity size={14} className="text-emerald-500 animate-pulse" />
                  Active
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.link}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl p-5 hover:border-pink-300 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${action.gradient}`}>
                          {action.icon}
                        </div>
                        <div>
                          <h3 className="text-gray-800 font-semibold">{action.title}</h3>
                          <p className="text-gray-600 text-sm">{action.description}</p>
                        </div>
                      </div>
                      <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${action.gradient} rounded-full transition-all duration-500`} />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Recent Simulations */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              id="recent"
              className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2 font-display">Recent Simulations</h2>
                  <p className="text-gray-600 text-sm">
                    {simulations.length} simulation{simulations.length !== 1 ? 's' : ''} in your library
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search simulations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white/60 border border-pink-200 rounded-xl px-10 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                    />
                  </div>
                  
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-white/60 border border-pink-200 rounded-xl px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                  >
                    <option value="all">All Types</option>
                    <option value="spring">Spring-Mass</option>
                    <option value="pendulum">Pendulum</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-gray-600">Loading simulations...</p>
                </div>
              ) : filteredSimulations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-50 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-pink-400" />
                  </div>
                  <h3 className="text-gray-800 font-semibold mb-2 font-display">No simulations found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm || filter !== 'all' 
                      ? 'Try changing your search criteria' 
                      : 'Create your first simulation to get started'}
                  </p>
                  <Link to="/simulation">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-xl font-semibold"
                    >
                      Create First Simulation
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredSimulations.slice(0, 5).map((sim, index) => (
                    <motion.div
                      key={sim.id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                      className="bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl p-4 hover:border-pink-300 transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            sim.type === 'spring' ? 'bg-pink-500/20' : 'bg-emerald-500/20'
                          }`}>
                            {sim.type === 'spring' ? (
                              <Zap className="w-5 h-5 text-pink-500" />
                            ) : (
                              <Target className="w-5 h-5 text-emerald-500" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-gray-800 font-semibold">{sim.title || 'Untitled Simulation'}</h3>
                            <p className="text-gray-600 text-sm">
                              {sim.type === 'spring' ? 'Spring-Mass System' : 'Pendulum System'} • {new Date(sim.createdAt || Date.now()).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link to={`/simulation?type=${sim.type}&load=${sim.id}`}>
                            <button className="p-2 hover:bg-pink-50 rounded-lg transition-colors">
                              <Edit size={18} className="text-gray-600" />
                            </button>
                          </Link>
                          <button 
                            onClick={() => handleDeleteSimulation(sim.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 font-display">
                  <Award className="w-5 h-5 text-amber-500" />
                  Achievements
                </h2>
                <Star className="w-5 h-5 text-amber-500" />
              </div>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                          <span className="text-lg">{achievement.icon}</span>
                        </div>
                        <span className="text-gray-800 text-sm font-medium">{achievement.title}</span>
                      </div>
                      <span className="text-gray-600 text-sm">{achievement.progress}%</span>
                    </div>
                    <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${achievement.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${achievement.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6 font-display">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 hover:bg-pink-50 rounded-xl transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                      <span className="text-lg">{activity.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 text-sm font-medium">{activity.action}</p>
                      <p className="text-gray-600 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-5 h-5 text-pink-500" />
                <h3 className="text-gray-800 font-semibold font-display">Physics Tip</h3>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                The period of a simple pendulum depends only on its length and gravity, not on mass or amplitude.
              </p>
              <Link to="/calculations">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2.5 bg-white/60 backdrop-blur-sm border border-pink-300 text-gray-800 rounded-xl font-semibold hover:bg-white/80 transition-colors"
                >
                  View Formulas
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;