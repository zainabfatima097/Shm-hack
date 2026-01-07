// pages/GraphsPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, 
  ScatterChart, Scatter  
} from 'recharts';
import { 
  BarChart3, TrendingUp, Download, Filter, RefreshCw, Maximize2, Minimize2, Settings, 
  Activity, Zap, Target, Cpu, Hash 
} from 'lucide-react';

const GraphsPage = () => {
  const [activeGraph, setActiveGraph] = useState('displacement');
  const [timeRange, setTimeRange] = useState('10s');
  const [fullscreen, setFullscreen] = useState(false);

  // Mock data for graphs
  const generateData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      const t = i * 0.1;
      const displacement = 1.5 * Math.cos(2 * Math.PI * 0.5 * t);
      const velocity = -1.5 * 2 * Math.PI * 0.5 * Math.sin(2 * Math.PI * 0.5 * t);
      const acceleration = -1.5 * Math.pow(2 * Math.PI * 0.5, 2) * Math.cos(2 * Math.PI * 0.5 * t);
      const kinetic = 0.5 * 2 * Math.pow(velocity, 2);
      const potential = 0.5 * 50 * Math.pow(displacement, 2);
      
      data.push({
        time: t,
        displacement,
        velocity,
        acceleration,
        kinetic,
        potential,
        total: kinetic + potential
      });
    }
    return data;
  };

  const graphData = generateData();

  const graphs = {
    displacement: {
      title: 'Displacement vs Time',
      dataKey: 'displacement',
      color: '#ec4899', // Pink
      unit: 'm',
      data: graphData.map(d => ({ time: d.time, value: d.displacement }))
    },
    velocity: {
      title: 'Velocity vs Time',
      dataKey: 'velocity',
      color: '#10b981', // Emerald
      unit: 'm/s',
      data: graphData.map(d => ({ time: d.time, value: d.velocity }))
    },
    acceleration: {
      title: 'Acceleration vs Time',
      dataKey: 'acceleration',
      color: '#f59e0b', // Amber
      unit: 'm/s²',
      data: graphData.map(d => ({ time: d.time, value: d.acceleration }))
    },
    energy: {
      title: 'Energy Distribution',
      dataKey: ['kinetic', 'potential', 'total'],
      colors: ['#f59e0b', '#8b5cf6', '#10b981'], // Amber, Violet, Emerald
      unit: 'J',
      data: graphData.map(d => ({ 
        time: d.time, 
        kinetic: d.kinetic, 
        potential: d.potential, 
        total: d.total 
      }))
    },
    phase: {
      title: 'Phase Space Plot',
      dataKey: ['displacement', 'velocity'],
      colors: ['#8b5cf6', '#3b82f6'], // Violet, Blue
      unit: '',
      data: graphData.map(d => ({ displacement: d.displacement, velocity: d.velocity }))
    }
  };

  const graphConfig = graphs[activeGraph];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      {/* Header - Added mb-8 for spacing */}
      <div className="mb-8 pt-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 font-display">
              Analytics <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Real-time visualization of harmonic motion parameters
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full border border-emerald-200">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-700 text-sm font-medium">● LIVE DATA</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Graph Controls */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Graph Selector */}
            <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 font-display">
                <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20">
                  <BarChart3 className="w-5 h-5 text-pink-500" />
                </div>
                Select Graph
              </h2>
              <div className="space-y-3">
                {Object.entries(graphs).map(([key, graph]) => (
                  <button
                    key={key}
                    onClick={() => setActiveGraph(key)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${
                      activeGraph === key
                        ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-300 shadow-sm'
                        : 'bg-white/60 border-pink-200 hover:bg-pink-50/80 hover:border-pink-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-gray-800 font-semibold">{graph.title}</div>
                        <div className="text-gray-600 text-sm mt-1">
                          {Array.isArray(graph.dataKey) 
                            ? `${graph.dataKey.length} parameters` 
                            : 'Single parameter'}
                        </div>
                      </div>
                      {activeGraph === key && (
                        <div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg">
              <h3 className="text-gray-800 font-semibold mb-4 flex items-center gap-2 font-display">
                <Settings className="w-5 h-5 text-pink-500" />
                Graph Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Range
                  </label>
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                  >
                    <option value="5s">Last 5 seconds</option>
                    <option value="10s">Last 10 seconds</option>
                    <option value="30s">Last 30 seconds</option>
                    <option value="60s">Last minute</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Line Width
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    defaultValue="2"
                    className="w-full h-2 bg-pink-100 rounded-lg appearance-none slider"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Smoothing
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    className="w-full h-2 bg-pink-100 rounded-lg appearance-none slider"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-3 bg-white/60 backdrop-blur-sm border border-pink-200 text-gray-800 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-pink-50 hover:border-pink-300 transition-all shadow-sm"
                >
                  <RefreshCw size={18} />
                  Refresh
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFullscreen(!fullscreen)}
                  className="py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:shadow-pink-300/50 transition-all"
                >
                  {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                  {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </motion.button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg">
              <h3 className="text-gray-800 font-semibold mb-4 flex items-center gap-2 font-display">
                <div className="p-1.5 rounded-lg bg-pink-500/20">
                  <TrendingUp className="w-5 h-5 text-pink-600" />
                </div>
                Statistics
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Data Points', value: '1,024', icon: <Hash className="w-4 h-4" /> },
                  { label: 'Sampling Rate', value: '100 Hz', icon: <Activity className="w-4 h-4" /> },
                  { label: 'Update Interval', value: '10 ms', icon: <Cpu className="w-4 h-4" /> },
                  { label: 'Peak Value', value: '1.5 m', icon: <Zap className="w-4 h-4" /> },
                  { label: 'RMS Value', value: '1.06 m', icon: <Target className="w-4 h-4" /> }
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center p-2 hover:bg-white/30 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded-md bg-pink-100 text-pink-600">
                        {stat.icon}
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{stat.label}</span>
                    </div>
                    <span className="text-gray-800 font-mono font-semibold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Graph Area */}
        <div className={`lg:col-span-3 ${fullscreen ? 'fixed inset-0 z-50 bg-gradient-to-br from-pink-50 to-blue-50 p-8' : ''}`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl overflow-hidden shadow-xl ${
              fullscreen ? 'h-full' : ''
            }`}
          >
            {/* Graph Header */}
            <div className="p-6 border-b border-pink-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 font-display">{graphConfig.title}</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Real-time {activeGraph} data visualization
                </p>
              </div>
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-pink-200 text-gray-800 rounded-xl font-semibold flex items-center gap-2 hover:bg-pink-50 hover:border-pink-300 transition-all shadow-sm"
                >
                  <Filter size={18} />
                  Filter
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold flex items-center gap-2 shadow-sm hover:shadow-lg hover:shadow-pink-300/50 transition-all"
                >
                  <Download size={18} />
                  Export
                </motion.button>
              </div>
            </div>

            {/* Graph Container */}
            <div className={`p-6 ${fullscreen ? 'h-[calc(100%-80px)]' : 'h-[500px]'}`}>
              <ResponsiveContainer width="100%" height="100%">
                {activeGraph === 'energy' ? (
                  <AreaChart data={graphConfig.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#6b7280"
                      tick={{ fill: '#4b5563' }}
                      label={{ 
                        value: 'Time (s)', 
                        position: 'insideBottom', 
                        offset: -10,
                        fill: '#4b5563'
                      }}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      tick={{ fill: '#4b5563' }}
                      label={{ 
                        value: 'Energy (J)', 
                        angle: -90, 
                        position: 'insideLeft',
                        fill: '#4b5563'
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid #fbcfe8',
                        borderRadius: '12px',
                        color: '#111827',
                        boxShadow: '0 4px 6px -1px rgba(236, 72, 153, 0.1)'
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="kinetic"
                      stackId="1"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.3}
                      strokeWidth={2}
                      name="Kinetic Energy"
                    />
                    <Area
                      type="monotone"
                      dataKey="potential"
                      stackId="1"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                      name="Potential Energy"
                    />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={false}
                      name="Total Energy"
                    />
                  </AreaChart>
                ) : activeGraph === 'phase' ? (
                  <ScatterChart data={graphConfig.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="displacement" 
                      stroke="#6b7280"
                      tick={{ fill: '#4b5563' }}
                      label={{ 
                        value: 'Displacement (m)', 
                        position: 'insideBottom', 
                        offset: -10,
                        fill: '#4b5563'
                      }}
                    />
                    <YAxis 
                      dataKey="velocity"
                      stroke="#6b7280"
                      tick={{ fill: '#4b5563' }}
                      label={{ 
                        value: 'Velocity (m/s)', 
                        angle: -90, 
                        position: 'insideLeft',
                        fill: '#4b5563'
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid #fbcfe8',
                        borderRadius: '12px',
                        color: '#111827',
                        boxShadow: '0 4px 6px -1px rgba(236, 72, 153, 0.1)'
                      }}
                    />
                    <Scatter
                      data={graphConfig.data}
                      fill="#8b5cf6"
                      line={{ stroke: '#ec4899', strokeWidth: 2 }}
                    />
                  </ScatterChart>
                ) : (
                  <LineChart data={graphConfig.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#6b7280"
                      tick={{ fill: '#4b5563' }}
                      label={{ 
                        value: 'Time (s)', 
                        position: 'insideBottom', 
                        offset: -10,
                        fill: '#4b5563'
                      }}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      tick={{ fill: '#4b5563' }}
                      label={{ 
                        value: `${graphConfig.title.split(' ')[0]} (${graphConfig.unit})`, 
                        angle: -90, 
                        position: 'insideLeft',
                        fill: '#4b5563'
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid #fbcfe8',
                        borderRadius: '12px',
                        color: '#111827',
                        boxShadow: '0 4px 6px -1px rgba(236, 72, 153, 0.1)'
                      }}
                      formatter={(value) => [`${value.toFixed(3)} ${graphConfig.unit}`, graphConfig.title.split(' ')[0]]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={graphConfig.color}
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ 
                        r: 6,
                        fill: graphConfig.color,
                        stroke: '#ffffff',
                        strokeWidth: 2
                      }}
                      name={graphConfig.title.split(' ')[0]}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Graph Footer */}
            <div className="p-4 border-t border-pink-200 bg-gradient-to-r from-pink-50/50 to-purple-50/50">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-lg border border-pink-200">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: graphConfig.color }} />
                    <span className="text-gray-700 text-sm font-medium">
                      Current Value: <span className="text-gray-800 font-mono font-bold">
                        {graphData[graphData.length - 1][activeGraph]?.toFixed(3) || '0.000'} {graphConfig.unit}
                      </span>
                    </span>
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    • Last updated: Just now
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm font-medium">Auto-refresh:</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Mini Graphs */}
          {!fullscreen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {Object.entries(graphs)
                .filter(([key]) => key !== activeGraph)
                .slice(0, 3)
                .map(([key, graph]) => (
                  <div
                    key={key}
                    onClick={() => setActiveGraph(key)}
                    className="bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl p-4 hover:border-pink-300 cursor-pointer transition-all duration-300 hover:bg-pink-50/50 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-gray-800 font-semibold text-sm">{graph.title}</h4>
                      <div className="p-1 rounded-lg bg-pink-100">
                        <BarChart3 size={16} className="text-pink-500" />
                      </div>
                    </div>
                    <div className="h-24">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={graph.data.slice(-20)}>
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={graph.color || graph.colors?.[0] || '#ec4899'}
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Slider custom styling */}
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

export default GraphsPage;