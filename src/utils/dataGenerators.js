import { calculateAllValues } from './physics';

// Remove or fix the calculatePhase function
const calculatePhase = (x, v, ω) => {
  if (ω === 0) return 0;
  return Math.atan2(-v, ω * x);
};

export const generateGraphData = (simulationType, parameters, steps = 200) => {
  const data = [];
  const duration = simulationType === 'spring' 
    ? 2 * Math.PI * Math.sqrt(parameters.mass / parameters.springConstant) * 3
    : 2 * Math.PI * Math.sqrt(parameters.length / parameters.gravity) * 3;

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * duration;
    const values = calculateAllValues(simulationType, parameters, t);
    
    // Calculate phase using local function
    const phase = calculatePhase(
      simulationType === 'spring' ? values.x : values.θ,
      simulationType === 'spring' ? values.v : values.ωAngular,
      values.ω
    );
    
    data.push({
      time: t,
      displacement: simulationType === 'spring' ? values.x : values.θ,
      velocity: simulationType === 'spring' ? values.v : values.ωAngular,
      acceleration: simulationType === 'spring' ? values.a : values.α,
      potentialEnergy: values.energy.potential,
      kineticEnergy: values.energy.kinetic,
      totalEnergy: values.energy.total,
      phase: phase // Use the calculated phase
    });
  }
  
  return data;
};

export const generateRealTimeDataPoint = (simulationType, parameters, time) => {
  const values = calculateAllValues(simulationType, parameters, time);
  
  return {
    time,
    displacement: simulationType === 'spring' ? values.x : values.θ,
    velocity: simulationType === 'spring' ? values.v : values.ωAngular,
    acceleration: simulationType === 'spring' ? values.a : values.α,
    potentialEnergy: values.energy.potential,
    kineticEnergy: values.energy.kinetic,
    totalEnergy: values.energy.total
  };
};