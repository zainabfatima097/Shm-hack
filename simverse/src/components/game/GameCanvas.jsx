import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Target, Zap, TrendingUp, Clock, Trophy, Award } from 'lucide-react';

const GameCanvas = ({ onComplete, onSkip }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [pendulumAngle, setPendulumAngle] = useState(30);
  const [targetsHit, setTargetsHit] = useState(0);
  const [accuracy, setAccuracy] = useState(85);
  
  // Remove unused canvasRef
  // const canvasRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setTime(prev => prev + 1);
        // Simulate hitting targets
        if (time % 5 === 0 && time > 0) {
          setScore(prev => prev + 100);
          setTargetsHit(prev => prev + 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, time]);

  const handleStart = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTime(0);
    setScore(0);
    setPendulumAngle(30);
    setTargetsHit(0);
    setAccuracy(85);
  };

  const handleTargetHit = () => {
    const points = 100 + Math.floor(Math.random() * 50);
    setScore(prev => prev + points);
    setTargetsHit(prev => prev + 1);
    setAccuracy(prev => Math.min(100, prev + 2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Game Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 font-['Press_Start_2P']">
              PENDULUM <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">CHALLENGE</span>
            </h1>
            <p className="text-gray-600 text-lg font-['Arcade_Classic']">
              Control the pendulum to hit targets and earn points
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="text-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-pink-200 shadow-lg">
              <p className="text-gray-600 text-sm font-['Arcade_Classic']">SCORE</p>
              <p className="text-3xl font-bold text-pink-600 font-['Press_Start_2P']">{score}</p>
            </div>
            <div className="text-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 shadow-lg">
              <p className="text-gray-600 text-sm font-['Arcade_Classic']">TIME</p>
              <p className="text-3xl font-bold text-purple-600 font-['Press_Start_2P']">{time}s</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Game Controls */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-200 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Press_Start_2P']">GAME CONTROLS</h2>
              
              {/* Control Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={isPlaying ? handlePause : handleStart}
                  className={`flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all shadow-lg ${
                    isPlaying 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white' 
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5" />
                      <span className="font-['Arcade_Classic']">PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span className="font-['Arcade_Classic']">START</span>
                    </>
                  )}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 rounded-xl font-bold transition-all shadow-lg border border-gray-300"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span className="font-['Arcade_Classic']">RESET</span>
                </motion.button>
              </div>

              {/* Pendulum Control */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 font-['Arcade_Classic']">PENDULUM ANGLE</h3>
                  <span className="text-pink-600 font-bold font-['Press_Start_2P']">{pendulumAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={pendulumAngle}
                  onChange={(e) => setPendulumAngle(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-pink-500 [&::-webkit-slider-thumb]:to-purple-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2 font-['Arcade_Classic']">
                  <span>0°</span>
                  <span>45°</span>
                  <span>90°</span>
                </div>
              </div>

              {/* Game Instructions */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-5 border border-pink-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 font-['Press_Start_2P']">HOW TO PLAY</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-pink-100">
                      <Target className="w-4 h-4 text-pink-600" />
                    </div>
                    <span className="text-gray-700 text-sm flex-1">Adjust pendulum angle to hit targets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <Zap className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700 text-sm flex-1">Release at the right moment for bonus points</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-gray-700 text-sm flex-1">Score increases with precision and timing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Middle Panel - Game Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200 shadow-lg h-full">
              <div className="relative h-full min-h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
                {/* Pendulum Visualization */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                  {/* Pendulum Pivot */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 border-4 border-white shadow-xl" />
                  
                  {/* Pendulum String */}
                  <motion.div
                    className="w-2 h-72 bg-gradient-to-b from-pink-400 to-purple-400 mx-auto origin-top"
                    style={{ 
                      rotate: `${pendulumAngle}deg`,
                      transformOrigin: 'top center'
                    }}
                    animate={{ 
                      rotate: isPlaying ? [`${pendulumAngle}deg`, `-${pendulumAngle}deg`, `${pendulumAngle}deg`] : `${pendulumAngle}deg`
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: isPlaying ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Pendulum Bob */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center shadow-2xl">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center border-4 border-white">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Targets */}
                <div className="absolute bottom-32 left-1/4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-2xl border-4 border-white cursor-pointer"
                    onClick={handleTargetHit}
                  >
                    <span className="text-white font-bold font-['Press_Start_2P'] text-sm">100</span>
                  </motion.div>
                </div>
                <div className="absolute bottom-40 right-1/4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl border-4 border-white cursor-pointer"
                    onClick={handleTargetHit}
                  >
                    <span className="text-white font-bold font-['Press_Start_2P'] text-sm">150</span>
                  </motion.div>
                </div>

                {/* Score Popups */}
                {isPlaying && time % 3 === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -50 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <span className="text-2xl font-bold text-emerald-500 font-['Press_Start_2P']">+100!</span>
                  </motion.div>
                )}

                {/* Game Status */}
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-300">
                    <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-pink-500'}`} />
                    <span className="text-gray-700 font-['Arcade_Classic']">{isPlaying ? 'PLAYING' : 'PAUSED'}</span>
                  </div>
                </div>

                {/* Physics Formula */}
                <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-pink-300">
                  <p className="text-gray-600 text-xs font-['Arcade_Classic'] mb-1">PHYSICS FORMULA</p>
                  <p className="text-pink-600 font-bold font-['Press_Start_2P'] text-sm">T = 2π √(L/g)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 text-center border border-pink-200 shadow-lg">
            <Award className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
            <p className="text-gray-600 text-sm font-['Arcade_Classic']">ACCURACY</p>
            <p className="text-2xl font-bold text-cyan-600 font-['Press_Start_2P']">{accuracy}%</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 text-center border border-emerald-200 shadow-lg">
            <Target className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-gray-600 text-sm font-['Arcade_Classic']">TARGETS HIT</p>
            <p className="text-2xl font-bold text-emerald-600 font-['Press_Start_2P']">{targetsHit}/10</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 text-center border border-amber-200 shadow-lg">
            <Clock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <p className="text-gray-600 text-sm font-['Arcade_Classic']">BEST TIME</p>
            <p className="text-2xl font-bold text-amber-600 font-['Press_Start_2P']">24.5s</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 text-center border border-pink-200 shadow-lg">
            <Trophy className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            <p className="text-gray-600 text-sm font-['Arcade_Classic']">HIGH SCORE</p>
            <p className="text-2xl font-bold text-pink-600 font-['Press_Start_2P']">1250</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSkip}
            className="px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 rounded-xl font-bold transition-all shadow-lg border border-gray-300 font-['Press_Start_2P'] text-sm"
          >
            BACK TO GAMES
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-pink-300/50 font-['Press_Start_2P'] text-sm"
          >
            PLAY CHALLENGE
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default GameCanvas;