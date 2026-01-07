// components/ui/LoadingScreen.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Atom, Cpu, Zap, Brain, Sparkles, Target } from 'lucide-react';

const LoadingScreen = ({ type = 'default' }) => {
  const loadingConfigs = {
    default: {
      title: 'Harmonic Motion Lab',
      subtitle: 'Initializing simulation environment',
      gradient: 'from-pink-500 via-purple-500 to-blue-500',
      bgGradient: 'from-pink-50 via-purple-50 to-blue-50',
      particleColor: 'bg-pink-300',
      icon: Atom,
    },
    quiz: {
      title: 'SHM Quiz Engine',
      subtitle: 'Loading questions and physics engine',
      gradient: 'from-emerald-500 via-cyan-500 to-blue-500',
      bgGradient: 'from-emerald-50 via-cyan-50 to-blue-50',
      particleColor: 'bg-emerald-300',
      icon: Brain,
    },
    dashboard: {
      title: 'Dashboard Analytics',
      subtitle: 'Crunching simulation data',
      gradient: 'from-pink-500 via-rose-500 to-amber-500',
      bgGradient: 'from-pink-50 via-rose-50 to-amber-50',
      particleColor: 'bg-rose-300',
      icon: Cpu,
    },
    simulation: {
      title: 'Physics Simulator',
      subtitle: 'Calibrating harmonic oscillator',
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      bgGradient: 'from-blue-50 via-indigo-50 to-purple-50',
      particleColor: 'bg-blue-300',
      icon: Target,
    }
  };

  const config = loadingConfigs[type] || loadingConfigs.default;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.bgGradient} flex flex-col items-center justify-center relative overflow-hidden`}>
      {/* Animated background particles with soft glow */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1.5 h-1.5 ${config.particleColor} rounded-full opacity-30`}
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              scale: 0
            }}
            animate={{
              x: [null, `${Math.random() * 100}vw`],
              y: [null, `${Math.random() * 100}vh`],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1
            }}
          />
        ))}
        
        {/* Floating shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute w-16 h-16 border border-pink-300/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        {/* Main loader animation */}
        <motion.div
          className="relative mx-auto mb-8"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="relative">
            {/* Outer ring */}
            <div className="w-32 h-32 rounded-full border-2 border-pink-300/30" />
            
            {/* Middle ring */}
            <motion.div
              className="absolute inset-4 rounded-full border-2 border-purple-300/40"
              animate={{
                rotate: -360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
            
            {/* Icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                rotate: -360
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="p-4 rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
                <config.icon className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Loading text */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 font-display">
            {config.title}
          </h1>
          <motion.p
            className="text-gray-700 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {config.subtitle}
          </motion.p>
        </div>

        {/* Progress bar with glow effect */}
        <div className="w-64 h-2 bg-white/50 backdrop-blur-sm rounded-full overflow-hidden mx-auto mb-8 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 relative"
            initial={{ width: "0%" }}
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </motion.div>
        </div>

        {/* Loading indicators */}
        <div className="flex justify-center space-x-3 mb-8">
          {['pink', 'purple', 'blue'].map((color, index) => (
            <motion.div
              key={color}
              className={`w-4 h-4 rounded-full bg-${color}-500`}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.5, 1, 0.5],
                y: [0, -8, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* System status with modern cards */}
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          {[
            { label: 'Physics', icon: Zap, color: 'text-pink-500' },
            { label: 'Graphics', icon: Sparkles, color: 'text-purple-500' },
            { label: 'Data', icon: Brain, color: 'text-blue-500' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl p-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <div className="flex items-center justify-center gap-2">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-gray-700 text-xs font-medium">{item.label}</span>
              </div>
              <div className="mt-1">
                <motion.div
                  className={`h-1 bg-gradient-to-r ${config.gradient} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: index * 0.2 + 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Loading dots animation */}
        <motion.div
          className="mt-8 text-gray-600 text-sm flex items-center justify-center gap-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading
          <div className="flex gap-0.5">
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            >
              .
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* Footer note */}
      <motion.div
        className="absolute bottom-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="bg-white/40 backdrop-blur-sm border border-pink-200 rounded-full px-4 py-2">
          <p className="text-gray-600 text-sm">
            Powered by <span className="font-semibold text-pink-600">React Harmonic Engine</span>
          </p>
        </div>
      </motion.div>

      {/* Floating particles around loader */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [0, Math.cos((i * Math.PI) / 6) * 100],
              y: [0, Math.sin((i * Math.PI) / 6) * 100],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;