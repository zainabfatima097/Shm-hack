import React from 'react';
import { motion } from 'framer-motion';
import { useSimulationContext } from '../../../contexts/SimulationContext';
import { usePhysics } from '../../../hooks/usePhysics';
import { Activity, Zap, Target, TrendingUp, Battery, GitPullRequest } from 'lucide-react';

const LiveValues = () => {
  const { simulationType, parameters, time } = useSimulationContext();
  const values = usePhysics(simulationType, parameters, time);

  const formatValue = (value, unit) => {
    const num = parseFloat(value);
    if (Math.abs(num) < 0.0001) return `0.000 ${unit}`;
    return `${num.toFixed(3)} ${unit}`;
  };

  const metrics = [
    {
      icon: <TrendingUp size={18} />,
      label: simulationType === 'spring' ? 'Position' : 'Angle',
      value: simulationType === 'spring' ? values.x : values.θ,
      unit: simulationType === 'spring' ? 'm' : 'rad',
      color: 'blue',
      description: simulationType === 'spring' ? 'Distance from equilibrium' : 'Angle from vertical'
    },
    {
      icon: <Zap size={18} />,
      label: simulationType === 'spring' ? 'Velocity' : 'Angular Velocity',
      value: simulationType === 'spring' ? values.v : values.ωAngular,
      unit: simulationType === 'spring' ? 'm/s' : 'rad/s',
      color: 'green',
      description: 'Rate of change of position'
    },
    {
      icon: <Activity size={18} />,
      label: simulationType === 'spring' ? 'Acceleration' : 'Angular Acceleration',
      value: simulationType === 'spring' ? values.a : values.α,
      unit: simulationType === 'spring' ? 'm/s²' : 'rad/s²',
      color: 'red',
      description: 'Rate of change of velocity'
    },
    {
      icon: <Target size={18} />,
      label: 'Phase',
      value: ((values.ω * time) % (2 * Math.PI)).toFixed(3),
      unit: 'rad',
      color: 'purple',
      description: 'Current phase of oscillation'
    },
    {
      icon: <Battery size={18} />,
      label: 'Kinetic Energy',
      value: values.energy.kinetic,
      unit: 'J',
      color: 'orange',
      description: 'Energy due to motion'
    },
    {
      icon: <GitPullRequest size={18} />,
      label: 'Potential Energy',
      value: values.energy.potential,
      unit: 'J',
      color: 'indigo',
      description: 'Stored energy'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-lg font-bold text-gray-800">Live Values at t = {time.toFixed(2)}s</h4>
          <p className="text-gray-600">Real-time physics measurements</p>
        </div>
        <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
          Live
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`p-4 rounded-xl border ${
              metric.color === 'blue' ? 'bg-blue-50 border-blue-100 hover:bg-blue-100' :
              metric.color === 'green' ? 'bg-green-50 border-green-100 hover:bg-green-100' :
              metric.color === 'red' ? 'bg-red-50 border-red-100 hover:bg-red-100' :
              metric.color === 'purple' ? 'bg-purple-50 border-purple-100 hover:bg-purple-100' :
              metric.color === 'orange' ? 'bg-orange-50 border-orange-100 hover:bg-orange-100' :
              'bg-indigo-50 border-indigo-100 hover:bg-indigo-100'
            } transition-colors duration-200`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${
                metric.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                metric.color === 'green' ? 'bg-green-100 text-green-600' :
                metric.color === 'red' ? 'bg-red-100 text-red-600' :
                metric.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                metric.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                'bg-indigo-100 text-indigo-600'
              }`}>
                {metric.icon}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-700">{metric.label}</div>
                <div className="text-xs text-gray-500 truncate">{metric.description}</div>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatValue(metric.value, metric.unit)}
            </div>
            <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  metric.color === 'blue' ? 'bg-blue-500' :
                  metric.color === 'green' ? 'bg-green-500' :
                  metric.color === 'red' ? 'bg-red-500' :
                  metric.color === 'purple' ? 'bg-purple-500' :
                  metric.color === 'orange' ? 'bg-orange-500' :
                  'bg-indigo-500'
                }`}
                style={{ 
                  width: `${Math.min(100, Math.abs(metric.value) * 50)}%` 
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Total Energy:</span>
            <span className="ml-2 font-bold text-gray-800">
              {formatValue(values.energy.total, 'J')}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {((values.energy.kinetic / values.energy.total) * 100).toFixed(1)}% Kinetic
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveValues;