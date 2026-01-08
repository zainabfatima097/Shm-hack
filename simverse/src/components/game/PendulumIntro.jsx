import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, Zap, Users, Award, Brain } from 'lucide-react';
import BlockCharacter from './BlockCharacter';

const PendulumIntro = ({ onComplete, onSkip }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "THE SIMPLE PENDULUM",
      subtitle: "Galileo Galilei (1583)",
      icon: <Target className="w-12 h-12" />,
      color: "from-blue-500 to-cyan-500",
      content: "Galileo discovered that the period of a pendulum is constant, revolutionizing timekeeping.",
      character: "scientist"
    },
    {
      title: "WHAT IS IT?",
      subtitle: "A weight suspended from a pivot",
      icon: <Clock className="w-12 h-12" />,
      color: "from-emerald-500 to-teal-500",
      content: "Swinging back and forth under gravity's influence, creating Simple Harmonic Motion.",
      character: "pendulum"
    },
    {
      title: "PHYSICS APPLICATIONS",
      subtitle: "Where we use pendulums",
      icon: <Zap className="w-12 h-12" />,
      color: "from-purple-500 to-pink-500",
      content: "Clocks, seismometers, amusement park rides, and measuring gravity!",
      character: "engineer"
    },
    {
      title: "YOUR TURN!",
      subtitle: "Master the pendulum",
      icon: <Brain className="w-12 h-12" />,
      color: "from-amber-500 to-orange-500",
      content: "Control the physics, solve challenges, become a Harmonic Motion Master!",
      character: "player"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(prev => prev + 1);
      } else {
        setTimeout(() => onComplete(), 1000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentSlide, slides.length, onComplete]);

  const current = slides[currentSlide];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Left: Content */}
        <div className="space-y-8">
          <div className={`p-6 rounded-2xl bg-gradient-to-br ${current.color} bg-opacity-20 border ${current.color.replace('from-', 'border-').split(' ')[0]}/30`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-xl bg-gradient-to-br ${current.color}`}>
                <div className="text-white">{current.icon}</div>
              </div>
              <div>
                <h2 className="text-4xl font-bold text-white font-['Press_Start_2P']">
                  {current.title}
                </h2>
                <p className="text-xl text-amber-300 mt-2">{current.subtitle}</p>
              </div>
            </div>
            
            <p className="text-gray-200 text-lg leading-relaxed">
              {current.content}
            </p>
          </div>

          {/* Slide Indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 flex-1 rounded-full transition-all ${
                  index === currentSlide 
                    ? `bg-gradient-to-r ${current.color}` 
                    : 'bg-gray-700'
                }`}
              />
            ))}
          </div>

          {/* Facts */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Clock />, text: "Period ∝ √Length", color: "text-blue-400" },
              { icon: <Zap />, text: "Independent of Mass", color: "text-emerald-400" },
              { icon: <Target />, text: "SHM at small angles", color: "text-purple-400" },
              { icon: <Award />, text: "Isochronous", color: "text-amber-400" }
            ].map((fact, idx) => (
              <div key={idx} className="bg-black/40 p-4 rounded-xl border border-white/10">
                <div className={`${fact.color} mb-2`}>{fact.icon}</div>
                <p className="text-sm text-gray-300 font-mono">{fact.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Block Character */}
        <div className="relative">
          <BlockCharacter type={current.character} />
          
          {/* Animated Pendulum */}
          <motion.div
            animate={{ rotate: [0, 30, 0, -30, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-0 right-0"
          >
            <div className="relative">
              {/* String */}
              <div className="w-1 h-32 bg-gradient-to-b from-gray-300 to-gray-500 mx-auto"></div>
              {/* Bob */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-2xl"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Continue Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-center"
      >
        <p className="text-gray-400 font-mono animate-pulse">
          {currentSlide < slides.length - 1 ? "Next slide in..." : "Starting game..."}
        </p>
      </motion.div>
    </div>
  );
};

export default PendulumIntro;