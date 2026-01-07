// Calculation utilities
export const calculatePhase = (x, v, ω) => Math.atan2(-v, ω * x);

export const calculateMaxValues = (simulationType, parameters) => {
  if (simulationType === 'spring') {
    const ω = Math.sqrt(parameters.springConstant / parameters.mass);
    return {
      maxVelocity: parameters.amplitude * ω,
      maxAcceleration: parameters.amplitude * ω * ω,
      maxEnergy: 0.5 * parameters.springConstant * parameters.amplitude * parameters.amplitude
    };
  } else {
    const ω = Math.sqrt(parameters.gravity / parameters.length);
    return {
      maxVelocity: parameters.angle * ω,
      maxAcceleration: parameters.angle * ω * ω,
      maxEnergy: parameters.mass * parameters.gravity * parameters.length * (1 - Math.cos(parameters.angle))
    };
  }
};

export const formatValue = (value, decimals = 3) => {
  if (Math.abs(value) < 0.0001) return '0.000';
  return value.toFixed(decimals);
};

export const generatePhaseSpaceData = (simulationType, parameters, steps = 200) => {
  const data = [];
  const duration = simulationType === 'spring' 
    ? 2 * Math.PI * Math.sqrt(parameters.mass / parameters.springConstant) * 2
    : 2 * Math.PI * Math.sqrt(parameters.length / parameters.gravity) * 2;

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * duration;
    
    if (simulationType === 'spring') {
      const ω = Math.sqrt(parameters.springConstant / parameters.mass);
      const x = parameters.amplitude * Math.cos(ω * t);
      const v = -parameters.amplitude * ω * Math.sin(ω * t);
      data.push({ x, y: v });
    } else {
      const ω = Math.sqrt(parameters.gravity / parameters.length);
      const x = parameters.angle * Math.cos(ω * t);
      const v = -parameters.angle * ω * Math.sin(ω * t);
      data.push({ x, y: v });
    }
  }
  
  return data;
};