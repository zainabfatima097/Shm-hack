// Physics calculations for SHM

export const springPhysics = {
  // Angular frequency: ω = √(k/m)
  calculateAngularFrequency: (k, m) => Math.sqrt(k / m),
  
  // Period: T = 2π√(m/k)
  calculatePeriod: (k, m) => 2 * Math.PI * Math.sqrt(m / k),
  
  // Frequency: f = 1/T
  calculateFrequency: (k, m) => 1 / (2 * Math.PI * Math.sqrt(m / k)),
  
  // Position: x(t) = A * cos(ωt)
  calculatePosition: (amplitude, ω, t, damping = 0) => {
    if (damping === 0) return amplitude * Math.cos(ω * t);
    return amplitude * Math.exp(-damping * t) * Math.cos(ω * t);
  },
  
  // Velocity: v(t) = -Aω * sin(ωt)
  calculateVelocity: (amplitude, ω, t, damping = 0) => {
    if (damping === 0) return -amplitude * ω * Math.sin(ω * t);
    const decay = Math.exp(-damping * t);
    return amplitude * decay * (-ω * Math.sin(ω * t) - damping * Math.cos(ω * t));
  },
  
  // Acceleration: a(t) = -Aω² * cos(ωt)
  calculateAcceleration: (amplitude, ω, t, damping = 0) => {
    if (damping === 0) return -amplitude * ω * ω * Math.cos(ω * t);
    const decay = Math.exp(-damping * t);
    const term1 = (damping * damping - ω * ω) * Math.cos(ω * t);
    const term2 = 2 * damping * ω * Math.sin(ω * t);
    return amplitude * decay * (term1 + term2);
  },
  
  // Energy calculations
  calculateEnergy: (k, m, x, v) => ({
    potential: 0.5 * k * x * x,
    kinetic: 0.5 * m * v * v,
    total: 0.5 * k * x * x + 0.5 * m * v * v
  })
};

export const pendulumPhysics = {
  // Angular frequency: ω = √(g/L)
  calculateAngularFrequency: (g, L) => Math.sqrt(g / L),
  
  // Period: T = 2π√(L/g)
  calculatePeriod: (g, L) => 2 * Math.PI * Math.sqrt(L / g),
  
  // Frequency: f = 1/T
  calculateFrequency: (g, L) => 1 / (2 * Math.PI * Math.sqrt(L / g)),
  
  // Angle: θ(t) = θ₀ * cos(ωt)
  calculateAngle: (initialAngle, ω, t, damping = 0) => {
    if (damping === 0) return initialAngle * Math.cos(ω * t);
    return initialAngle * Math.exp(-damping * t) * Math.cos(ω * t);
  },
  
  // Angular velocity: ω(t) = -θ₀ω * sin(ωt)
  calculateAngularVelocity: (initialAngle, ω, t, damping = 0) => {
    if (damping === 0) return -initialAngle * ω * Math.sin(ω * t);
    const decay = Math.exp(-damping * t);
    return initialAngle * decay * (-ω * Math.sin(ω * t) - damping * Math.cos(ω * t));
  },
  
  // Angular acceleration: α(t) = -θ₀ω² * cos(ωt)
  calculateAngularAcceleration: (initialAngle, ω, t, damping = 0) => {
    if (damping === 0) return -initialAngle * ω * ω * Math.cos(ω * t);
    const decay = Math.exp(-damping * t);
    const term1 = (damping * damping - ω * ω) * Math.cos(ω * t);
    const term2 = 2 * damping * ω * Math.sin(ω * t);
    return initialAngle * decay * (term1 + term2);
  },
  
  // Energy calculations
  calculateEnergy: (m, g, L, θ, ωAngular) => ({
    potential: m * g * L * (1 - Math.cos(θ)),
    kinetic: 0.5 * m * Math.pow(L * ωAngular, 2),
    total: m * g * L * (1 - Math.cos(θ)) + 0.5 * m * Math.pow(L * ωAngular, 2)
  })
};

// Calculate all values for current time
export const calculateAllValues = (simulationType, parameters, time) => {
  if (simulationType === 'spring') {
    const ω = springPhysics.calculateAngularFrequency(parameters.springConstant, parameters.mass);
    const x = springPhysics.calculatePosition(parameters.amplitude, ω, time, parameters.damping);
    const v = springPhysics.calculateVelocity(parameters.amplitude, ω, time, parameters.damping);
    const a = springPhysics.calculateAcceleration(parameters.amplitude, ω, time, parameters.damping);
    const energy = springPhysics.calculateEnergy(parameters.springConstant, parameters.mass, x, v);
    
    return {
      ω, x, v, a, energy,
      T: 2 * Math.PI / ω,
      f: ω / (2 * Math.PI)
    };
  } else {
    const ω = pendulumPhysics.calculateAngularFrequency(parameters.gravity, parameters.length);
    const θ = pendulumPhysics.calculateAngle(parameters.angle, ω, time, parameters.damping);
    const ωAngular = pendulumPhysics.calculateAngularVelocity(parameters.angle, ω, time, parameters.damping);
    const α = pendulumPhysics.calculateAngularAcceleration(parameters.angle, ω, time, parameters.damping);
    const energy = pendulumPhysics.calculateEnergy(parameters.mass, parameters.gravity, parameters.length, θ, ωAngular);
    
    return {
      ω, θ, ωAngular, α, energy,
      T: 2 * Math.PI / ω,
      f: ω / (2 * Math.PI)
    };
  }
};