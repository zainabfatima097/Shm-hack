// pages/CalculationsPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Hash, Sigma, Zap, Target, Cpu, Download, Copy, Brain, PieChart, AlertCircle } from 'lucide-react';

const CalculationsPage = () => {
  const [activeTab, setActiveTab] = useState('shm');
  const [mass, setMass] = useState('2.0');
  const [springConstant, setSpringConstant] = useState('50');
  const [amplitude, setAmplitude] = useState('1.5');

  const calculations = {
    shm: [
      {
        title: 'Angular Frequency (ω)',
        formula: 'ω = √(k/m)',
        description: 'Frequency of oscillation in radians per second',
        variables: [
          { name: 'k', value: 'Spring constant (N/m)' },
          { name: 'm', value: 'Mass (kg)' }
        ]
      },
      {
        title: 'Period (T)',
        formula: 'T = 2π√(m/k)',
        description: 'Time for one complete oscillation',
        variables: [
          { name: 'π', value: 'Pi constant (3.14159)' },
          { name: 'm', value: 'Mass (kg)' },
          { name: 'k', value: 'Spring constant (N/m)' }
        ]
      },
      {
        title: 'Frequency (f)',
        formula: 'f = 1/T = ω/2π',
        description: 'Number of oscillations per second',
        variables: [
          { name: 'T', value: 'Period (s)' },
          { name: 'ω', value: 'Angular frequency (rad/s)' }
        ]
      },
      {
        title: 'Position (x)',
        formula: 'x(t) = A cos(ωt + φ)',
        description: 'Position as function of time',
        variables: [
          { name: 'A', value: 'Amplitude (m)' },
          { name: 'ω', value: 'Angular frequency (rad/s)' },
          { name: 't', value: 'Time (s)' },
          { name: 'φ', value: 'Phase constant (rad)' }
        ]
      },
      {
        title: 'Velocity (v)',
        formula: 'v(t) = -Aω sin(ωt + φ)',
        description: 'Velocity as function of time',
        variables: [
          { name: 'A', value: 'Amplitude (m)' },
          { name: 'ω', value: 'Angular frequency (rad/s)' },
          { name: 't', value: 'Time (s)' },
          { name: 'φ', value: 'Phase constant (rad)' }
        ]
      },
      {
        title: 'Acceleration (a)',
        formula: 'a(t) = -Aω² cos(ωt + φ)',
        description: 'Acceleration as function of time',
        variables: [
          { name: 'A', value: 'Amplitude (m)' },
          { name: 'ω', value: 'Angular frequency (rad/s)' },
          { name: 't', value: 'Time (s)' },
          { name: 'φ', value: 'Phase constant (rad)' }
        ]
      }
    ],
    energy: [
      {
        title: 'Total Energy (E)',
        formula: 'E = ½ k A²',
        description: 'Total mechanical energy in the system',
        variables: [
          { name: 'k', value: 'Spring constant (N/m)' },
          { name: 'A', value: 'Amplitude (m)' }
        ]
      },
      {
        title: 'Kinetic Energy (K)',
        formula: 'K = ½ m v²',
        description: 'Energy due to motion',
        variables: [
          { name: 'm', value: 'Mass (kg)' },
          { name: 'v', value: 'Velocity (m/s)' }
        ]
      },
      {
        title: 'Potential Energy (U)',
        formula: 'U = ½ k x²',
        description: 'Energy stored in spring',
        variables: [
          { name: 'k', value: 'Spring constant (N/m)' },
          { name: 'x', value: 'Displacement from equilibrium (m)' }
        ]
      },
      {
        title: 'Energy Conservation',
        formula: 'E = K + U = constant',
        description: 'Conservation of mechanical energy',
        variables: []
      }
    ],
    pendulum: [
      {
        title: 'Period of Pendulum',
        formula: 'T = 2π√(L/g)',
        description: 'Period for small angle approximation',
        variables: [
          { name: 'L', value: 'Length of pendulum (m)' },
          { name: 'g', value: 'Gravity (9.81 m/s²)' }
        ]
      },
      {
        title: 'Angular Frequency',
        formula: 'ω = √(g/L)',
        description: 'Angular frequency of pendulum',
        variables: [
          { name: 'g', value: 'Gravity (9.81 m/s²)' },
          { name: 'L', value: 'Length of pendulum (m)' }
        ]
      }
    ]
  };

  const calculateResults = () => {
    const m = parseFloat(mass);
    const k = parseFloat(springConstant);
    const A = parseFloat(amplitude);
    
    if (!m || !k || !A) return {};
    
    const ω = Math.sqrt(k / m);
    const T = 2 * Math.PI * Math.sqrt(m / k);
    const f = 1 / T;
    const v_max = A * ω;
    
    return { ω: ω.toFixed(2), T: T.toFixed(2), f: f.toFixed(2), v_max: v_max.toFixed(2) };
  };

  const results = calculateResults();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-display">
                Physics <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Calculations</span>
              </h1>
              <p className="text-gray-600 text-lg">
                Comprehensive formulas and calculations for harmonic motion
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-pink-300 transition-all"
            >
              <Download size={20} />
              Export Formulas
            </motion.button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <div className="flex space-x-1 bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl p-1">
                {[
                  { id: 'shm', label: 'SHM Formulas', icon: <Sigma size={18} /> },
                  { id: 'energy', label: 'Energy', icon: <Zap size={18} /> },
                  { id: 'pendulum', label: 'Pendulum', icon: <Target size={18} /> }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-600 border border-pink-300'
                        : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Calculations Grid */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {calculations[activeTab].map((calc, index) => (
                <motion.div
                  key={calc.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 hover:border-pink-300 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 font-display">{calc.title}</h3>
                      <p className="text-gray-600 text-sm">{calc.description}</p>
                    </div>
                    <button className="p-2 hover:bg-pink-50 rounded-lg transition-colors">
                      <Copy size={18} className="text-pink-500" />
                    </button>
                  </div>

                  {/* Formula Display */}
                  <div className="mb-6 p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-pink-100">
                    <div className="flex items-center justify-between">
                      <code className="text-2xl font-mono text-gray-800">{calc.formula}</code>
                      <Calculator className="text-pink-500" />
                    </div>
                  </div>

                  {/* Variables */}
                  {calc.variables.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3 font-display">Variables</h4>
                      <div className="space-y-2">
                        {calc.variables.map((variable) => (
                          <div key={variable.name} className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-pink-100">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                                <Hash size={16} className="text-pink-500" />
                              </div>
                              <div>
                                <div className="text-gray-800 font-mono font-semibold">{variable.name}</div>
                                <div className="text-gray-600 text-sm">{variable.value}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Sidebar - Calculator */}
          <div className="space-y-8">
            {/* Interactive Calculator */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 font-display">
                <Calculator className="w-5 h-5 text-pink-500" />
                Interactive Calculator
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mass (kg)
                  </label>
                  <input
                    type="number"
                    value={mass}
                    onChange={(e) => setMass(e.target.value)}
                    className="w-full px-4 py-3 bg-white/60 border border-pink-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spring Constant (N/m)
                  </label>
                  <input
                    type="number"
                    value={springConstant}
                    onChange={(e) => setSpringConstant(e.target.value)}
                    className="w-full px-4 py-3 bg-white/60 border border-pink-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                    step="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amplitude (m)
                  </label>
                  <input
                    type="number"
                    value={amplitude}
                    onChange={(e) => setAmplitude(e.target.value)}
                    className="w-full px-4 py-3 bg-white/60 border border-pink-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                    step="0.1"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-300 transition-all"
                >
                  Calculate
                </motion.button>
              </div>

              {/* Results */}
              <div className="mt-6 pt-6 border-t border-pink-100">
                <h3 className="text-gray-800 font-semibold mb-4 font-display">Results</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Period (T)', value: results.T || '1.26', unit: 's', color: 'text-pink-600' },
                    { label: 'Frequency (f)', value: results.f || '0.79', unit: 'Hz', color: 'text-purple-600' },
                    { label: 'Angular Freq (ω)', value: results.ω || '5', unit: 'rad/s', color: 'text-emerald-600' },
                    { label: 'Max Velocity', value: results.v_max || '7.5', unit: 'm/s', color: 'text-amber-600' }
                  ].map((result) => (
                    <div key={result.label} className="flex justify-between items-center p-3 bg-white/60 rounded-lg border border-pink-100">
                      <span className="text-gray-700">{result.label}</span>
                      <span className={`font-mono font-bold ${result.color}`}>
                        {result.value} <span className="text-gray-500">{result.unit}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Reference */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-pink-50 to-purple-50 backdrop-blur-sm border border-pink-200 rounded-2xl p-6"
            >
              <h3 className="text-gray-800 font-semibold mb-4 flex items-center gap-2 font-display">
                <Brain className="w-5 h-5 text-pink-500" />
                Quick Reference
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-pink-500/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-pink-500" />
                    </div>
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Angular Frequency:</span> Determines oscillation speed
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                    </div>
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Phase Constant:</span> Determines initial position
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Energy Conservation:</span> Total energy remains constant
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                    </div>
                    <p className="text-gray-700 text-sm">
                    <span className="font-semibold">Small Angle Approximation:</span> Valid for angles &lt; 15°                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Formula Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6"
            >
              <h3 className="text-gray-800 font-semibold mb-4 flex items-center gap-2 font-display">
                <AlertCircle className="w-5 h-5 text-blue-500" />
                Formula Tips
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-500 font-bold">•</span>
                  Use consistent units (kg, m, N/m)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-500 font-bold">•</span>
                  Check small angle condition for pendulum
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-500 font-bold">•</span>
                  Spring constant must be positive
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-500 font-bold">•</span>
                  Mass should be greater than zero
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationsPage;