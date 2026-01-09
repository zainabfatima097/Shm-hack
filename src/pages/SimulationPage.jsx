import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SimulationContext from '../contexts/SimulationContext';
import { useAuth } from '../contexts/AuthContext';
import SimulationCanvas from '../components/simulation/SimulationCanvas';
import ControlPanel from '../components/simulation/ControlPanel';
import GraphPanel from '../components/simulation/GraphPanel';
import EquationDisplay from '../components/simulation/EquationDisplay';
import SaveSimulationButton from '../components/simulation/SaveSimulationButton';
import SaveSimulationModal from '../components/simulation/SaveSimulationModal';
import SavedSimulationsList from '../components/simulation/SavedSimulationsList';
import { Save, FileText, AlertCircle, CheckCircle, Download, Play, X } from 'lucide-react';

const SimulationPageContent = () => {
  const simulationContext = useContext(SimulationContext);
  const {
    simulationType,
    setSimulationType,
    parameters,
    handleParameterChange,
    savedSimulations: contextSavedSimulations,
    saveSimulation: contextSaveSimulation,
    loadSimulation: contextLoadSimulation,
    deleteSimulation: contextDeleteSimulation,
  } = simulationContext;

  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showSavedList, setShowSavedList] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [loadedSimulation, setLoadedSimulation] = useState(null);
  const [showLoadPrompt, setShowLoadPrompt] = useState(false);

  // Load saved simulations from context
  const savedSimulations = contextSavedSimulations || [];

  // Check for saved simulation to load on mount
  useEffect(() => {
    const loadSavedSimulationFromState = () => {
      try {
        // Check location state first (from navigation)
        if (location.state?.loadSimulation && location.state.simulationData) {
          const { simulationData } = location.state;
          
          // Store the loaded simulation
          setLoadedSimulation(simulationData);
          setShowLoadPrompt(true);
          
          // Clear the navigation state
          navigate(location.pathname, { replace: true, state: {} });
          
          return;
        }

        // Check localStorage for saved simulation
        const saved = localStorage.getItem('currentSimulation');
        if (saved) {
          const simulationData = JSON.parse(saved);
          setLoadedSimulation(simulationData);
          setShowLoadPrompt(true);
          
          // Clear localStorage
          localStorage.removeItem('currentSimulation');
        }
      } catch (error) {
        console.error('Error loading saved simulation:', error);
      }
    };

    loadSavedSimulationFromState();
  }, [location, navigate]);

  // Handle loading a saved simulation using context
  const handleLoadSavedSimulation = () => {
    if (!loadedSimulation) return;

    try {
      // If context has loadSimulation function, use it
      if (typeof contextLoadSimulation === 'function') {
        const success = contextLoadSimulation(loadedSimulation.id);
        if (success) {
          setShowLoadPrompt(false);
          setSaveStatus({
            type: 'success',
            message: `Loaded simulation: "${loadedSimulation.title}"`,
          });
        } else {
          setSaveStatus({
            type: 'error',
            message: 'Failed to load simulation from context',
          });
        }
      } else {
        // Manual loading
        if (loadedSimulation.type) {
          setSimulationType(loadedSimulation.type);
        }

        if (loadedSimulation.parameters) {
          // Apply all parameters
          Object.entries(loadedSimulation.parameters).forEach(([key, value]) => {
            handleParameterChange(key, value);
          });
        }

        setShowLoadPrompt(false);
        setSaveStatus({
          type: 'success',
          message: `Loaded simulation: "${loadedSimulation.title}"`,
        });
      }

      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error('Error loading simulation:', error);
      setSaveStatus({
        type: 'error',
        message: 'Failed to load simulation',
      });
    }
  };

  const handleDismissLoadPrompt = () => {
    setShowLoadPrompt(false);
    setLoadedSimulation(null);
  };

  // Handle save simulation using context
  const handleSaveSimulation = useCallback(async (title, description) => {
    try {
      // Use context's saveSimulation function
      if (typeof contextSaveSimulation === 'function') {
        const simulationId = contextSaveSimulation(title, description);
        
        if (simulationId) {
          setSaveStatus({
            type: 'success',
            message: 'Simulation saved successfully!',
          });

          setTimeout(() => setSaveStatus(null), 3000);
          return true;
        } else {
          setSaveStatus({
            type: 'error',
            message: 'Failed to save simulation',
          });
          return false;
        }
      } else {
        // Fallback if context doesn't have save function
        setSaveStatus({
          type: 'error',
          message: 'Save functionality not available',
        });
        return false;
      }
    } catch (error) {
      console.error('Error saving simulation:', error);
      setSaveStatus({
        type: 'error',
        message: 'An error occurred while saving',
      });
      return false;
    }
  }, [contextSaveSimulation]);

  // Quick save function
  const handleQuickSave = useCallback(() => {
    const title = `Quick Save ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    handleSaveSimulation(title, 'Quick save from simulation');
  }, [handleSaveSimulation]);

  // Export current simulation as JSON
  const handleExportSimulation = () => {
    try {
      const simulationData = {
        title: `Exported Simulation ${new Date().toLocaleDateString()}`,
        description: 'Exported from Physics Lab SHM Simulator',
        type: simulationType || 'spring',
        parameters: parameters || {},
        timestamp: Date.now(),
        exportedAt: new Date().toISOString(),
        version: '1.0'
      };

      const dataStr = JSON.stringify(simulationData, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      const exportFileName = `physics_lab_simulation_${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileName);
      linkElement.click();

      setSaveStatus({
        type: 'success',
        message: 'Simulation exported successfully!',
      });
      
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error('Error exporting simulation:', error);
      setSaveStatus({
        type: 'error',
        message: 'Failed to export simulation',
      });
    }
  };

  // Handle delete simulation
  const handleDeleteSimulation = (simulationId) => {
    try {
      // Use context's delete function
      if (typeof contextDeleteSimulation === 'function') {
        contextDeleteSimulation(simulationId);
        
        setSaveStatus({
          type: 'success',
          message: 'Simulation deleted successfully',
        });

        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus({
          type: 'error',
          message: 'Delete functionality not available',
        });
      }
    } catch (error) {
      console.error('Error deleting simulation:', error);
      setSaveStatus({
        type: 'error',
        message: 'Failed to delete simulation',
      });
    }
  };

  // Handle load simulation from list
  const handleLoadFromList = (simulation) => {
    // Store in localStorage for loading
    localStorage.setItem('currentSimulation', JSON.stringify(simulation));
    // Reload page to trigger loading
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Load Saved Simulation Prompt */}
        <AnimatePresence>
          {showLoadPrompt && loadedSimulation && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
                    <Play className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 font-display">
                      Load Saved Simulation?
                    </h3>
                    <p className="text-gray-600">
                      You have a saved simulation ready to load: <span className="font-semibold text-blue-600">"{loadedSimulation.title}"</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {loadedSimulation.description || 'No description'}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleDismissLoadPrompt}
                    className="px-5 py-2.5 border border-blue-200 text-gray-700 rounded-xl font-medium hover:bg-white transition-colors"
                  >
                    <X className="w-4 h-4 inline mr-2" />
                    Dismiss
                  </button>
                  <button
                    onClick={handleLoadSavedSimulation}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-300/50 transition-all shadow-sm"
                  >
                    <Play className="w-4 h-4 inline mr-2" />
                    Load Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header with Save Button */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 font-display">
                Harmonic Motion <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Simulation</span>
              </h1>
              <p className="text-gray-600 text-lg">
                {loadedSimulation 
                  ? `Editing: ${loadedSimulation.title}`
                  : 'Interactive real-time simulation of Simple Harmonic Motion'
                }
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Export Button */}
              <button
                onClick={handleExportSimulation}
                className="px-4 py-2.5 border border-pink-300 text-pink-600 rounded-xl font-medium hover:bg-pink-50 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>

              {/* Save Simulation Button */}
              <SaveSimulationButton 
                onQuickSave={handleQuickSave}
                onOpenSaveModal={() => setShowSaveModal(true)}
                onOpenSavedList={() => setShowSavedList(!showSavedList)}
                savedCount={savedSimulations.length}
                isAuthenticated={!!user}
              />
            </div>
          </div>

          {/* Status Messages */}
          {saveStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-xl border ${
                saveStatus.type === 'success' 
                  ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 text-emerald-700' 
                  : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200 text-red-700'
              } shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {saveStatus.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="font-medium">{saveStatus.message}</span>
                </div>
                <button 
                  onClick={() => setSaveStatus(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {/* Save Info Box */}
          <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-5 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20">
                  <Save className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <h3 className="text-gray-800 font-semibold mb-1 font-display">Save Your Work</h3>
                  <p className="text-gray-600 text-sm">
                    {loadedSimulation 
                      ? `Editing saved simulation. Current settings will overwrite when saved.`
                      : user 
                        ? `Your simulations are saved to your account. You have ${savedSimulations.length} saved simulations.`
                        : `Save simulations locally. You have ${savedSimulations.length} saved simulations.`
                    }
                  </p>
                </div>
              </div>
              
              {!user && !loadedSimulation && (
                <button 
                  onClick={() => navigate('/signup')}
                  className="text-sm text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1"
                >
                  Sign up to sync across devices
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Simulation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Controls & Save Options */}
          <div className="lg:col-span-1 space-y-8">
            <ControlPanel />
            <EquationDisplay />
            
            {/* Saved Simulations Card */}
            <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-800 font-semibold flex items-center gap-2 font-display">
                  <FileText className="w-5 h-5 text-pink-500" />
                  Saved Simulations
                </h3>
                <span className="text-xs px-3 py-1.5 bg-pink-100 text-pink-700 rounded-full font-medium">
                  {savedSimulations.length} total
                </span>
              </div>
              
              {savedSimulations.length === 0 ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center">
                    <Save className="w-8 h-8 text-pink-400" />
                  </div>
                  <p className="text-gray-600 mb-6">No saved simulations yet</p>
                  <button
                    onClick={() => setShowSaveModal(true)}
                    className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-pink-300/50 transition-all shadow-sm"
                  >
                    Save Current Simulation
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {savedSimulations.slice(0, 5).map((sim) => (
                      <div 
                        key={sim.id}
                        className="p-4 bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl hover:bg-pink-50/80 transition-all cursor-pointer group"
                        onClick={() => handleLoadFromList(sim)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              sim.type === 'spring' ? 'bg-pink-500' : 'bg-emerald-500'
                            }`} />
                            <span className="text-gray-800 text-sm font-semibold truncate">
                              {sim.title}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {new Date(sim.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 text-xs truncate">
                          {sim.description || 'No description'}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {savedSimulations.length > 5 && (
                    <button
                      onClick={() => setShowSavedList(true)}
                      className="w-full mt-6 text-center text-sm text-gray-600 hover:text-gray-800 font-medium py-3 border border-pink-200 rounded-xl hover:border-pink-300 hover:bg-pink-50 transition-all"
                    >
                      View all {savedSimulations.length} simulations
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Middle Column: Simulation & Graphs */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl p-6 border border-pink-200 bg-white/60 backdrop-blur-sm shadow-lg">
              <SimulationCanvas />
            </div>
            <GraphPanel />
          </div>
        </div>
      </div>

      {/* Modals */}
      <SaveSimulationModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSaveSimulation}
        initialTitle={loadedSimulation?.title}
        initialDescription={loadedSimulation?.description}
      />

      {showSavedList && (
        <SavedSimulationsList
          simulations={savedSimulations}
          onClose={() => setShowSavedList(false)}
          onLoad={handleLoadFromList}
          onDelete={handleDeleteSimulation}
          onExport={handleExportSimulation}
        />
      )}
    </div>
  );
};

// Main SimulationPage wrapper
const SimulationPage = () => {
  return <SimulationPageContent />;
};

export default SimulationPage;