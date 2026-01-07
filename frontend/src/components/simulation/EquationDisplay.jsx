// components/simulation/EquationDisplay.jsx
import React from 'react';
import { useSimulationContext } from '../../contexts/SimulationContext';
import { Sigma, Calculator, Hash, PieChart, Zap, Target, Clock, Cpu } from 'lucide-react';

const EquationDisplay = () => {
  const { simulationType, parameters } = useSimulationContext();

  const equations = simulationType === 'spring' 
    ? [
        {
          title: 'Angular Frequency',
          formula: 'ω = √(k/m)',
          calculation: `√(${parameters.springConstant}/${parameters.mass}) = ${Math.sqrt(parameters.springConstant / parameters.mass).toFixed(2)} rad/s`,
          description: 'Frequency of oscillation',
          icon: <Clock className="w-4 h-4" />
        },
        {
          title: 'Period',
          formula: 'T = 2π√(m/k)',
          calculation: `2π√(${parameters.mass}/${parameters.springConstant}) = ${(2 * Math.PI * Math.sqrt(parameters.mass / parameters.springConstant)).toFixed(2)} s`,
          description: 'Time for one complete oscillation',
          icon: <Cpu className="w-4 h-4" />
        },
        {
          title: 'Spring Force',
          formula: 'F = -kx',
          calculation: `-${parameters.springConstant} × x`,
          description: "Hooke's Law",
          icon: <Zap className="w-4 h-4" />
        }
      ]
    : [
        {
          title: 'Angular Frequency',
          formula: 'ω = √(g/L)',
          calculation: `√(${parameters.gravity}/${parameters.length}) = ${Math.sqrt(parameters.gravity / parameters.length).toFixed(2)} rad/s`,
          description: 'Frequency of oscillation',
          icon: <Clock className="w-4 h-4" />
        },
        {
          title: 'Period',
          formula: 'T = 2π√(L/g)',
          calculation: `2π√(${parameters.length}/${parameters.gravity}) = ${(2 * Math.PI * Math.sqrt(parameters.length / parameters.gravity)).toFixed(2)} s`,
          description: 'Time for one complete swing',
          icon: <Cpu className="w-4 h-4" />
        },
        {
          title: 'Restoring Torque',
          formula: 'τ = -mgLsinθ',
          calculation: `-${parameters.mass}×9.81×${parameters.length}×sinθ`,
          description: 'Causes oscillation',
          icon: <Target className="w-4 h-4" />
        }
      ];

  const energyCalculations = [
    {
      title: 'Total Energy',
      formula: 'E = ½kA²',
      value: simulationType === 'spring' 
        ? (0.5 * parameters.springConstant * Math.pow(parameters.amplitude, 2)).toFixed(2)
        : (parameters.mass * parameters.gravity * parameters.length * (1 - Math.cos(parameters.angle))).toFixed(2),
      unit: 'J',
      color: 'from-pink-500 to-purple-500'
    },
    {
      title: 'Max Velocity',
      formula: 'v_max = ωA',
      value: (Math.sqrt(parameters.springConstant / parameters.mass) * parameters.amplitude).toFixed(2),
      unit: 'm/s',
      color: 'from-emerald-500 to-cyan-500'
    },
    {
      title: 'Max Acceleration',
      formula: 'a_max = ω²A',
      value: (parameters.springConstant / parameters.mass * parameters.amplitude).toFixed(2),
      unit: 'm/s²',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 font-display">
          <Sigma className="w-5 h-5 text-pink-500" />
          Physics Equations
        </h2>
        <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${simulationType === 'spring' ? 'bg-pink-100 text-pink-700' : 'bg-emerald-100 text-emerald-700'}`}>
          {simulationType === 'spring' ? 'Spring-Mass' : 'Pendulum'}
        </div>
      </div>

      {/* Equations */}
      <div className="space-y-4 mb-6">
        {equations.map((eq, index) => (
          <div key={index} className="p-4 bg-gradient-to-br from-white/60 to-pink-50/60 backdrop-blur-sm rounded-xl border border-pink-200">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-gray-800 font-semibold">{eq.title}</h3>
              <div className="p-2 rounded-lg bg-pink-100 text-pink-600">
                {eq.icon}
              </div>
            </div>
            <div className="mb-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100">
              <code className="text-xl font-mono text-gray-800 font-bold">{eq.formula}</code>
            </div>
            <div className="text-sm text-gray-600 mb-2">{eq.description}</div>
            <div className="text-sm text-pink-600 font-mono bg-pink-50 px-3 py-1.5 rounded-lg border border-pink-100">
              {eq.calculation}
            </div>
          </div>
        ))}
      </div>

      {/* Energy Calculations */}
      <div>
        <h3 className="text-gray-800 font-semibold mb-4 flex items-center gap-2 font-display">
          <PieChart className="w-4 h-4 text-pink-500" />
          Energy Calculations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {energyCalculations.map((calc, index) => (
            <div key={index} className={`p-4 bg-gradient-to-br ${calc.color}/10 rounded-xl border border-${calc.color.split(' ')[1].split('-')[1]}-200`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700 text-sm font-medium">{calc.title}</span>
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${calc.color}/20`}>
                  <Hash className={`w-3 h-3 text-${calc.color.split(' ')[1].split('-')[1]}-600`} />
                </div>
              </div>
              <div className="text-xs text-gray-600 mb-2 font-mono">{calc.formula}</div>
              <div className="text-lg font-mono font-bold text-gray-800">
                {calc.value} <span className="text-sm text-gray-600 font-normal">{calc.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Variables Legend */}
      <div className="mt-8 pt-6 border-t border-pink-200">
        <h4 className="text-gray-800 text-sm font-semibold mb-4">Variables Legend</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-3 p-2 bg-pink-50/60 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-pink-500" />
            <span className="text-gray-600">m:</span>
            <span className="text-gray-800 font-medium">Mass (kg)</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-purple-50/60 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-gray-600">k:</span>
            <span className="text-gray-800 font-medium">Spring Constant (N/m)</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-emerald-50/60 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-gray-600">A:</span>
            <span className="text-gray-800 font-medium">Amplitude (m)</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-amber-50/60 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-gray-600">ω:</span>
            <span className="text-gray-800 font-medium">Angular Frequency (rad/s)</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-red-50/60 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-gray-600">L:</span>
            <span className="text-gray-800 font-medium">Length (m)</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-cyan-50/60 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-cyan-500" />
            <span className="text-gray-600">g:</span>
            <span className="text-gray-800 font-medium">Gravity (9.81 m/s²)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquationDisplay;