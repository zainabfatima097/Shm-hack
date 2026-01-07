// components/simulation/GraphPanel.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useSimulationContext } from '../../contexts/SimulationContext';
import { BarChart3, Clock, Activity, Zap, Hash } from 'lucide-react';

const GraphPanel = () => {
  const { realTimeData, activeGraph, setActiveGraph, parameters } = useSimulationContext();

  const graphs = [
    { key: 'displacement', label: 'Displacement', color: '#ec4899', unit: 'm' }, // Pink
    { key: 'velocity', label: 'Velocity', color: '#10b981', unit: 'm/s' }, // Emerald
    { key: 'acceleration', label: 'Acceleration', color: '#f59e0b', unit: 'm/s²' }, // Amber
    { key: 'energy', label: 'Energy', color: '#8b5cf6', unit: 'J' } // Violet
  ];

  const getGraphData = () => {
    if (activeGraph === 'energy') {
      return realTimeData.map(point => ({
        time: point.time,
        kinetic: point.kineticEnergy,
        potential: point.potentialEnergy,
        total: point.totalEnergy
      }));
    }
    return realTimeData.map(point => ({
      time: point.time,
      value: point[activeGraph]
    }));
  };

  const data = getGraphData();

  // Calculate period and frequency based on simulation type
  const calculatePeriod = () => {
    if (realTimeData.length === 0) return '0.00';
    
    if (parameters) {
      if (parameters.springConstant > 0) {
        // Spring-mass system
        return (2 * Math.PI * Math.sqrt(parameters.mass / parameters.springConstant)).toFixed(2);
      } else {
        // Pendulum system
        return (2 * Math.PI * Math.sqrt(parameters.length / parameters.gravity)).toFixed(2);
      }
    }
    return '0.00';
  };

  const calculateFrequency = () => {
    const period = parseFloat(calculatePeriod());
    return period > 0 ? (1 / period).toFixed(2) : '0.00';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg">
      {/* Graph Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20">
            <BarChart3 className="w-6 h-6 text-pink-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 font-display">Real-time Graphs</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {graphs.map(graph => (
            <button
              key={graph.key}
              onClick={() => setActiveGraph(graph.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                activeGraph === graph.key
                  ? `bg-gradient-to-r from-${graph.color.replace('#', '').slice(0, -3)}-500/20 to-${graph.color.replace('#', '').slice(0, -3)}-600/20 text-gray-800 border-${graph.color.replace('#', '').slice(0, -3)}-300 shadow-sm`
                  : 'bg-white/60 text-gray-600 hover:text-gray-800 hover:bg-pink-50 border-pink-200'
              }`}
            >
              {graph.label}
            </button>
          ))}
        </div>
      </div>

      {/* Graph Container */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {activeGraph === 'energy' ? (
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280"
                tick={{ fill: '#4b5563' }}
                label={{ 
                  value: 'Time (s)', 
                  position: 'insideBottom', 
                  offset: -5,
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
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280"
                tick={{ fill: '#4b5563' }}
                label={{ 
                  value: 'Time (s)', 
                  position: 'insideBottom', 
                  offset: -5,
                  fill: '#4b5563'
                }}
              />
              <YAxis 
                stroke="#6b7280"
                tick={{ fill: '#4b5563' }}
                label={{ 
                  value: `${graphs.find(g => g.key === activeGraph)?.label} (${graphs.find(g => g.key === activeGraph)?.unit})`, 
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
                formatter={(value) => [`${value.toFixed(3)} ${graphs.find(g => g.key === activeGraph)?.unit}`, graphs.find(g => g.key === activeGraph)?.label]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={graphs.find(g => g.key === activeGraph)?.color}
                strokeWidth={3}
                dot={false}
                activeDot={{ 
                  r: 6,
                  fill: graphs.find(g => g.key === activeGraph)?.color,
                  stroke: '#ffffff',
                  strokeWidth: 2
                }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Stats Row */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-xl p-4 border border-pink-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-1.5 rounded-lg bg-pink-500/20">
              <Clock className="w-4 h-4 text-pink-600" />
            </div>
            <span className="text-gray-700 text-sm font-medium">Period</span>
          </div>
          <div className="text-gray-800 font-mono text-xl font-bold">
            {calculatePeriod()}s
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-4 border border-emerald-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20">
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-gray-700 text-sm font-medium">Frequency</span>
          </div>
          <div className="text-gray-800 font-mono text-xl font-bold">
            {calculateFrequency()}Hz
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-4 border border-amber-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20">
              <Zap className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-gray-700 text-sm font-medium">Max Energy</span>
          </div>
          <div className="text-gray-800 font-mono text-xl font-bold">
            {realTimeData.length > 0 ? Math.max(...realTimeData.map(d => d.totalEnergy || 0)).toFixed(2) : '0.00'}J
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-1.5 rounded-lg bg-purple-500/20">
              <Hash className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-gray-700 text-sm font-medium">Data Points</span>
          </div>
          <div className="text-gray-800 font-mono text-xl font-bold">
            {realTimeData.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphPanel;