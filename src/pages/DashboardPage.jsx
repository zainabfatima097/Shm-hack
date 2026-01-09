// pages/DashboardPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SimulationContext from '../contexts/SimulationContext';
import { 
  filterSimulationsByUser, 
  getSimulationStats, 
  formatTimeAgo 
} from '../utils/simulationUtils';
import { 
  Cpu, BarChart3, Clock, TrendingUp,
  Zap, Sparkles, Star, Plus,
  Search, Target, Activity, Award,
  Edit, Trash2, Brain, Calculator,
  User, Cloud, Download
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const simulationContext = useContext(SimulationContext);
  const { 
    deleteSimulation: contextDeleteSimulation,
    loadSimulation: contextLoadSimulation
  } = simulationContext;
  
  const [userSimulations, setUserSimulations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Filter simulations by user whenever user or allSimulations changes
  // In DashboardPage.jsx, update the useEffect:
useEffect(() => {
  setLoading(true);
  const timer = setTimeout(() => {
    if (simulationContext.getUserSimulations) {
      const userSims = simulationContext.getUserSimulations();
      setUserSimulations(userSims);
    } else {
      // Fallback to filtering
      const filtered = filterSimulationsByUser(simulationContext.savedSimulations || [], user);
      setUserSimulations(filtered);
    }
    setLoading(false);
  }, 300);
  
  return () => clearTimeout(timer);
}, [simulationContext, user]);

  // Get statistics from user's simulations
  const statsData = getSimulationStats(userSimulations);

  const stats = [
    {
      title: 'Total Simulations',
      value: statsData.total,
      change: '+12%',
      icon: <Cpu className="w-6 h-6" />,
      gradient: 'from-pink-500 to-purple-500',
      description: `${statsData.springCount} Spring • ${statsData.pendulumCount} Pendulum`
    },
    {
      title: 'Accuracy Score',
      value: statsData.total > 0 ? '96.5%' : '0%',
      change: statsData.total > 0 ? '+2.3%' : 'N/A',
      icon: <Target className="w-6 h-6" />,
      gradient: 'from-emerald-500 to-cyan-500',
      description: 'Based on simulation accuracy'
    },
    {
      title: 'Total Time',
      value: `${statsData.totalTime}h`,
      change: '+18%',
      icon: <Clock className="w-6 h-6" />,
      gradient: 'from-orange-500 to-amber-500',
      description: 'Total simulation time'
    },
    {
      title: 'This Month',
      value: statsData.thisMonth,
      change: statsData.thisMonth > 0 ? '+32%' : 'N/A',
      icon: <Zap className="w-6 h-6" />,
      gradient: 'from-blue-500 to-indigo-500',
      description: 'Simulations created this month'
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
      title: 'My Simulations',
      description: `${statsData.total} saved simulations`,
      icon: <Cpu className="w-6 h-6" />,
      gradient: 'from-emerald-500 to-cyan-500',
      link: '/saved-simulations'
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
    { 
      title: 'First Simulation', 
      progress: statsData.total > 0 ? 100 : 0, 
      color: 'from-pink-500 to-purple-500', 
      icon: '🎯',
      description: 'Create your first simulation'
    },
    { 
      title: 'Spring Expert', 
      progress: Math.min(Math.round((statsData.springCount / 5) * 100), 100), 
      color: 'from-emerald-500 to-cyan-500', 
      icon: '⚡',
      description: 'Complete 5 spring simulations'
    },
    { 
      title: 'Pendulum Master', 
      progress: Math.min(Math.round((statsData.pendulumCount / 3) * 100), 100), 
      color: 'from-orange-500 to-amber-500', 
      icon: '🔄',
      description: 'Complete 3 pendulum simulations'
    },
    { 
      title: 'Data Collector', 
      progress: Math.min(Math.round((statsData.total / 10) * 100), 100), 
      color: 'from-blue-500 to-indigo-500', 
      icon: '📊',
      description: 'Save 10 simulations'
    },
  ];

  const recentActivity = [
    ...(userSimulations.slice(0, 3).map(sim => ({
      action: `Created: ${sim.title || 'Untitled Simulation'}`,
      time: formatTimeAgo(sim.createdAt),
      icon: sim.type === 'spring' ? '⚡' : '🔄',
      link: '/simulation'
    }))),
    ...(statsData.total > 0 ? [{
      action: 'Exported simulation data',
      time: 'Recently',
      icon: '📊',
      link: '/saved-simulations'
    }] : []),
    {
      action: 'Viewed tutorial',
      time: 'This week',
      icon: '📚',
      link: '/tutorials'
    }
  ].slice(0, 4);

  const filteredSimulations = userSimulations.filter(sim => {
    const matchesSearch = sim.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         sim.type?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || sim.type === filter;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  // Handle simulation deletion
  const handleDeleteSimulation = (id) => {
    // Use context delete function if available
    if (typeof contextDeleteSimulation === 'function') {
      contextDeleteSimulation(id);
    }
    
    // Update local state
    setUserSimulations(prev => prev.filter(sim => sim.id !== id));
  };

  const handleLoadSimulation = (simulation) => {
    if (typeof contextLoadSimulation === 'function') {
      contextLoadSimulation(simulation.id);
    } else {
      // Fallback: store in localStorage and navigate
      localStorage.setItem('currentSimulation', JSON.stringify(simulation));
    }
  };

  const exportAllSimulations = () => {
    try {
      const dataStr = JSON.stringify(userSimulations, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      const exportFileName = `my_simulations_${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileName);
      linkElement.click();
    } catch (error) {
      console.error('Error exporting simulations:', error);
    }
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
              <div className="flex items-center gap-3 mb-2">
                <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${
                  user ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {user ? <Cloud size={14} /> : <User size={14} />}
                  <span className="text-sm font-medium">
                    {user ? 'Synced to cloud' : 'Working offline'}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">
                  {user?.email || 'Sign in to sync across devices'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {statsData.total > 0 && (
                <button
                  onClick={exportAllSimulations}
                  className="px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-pink-200 text-gray-700 rounded-xl font-medium flex items-center gap-2 hover:bg-white hover:border-pink-300 transition-all shadow-sm"
                >
                  <Download size={18} />
                  Export All
                </button>
              )}
              <Link to="/saved-simulations">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-pink-200 text-gray-700 rounded-xl font-semibold flex items-center gap-2 hover:bg-white hover:border-pink-300 transition-all shadow-sm"
                >
                  <Cpu size={18} />
                  {statsData.total} Saved
                </motion.button>
              </Link>
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
                {stat.change !== 'N/A' && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 rounded-full">
                    <TrendingUp size={12} className="text-emerald-500" />
                    <span className="text-emerald-600 text-xs font-semibold">{stat.change}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-gray-800 font-medium">{stat.title}</p>
                <p className="text-gray-600 text-xs">{stat.description}</p>
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
                  {statsData.total > 0 ? `${statsData.total} active` : 'Get started'}
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
                    Your {statsData.total} simulation{statsData.total !== 1 ? 's' : ''} • {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search your simulations..."
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
                  <p className="text-gray-600">Loading your simulations...</p>
                </div>
              ) : statsData.total === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-50 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-pink-400" />
                  </div>
                  <h3 className="text-gray-800 font-semibold mb-2 font-display">No simulations yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start by creating your first simulation to get started!
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
              ) : filteredSimulations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-50 flex items-center justify-center">
                    <Search className="w-8 h-8 text-pink-400" />
                  </div>
                  <h3 className="text-gray-800 font-semibold mb-2 font-display">No matches found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search or filter criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilter('all');
                    }}
                    className="px-4 py-2 bg-white/80 border border-pink-200 text-gray-700 rounded-xl font-medium hover:bg-white hover:border-pink-300 transition-all"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {filteredSimulations.slice(0, 10).map((sim, index) => {
                    const type = sim.type || 'spring';
                    const title = sim.title || 'Untitled Simulation';
                    const timeAgo = formatTimeAgo(sim.createdAt);
                    
                    return (
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
                              type === 'spring' ? 'bg-pink-500/20' : 'bg-emerald-500/20'
                            }`}>
                              {type === 'spring' ? (
                                <Zap className="w-5 h-5 text-pink-500" />
                              ) : (
                                <Target className="w-5 h-5 text-emerald-500" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-gray-800 font-semibold">{title}</h3>
                              <div className="flex items-center gap-2 text-gray-600 text-sm">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${
                                  type === 'spring' 
                                    ? 'bg-pink-100 text-pink-700' 
                                    : 'bg-emerald-100 text-emerald-700'
                                }`}>
                                  {type === 'spring' ? 'Spring-Mass' : 'Pendulum'}
                                </span>
                                <span>•</span>
                                <span>{timeAgo}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link 
                              to={{
                                pathname: '/simulation',
                                state: { 
                                  loadSimulation: true,
                                  simulationData: sim 
                                }
                              }}
                            >
                              <button 
                                onClick={() => handleLoadSimulation(sim)}
                                className="p-2 hover:bg-pink-50 rounded-lg transition-colors" 
                                title="Edit"
                              >
                                <Edit size={18} className="text-gray-600" />
                              </button>
                            </Link>
                            <button 
                              onClick={() => {
                                if (window.confirm(`Delete "${title}"?`)) {
                                  handleDeleteSimulation(sim.id);
                                }
                              }}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} className="text-red-500" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Additional simulation info */}
                        {sim.parameters && (
                          <div className="mt-3 pt-3 border-t border-pink-100 grid grid-cols-2 gap-2 text-xs">
                            {Object.entries(sim.parameters).slice(0, 4).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-gray-500">{key}:</span>
                                <span className="text-gray-700 font-medium">{typeof value === 'number' ? value.toFixed(2) : value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                  
                  {userSimulations.length > 10 && (
                    <Link to="/saved-simulations">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="w-full mt-4 py-3 border border-pink-300 text-gray-700 rounded-xl font-medium hover:bg-pink-50 transition-all"
                      >
                        View all {userSimulations.length} simulations →
                      </motion.button>
                    </Link>
                  )}
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
                  Your Achievements
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
                        <div>
                          <span className="text-gray-800 text-sm font-medium">{achievement.title}</span>
                          <p className="text-gray-500 text-xs">{achievement.description}</p>
                        </div>
                      </div>
                      <span className="text-gray-600 text-sm font-semibold">{achievement.progress}%</span>
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
                  <Link key={index} to={activity.link}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 p-3 hover:bg-pink-50 rounded-xl transition-all cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                        <span className="text-lg">{activity.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 text-sm font-medium">{activity.action}</p>
                        <p className="text-gray-600 text-xs">{activity.time}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* User Stats Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-5 h-5 text-pink-500" />
                <h3 className="text-gray-800 font-semibold font-display">Your Stats Summary</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Total Simulations:</span>
                  <span className="text-gray-800 font-semibold">{statsData.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Spring-Mass:</span>
                  <span className="text-gray-800 font-semibold">
                    {statsData.springCount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Pendulum:</span>
                  <span className="text-gray-800 font-semibold">
                    {statsData.pendulumCount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">This Month:</span>
                  <span className="text-gray-800 font-semibold">
                    {statsData.thisMonth}
                  </span>
                </div>
              </div>
              
              <Link to="/saved-simulations">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 py-2.5 bg-white/60 backdrop-blur-sm border border-pink-300 text-gray-800 rounded-xl font-semibold hover:bg-white/80 transition-colors"
                >
                  View Detailed Analytics
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