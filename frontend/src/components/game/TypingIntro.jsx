import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Keyboard sound effect
const createKeyboardSound = (type = 'keypress') => {
  if (typeof window === 'undefined' || !window.AudioContext) return;
  
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  if (type === 'backspace') {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 120;
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.08);
  } else if (type === 'space') {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 80;
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  } else {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 300 + Math.random() * 50;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.04, audioContext.currentTime + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.04);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.045);
  }
};

const TypingIntro = ({ onComplete }) => {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState('typing'); // 'typing', 'pausing', 'deleting'
  const cursorRef = useRef(null);

  const sentences = [
    "GALILEO GALILEI STUDIED THE SIMPLE PENDULUM.",
    "HE DISCOVERED SWING TIME DEPENDS ON LENGTH.",
    "CHRISTIAAN HUYGENS BUILT THE PENDULUM CLOCK.",
    "THIS INVENTION REVOLUTIONIZED TIMEKEEPING.",
    "ROBERT HOOKE CREATED HOOKE'S LAW FOR SPRINGS.",
    "HE CONNECTED SPRING MOTION TO PENDULUMS.",
    "TOGETHER, THEY FOUNDED HARMONIC MOTION.",
    "NOW, EXPERIENCE PHYSICS THROUGH GAMES!"
  ];

  useEffect(() => {
    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentSentence >= sentences.length) {
      setIsTyping(false);
      return;
    }

    const currentFullText = sentences[currentSentence];
    
    // MUCH FASTER speeds
    const typingSpeed = 30; // Fast typing
    const deletingSpeed = 15; // Very fast backspace
    const pauseTime = 400; // Very short pause

    if (phase === 'typing' && currentText.length < currentFullText.length) {
      // Typing forward
      const timeout = setTimeout(() => {
        const nextChar = currentFullText[currentText.length];
        setCurrentText(prev => prev + nextChar);
        
        if (nextChar !== ' ') {
          createKeyboardSound('keypress');
        } else {
          createKeyboardSound('space');
        }
        
        // If we just finished typing this sentence
        if (currentText.length + 1 === currentFullText.length) {
          setPhase('pausing');
        }
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } 
    else if (phase === 'pausing') {
      // Very brief pause after typing
      const timeout = setTimeout(() => {
        setPhase('deleting');
      }, pauseTime);

      return () => clearTimeout(timeout);
    }
    else if (phase === 'deleting' && currentText.length > 0) {
      // Backspacing
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev.slice(0, -1));
        createKeyboardSound('backspace');
      }, deletingSpeed);

      return () => clearTimeout(timeout);
    }
    else if (phase === 'deleting' && currentText.length === 0) {
      // Finished deleting, move to next sentence immediately
      setCurrentSentence(prev => prev + 1);
      setPhase('typing');
    }
  }, [currentText, currentSentence, phase, sentences]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        if (!isTyping) {
          onComplete?.();
        } else {
          // Skip to end if still typing
          setIsTyping(false);
          onComplete?.();
        }
      }
      if (e.key === 'Escape') {
        onComplete?.();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isTyping, onComplete]);

  // Scientist information
  const getCurrentScientist = () => {
    if (currentSentence <= 1) return { name: 'GALILEO', year: '1583', color: 'from-blue-400 to-cyan-400' };
    if (currentSentence <= 3) return { name: 'HUYGENS', year: '1656', color: 'from-purple-400 to-pink-400' };
    return { name: 'HOOKE', year: '1678', color: 'from-green-400 to-emerald-400' };
  };

  const scientist = getCurrentScientist();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-50 relative overflow-hidden">
      {/* Subtle pixel grid */}
      <div className="absolute inset-0 bg-[length:40px_40px] bg-[radial-gradient(circle_at_center,rgba(255,182,193,0.1)_1px,transparent_1px)]"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-pink-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-3 font-['Press_Start_2P']">
            <span className="text-pink-600">HARMONIC</span>
            <span className="text-rose-500"> LAB</span>
          </h1>
          <div className="inline-block px-4 py-1.5 bg-pink-200/80 backdrop-blur-sm rounded border-2 border-pink-300">
            <p className="text-gray-700 text-base md:text-lg font-['Press_Start_2P'] tracking-wider">
              PHYSICS LEARNING ADVENTURE
            </p>
          </div>
        </motion.div>

        {/* Main typing area */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 md:p-8 border-4 border-pink-400 shadow-xl mb-8">
          {/* Scientist card */}
          <motion.div
            key={currentSentence}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border-2 border-pink-300"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${scientist.color} flex items-center justify-center shadow-md`}>
                <span className="text-white text-lg font-['Press_Start_2P']">
                  {scientist.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-gray-800 text-sm font-['Press_Start_2P'] tracking-wider">
                  {scientist.name}
                </p>
                <p className="text-pink-500 text-xs font-['Press_Start_2P']">
                  {scientist.year}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-xs font-['Press_Start_2P']">
                SENTENCE {currentSentence + 1}/{sentences.length}
              </p>
              <div className="text-pink-500 text-xs font-['Press_Start_2P'] mt-1">
                {phase === 'typing' ? 'TYPING...' : phase === 'pausing' ? 'PAUSING...' : 'DELETING...'}
              </div>
            </div>
          </motion.div>

          {/* Typewriter display */}
          <div className="min-h-[100px] md:min-h-[120px] bg-gray-50/50 rounded-lg p-6 border-2 border-pink-300">
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <p className="text-lg md:text-xl font-['Press_Start_2P'] text-gray-800 tracking-wide leading-relaxed">
                  {currentText}
                  <span 
                    ref={cursorRef}
                    className={`inline-block w-[2px] h-6 md:h-7 ml-1 bg-pink-500 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}
                  />
                </p>
                {currentText.length === 0 && phase === 'typing' && (
                  <p className="text-gray-400 text-sm font-['Press_Start_2P'] mt-2">
                    STARTING SENTENCE {currentSentence + 1}...
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mt-6">
            <div className="flex justify-center gap-1 mb-2">
              {sentences.map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-1 rounded-full transition-all duration-300 ${
                    index === currentSentence 
                      ? 'bg-pink-500' 
                      : index < currentSentence 
                        ? 'bg-pink-300' 
                        : 'bg-pink-100'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-600 font-['Press_Start_2P']">
              <span>BEGIN</span>
              <span>PROGRESS: {Math.round(((currentSentence + (currentText.length / sentences[currentSentence]?.length || 0)) / sentences.length) * 100)}%</span>
              <span>END</span>
            </div>
          </div>
        </div>

        {/* Continue button - only shows when all sentences are done */}
        {!isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <button
              onClick={() => onComplete?.()}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-['Press_Start_2P'] text-sm rounded-lg hover:bg-gradient-to-r hover:from-pink-600 hover:to-rose-600 hover:scale-105 active:scale-95 transition-all border-2 border-pink-600 shadow-lg mb-4"
            >
              <span className="flex items-center justify-center gap-2">
                START PHYSICS ADVENTURE
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
            <p className="text-gray-600 text-sm font-['Press_Start_2P']">
              OR PRESS <kbd className="px-2 py-1 bg-pink-100 rounded border border-pink-300 text-pink-600 mx-1">ENTER</kbd> TO BEGIN
            </p>
          </motion.div>
        )}

        {/* Skip hint */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-6"
          >
            <p className="text-gray-500 text-xs font-['Press_Start_2P']">
              PRESS <kbd className="px-2 py-1 bg-pink-100 rounded border border-pink-300 text-pink-600 mx-1">ENTER</kbd> TO SKIP
            </p>
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-pink-300/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-gray-600 text-xs font-['Press_Start_2P']">KEYBOARD SOUND: ON</span>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-xs font-['Press_Start_2P']">
                SIMPLE HARMONIC MOTION SIMULATOR
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-xs font-['Press_Start_2P']">
                V1.0 © 2024
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-pink-100/50">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
          initial={{ width: '0%' }}
          animate={{ 
            width: isTyping 
              ? `${((currentSentence + (currentText.length / sentences[currentSentence]?.length || 0)) / sentences.length) * 100}%`
              : '100%'
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
};

export default TypingIntro;