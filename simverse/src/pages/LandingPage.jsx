// pages/LandingPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, BarChart3, Zap, Rocket, Sparkles, Brain, Target, Award, Calculator } from 'lucide-react';
import ParticleBackground from '../components/ui/ParticleBackground';

const LandingPage = () => {
  const features = [
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Real-time Simulation',
      description: 'Interactive SHM simulation with live physics calculations',
      gradient: 'from-pink-500 to-purple-500'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Advanced Analytics',
      description: 'Dynamic graphs showing displacement, velocity, and energy',
      gradient: 'from-emerald-500 to-cyan-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Instant Calculations',
      description: 'Real-time physics calculations with detailed formulas',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with challenging SHM questions',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'Physics Formulas',
      description: 'Comprehensive formula library with derivations',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics',
      gradient: 'from-cyan-500 to-blue-500'
    }
  ];

  const stats = [
    { value: '10+', label: 'Live Simulations', color: 'text-pink-500' },
    { value: '98%', label: 'Success Rate', color: 'text-emerald-500' },
    { value: '100%', label: 'fun', color: 'text-amber-500' },
    { value: '24/7', label: 'Availability', color: 'text-blue-500' },
  ];

  const testimonials = [
    {
      quote: "This platform is designed for students who struggle with practicals. Like Me!",
      author: "Zara Adeen Khadeer",
      role: "Web Designer",
      color: 'from-emerald-500 to-cyan-500'
    },
    {
      quote: "Finally, a tool that makes harmonic motion intuitive and engaging.",
      author: "Zainab Fatima",
      role: "Web Developer",
      color: 'from-emerald-500 to-cyan-500'
    },
    {
      quote: "It's your turn to use Harmonic Lab and drop a testimonial",
      author: "Next Who?",
      role: "Next You.",
      color: 'from-emerald-500 to-cyan-500'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with ParticleBackground component */}
      <ParticleBackground variant="default" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/20 via-purple-50/10 to-blue-50/10" />

      {/* Main Content */}
      <div className="relative">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
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
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-200 mb-8 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm text-pink-600 font-medium">Physics Made Simple • 2025</span>
              </motion.div>
              
              {/* Main title */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight font-display">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Simple
                </span>
                <br />
                <span className="text-gray-800">Harmonic Lab</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                Experience physics like never before with our interactive <span className="text-pink-600 font-semibold">Simple Harmonic Motion</span> simulator. 
                Visualize complex concepts in real-time with beautiful, intuitive interfaces.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="bg-white/60 backdrop-blur-sm border border-pink-200 rounded-2xl p-4 shadow-lg"
                  >
                    <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                <Link to="/simulation">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-pink-300/30 transition-all overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Rocket className="w-5 h-5" />
                      Launch Simulator
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </Link>
                <Link to="/quiz">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-white/60 backdrop-blur-sm border border-pink-300 text-gray-800 font-semibold text-lg hover:bg-white/80 hover:border-pink-400 transition-all duration-300 shadow-lg"
                  >
                    Try Quiz
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Demo Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative max-w-5xl mx-auto mt-20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 blur-3xl rounded-3xl" />
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-pink-200 p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 font-display">Live Simulation Preview</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-emerald-600 font-medium">● LIVE</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="h-64 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border border-pink-200 flex flex-col items-center justify-center p-6">
                      <div className="relative mb-4">
                        <Cpu className="w-20 h-20 text-pink-500" />
                        <motion.div
                          className="absolute -inset-4 rounded-full border-2 border-pink-300/30"
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
                      <h4 className="text-gray-800 font-semibold mb-2 font-display">Spring-Mass System</h4>
                      <p className="text-gray-600 text-sm text-center">Real-time oscillation with adjustable parameters</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-64 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200 flex flex-col items-center justify-center p-6">
                      <BarChart3 className="w-20 h-20 text-blue-500 mb-4" />
                      <h4 className="text-gray-800 font-semibold mb-2 font-display">Analytics Dashboard</h4>
                      <p className="text-gray-600 text-sm text-center">Dynamic graphs showing energy distribution</p>
                      <div className="mt-4 flex gap-2">
                        <div className="w-8 h-1 bg-pink-500 rounded-full" />
                        <div className="w-8 h-1 bg-purple-500 rounded-full" />
                        <div className="w-8 h-1 bg-blue-500 rounded-full" />
                        <div className="w-8 h-1 bg-emerald-500 rounded-full" />
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-display">
              Everything You Need for <span className="text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text">Modern Physics</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
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
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
                className="group relative bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 hover:border-pink-300 transition-all duration-500 overflow-hidden shadow-lg"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className={`mb-4 p-3 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 w-fit`}>
                  <div className={feature.gradient.includes('pink') ? 'text-pink-500' : 
                                 feature.gradient.includes('emerald') ? 'text-emerald-500' :
                                 feature.gradient.includes('amber') ? 'text-amber-500' :
                                 'text-blue-500'}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 font-display">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                
                {/* Hover indicator */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl`} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-display">
              Loved by <span className="text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text">Students & Educators</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              See what our community has to say about their learning journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-8 shadow-lg"
              >
                <div className={`mb-6 p-2 rounded-xl bg-gradient-to-br ${testimonial.color} bg-opacity-10 w-fit`}>
                  <Award className="w-6 h-6" />
                </div>
                <p className="text-gray-700 text-lg mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
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
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 blur-3xl rounded-full" />
            <div className="relative bg-gradient-to-br from-white/90 to-pink-50/80 backdrop-blur-xl rounded-3xl border border-pink-200 p-12 text-center shadow-2xl">
              <h2 className="text-4xl font-bold text-gray-800 mb-6 font-display">
                Ready to <span className="text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text">Transform</span> Your Learning?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of students and educators who are already mastering physics with Harmonic Lab
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-pink-300/30 transition-all duration-300"
                  >
                    Get Started For Free
                  </motion.button>
                </Link>
                <Link to="/simulation">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-pink-300 text-gray-800 font-semibold text-lg hover:bg-white hover:border-pink-400 transition-all duration-300 shadow-lg"
                  >
                    Try Interactive Demo
                  </motion.button>
                </Link>
              </div>
              <p className="text-gray-500 text-sm mt-6">
                No registration required • Free forever plan • Start learning in seconds
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};


export default LandingPage;
