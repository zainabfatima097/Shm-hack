// pages/LandingPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, BarChart3, Zap, Shield, Globe, Users, Rocket, Sparkles } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Real-time Simulation',
      description: 'Interactive SHM simulation with live physics calculations',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Advanced Analytics',
      description: 'Dynamic graphs showing displacement, velocity, and energy',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Instant Calculations',
      description: 'Real-time physics calculations with detailed formulas',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Save & Export',
      description: 'Save your simulations and export data for analysis',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Cloud Sync',
      description: 'Access your simulations from anywhere, anytime',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaborate',
      description: 'Share simulations and collaborate with peers',
      gradient: 'from-red-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-blue-400 rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              opacity: 0
            }}
            animate={{
              y: ['0vh', '100vh', '0vh'],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-blue-300 font-medium">Hackathon Ready 2024</span>
            </motion.div>
            
            {/* Main title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Quantum
              </span>
              <br />
              <span className="text-white">Harmonic Lab</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Experience physics like never before with our interactive <span className="text-blue-400 font-semibold">Simple Harmonic Motion</span> simulator. 
              Visualize complex concepts in real-time with cutting-edge WebGL rendering.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Start Free Trial
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  Sign In
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Demo Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative max-w-5xl mx-auto mt-20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-3xl" />
            <div className="relative bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Live Simulation Preview</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 font-medium">● LIVE</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="h-64 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl border border-white/10 flex flex-col items-center justify-center p-6">
                    <div className="relative mb-4">
                      <Cpu className="w-20 h-20 text-blue-400 animate-pulse" />
                      <motion.div
                        className="absolute -inset-4 rounded-full border-2 border-blue-400/20"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Spring-Mass System</h4>
                    <p className="text-gray-400 text-sm text-center">Real-time oscillation with adjustable parameters</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-64 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-white/10 flex flex-col items-center justify-center p-6">
                    <BarChart3 className="w-20 h-20 text-purple-400 mb-4" />
                    <h4 className="text-white font-semibold mb-2">Analytics Dashboard</h4>
                    <p className="text-gray-400 text-sm text-center">Dynamic graphs showing energy distribution</p>
                    <div className="mt-4 flex gap-2">
                      <div className="w-8 h-1 bg-blue-500 rounded-full" />
                      <div className="w-8 h-1 bg-purple-500 rounded-full" />
                      <div className="w-8 h-1 bg-pink-500 rounded-full" />
                      <div className="w-8 h-1 bg-green-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need for <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Modern Physics</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit designed for students, educators, and researchers
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03, 
                translateY: -8,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
              }}
              className="group relative bg-gray-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-500 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className={`mb-4 p-3 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 w-fit`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
              
              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-full" />
          <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-white/10 p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Transform</span> Your Learning?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of students and educators who are already mastering physics with Quantum Harmonic Lab
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/30 transition-shadow duration-300"
                >
                  Get Started For Free
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  Try Demo
                </motion.button>
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;