// contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => { 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userSimulations, setUserSimulations] = useState([]);

  // Load user and simulations on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedUser = localStorage.getItem('shm_user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          loadUserSimulations(parsedUser.id);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);

  // Load user's simulations
  const loadUserSimulations = (userId) => {
    try {
      const saved = localStorage.getItem('shm_simulations') || '{}';
      const allSimulations = JSON.parse(saved);
      const simulations = allSimulations[userId] || [];
      setUserSimulations(simulations);
    } catch (err) {
      console.error('Error loading simulations:', err);
      setUserSimulations([]);
    }
  };

  // Save user's simulations to localStorage
  const saveUserSimulations = useCallback((userId, simulations) => {
    try {
      const saved = localStorage.getItem('shm_simulations') || '{}';
      const allSimulations = JSON.parse(saved);
      allSimulations[userId] = simulations;
      localStorage.setItem('shm_simulations', JSON.stringify(allSimulations));
    } catch (err) {
      console.error('Error saving simulations:', err);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const userData = await authService.login(email, password);
      setUser(userData);
      localStorage.setItem('shm_user', JSON.stringify(userData));
      
      // Load user's simulations after login
      loadUserSimulations(userData.id);
      
      // Sync local simulations if any exist (migration for existing users)
      migrateLocalSimulations(userData.id);
      
      return { success: true, user: userData };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const signup = async (email, password, name) => {
    try {
      setError(null);
      const userData = await authService.signup(email, password, name);
      setUser(userData);
      localStorage.setItem('shm_user', JSON.stringify(userData));
      
      // Initialize empty simulations array for new user
      setUserSimulations([]);
      
      return { success: true, user: userData };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    // Save any pending changes before logout
    if (user) {
      saveUserSimulations(user.id, userSimulations);
    }
    
    setUser(null);
    setUserSimulations([]);
    localStorage.removeItem('shm_user');
  };

  // Migrate local (non-logged-in) simulations to user account
  const migrateLocalSimulations = (userId) => {
    try {
      const localSimulations = localStorage.getItem('shm_saved_simulations');
      if (localSimulations) {
        const parsed = JSON.parse(localSimulations);
        if (parsed.length > 0) {
          // Add user ID to local simulations
          const migrated = parsed.map(sim => ({
            ...sim,
            userId,
            migratedAt: new Date().toISOString(),
            isMigrated: true
          }));
          
          // Add to user's simulations
          const updated = [...migrated, ...userSimulations];
          setUserSimulations(updated);
          saveUserSimulations(userId, updated);
          
          // Clear local simulations
          localStorage.removeItem('shm_saved_simulations');
          
          return migrated.length;
        }
      }
      return 0;
    } catch (err) {
      console.error('Migration error:', err);
      return 0;
    }
  };

  // Save simulation (for authenticated users)
  const saveSimulation = useCallback((simulationData) => {
    if (!user) {
      // If not logged in, save to local storage
      return saveLocalSimulation(simulationData);
    }
    
    try {
      const newSimulation = {
        id: Date.now().toString(),
        ...simulationData,
        userId: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const updated = [newSimulation, ...userSimulations.slice(0, 99)]; // Keep last 100
      setUserSimulations(updated);
      saveUserSimulations(user.id, updated);
      
      return { 
        success: true, 
        simulation: newSimulation,
        isAuthenticated: true 
      };
    } catch (err) {
      console.error('Error saving simulation:', err);
      return { 
        success: false, 
        error: err.message,
        isAuthenticated: true 
      };
    }
  }, [user, userSimulations, saveUserSimulations]);

  // Save simulation locally (for non-authenticated users)
  const saveLocalSimulation = (simulationData) => {
    try {
      const saved = localStorage.getItem('shm_saved_simulations') || '[]';
      const localSimulations = JSON.parse(saved);
      
      const newSimulation = {
        id: Date.now().toString(),
        ...simulationData,
        isLocal: true,
        createdAt: new Date().toISOString()
      };
      
      const updated = [newSimulation, ...localSimulations.slice(0, 49)]; // Keep last 50
      localStorage.setItem('shm_saved_simulations', JSON.stringify(updated));
      
      return { 
        success: true, 
        simulation: newSimulation,
        isAuthenticated: false 
      };
    } catch (err) {
      console.error('Error saving local simulation:', err);
      return { 
        success: false, 
        error: err.message,
        isAuthenticated: false 
      };
    }
  };

  // Get saved simulations (handles both authenticated and local)
  const getSavedSimulations = useCallback(() => {
    if (user) {
      return [...userSimulations];
    } else {
      try {
        const saved = localStorage.getItem('shm_saved_simulations') || '[]';
        return JSON.parse(saved);
      } catch (err) {
        return [];
      }
    }
  }, [user, userSimulations]);

  // Get local simulations (for non-authenticated users)
  const getLocalSimulations = useCallback(() => {
    try {
      const saved = localStorage.getItem('shm_saved_simulations') || '[]';
      return JSON.parse(saved);
    } catch (err) {
      return [];
    }
  }, []);

  // Update simulation
  const updateSimulation = useCallback((simulationId, updates) => {
    if (!user) {
      return updateLocalSimulation(simulationId, updates);
    }
    
    try {
      const updated = userSimulations.map(sim => 
        sim.id === simulationId 
          ? { ...sim, ...updates, updatedAt: new Date().toISOString() }
          : sim
      );
      
      setUserSimulations(updated);
      saveUserSimulations(user.id, updated);
      
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [user, userSimulations, saveUserSimulations]);

  // Update local simulation
  const updateLocalSimulation = (simulationId, updates) => {
    try {
      const saved = localStorage.getItem('shm_saved_simulations') || '[]';
      const localSimulations = JSON.parse(saved);
      
      const updated = localSimulations.map(sim => 
        sim.id === simulationId 
          ? { ...sim, ...updates }
          : sim
      );
      
      localStorage.setItem('shm_saved_simulations', JSON.stringify(updated));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Delete simulation
  const deleteSimulation = useCallback((simulationId) => {
    if (!user) {
      return deleteLocalSimulation(simulationId);
    }
    
    try {
      const updated = userSimulations.filter(sim => sim.id !== simulationId);
      setUserSimulations(updated);
      saveUserSimulations(user.id, updated);
      
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [user, userSimulations, saveUserSimulations]);

  // Delete local simulation
  const deleteLocalSimulation = (simulationId) => {
    try {
      const saved = localStorage.getItem('shm_saved_simulations') || '[]';
      const localSimulations = JSON.parse(saved);
      
      const updated = localSimulations.filter(sim => sim.id !== simulationId);
      localStorage.setItem('shm_saved_simulations', JSON.stringify(updated));
      
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Export simulations
  const exportSimulations = useCallback(() => {
    const simulations = getSavedSimulations();
    const dataStr = JSON.stringify(simulations, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileName = `shm_simulations_${user ? user.id : 'local'}_${Date.now()}.json`;
    
    return { dataUri, exportFileName, count: simulations.length };
  }, [getSavedSimulations, user]);

  // Import simulations
  const importSimulations = useCallback((simulationsData) => {
    try {
      const parsed = Array.isArray(simulationsData) ? simulationsData : [simulationsData];
      
      if (user) {
        // For authenticated users
        const imported = parsed.map(sim => ({
          ...sim,
          id: Date.now().toString() + Math.random(), // New ID
          userId: user.id,
          importedAt: new Date().toISOString(),
          isImported: true
        }));
        
        const updated = [...imported, ...userSimulations];
        setUserSimulations(updated);
        saveUserSimulations(user.id, updated);
        
        return { 
          success: true, 
          count: imported.length,
          isAuthenticated: true 
        };
      } else {
        // For local users
        const imported = parsed.map(sim => ({
          ...sim,
          id: Date.now().toString() + Math.random(),
          isLocal: true,
          isImported: true,
          importedAt: new Date().toISOString()
        }));
        
        const localSims = getLocalSimulations();
        const updated = [...imported, ...localSims];
        localStorage.setItem('shm_saved_simulations', JSON.stringify(updated));
        
        return { 
          success: true, 
          count: imported.length,
          isAuthenticated: false 
        };
      }
    } catch (err) {
      return { 
        success: false, 
        error: err.message,
        isAuthenticated: !!user 
      };
    }
  }, [user, userSimulations, saveUserSimulations, getLocalSimulations]);

  // Get simulation statistics
  const getSimulationStats = useCallback(() => {
    const simulations = getSavedSimulations();
    const stats = {
      total: simulations.length,
      byType: {
        spring: simulations.filter(s => s.type === 'spring').length,
        pendulum: simulations.filter(s => s.type === 'pendulum').length,
      },
      byDate: {},
      recentCount: simulations.slice(0, 10).length
    };
    
    simulations.forEach(sim => {
      const date = new Date(sim.createdAt).toLocaleDateString();
      stats.byDate[date] = (stats.byDate[date] || 0) + 1;
    });
    
    return stats;
  }, [getSavedSimulations]);

  // Clear all simulations
  const clearAllSimulations = useCallback(() => {
    if (user) {
      setUserSimulations([]);
      saveUserSimulations(user.id, []);
      return { success: true, isAuthenticated: true };
    } else {
      localStorage.removeItem('shm_saved_simulations');
      return { success: true, isAuthenticated: false };
    }
  }, [user, saveUserSimulations]);

  const value = {
    // Auth state
    user,
    loading,
    error,
    isAuthenticated: !!user,
    
    // Auth actions
    login,
    signup,
    logout,
    
    // Simulation management
    saveSimulation,
    getSavedSimulations,
    updateSimulation,
    deleteSimulation,
    exportSimulations,
    importSimulations,
    getSimulationStats,
    clearAllSimulations,
    migrateLocalSimulations,
    
    // User simulations state
    userSimulations,
    
    // Helper methods
    hasSimulations: getSavedSimulations().length > 0,
    simulationCount: getSavedSimulations().length,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};