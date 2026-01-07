// components/simulation/SavedSimulationsList.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderOpen, Trash2, Clock, Target, Zap, X, 
  Download, Upload, Edit, Play, Search, Filter,
  Calendar, FileText, Hash, BarChart3, Copy
} from 'lucide-react';

const SavedSimulationsList = ({ 
  simulations = [], 
  onLoad, 
  onDelete, 
  onClose,
  onExport,
  onImport 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedSims, setSelectedSims] = useState([]);
  const [editingSim, setEditingSim] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Filter and sort simulations
  const filteredSimulations = useMemo(() => {
    let filtered = [...simulations];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(sim => 
        sim.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sim.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sim.type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(sim => sim.type === filterType);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'name':
          return a.title?.localeCompare(b.title);
        case 'type':
          return a.type?.localeCompare(b.type);
        default:
          return 0;
      }
    });

    return filtered;
  }, [simulations, searchTerm, filterType, sortBy]);

  const handleLoad = (simulation) => {
    if (onLoad) {
      onLoad(simulation.id);
    }
    onClose();
  };

  const handleDelete = (simulationId, e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(simulationId);
    }
  };

  const handleSelectSim = (simulationId) => {
    setSelectedSims(prev => 
      prev.includes(simulationId)
        ? prev.filter(id => id !== simulationId)
        : [...prev, simulationId]
    );
  };

  const handleSelectAll = () => {
    if (selectedSims.length === filteredSimulations.length) {
      setSelectedSims([]);
    } else {
      setSelectedSims(filteredSimulations.map(sim => sim.id));
    }
  };

  const handleBulkDelete = () => {
    if (onDelete && selectedSims.length > 0) {
      selectedSims.forEach(id => onDelete(id));
      setSelectedSims([]);
    }
  };

  const handleExportSelected = () => {
    if (onExport && selectedSims.length > 0) {
      const selected = filteredSimulations.filter(sim => selectedSims.includes(sim.id));
      onExport(selected);
    }
  };

  const handleEdit = (simulation, e) => {
    e.stopPropagation();
    setEditingSim(simulation.id);
    setEditTitle(simulation.title || '');
    setEditDescription(simulation.description || '');
  };

  const handleSaveEdit = (simulationId, e) => {
    e.stopPropagation();
    // Here you would call an update function from context
    console.log('Save edit:', simulationId, editTitle, editDescription);
    setEditingSim(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleCancelEdit = (e) => {
    e?.stopPropagation();
    setEditingSim(null);
    setEditTitle('');
    setEditDescription('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const getSimulationIcon = (type) => {
    switch (type) {
      case 'spring':
        return <Zap className="w-4 h-4 text-blue-400" />;
      case 'pendulum':
        return <Target className="w-4 h-4 text-green-400" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'spring':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/20';
      case 'pendulum':
        return 'bg-green-500/20 text-green-400 border-green-500/20';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <FolderOpen className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Saved Simulations</h2>
                <p className="text-sm text-gray-400">
                  {simulations.length} total • {filteredSimulations.length} filtered
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Filters and Search */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search simulations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2.5 bg-gray-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="all">All Types</option>
              <option value="spring">Spring-Mass</option>
              <option value="pendulum">Pendulum</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-gray-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="type">Sort by Type</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedSims.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Hash className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium">
                    {selectedSims.length} simulation{selectedSims.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportSelected}
                    className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <Download className="w-3 h-3" />
                    Export Selected
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete Selected
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Simulations List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredSimulations.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
                <FolderOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">No simulations found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Save your first simulation to get started'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredSimulations.map((simulation) => (
                <motion.div
                  key={simulation.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleLoad(simulation)}
                  className={`relative bg-gray-800/30 border rounded-xl p-4 cursor-pointer transition-all duration-200 group ${
                    selectedSims.includes(simulation.id)
                      ? 'border-blue-500/50 bg-blue-500/10'
                      : 'border-white/10 hover:border-blue-500/30'
                  }`}
                >
                  {/* Selection Checkbox */}
                  <div 
                    className="absolute top-3 right-3 z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSims.includes(simulation.id)}
                      onChange={() => handleSelectSim(simulation.id)}
                      className="w-4 h-4 rounded border-white/20 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                    />
                  </div>

                  {/* Simulation Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(simulation.type).split(' ')[0]} border ${
                      getTypeColor(simulation.type).split(' ')[2]
                    }`}>
                      {getSimulationIcon(simulation.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {editingSim === simulation.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full px-3 py-1.5 bg-gray-900 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            rows={2}
                            className="w-full px-3 py-1.5 bg-gray-900 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => handleSaveEdit(simulation.id, e)}
                              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-semibold truncate">
                              {simulation.title || 'Untitled Simulation'}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${getTypeColor(simulation.type)}`}>
                              {simulation.type}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm line-clamp-2">
                            {simulation.description || 'No description'}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Simulation Details */}
                  {editingSim !== simulation.id && (
                    <>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(simulation.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-3 h-3" />
                          <span>{simulation.parameters ? Object.keys(simulation.parameters).length : 0} parameters</span>
                        </div>
                      </div>

                      {/* Quick Parameters Preview */}
                      {simulation.parameters && (
                        <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                          {Object.entries(simulation.parameters)
                            .slice(0, 4)
                            .map(([key, value]) => (
                              <div key={key} className="flex justify-between bg-gray-800/50 px-2 py-1 rounded">
                                <span className="text-gray-400">{key}:</span>
                                <span className="text-white font-mono">{typeof value === 'number' ? value.toFixed(2) : value}</span>
                              </div>
                            ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between border-t border-white/10 pt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLoad(simulation);
                          }}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2"
                        >
                          <Play className="w-3 h-3" />
                          Load
                        </button>
                        
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => handleEdit(simulation, e)}
                            className="p-1.5 hover:bg-white/10 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-gray-400 hover:text-blue-400" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Duplicate functionality
                              console.log('Duplicate:', simulation.id);
                            }}
                            className="p-1.5 hover:bg-white/10 rounded transition-colors"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4 text-gray-400 hover:text-green-400" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(simulation.id, e)}
                            className="p-1.5 hover:bg-red-500/10 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleSelectAll}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {selectedSims.length === filteredSimulations.length && filteredSimulations.length > 0
                  ? 'Deselect All'
                  : 'Select All'}
              </button>
              
              <div className="text-xs text-gray-500">
                Showing {filteredSimulations.length} of {simulations.length} simulations
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={onImport}
                className="px-4 py-2 border border-white/10 text-gray-300 rounded-lg hover:bg-gray-800/50 hover:text-white hover:border-white/20 transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button
                onClick={onExport ? () => onExport(filteredSimulations) : undefined}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export All
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SavedSimulationsList;