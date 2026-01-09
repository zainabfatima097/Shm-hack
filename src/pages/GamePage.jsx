// src/pages/GamePage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypingIntro from '../components/game/TypingIntro';
import GameCanvas from '../components/game/GameCanvas';
import ParticleBackground from '../components/ui/ParticleBackground'; 
import { Brain } from 'lucide-react';

const GamePage = () => {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [showSkip, setShowSkip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowSkip(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const screens = [
    { id: 'intro', component: TypingIntro, duration: null },
    { id: 'game', component: GameCanvas, duration: null }
  ];

  const handleSkip = () => {
    setCurrentScreen('game');
  };

  const handleScreenComplete = (screenId) => {
    const currentIndex = screens.findIndex(s => s.id === screenId);
    if (currentIndex < screens.length - 1) {
      setCurrentScreen(screens[currentIndex + 1].id);
    }
  };

  const CurrentScreen = screens.find(s => s.id === currentScreen)?.component;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-6"
          >
            <div className="w-full h-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <p className="text-pink-600 font-['Press_Start_2P'] text-lg animate-pulse">
            LOADING PHYSICS GAME...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      <ParticleBackground variant="game" />
      
      {/* Skip Button */}
      <AnimatePresence>
        {showSkip && currentScreen !== 'game' && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={handleSkip}
            className="fixed top-8 right-8 z-50 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl shadow-2xl hover:shadow-pink-300/50 transition-all font-['Press_Start_2P'] text-xs"
          >
            SKIP INTRO
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10">
        {CurrentScreen && (
          <CurrentScreen 
            onComplete={() => handleScreenComplete(currentScreen)}
            onSkip={handleSkip}
          />
        )}
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-64">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 text-sm font-['Arcade_Classic']">
            {currentScreen === 'intro' ? 'INTRO' : 'GAME'}
          </span>
          <span className="text-pink-600 text-sm font-['Arcade_Classic']">
            {currentScreen === 'game' ? 'READY' : 'LOADING'}
          </span>
        </div>
        <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
            initial={{ width: '0%' }}
            animate={{ 
              width: currentScreen === 'intro' ? '50%' : '100%' 
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default GamePage;