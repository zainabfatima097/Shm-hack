// pages/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion} from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  Zap, Target, Brain, BarChart3, Calculator, Users, Rocket, 
  Sparkles, Star, TrendingUp,
  Play, ArrowRight, ChevronRight,
  Cpu, Clock, TargetIcon
} from 'lucide-react';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Simulations",
      description: "Interactive physics simulations with live parameter adjustments",
      color: "from-pink-500 to-purple-500",
      stats: "60 FPS rendering"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Smart insights and predictions based on your simulation data",
      color: "from-emerald-500 to-cyan-500",
      stats: "95% accuracy"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Visualization",
      description: "Interactive graphs and 3D visualizations of harmonic motion",
      color: "from-orange-500 to-amber-500",
      stats: "10+ graph types"
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Physics Calculator",
      description: "Built-in calculator for complex physics equations",
      color: "from-blue-500 to-indigo-500",
      stats: "100+ formulas"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Physics Professor, MIT",
      content: "This platform revolutionized how I teach harmonic motion. The simulations are incredibly accurate.",
      avatar: "👩‍🏫",
      rating: 5
    },
    {
      name: "Alex Rodriguez",
      role: "Engineering Student",
      content: "Finally, a tool that makes physics intuitive! The interactive graphs helped me ace my exams.",
      avatar: "👨‍🎓",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "High School Teacher",
      content: "My students are engaged like never before. The gamified learning approach works wonders.",
      avatar: "👩‍🏫",
      rating: 5
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
    { value: "50K+", label: "Simulations Created", icon: <Cpu className="w-6 h-6" /> },
    { value: "95%", label: "Accuracy Rate", icon: <TargetIcon className="w-6 h-6" /> },
    { value: "24/7", label: "Uptime", icon: <Clock className="w-6 h-6" /> }
  ];

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg"
            >
              <Brain className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-display">
                Physics Lab
              </h1>
              <p className="text-xs text-gray-600">SHM Simulator</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/features" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Features
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              About
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all flex items-center gap-2"
            >
              {user ? 'Go to Dashboard' : 'Get Started'}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        id="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 py-20 px-4 md:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-pink-200 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-gray-700">The Future of Physics Education</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 font-display leading-tight">
                Master <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Physics</span> Through Interactive{' '}
                <span className="relative">
                  Simulations
                  <svg className="absolute -bottom-2 left-0 w-full" height="12">
                    <path d="M0,6 Q80,12 160,6 T320,6" stroke="url(#gradient)" strokeWidth="4" fill="none" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience simple harmonic motion like never before. Our interactive simulator combines cutting-edge technology with intuitive design to make physics learning engaging and effective.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGetStarted}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-pink-300/50 transition-all flex items-center justify-center gap-3 group"
                >
                  <Rocket className="w-6 h-6" />
                  Start Exploring Free
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </motion.button>
                
                <Link to="/demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-pink-200 text-gray-800 rounded-2xl font-bold text-lg hover:border-pink-300 hover:bg-white transition-all flex items-center justify-center gap-3"
                  >
                    <Play className="w-6 h-6 text-pink-500" />
                    Watch Demo
                  </motion.button>
                </Link>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {['👩‍🔬', '👨‍🎓', '👩‍🏫', '👨‍🔧'].map((emoji, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-white border-2 border-pink-200 flex items-center justify-center text-lg">
                      {emoji}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Trusted by 10,000+ students & educators</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-gray-600 text-sm ml-2">4.9/5 rating</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Interactive Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white to-pink-50/50 backdrop-blur-sm rounded-3xl border-2 border-pink-200 p-8 shadow-2xl shadow-pink-300/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Live Preview</h3>
                      <p className="text-gray-600 text-sm">Spring-Mass Simulation</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    Real-time
                  </div>
                </div>
                
                {/* Animated Simulation Preview */}
                <div className="relative h-64 mb-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        y: [0, -40, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative"
                    >
                      {/* Spring */}
                      <div className="w-48 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mb-2"></div>
                      {/* Mass */}
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 mx-auto shadow-lg"></div>
                      {/* Base */}
                      <div className="w-64 h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full mt-8"></div>
                    </motion.div>
                  </div>
                  
                  {/* Data Points */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: -Math.sin(i) * 20 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                        className="w-2 h-2 rounded-full bg-pink-500"
                      />
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Amplitude", value: "1.5m", color: "text-pink-600" },
                    { label: "Frequency", value: "2.5Hz", color: "text-purple-600" },
                    { label: "Energy", value: "45J", color: "text-emerald-600" }
                  ].map((item, i) => (
                    <div key={i} className="text-center p-3 bg-white/60 rounded-xl border border-pink-100">
                      <p className="text-gray-600 text-sm">{item.label}</p>
                      <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={handleGetStarted}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Launch Simulation
                </button>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -left-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-xl"
              >
                <TrendingUp className="w-6 h-6 text-white" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-6 -right-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-xl"
              >
                <Target className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 text-center hover:border-pink-300 transition-all"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${
                    index === 0 ? 'from-pink-500 to-purple-500' :
                    index === 1 ? 'from-emerald-500 to-cyan-500' :
                    index === 2 ? 'from-orange-500 to-amber-500' :
                    'from-blue-500 to-indigo-500'
                  }`}>
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 md:px-8 bg-gradient-to-b from-white/50 to-pink-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-pink-200 rounded-full mb-4"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-gray-700">Why Choose Physics Lab</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-display">
              Everything You Need to <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Master Physics</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From interactive simulations to AI-powered analysis, we provide all the tools for effective physics learning.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveFeature(index)}
                className={`bg-white/80 backdrop-blur-sm border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  activeFeature === index 
                    ? 'border-pink-300 shadow-2xl shadow-pink-300/20 scale-105' 
                    : 'border-pink-200 hover:border-pink-300'
                }`}
              >
                <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} w-fit mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">{feature.stats}</span>
                  <ChevronRight className={`w-5 h-5 transition-transform ${
                    activeFeature === index ? 'translate-x-2 text-pink-500' : 'text-gray-400'
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-display">
              Loved by <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Students & Educators</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of users who have transformed their physics learning experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 hover:border-pink-300 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl shadow-pink-500/30"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Ready to Transform Your Physics Learning?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of successful students and educators. Start for free, no credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="px-8 py-4 bg-white text-gray-800 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3"
              >
                <Rocket className="w-6 h-6" />
                Start Free Trial
              </motion.button>
              
              <Link to="/demo">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/30 transition-all flex items-center justify-center gap-3"
                >
                  <Play className="w-6 h-6" />
                  Watch Demo
                </motion.button>
              </Link>
            </div>
            
            <p className="mt-6 text-sm opacity-80">
              Free forever plan available • No credit card required • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 md:px-8 border-t border-pink-200 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-display">
                    Physics Lab
                  </h3>
                  <p className="text-xs text-gray-600">SHM Simulator</p>
                </div>
              </div>
              <p className="text-gray-600">
                Making physics education accessible, engaging, and effective through interactive simulations.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-600 hover:text-pink-600 transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-600 hover:text-pink-600 transition-colors">Pricing</Link></li>
                <li><Link to="/demo" className="text-gray-600 hover:text-pink-600 transition-colors">Demo</Link></li>
                <li><Link to="/updates" className="text-gray-600 hover:text-pink-600 transition-colors">Updates</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/tutorials" className="text-gray-600 hover:text-pink-600 transition-colors">Tutorials</Link></li>
                <li><Link to="/docs" className="text-gray-600 hover:text-pink-600 transition-colors">Documentation</Link></li>
                <li><Link to="/blog" className="text-gray-600 hover:text-pink-600 transition-colors">Blog</Link></li>
                <li><Link to="/support" className="text-gray-600 hover:text-pink-600 transition-colors">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><Link to="/twitter" className="text-gray-600 hover:text-pink-600 transition-colors">Twitter</Link></li>
                <li><Link to="/discord" className="text-gray-600 hover:text-pink-600 transition-colors">Discord</Link></li>
                <li><Link to="/github" className="text-gray-600 hover:text-pink-600 transition-colors">GitHub</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-pink-600 transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-pink-200 text-center text-gray-600 text-sm">
            <p>© {new Date().getFullYear()} Physics Lab SHM Simulator. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;