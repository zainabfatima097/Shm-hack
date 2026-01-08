// pages/SimulationPage.jsx
import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SimulationProvider } from '../contexts/SimulationContext';
import { useAuth } from '../contexts/AuthContext';
import SimulationCanvas from '../components/simulation/SimulationCanvas';
import ControlPanel from '../components/simulation/ControlPanel';
import GraphPanel from '../components/simulation/GraphPanel';
import EquationDisplay from '../components/simulation/EquationDisplay';
import SaveSimulationButton from '../components/simulation/SaveSimulationButton';
import SaveSimulationModal from '../components/simulation/SaveSimulationModal';
import SavedSimulationsList from '../components/simulation/SavedSimulationsList';
import { Save, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const SimulationPageContent = () => {
  const { user, saveSimulation } = useAuth();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showSavedList, setShowSavedList] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [savedSimulations, setSavedSimulations] = useState([]);

  // Load saved simulations with fallback
  useEffect(() => {
    const loadSimulations = () => {
      try {
        // First try to use getSavedSimulations from AuthContext
        if (typeof getSavedSimulations === 'function') {
          const simulations = getSavedSimulations();
          setSavedSimulations(simulations || []);
        } else {
          // Fallback to localStorage directly
          const saved = localStorage.getItem('simulations');
          if (saved) {
            setSavedSimulations(JSON.parse(saved));
          } else {
            // Default empty array
            setSavedSimulations([]);
          }
        }
      } catch (error) {
        console.error('Error loading simulations:', error);
        setSavedSimulations([]);
      }
    };

    loadSimulations();
  }, []);

  // Helper function to get simulations from localStorage
  const getSavedSimulations = () => {
    try {
      const saved = localStorage.getItem('simulations');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error getting simulations:', error);
      return [];
    }
  };

  // Helper function to save to localStorage
  const saveToLocalStorage = (simulation) => {
    try {
      const simulations = getSavedSimulations();
      const newSimulation = {
        ...simulation,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        userId: user?.id || 'anonymous'
      };
      
      const updatedSimulations = [newSimulation, ...simulations];
      localStorage.setItem('simulations', JSON.stringify(updatedSimulations));
      setSavedSimulations(updatedSimulations);
      
      return { success: true, simulation: newSimulation };
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return { success: false, error: error.message };
    }
  };

  // Handle save simulation
  const handleSaveSimulation = useCallback(async (title, description) => {
    try {
      const simulationData = {
        title: title || `Simulation ${new Date().toLocaleDateString()}`,
        description: description || '',
        type: 'spring',
        parameters: {},
        timestamp: Date.now(),
      };

      let result;
      
      // Try to use AuthContext save if available, otherwise use localStorage
      if (typeof saveSimulation === 'function') {
        result = await saveSimulation(simulationData);
      } else {
        result = saveToLocalStorage(simulationData);
      }

      if (result.success) {
        setSaveStatus({
          type: 'success',
          message: user 
            ? 'Simulation saved to your account!' 
            : 'Simulation saved locally!',
        });

        // Refresh simulations list
        const updated = getSavedSimulations();
        setSavedSimulations(updated);

        // Auto-hide success message after 3 seconds
        setTimeout(() => setSaveStatus(null), 3000);
        return true;
      } else {
        setSaveStatus({
          type: 'error',
          message: result.error || 'Failed to save simulation',
        });
        return false;
      }
    } catch (error) {
      setSaveStatus({
        type: 'error',
        message: 'An error occurred while saving',
      });
      return false;
    }
  }, [saveSimulation, user]);

  // Quick save function
  const handleQuickSave = useCallback(() => {
    const title = `Quick Save ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    handleSaveSimulation(title, 'Quick save from simulation');
  }, [handleSaveSimulation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Save Button */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 font-display">
                Harmonic Motion <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Simulation</span>
              </h1>
              <p className="text-gray-600 text-lg">
                Interactive real-time simulation of Simple Harmonic Motion
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <SaveSimulationButton 
                onQuickSave={handleQuickSave}
                onOpenSaveModal={() => setShowSaveModal(true)}
                onOpenSavedList={() => setShowSavedList(!showSavedList)}
                savedCount={savedSimulations.length}
                isAuthenticated={!!user}
              />
            </div>
          </div>

          {/* Save Status Messages */}
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
                    {user 
                      ? `Your simulations are saved to your account. You have ${savedSimulations.length} saved simulations.`
                      : 'Save simulations locally. Sign up to access them from any device.'
                    }
                  </p>
                </div>
              </div>
              
              {!user && (
                <button className="text-sm text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1">
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
                        onClick={() => {
                          console.log('Load simulation:', sim.id);
                        }}
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
      />

      {showSavedList && (
        <SavedSimulationsList
          simulations={savedSimulations}
          onClose={() => setShowSavedList(false)}
          onLoad={(id) => {
            console.log('Load simulation:', id);
            setShowSavedList(false);
          }}
          onDelete={(id) => {
            const updated = savedSimulations.filter(sim => sim.id !== id);
            setSavedSimulations(updated);
            localStorage.setItem('simulations', JSON.stringify(updated));
          }}
        />
      )}
    </div>
  );
};

// Main SimulationPage wrapper
const SimulationPage = () => {
  return (
    <SimulationProvider>
      <SimulationPageContent />
    </SimulationProvider>
  );
};

export default SimulationPage;