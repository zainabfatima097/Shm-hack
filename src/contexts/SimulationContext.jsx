import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { generateRealTimeDataPoint } from '../utils/dataGenerators';

const SimulationContext = createContext();

export const useSimulationContext = () => {
  const simulationContext = useContext(SimulationContext);
  if (!simulationContext) {
    throw new Error('useSimulationContext must be used within a SimulationProvider');
  }
  return simulationContext;
};

export const SimulationProvider = ({ children }) => {
  const { user, saveSimulation: authSaveSimulation, userSimulations: authUserSimulations } = useAuth();

  // Store all simulations (for backward compatibility)
  const [localSavedSimulations, setLocalSavedSimulations] = useState(() => {
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

  // Combine auth user simulations with local simulations - memoized
  const savedSimulations = useMemo(() => {
    if (user) {
      return [...authUserSimulations, ...localSavedSimulations.filter(sim => !sim.userId || sim.userId === 'anonymous')];
    }
    return localSavedSimulations;
  }, [user, authUserSimulations, localSavedSimulations]);

  // Save simulations to localStorage whenever they change (for backward compatibility)
  useEffect(() => {
    try {
      localStorage.setItem('shm_saved_simulations', JSON.stringify(localSavedSimulations));
    } catch (error) {
      console.error('Error saving simulations to localStorage:', error);
    }
  }, [localSavedSimulations]);

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

  // Save Simulation Function - Now integrates with AuthContext
  const saveSimulation = useCallback((title, description = '') => {
    const simulationData = {
      title: title.trim(),
      description: description.trim(),
      type: simulationType,
      parameters: { ...parameters },
      time,
      isPlaying,
      createdAt: new Date().toISOString(),
      realTimeData: realTimeData.slice(-50),
    };

    if (user && authSaveSimulation) {
      // Save to AuthContext (user-specific storage)
      const result = authSaveSimulation(simulationData);
      if (result && result.success) {
        return result.id || Date.now().toString();
      }
    }

    // Fallback: Save locally
    const newSimulation = {
      ...simulationData,
      id: Date.now().toString(),
      userId: user ? user.id : 'anonymous',
    };

    setLocalSavedSimulations(prev => {
      const updated = [newSimulation, ...prev];
      return updated.slice(0, 100);
    });

    return newSimulation.id;
  }, [simulationType, parameters, time, isPlaying, realTimeData, user, authSaveSimulation]);

  // Load Simulation Function - FIXED: use memoized savedSimulations
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
      setTimeout(() => setIsPlaying(true), 100);
    }

    return true;
  }, [savedSimulations]);

  // Delete Simulation Function - FIXED: removed unused authSimulations variable
  const deleteSimulation = useCallback((simulationId) => {
    // Delete from local storage
    setLocalSavedSimulations(prev => prev.filter(sim => sim.id !== simulationId));
  }, []);

  // Get user's simulations
  const getUserSimulations = useCallback(() => {
    if (!user) {
      return localSavedSimulations.filter(sim => !sim.userId || sim.userId === 'anonymous');
    }
    return [...authUserSimulations, ...localSavedSimulations.filter(sim => sim.userId === user.id)];
  }, [user, authUserSimulations, localSavedSimulations]);

  // Get all saved simulations (for backward compatibility) - FIXED: use memoized savedSimulations
  const getSavedSimulations = useCallback(() => {
    return savedSimulations;
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
    
    // Save/load functions
    savedSimulations,
    saveSimulation,
    loadSimulation,
    deleteSimulation,
    getUserSimulations,
    getSavedSimulations,
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};

export default SimulationContext;