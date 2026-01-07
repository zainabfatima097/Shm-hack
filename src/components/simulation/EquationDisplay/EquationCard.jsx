import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const EquationCard = ({ title, equation, calculation, result, color, tooltip, delay = 0 }) => {
  const colorClasses = {
    blue: {
      bg: 'from-blue-50 to-blue-100 border-blue-200',
      text: 'text-blue-600',
      iconBg: 'bg-blue-100'
    },
    green: {
      bg: 'from-green-50 to-green-100 border-green-200',
      text: 'text-green-600',
      iconBg: 'bg-green-100'
    },
    purple: {
      bg: 'from-purple-50 to-purple-100 border-purple-200',
      text: 'text-purple-600',
      iconBg: 'bg-purple-100'
    },
    orange: {
      bg: 'from-orange-50 to-orange-100 border-orange-200',
      text: 'text-orange-600',
      iconBg: 'bg-orange-100'
    },
    red: {
      bg: 'from-red-50 to-red-100 border-red-200',
      text: 'text-red-600',
      iconBg: 'bg-red-100'
    }
  };

  const colorConfig = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={`bg-gradient-to-r ${colorConfig.bg} border rounded-xl p-4 hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colorConfig.iconBg} ${colorConfig.text}`}>
            <div className="w-6 h-6 flex items-center justify-center font-bold">
              {equation.split('=')[0].trim()}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-gray-800">{title}</h4>
              {tooltip && (
                <div className="group relative">
                  <Info size={14} className="text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-gray-800 text-white text-xs rounded-lg z-10">
                    {tooltip}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">Fundamental SHM equation</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-white/80 rounded-lg p-3">
          <div className="text-center font-mono text-lg font-bold text-gray-800">
            {equation}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-medium text-gray-500 mb-1">Calculation</div>
            <div className="bg-white/90 rounded p-2 font-mono text-sm border">
              {calculation}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 mb-1">Result</div>
            <div className="bg-white/90 rounded p-2 font-bold text-lg text-primary border">
              {result}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EquationCard;