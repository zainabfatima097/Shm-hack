export const PHYSICS_CONSTANTS = {
  EARTH_GRAVITY: 9.81,
  MOON_GRAVITY: 1.62,
  MARS_GRAVITY: 3.71,
  JUPITER_GRAVITY: 24.79,
  STANDARD_GRAVITY: 9.80665
};

export const SIMULATION_PRESETS = {
  SPRING: {
    SOFT_SPRING: { 
      name: 'Soft Spring', 
      mass: 2.0, 
      springConstant: 20, 
      amplitude: 1.5,
      damping: 0
    },
    MEDIUM_SPRING: { 
      name: 'Medium Spring', 
      mass: 2.0, 
      springConstant: 50, 
      amplitude: 1.5,
      damping: 0
    },
    STIFF_SPRING: { 
      name: 'Stiff Spring', 
      mass: 2.0, 
      springConstant: 100, 
      amplitude: 1.0,
      damping: 0
    },
    HEAVY_MASS: { 
      name: 'Heavy Mass', 
      mass: 5.0, 
      springConstant: 50, 
      amplitude: 1.0,
      damping: 0
    },
    LIGHT_MASS: { 
      name: 'Light Mass', 
      mass: 0.5, 
      springConstant: 50, 
      amplitude: 2.0,
      damping: 0
    },
    DAMPED: { 
      name: 'Damped Oscillator', 
      mass: 2.0, 
      springConstant: 50, 
      amplitude: 1.5,
      damping: 0.1
    }
  },
  PENDULUM: {
    SHORT_PENDULUM: { 
      name: 'Short Pendulum', 
      mass: 2.0, 
      length: 1.0, 
      gravity: 9.81, 
      angle: 0.5,
      damping: 0
    },
    MEDIUM_PENDULUM: { 
      name: 'Medium Pendulum', 
      mass: 2.0, 
      length: 2.0, 
      gravity: 9.81, 
      angle: 0.5,
      damping: 0
    },
    LONG_PENDULUM: { 
      name: 'Long Pendulum', 
      mass: 2.0, 
      length: 4.0, 
      gravity: 9.81, 
      angle: 0.3,
      damping: 0
    },
    MOON_PENDULUM: { 
      name: 'Moon Gravity', 
      mass: 2.0, 
      length: 2.0, 
      gravity: 1.62, 
      angle: 0.5,
      damping: 0
    },
    MARS_PENDULUM: { 
      name: 'Mars Gravity', 
      mass: 2.0, 
      length: 2.0, 
      gravity: 3.71, 
      angle: 0.5,
      damping: 0
    },
    DAMPED_PENDULUM: { 
      name: 'Damped Pendulum', 
      mass: 2.0, 
      length: 2.0, 
      gravity: 9.81, 
      angle: 0.5,
      damping: 0.05
    }
  }
};

export const GRAPH_TYPES = {
  DISPLACEMENT: { key: 'displacement', label: 'Displacement', color: '#3b82f6', unit: 'm' },
  VELOCITY: { key: 'velocity', label: 'Velocity', color: '#10b981', unit: 'm/s' },
  ACCELERATION: { key: 'acceleration', label: 'Acceleration', color: '#ef4444', unit: 'm/s²' },
  ENERGY: { key: 'energy', label: 'Energy', color: '#8b5cf6', unit: 'J' },
  PHASE_SPACE: { key: 'phase', label: 'Phase Space', color: '#f59e0b', unit: '' }
};