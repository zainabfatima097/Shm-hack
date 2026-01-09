import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderOpen, Trash2, Clock, Target, Zap, X, 
  Download, Upload, Edit, Play, Search, FileText, Hash, BarChart3, Copy,
  Filter, SortAsc
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
      onLoad(simulation);
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
        return <Zap className="w-4 h-4 text-pink-500" />;
      case 'pendulum':
        return <Target className="w-4 h-4 text-emerald-500" />;
      default:
        return <FileText className="w-4 h-4 text-purple-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'spring':
        return 'bg-pink-500/20 text-pink-400 border-pink-500/20';
      case 'pendulum':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-purple-500/20 text-purple-400 border-purple-500/20';
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'spring':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'pendulum':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default:
        return 'bg-purple-100 text-purple-700 border-purple-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-gradient-to-b from-white/95 to-pink-50/95 backdrop-blur-xl border border-pink-200 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl shadow-pink-300/20"
      >
        {/* Header */}
        <div className="p-6 border-b border-pink-200 flex-shrink-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20">
                <FolderOpen className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 font-display">Saved Simulations</h2>
                <p className="text-sm text-gray-600">
                  {simulations.length} total • {filteredSimulations.length} filtered
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-pink-50 rounded-lg transition-colors border border-pink-200"
            >
              <X className="w-5 h-5 text-gray-600" />
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
                className="w-full pl-10 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-colors"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-colors appearance-none"
              >
                <option value="all">All Types</option>
                <option value="spring">Spring-Mass</option>
                <option value="pendulum">Pendulum</option>
              </select>
            </div>

            <div className="relative">
              <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-colors appearance-none"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="type">Sort by Type</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedSims.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Hash className="w-4 h-4 text-pink-500" />
                  <span className="text-gray-800 font-medium">
                    {selectedSims.length} simulation{selectedSims.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportSelected}
                    className="px-3 py-1.5 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-300 text-pink-600 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <Download className="w-3 h-3" />
                    Export Selected
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-300 text-red-600 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-50 flex items-center justify-center">
                <FolderOpen className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-gray-800 font-semibold mb-2 font-display">No simulations found</h3>
              <p className="text-gray-600 mb-6">
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
                  className={`relative bg-white/60 backdrop-blur-sm border rounded-xl p-4 cursor-pointer transition-all duration-200 group ${
                    selectedSims.includes(simulation.id)
                      ? 'border-pink-500/50 bg-gradient-to-r from-pink-50 to-purple-50'
                      : 'border-pink-200 hover:border-pink-300 hover:bg-pink-50/50'
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
                      className="w-4 h-4 rounded border-pink-300 bg-white text-pink-500 focus:ring-pink-300 focus:ring-offset-pink-50"
                    />
                  </div>

                  {/* Simulation Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(simulation.type)}`}>
                      {getSimulationIcon(simulation.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {editingSim === simulation.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full px-3 py-1.5 bg-white/80 border border-pink-200 rounded text-gray-800 text-sm focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            rows={2}
                            className="w-full px-3 py-1.5 bg-white/80 border border-pink-200 rounded text-gray-800 text-sm focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-300 resize-none"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => handleSaveEdit(simulation.id, e)}
                              className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded text-sm hover:shadow-pink-300/50 transition-all"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-gray-800 font-semibold truncate">
                              {simulation.title || 'Untitled Simulation'}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${getTypeBadgeColor(simulation.type)}`}>
                              {simulation.type}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2">
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
                              <div key={key} className="flex justify-between bg-white/80 px-2 py-1 rounded border border-pink-100">
                                <span className="text-gray-500">{key}:</span>
                                <span className="text-gray-800 font-mono font-medium">
                                  {typeof value === 'number' ? value.toFixed(2) : value}
                                </span>
                              </div>
                            ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between border-t border-pink-100 pt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLoad(simulation);
                          }}
                          className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-pink-300/50 transition-all flex items-center gap-2 shadow-sm"
                        >
                          <Play className="w-3 h-3" />
                          Load
                        </button>
                        
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => handleEdit(simulation, e)}
                            className="p-1.5 hover:bg-pink-50 rounded transition-colors border border-pink-200"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-gray-600 hover:text-pink-500" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Duplicate:', simulation.id);
                            }}
                            className="p-1.5 hover:bg-emerald-50 rounded transition-colors border border-emerald-200"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4 text-gray-600 hover:text-emerald-500" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(simulation.id, e)}
                            className="p-1.5 hover:bg-red-50 rounded transition-colors border border-red-200"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
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
        <div className="p-6 border-t border-pink-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleSelectAll}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors font-medium"
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
                className="px-4 py-2 border border-pink-200 text-gray-700 rounded-lg hover:bg-pink-50 hover:text-gray-800 hover:border-pink-300 transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button
                onClick={onExport ? () => onExport(filteredSimulations) : undefined}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-pink-300/50 transition-all flex items-center gap-2 shadow-sm"
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