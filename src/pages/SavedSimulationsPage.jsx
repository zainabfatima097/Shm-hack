import React, { useState, useContext, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SimulationContext from '../contexts/SimulationContext';
import { 
  FolderOpen, 
  Clock, 
  Trash2, 
  Play, 
  Download, 
  Search, 
  Calendar,
  Zap,
  Target,
  AlertCircle
} from 'lucide-react';

const SavedSimulationsPage = () => {
  const simulationContext = useContext(SimulationContext);
  const { 
    savedSimulations: contextSavedSimulations,
    loadSimulation: contextLoadSimulation,
    deleteSimulation: contextDeleteSimulation,
    exportSimulation: contextExportSimulation
  } = simulationContext;

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedSim, setSelectedSim] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Memoize simulations from context
  const simulations = useMemo(() => {
    return contextSavedSimulations || [];
  }, [contextSavedSimulations]);

  // Filter and search
  const filteredSimulations = useMemo(() => {
    let filtered = [...simulations];

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(sim => sim.type === filterType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(sim => 
        sim.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sim.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => 
      new Date(b.createdAt || b.timestamp) - new Date(a.createdAt || a.timestamp)
    );
  }, [simulations, searchTerm, filterType]);

  const handleLoadSimulation = (simulation) => {
    // Use context load if available
    if (typeof contextLoadSimulation === 'function') {
      const success = contextLoadSimulation(simulation.id);
      if (success) {
        navigate('/simulation');
      }
    } else {
      // Fallback to localStorage method
      localStorage.setItem('currentSimulation', JSON.stringify(simulation));
      navigate('/simulation');
    }
  };

  const handleDeleteSimulation = (simulationId) => {
    if (typeof contextDeleteSimulation === 'function') {
      contextDeleteSimulation(simulationId);
    }
    setShowDeleteConfirm(false);
    setSelectedSim(null);
  };

  const handleExportSimulation = (simulation) => {
    if (typeof contextExportSimulation === 'function') {
      const exportData = contextExportSimulation(simulation.id);
      if (exportData) {
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', exportData.dataUri);
        linkElement.setAttribute('download', exportData.exportFileName);
        linkElement.click();
      }
    } else {
      // Fallback export
      const dataStr = JSON.stringify(simulation, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      const exportFileDefaultName = `${simulation.title.replace(/\s+/g, '_')}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSimulationIcon = (type) => {
    switch (type) {
      case 'spring':
        return <Zap className="w-4 h-4 text-pink-500" />;
      case 'pendulum':
        return <Target className="w-4 h-4 text-emerald-500" />;
      default:
        return <Zap className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 font-display">
                My <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Simulations</span>
              </h1>
              <p className="text-gray-600 text-lg">
                Access and manage all your saved simulations in one place
              </p>
            </div>
            
            <Link
              to="/simulation"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-pink-300/50 transition-all shadow-sm flex items-center gap-2 justify-center"
            >
              <Zap className="w-4 h-4" />
              New Simulation
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Simulations</p>
                  <p className="text-3xl font-bold text-gray-800">{simulations.length}</p>
                </div>
                <FolderOpen className="w-8 h-8 text-pink-500" />
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Spring-Mass</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {simulations.filter(s => s.type === 'spring').length}
                  </p>
                </div>
                <Zap className="w-8 h-8 text-pink-500" />
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Pendulum</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {simulations.filter(s => s.type === 'pendulum').length}
                  </p>
                </div>
                <Target className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Latest Save</p>
                  <p className="text-lg font-bold text-gray-800 truncate">
                    {simulations.length > 0 
                      ? formatDate(simulations[0].createdAt).split(',')[0]
                      : 'No saves'
                    }
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search simulations by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/80 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  filterType === 'all'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-sm'
                    : 'bg-white/80 border border-pink-200 text-gray-700 hover:bg-pink-50'
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => setFilterType('spring')}
                className={`px-4 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
                  filterType === 'spring'
                    ? 'bg-pink-100 text-pink-700 border border-pink-300 shadow-sm'
                    : 'bg-white/80 border border-pink-200 text-gray-700 hover:bg-pink-50'
                }`}
              >
                <Zap className="w-4 h-4" />
                Spring-Mass
              </button>
              <button
                onClick={() => setFilterType('pendulum')}
                className={`px-4 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
                  filterType === 'pendulum'
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-300 shadow-sm'
                    : 'bg-white/80 border border-pink-200 text-gray-700 hover:bg-emerald-50'
                }`}
              >
                <Target className="w-4 h-4" />
                Pendulum
              </button>
            </div>
          </div>
        </div>

        {/* Simulations Grid */}
        {filteredSimulations.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-12 text-center shadow-lg">
            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No simulations found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm || filterType !== 'all'
                ? 'Try changing your search or filter criteria'
                : 'Start by creating and saving your first simulation!'
              }
            </p>
            <Link
              to="/simulation"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-pink-300/50 transition-all shadow-sm"
            >
              <Zap className="w-4 h-4" />
              Create New Simulation
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSimulations.map((simulation) => (
              <motion.div
                key={simulation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20">
                      {getSimulationIcon(simulation.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 truncate max-w-[180px]">
                        {simulation.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        simulation.type === 'spring'
                          ? 'bg-pink-100 text-pink-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {simulation.type === 'spring' ? 'Spring-Mass' : 'Pendulum'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedSim(simulation);
                      setShowDeleteConfirm(true);
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {simulation.description || 'No description provided'}
                </p>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(simulation.createdAt)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {simulation.parameters ? `${Object.keys(simulation.parameters).length} params` : 'No params'}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleLoadSimulation(simulation)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-pink-300/50 transition-all shadow-sm"
                  >
                    <Play className="w-4 h-4" />
                    Load Simulation
                  </button>
                  
                  <button
                    onClick={() => handleExportSimulation(simulation)}
                    className="p-3 border border-pink-300 text-pink-600 rounded-xl hover:bg-pink-50 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination/Info */}
        {filteredSimulations.length > 0 && (
          <div className="mt-8 text-center text-gray-600 text-sm">
            Showing {filteredSimulations.length} of {simulations.length} simulations
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedSim && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-100">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Delete Simulation</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{selectedSim.title}"? This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 border border-pink-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteSimulation(selectedSim.id)}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SavedSimulationsPage;