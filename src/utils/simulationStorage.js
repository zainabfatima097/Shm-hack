// utils/simulationStorage.js
export const validateSimulation = (simulation) => {
  const requiredFields = ['id', 'title', 'type', 'parameters', 'createdAt'];
  
  // Check required fields
  for (const field of requiredFields) {
    if (!simulation[field]) {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }
  
  // Validate parameters
  const requiredParams = simulation.type === 'spring' 
    ? ['mass', 'springConstant', 'amplitude'] 
    : ['mass', 'length', 'gravity', 'angle'];
  
  for (const param of requiredParams) {
    if (typeof simulation.parameters[param] !== 'number' || isNaN(simulation.parameters[param])) {
      return { valid: false, error: `Invalid parameter: ${param}` };
    }
  }
  
  return { valid: true };
};

export const getDefaultSimulation = (type = 'spring') => ({
  id: Date.now().toString(),
  title: `New ${type === 'spring' ? 'Spring-Mass' : 'Pendulum'} Simulation`,
  description: '',
  type,
  parameters: type === 'spring' 
    ? { mass: 2.0, springConstant: 50, amplitude: 1.5, damping: 0, simulationSpeed: 1.0 }
    : { mass: 2.0, length: 2.0, gravity: 9.81, angle: 0.5, damping: 0, simulationSpeed: 1.0 },
  time: 0,
  isPlaying: false,
  createdAt: new Date().toISOString(),
  realTimeData: [],
});

export const backupSimulations = () => {
  try {
    const simulations = localStorage.getItem('shm_saved_simulations');
    const backup = {
      data: simulations,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    };
    
    localStorage.setItem('shm_simulations_backup', JSON.stringify(backup));
    return true;
  } catch (error) {
    console.error('Backup failed:', error);
    return false;
  }
};

export const restoreBackup = () => {
  try {
    const backup = localStorage.getItem('shm_simulations_backup');
    if (!backup) return null;
    
    const parsed = JSON.parse(backup);
    localStorage.setItem('shm_saved_simulations', parsed.data);
    return parsed;
  } catch (error) {
    console.error('Restore failed:', error);
    return null;
  }
};

export const getSimulationStats = (simulations) => {
  const stats = {
    total: simulations.length,
    byType: {
      spring: simulations.filter(s => s.type === 'spring').length,
      pendulum: simulations.filter(s => s.type === 'pendulum').length,
    },
    byDate: {},
    totalSize: new Blob([JSON.stringify(simulations)]).size,
  };
  
  // Group by date
  simulations.forEach(sim => {
    const date = new Date(sim.createdAt).toDateString();
    stats.byDate[date] = (stats.byDate[date] || 0) + 1;
  });
  
  return stats;
};