// contexts/SimulationContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { generateRealTimeDataPoint } from '../utils/dataGenerators';

const SimulationContext = createContext();

export const useSimulationContext = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulationContext must be used within SimulationProvider');
  }
  return context;
};

export const SimulationProvider = ({ children }) => {
  // Initialize from localStorage
  const [savedSimulations, setSavedSimulations] = useState(() => {
    try {
      const saved = localStorage.getItem('shm_saved_simulations');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading saved simulations:', error);
      return [];
    }
  });

  const [simulationType, setSimulationType] = useState('spring');
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [parameters, setParameters] = useState({
    mass: 2.0,
    springConstant: 50,
    amplitude: 1.5,
    length: 2.0,
    gravity: 9.81,
    angle: 0.5,
    damping: 0,
    simulationSpeed: 1.0,
  });
  const [realTimeData, setRealTimeData] = useState([]);
  const [activeGraph, setActiveGraph] = useState('displacement');

  // Save simulations to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('shm_saved_simulations', JSON.stringify(savedSimulations));
    } catch (error) {
      console.error('Error saving simulations to localStorage:', error);
    }
  }, [savedSimulations]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;

    let animationFrameId;
    let lastTime = 0;

    const animate = (currentTime) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = (currentTime - lastTime) * 0.001 * parameters.simulationSpeed;
      
      setTime(prev => {
        const newTime = prev + deltaTime;
        
        // Add data point every 0.1 seconds
        if (Math.floor(newTime * 10) > Math.floor(prev * 10)) {
          const dataPoint = generateRealTimeDataPoint(simulationType, parameters, newTime);
          setRealTimeData(prevData => {
            const newData = [...prevData, dataPoint];
            // Keep only last 200 points for performance
            return newData.slice(-200);
          });
        }
        
        return newTime;
      });
      
      lastTime = currentTime;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPlaying, simulationType, parameters]);

  const handleParameterChange = useCallback((name, value) => {
    setParameters(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  }, []);

  const handleReset = useCallback(() => {
    setTime(0);
    setRealTimeData([]);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const applyPreset = useCallback((preset) => {
    setParameters(prev => ({
      ...prev,
      ...preset
    }));
  }, []);

  // Save Simulation Function
  const saveSimulation = useCallback((title, description = '') => {
    const newSimulation = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      type: simulationType,
      parameters: { ...parameters },
      time,
      isPlaying,
      createdAt: new Date().toISOString(),
      realTimeData: realTimeData.slice(-50), // Save last 50 data points
    };

    setSavedSimulations(prev => {
      const updated = [newSimulation, ...prev];
      // Keep only the latest 100 simulations
      return updated.slice(0, 100);
    });

    return newSimulation.id; // Return the ID for immediate loading if needed
  }, [simulationType, parameters, time, isPlaying, realTimeData]);

  // Load Simulation Function
  const loadSimulation = useCallback((simulationId) => {
    const simulation = savedSimulations.find(sim => sim.id === simulationId);
    if (!simulation) {
      console.error('Simulation not found:', simulationId);
      return false;
    }

    // Stop any running animation
    setIsPlaying(false);

    // Set simulation type
    setSimulationType(simulation.type);

    // Set parameters
    setParameters(prev => ({
      ...prev,
      ...simulation.parameters
    }));

    // Set time
    setTime(simulation.time);

    // Load real-time data if available
    if (simulation.realTimeData) {
      setRealTimeData(simulation.realTimeData);
    } else {
      setRealTimeData([]);
    }

    // Start playing if it was playing when saved
    if (simulation.isPlaying) {
      // Small delay to ensure state is updated
      setTimeout(() => setIsPlaying(true), 100);
    }

    return true;
  }, [savedSimulations]);

  // Delete Simulation Function
  const deleteSimulation = useCallback((simulationId) => {
    setSavedSimulations(prev => prev.filter(sim => sim.id !== simulationId));
  }, []);

  // Update Simulation Function (for editing title/description)
  const updateSimulation = useCallback((simulationId, updates) => {
    setSavedSimulations(prev => 
      prev.map(sim => 
        sim.id === simulationId 
          ? { ...sim, ...updates, updatedAt: new Date().toISOString() }
          : sim
      )
    );
  }, []);

  // Export Simulation Function
  const exportSimulation = useCallback((simulationId) => {
    const simulation = savedSimulations.find(sim => sim.id === simulationId);
    if (!simulation) return null;

    const dataStr = JSON.stringify(simulation, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileName = `shm_simulation_${simulation.title.replace(/\s+/g, '_')}_${simulationId}.json`;

    return { dataUri, exportFileName };
  }, [savedSimulations]);

  // Import Simulation Function
  const importSimulation = useCallback((simulationData) => {
    try {
      const simulation = {
        ...simulationData,
        id: Date.now().toString(), // Generate new ID
        importedAt: new Date().toISOString(),
        // Ensure all required fields exist
        type: simulationData.type || 'spring',
        parameters: simulationData.parameters || {},
        title: simulationData.title || 'Imported Simulation',
        description: simulationData.description || '',
        createdAt: simulationData.createdAt || new Date().toISOString(),
      };

      setSavedSimulations(prev => [simulation, ...prev]);
      return simulation.id;
    } catch (error) {
      console.error('Error importing simulation:', error);
      return null;
    }
  }, []);

  // Get all saved simulations
  const getSavedSimulations = useCallback(() => {
    return [...savedSimulations];
  }, [savedSimulations]);

  // Clear all simulations
  const clearAllSimulations = useCallback(() => {
    setSavedSimulations([]);
  }, []);

  // Get recent simulations (last 10)
  const getRecentSimulations = useCallback(() => {
    return savedSimulations.slice(0, 10);
  }, [savedSimulations]);

  // Get simulation by ID
  const getSimulationById = useCallback((simulationId) => {
    return savedSimulations.find(sim => sim.id === simulationId);
  }, [savedSimulations]);

  // Duplicate a simulation
  const duplicateSimulation = useCallback((simulationId) => {
    const simulation = savedSimulations.find(sim => sim.id === simulationId);
    if (!simulation) return null;

    const duplicatedSimulation = {
      ...simulation,
      id: Date.now().toString(),
      title: `${simulation.title} (Copy)`,
      createdAt: new Date().toISOString(),
      isOriginal: false,
    };

    setSavedSimulations(prev => [duplicatedSimulation, ...prev]);
    return duplicatedSimulation.id;
  }, [savedSimulations]);

  const value = {
    // Existing state and functions
    simulationType,
    setSimulationType,
    isPlaying,
    setIsPlaying,
    togglePlayPause,
    time,
    setTime,
    parameters,
    setParameters,
    handleParameterChange,
    handleReset,
    applyPreset,
    realTimeData,
    setRealTimeData,
    activeGraph,
    setActiveGraph,
    
    // New save/load functions
    savedSimulations,
    saveSimulation,
    loadSimulation,
    deleteSimulation,
    updateSimulation,
    exportSimulation,
    importSimulation,
    getSavedSimulations,
    clearAllSimulations,
    getRecentSimulations,
    getSimulationById,
    duplicateSimulation,
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};