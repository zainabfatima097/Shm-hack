// src/utils/simulationUtils.js

/**
 * Filter simulations by user ID
 * @param {Array} simulations - Array of all simulations
 * @param {Object} user - Current user object from AuthContext
 * @returns {Array} Filtered simulations belonging to the user
 */
export const filterSimulationsByUser = (simulations, user) => {
    if (!simulations || !Array.isArray(simulations)) return [];
    
    if (user && user.id) {
      // User is logged in - show their simulations
      return simulations.filter(sim => sim.userId === user.id);
    } else {
      // User is not logged in - show anonymous simulations
      return simulations.filter(sim => !sim.userId || sim.userId === 'anonymous');
    }
  };
  
  /**
   * Get simulation stats for dashboard
   * @param {Array} simulations - Array of user's simulations
   * @returns {Object} Statistics object
   */
  export const getSimulationStats = (simulations) => {
    const total = simulations.length;
    const springCount = simulations.filter(s => s.type === 'spring').length;
    const pendulumCount = simulations.filter(s => s.type === 'pendulum').length;
    
    const thisMonth = simulations.filter(s => {
      const simDate = new Date(s.createdAt || Date.now());
      const now = new Date();
      return simDate.getMonth() === now.getMonth() && 
             simDate.getFullYear() === now.getFullYear();
    }).length;
    
    const totalTime = Math.round(simulations.length * 1.5); // Estimated time
    
    return {
      total,
      springCount,
      pendulumCount,
      thisMonth,
      totalTime
    };
  };
  
  /**
   * Format date for display
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  export const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };