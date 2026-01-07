import React from 'react';
import { Calculator } from 'lucide-react';
import { useSimulationContext } from '../../../contexts/SimulationContext';
import EquationCard from './EquationCard';
import LiveValues from './LiveValues';
import PhysicsFormulas from './PhysicsFormulas';

const EquationDisplay = () => {
  const { simulationType, parameters } = useSimulationContext();

  // Calculate physics values
  const calculateValues = () => {
    if (simulationType === 'spring') {
      const ω = Math.sqrt(parameters.springConstant / parameters.mass);
      const T = 2 * Math.PI / ω;
      const f = 1 / T;
      const maxV = parameters.amplitude * ω;
      const maxA = parameters.amplitude * ω * ω;
      
      return {
        ω: ω.toFixed(3),
        T: T.toFixed(3),
        f: f.toFixed(3),
        maxV: maxV.toFixed(3),
        maxA: maxA.toFixed(3),
        springConstant: parameters.springConstant.toFixed(1),
        mass: parameters.mass.toFixed(1)
      };
    } else {
      const ω = Math.sqrt(parameters.gravity / parameters.length);
      const T = 2 * Math.PI / ω;
      const f = 1 / T;
      const maxV = parameters.angle * ω;
      const maxA = parameters.angle * ω * ω;
      
      return {
        ω: ω.toFixed(3),
        T: T.toFixed(3),
        f: f.toFixed(3),
        maxV: maxV.toFixed(3),
        maxA: maxA.toFixed(3),
        gravity: parameters.gravity.toFixed(2),
        length: parameters.length.toFixed(1)
      };
    }
  };

  const values = calculateValues();

  const springEquations = [
    {
      title: "Angular Frequency",
      equation: "ω = √(k/m)",
      calculation: `√(${values.springConstant}/${values.mass})`,
      result: `${values.ω} rad/s`,
      color: "blue",
      tooltip: "Rate of oscillation in radians per second"
    },
    {
      title: "Period",
      equation: "T = 2π√(m/k)",
      calculation: `2π√(${values.mass}/${values.springConstant})`,
      result: `${values.T} s`,
      color: "green",
      tooltip: "Time for one complete oscillation"
    },
    {
      title: "Frequency",
      equation: "f = 1/T = ω/2π",
      calculation: `1/${values.T}`,
      result: `${values.f} Hz`,
      color: "purple",
      tooltip: "Number of oscillations per second"
    },
    {
      title: "Max Velocity",
      equation: "v_max = A·ω",
      calculation: `${parameters.amplitude.toFixed(1)} × ${values.ω}`,
      result: `${values.maxV} m/s`,
      color: "orange",
      tooltip: "Maximum speed during oscillation"
    }
  ];

  const pendulumEquations = [
    {
      title: "Angular Frequency",
      equation: "ω = √(g/L)",
      calculation: `√(${values.gravity}/${values.length})`,
      result: `${values.ω} rad/s`,
      color: "blue",
      tooltip: "Rate of oscillation in radians per second"
    },
    {
      title: "Period",
      equation: "T = 2π√(L/g)",
      calculation: `2π√(${values.length}/${values.gravity})`,
      result: `${values.T} s`,
      color: "green",
      tooltip: "Time for one complete swing"
    },
    {
      title: "Frequency",
      equation: "f = 1/T = ω/2π",
      calculation: `1/${values.T}`,
      result: `${values.f} Hz`,
      color: "purple",
      tooltip: "Number of swings per second"
    },
    {
      title: "Max Angular Speed",
      equation: "ω_max = θ₀·ω",
      calculation: `${parameters.angle.toFixed(2)} × ${values.ω}`,
      result: `${values.maxV} rad/s`,
      color: "orange",
      tooltip: "Maximum angular speed during swing"
    }
  ];

  const equations = simulationType === 'spring' ? springEquations : pendulumEquations;

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Calculator className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Physics Equations</h3>
            <p className="text-gray-600">Live calculations and formulas</p>
          </div>
        </div>

        <div className="space-y-4">
          {equations.map((eq, index) => (
            <EquationCard
              key={index}
              title={eq.title}
              equation={eq.equation}
              calculation={eq.calculation}
              result={eq.result}
              color={eq.color}
              tooltip={eq.tooltip}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      <LiveValues />
      <PhysicsFormulas />
    </div>
  );
};

export default EquationDisplay;