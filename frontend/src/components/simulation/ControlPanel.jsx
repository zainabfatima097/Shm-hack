// components/simulation/ControlPanel.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useSimulationContext } from '../../contexts/SimulationContext';
import { Play, Pause, RotateCcw, Cpu, Target, Zap, Settings, Clock, Wind } from 'lucide-react';

const ControlPanel = () => {
  const {
    simulationType,
    setSimulationType,
    isPlaying,
    togglePlayPause,
    handleReset,
    parameters,
    handleParameterChange,
    applyPreset
  } = useSimulationContext();

  const presets = {
    lightSpring: { mass: 1.0, springConstant: 30, amplitude: 1.0 },
    heavySpring: { mass: 5.0, springConstant: 80, amplitude: 0.5 },
    slowPendulum: { length: 3.0, mass: 2.0, angle: 0.3 },
    fastPendulum: { length: 1.0, mass: 1.0, angle: 0.7 }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 font-display">
          <Settings className="w-5 h-5 text-pink-500" />
          Simulation Controls
        </h2>
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${simulationType === 'spring' ? 'bg-pink-100 text-pink-700' : 'bg-emerald-100 text-emerald-700'}`}>
            {simulationType === 'spring' ? 'Spring' : 'Pendulum'}
          </div>
        </div>
      </div>

      {/* Simulation Type Toggle */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-white/60 backdrop-blur-sm rounded-xl p-1 border border-pink-100">
          <button
            onClick={() => setSimulationType('spring')}
            className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all font-medium ${
              simulationType === 'spring'
                ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-gray-800 border border-pink-300 shadow-sm'
                : 'text-gray-600 hover:text-gray-800 hover:bg-pink-50'
            }`}
          >
            <Cpu size={18} className={simulationType === 'spring' ? 'text-pink-500' : 'text-gray-500'} />
            Spring-Mass
          </button>
          <button
            onClick={() => setSimulationType('pendulum')}
            className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all font-medium ${
              simulationType === 'pendulum'
                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-gray-800 border border-emerald-300 shadow-sm'
                : 'text-gray-600 hover:text-gray-800 hover:bg-emerald-50'
            }`}
          >
            <Target size={18} className={simulationType === 'pendulum' ? 'text-emerald-500' : 'text-gray-500'} />
            Pendulum
          </button>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlayPause}
          className="py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:shadow-pink-300/50 transition-all"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          {isPlaying ? 'Pause' : 'Play'}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="py-3 bg-white/60 backdrop-blur-sm border border-pink-200 text-gray-800 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-pink-50 hover:border-pink-300 transition-all shadow-sm"
        >
          <RotateCcw size={20} />
          Reset
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="py-3 bg-white/60 backdrop-blur-sm border border-pink-200 text-gray-800 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-pink-50 hover:border-pink-300 transition-all shadow-sm"
        >
          <Zap size={20} />
          Energy
        </motion.button>
      </div>

      {/* Parameters */}
      <div className="space-y-5">
        <h3 className="text-gray-800 font-semibold flex items-center gap-2 font-display">
          <Zap className="w-4 h-4 text-pink-500" />
          Adjust Parameters
        </h3>
        
        {simulationType === 'spring' ? (
          <>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-700 text-sm font-medium">Mass: {parameters.mass} kg</label>
                <span className="text-pink-600 text-sm font-medium">Mass</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.1"
                value={parameters.mass}
                onChange={(e) => handleParameterChange('mass', e.target.value)}
                className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-700 text-sm font-medium">Spring Constant: {parameters.springConstant} N/m</label>
                <span className="text-purple-600 text-sm font-medium">Stiffness</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="1"
                value={parameters.springConstant}
                onChange={(e) => handleParameterChange('springConstant', e.target.value)}
                className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-700 text-sm font-medium">Amplitude: {parameters.amplitude} m</label>
                <span className="text-emerald-600 text-sm font-medium">Swing</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={parameters.amplitude}
                onChange={(e) => handleParameterChange('amplitude', e.target.value)}
                className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-700 text-sm font-medium">Length: {parameters.length} m</label>
                <span className="text-emerald-600 text-sm font-medium">Rod Length</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.1"
                value={parameters.length}
                onChange={(e) => handleParameterChange('length', e.target.value)}
                className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-700 text-sm font-medium">Angle: {parameters.angle} rad</label>
                <span className="text-amber-600 text-sm font-medium">Initial Angle</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.5"
                step="0.1"
                value={parameters.angle}
                onChange={(e) => handleParameterChange('angle', e.target.value)}
                className="w-full h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-700 text-sm font-medium">Mass: {parameters.mass} kg</label>
                <span className="text-pink-600 text-sm font-medium">Bob Mass</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.1"
                value={parameters.mass}
                onChange={(e) => handleParameterChange('mass', e.target.value)}
                className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </>
        )}
        
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-gray-700 text-sm font-medium">Damping: {parameters.damping}</label>
            <span className="text-red-600 text-sm font-medium">Resistance</span>
          </div>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={parameters.damping}
            onChange={(e) => handleParameterChange('damping', e.target.value)}
            className="w-full h-2 bg-red-100 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-gray-700 text-sm font-medium">Speed: {parameters.simulationSpeed.toFixed(1)}x</label>
            <span className="text-cyan-600 text-sm font-medium">
              <Clock className="w-3 h-3 inline mr-1" />
              Time Scale
            </span>
          </div>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={parameters.simulationSpeed}
            onChange={(e) => handleParameterChange('simulationSpeed', e.target.value)}
            className="w-full h-2 bg-cyan-100 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      {/* Presets */}
      <div className="mt-8 pt-6 border-t border-pink-200">
        <h3 className="text-gray-800 font-semibold mb-4 font-display">Quick Presets</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => applyPreset(presets.lightSpring)}
            className="p-3 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-xl text-pink-700 text-sm font-medium transition-all hover:border-pink-300 hover:shadow-sm"
          >
            Light Spring
          </button>
          <button
            onClick={() => applyPreset(presets.heavySpring)}
            className="p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-purple-700 text-sm font-medium transition-all hover:border-purple-300 hover:shadow-sm"
          >
            Heavy Spring
          </button>
          <button
            onClick={() => applyPreset(presets.slowPendulum)}
            className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-medium transition-all hover:border-emerald-300 hover:shadow-sm"
          >
            Slow Pendulum
          </button>
          <button
            onClick={() => applyPreset(presets.fastPendulum)}
            className="p-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-amber-700 text-sm font-medium transition-all hover:border-amber-300 hover:shadow-sm"
          >
            Fast Pendulum
          </button>
        </div>
      </div>

      {/* Custom slider styling */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #8b5cf6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #8b5cf6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ControlPanel;