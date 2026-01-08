// src/components/game/PhysicsGame.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Target, 
  Zap, 
  TrendingUp, 
  Timer,
  Trophy,
  BarChart3,
  Settings,
  Info,
  Sparkles,
  Award
} from 'lucide-react';

const PhysicsGame = () => {
  const [gameState, setGameState] = useState({
    isPlaying: false,
    score: 0,
    time: 0,
    level: 1,
    lives: 3,
    pendulumAngle: 30,
    gravity: 9.8,
    stringLength: 2,
    mass: 1,
    targets: [
      { id: 1, x: 30, y: 150, value: 100, hit: false },
      { id: 2, x: 200, y: 180, value: 150, hit: false },
      { id: 3, x: 150, y: 80, value: 200, hit: false },
    ],
    showTutorial: true,
    gameCompleted: false
  });

  const canvasRef = useRef(null);
  const gameIntervalRef = useRef(null);

  // Calculate pendulum period
  const calculatePeriod = () => {
    const { stringLength, gravity } = gameState;
    return 2 * Math.PI * Math.sqrt(stringLength / gravity);
  };

  // Start/Stop game
  const toggleGame = () => {
    if (gameState.isPlaying) {
      clearInterval(gameIntervalRef.current);
    } else {
      gameIntervalRef.current = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          time: prev.time + 0.1
        }));
      }, 100);
    }
    
    setGameState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  };

  // Reset game
  const resetGame = () => {
    clearInterval(gameIntervalRef.current);
    setGameState({
      isPlaying: false,
      score: 0,
      time: 0,
      level: 1,
      lives: 3,
      pendulumAngle: 30,
      gravity: 9.8,
      stringLength: 2,
      mass: 1,
      targets: [
        { id: 1, x: 30, y: 150, value: 100, hit: false },
        { id: 2, x: 200, y: 180, value: 150, hit: false },
        { id: 3, x: 150, y: 80, value: 200, hit: false },
      ],
      showTutorial: false,
      gameCompleted: false
    });
  };

  // Handle pendulum angle change
  const handleAngleChange = (angle) => {
    setGameState(prev => ({
      ...prev,
      pendulumAngle: Math.min(90, Math.max(0, angle))
    }));
  };

  // Release pendulum
  const releasePendulum = () => {
    if (!gameState.isPlaying) return;

    // Check for target hits
    const newTargets = [...gameState.targets];
    let newScore = gameState.score;
    let targetsHit = 0;

    newTargets.forEach(target => {
      if (!target.hit) {
        const distance = Math.sqrt(
          Math.pow(target.x - 250, 2) + Math.pow(target.y - 100, 2)
        );
        if (distance < 30) {
          target.hit = true;
          newScore += target.value;
          targetsHit++;
        }
      }
    });

    // Check level completion
    const allTargetsHit = newTargets.every(target => target.hit);
    if (allTargetsHit && !gameState.gameCompleted) {
      setGameState(prev => ({
        ...prev,
        gameCompleted: true,
        score: newScore + 500, // Level completion bonus
        targets: newTargets
      }));
      clearInterval(gameIntervalRef.current);
      return;
    }

    setGameState(prev => ({
      ...prev,
      score: newScore,
      targets: newTargets
    }));

    // Add score animation
    if (targetsHit > 0) {
      // Trigger score popup animation
      const scoreEvent = new CustomEvent('scorePopup', { 
        detail: { score: targetsHit * 100 } 
      });
      window.dispatchEvent(scoreEvent);
    }
  };

  // Physics parameters controls
  const updatePhysicsParam = (param, value) => {
    setGameState(prev => ({
      ...prev,
      [param]: Math.max(0.1, Math.min(20, value))
    }));
  };

  // Close tutorial
  const closeTutorial = () => {
    setGameState(prev => ({ ...prev, showTutorial: false }));
  };

  // Next level
  const nextLevel = () => {
    const newLevel = gameState.level + 1;
    setGameState({
      isPlaying: false,
      score: gameState.score,
      time: 0,
      level: newLevel,
      lives: 3,
      pendulumAngle: 30,
      gravity: 9.8 + (newLevel * 0.5),
      stringLength: 2 - (newLevel * 0.2),
      mass: 1,
      targets: [
        { id: 1, x: 30 + (newLevel * 20), y: 150, value: 100 * newLevel, hit: false },
        { id: 2, x: 200, y: 180 + (newLevel * 10), value: 150 * newLevel, hit: false },
        { id: 3, x: 150 + (newLevel * 15), y: 80, value: 200 * newLevel, hit: false },
      ],
      showTutorial: false,
      gameCompleted: false
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(gameIntervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4 md:p-8">
      {/* Game Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Physics Challenge
              <span className="ml-3 text-amber-400">Level {gameState.level}</span>
            </h1>
            <p className="text-gray-400">Master pendulum physics to hit targets</p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="text-center px-4 py-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50">
                <p className="text-gray-400 text-sm">Score</p>
                <p className="text-2xl font-bold text-amber-400">{gameState.score}</p>
              </div>
              <div className="text-center px-4 py-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50">
                <p className="text-gray-400 text-sm">Time</p>
                <p className="text-2xl font-bold text-cyan-400">{gameState.time.toFixed(1)}s</p>
              </div>
              <div className="text-center px-4 py-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50">
                <p className="text-gray-400 text-sm">Lives</p>
                <p className="text-2xl font-bold text-pink-400">{gameState.lives}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Game Controls & Physics */}
          <div className="lg:col-span-1 space-y-6">
            {/* Game Controls */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Game Controls
              </h2>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                  onClick={toggleGame}
                  className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${
                    gameState.isPlaying 
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30' 
                      : 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30'
                  }`}
                >
                  {gameState.isPlaying ? (
                    <>
                      <Pause className="w-6 h-6 text-amber-400" />
                      <span className="text-amber-300">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-6 h-6 text-emerald-400" />
                      <span className="text-emerald-300">Start</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={resetGame}
                  className="flex flex-col items-center justify-center gap-2 py-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-gray-600/50 rounded-xl font-bold transition-all"
                >
                  <RotateCcw className="w-6 h-6 text-gray-300" />
                  <span className="text-gray-300">Reset</span>
                </button>
                
                <button
                  onClick={releasePendulum}
                  disabled={!gameState.isPlaying}
                  className="flex flex-col items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 hover:border-blue-400/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all"
                >
                  <Target className="w-6 h-6 text-cyan-400" />
                  <span className="text-cyan-300">Release</span>
                </button>
              </div>

              {/* Pendulum Control */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Pendulum Angle
                  </h3>
                  <span className="text-amber-400 font-bold text-xl">{gameState.pendulumAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={gameState.pendulumAngle}
                  onChange={(e) => handleAngleChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-amber-500 [&::-webkit-slider-thumb]:to-orange-500"
                />
              </div>
            </div>

            {/* Physics Parameters */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-400" />
                Physics Parameters
              </h2>
              
              {[
                { label: 'Gravity (m/s²)', value: gameState.gravity, min: 1, max: 20, step: 0.1, param: 'gravity', color: 'from-blue-500 to-cyan-500' },
                { label: 'String Length (m)', value: gameState.stringLength, min: 0.5, max: 5, step: 0.1, param: 'stringLength', color: 'from-emerald-500 to-teal-500' },
                { label: 'Mass (kg)', value: gameState.mass, min: 0.1, max: 10, step: 0.1, param: 'mass', color: 'from-purple-500 to-pink-500' },
              ].map((param, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">{param.label}</span>
                    <span className={`font-bold bg-gradient-to-r ${param.color} bg-clip-text text-transparent`}>
                      {param.value}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={param.min}
                    max={param.max}
                    step={param.step}
                    value={param.value}
                    onChange={(e) => updatePhysicsParam(param.param, parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-cyan-500"
                  />
                </div>
              ))}

              <div className="mt-6 p-4 bg-gray-800/30 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Period:</span>
                  <span className="text-amber-400 font-bold">
                    {calculatePeriod().toFixed(2)}s
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Panel - Game Canvas */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 h-full min-h-[600px] overflow-hidden">
              {/* Pendulum Visualization */}
              <div className="relative w-full h-full">
                {/* Pivot Point */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border-4 border-gray-700 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                  </div>
                </div>

                {/* Pendulum String & Bob */}
                <motion.div
                  className="absolute top-[60px] left-1/2 w-1 h-64 bg-gradient-to-b from-gray-600 to-gray-800 origin-top"
                  style={{ 
                    rotate: `${gameState.pendulumAngle}deg`,
                    transformOrigin: 'top center'
                  }}
                  animate={{ 
                    rotate: gameState.isPlaying ? 
                      [`${gameState.pendulumAngle}deg`, `-${gameState.pendulumAngle}deg`, `${gameState.pendulumAngle}deg`] : 
                      `${gameState.pendulumAngle}deg`
                  }}
                  transition={{ 
                    duration: calculatePeriod(),
                    repeat: gameState.isPlaying ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                >
                  {/* Pendulum Bob */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30 cursor-pointer"
                      onClick={releasePendulum}
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Targets */}
                {gameState.targets.map((target, index) => (
                  <motion.div
                    key={target.id}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: target.hit ? 0 : 1,
                      y: gameState.isPlaying ? [0, -10, 0] : 0
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: gameState.isPlaying && !target.hit ? Infinity : 0,
                      delay: index * 0.3
                    }}
                    className={`absolute w-16 h-16 rounded-full flex items-center justify-center shadow-2xl cursor-pointer ${
                      target.hit ? 'opacity-30' : 'opacity-100'
                    }`}
                    style={{
                      left: `${target.x}px`,
                      top: `${target.y}px`,
                      background: target.hit 
                        ? 'linear-gradient(135deg, #374151, #1f2937)' 
                        : 'linear-gradient(135deg, #ec4899, #8b5cf6)'
                    }}
                    onClick={() => {
                      if (!target.hit && gameState.isPlaying) {
                        const newTargets = [...gameState.targets];
                        newTargets[index].hit = true;
                        setGameState(prev => ({
                          ...prev,
                          targets: newTargets,
                          score: prev.score + target.value
                        }));
                      }
                    }}
                  >
                    {!target.hit && (
                      <>
                        <Award className="w-8 h-8 text-white" />
                        <span className="absolute -bottom-6 text-white font-bold">{target.value}</span>
                      </>
                    )}
                  </motion.div>
                ))}

                {/* Grid Lines */}
                <div className="absolute inset-0 opacity-10">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <React.Fragment key={i}>
                      <div className="absolute left-0 right-0 h-px bg-gray-500" style={{ top: `${i * 10}%` }} />
                      <div className="absolute top-0 bottom-0 w-px bg-gray-500" style={{ left: `${i * 10}%` }} />
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Game Status Overlay */}
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/80 backdrop-blur-sm rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${gameState.isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  <span className="text-gray-300">
                    {gameState.isPlaying ? 'Game Active' : 'Paused'}
                  </span>
                </div>
              </div>

              {/* Level Complete Overlay */}
              {gameState.gameCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                >
                  <div className="text-center p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-amber-500/30 max-w-md">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                      <Trophy className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Level Complete!</h2>
                    <p className="text-gray-300 mb-6">You've mastered level {gameState.level}</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <p className="text-gray-400">Final Score</p>
                        <p className="text-2xl font-bold text-amber-400">{gameState.score}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400">Time</p>
                        <p className="text-2xl font-bold text-cyan-400">{gameState.time.toFixed(1)}s</p>
                      </div>
                    </div>
                    <button
                      onClick={nextLevel}
                      className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all"
                    >
                      Next Level
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700/50">
            <p className="text-gray-400 text-sm">Accuracy</p>
            <p className="text-2xl font-bold text-cyan-400">
              {gameState.targets.filter(t => t.hit).length === 0 ? '0%' : 
               `${Math.round((gameState.targets.filter(t => t.hit).length / gameState.targets.length) * 100)}%`}
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700/50">
            <p className="text-gray-400 text-sm">Targets Hit</p>
            <p className="text-2xl font-bold text-emerald-400">
              {gameState.targets.filter(t => t.hit).length}/{gameState.targets.length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700/50">
            <p className="text-gray-400 text-sm">Period</p>
            <p className="text-2xl font-bold text-amber-400">{calculatePeriod().toFixed(2)}s</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700/50">
            <p className="text-gray-400 text-sm">Energy</p>
            <p className="text-2xl font-bold text-pink-400">
              {(0.5 * gameState.mass * Math.pow(gameState.pendulumAngle * 0.1, 2)).toFixed(1)}J
            </p>
          </div>
        </div>

        {/* Tutorial Overlay */}
        {gameState.showTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 max-w-2xl mx-4 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Info className="w-6 h-6 text-blue-400" />
                How to Play Physics Challenge
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Adjust Pendulum</h3>
                    <p className="text-gray-300">Use the slider to set the initial angle. Larger angles mean more energy!</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Settings className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Tune Physics</h3>
                    <p className="text-gray-300">Adjust gravity, string length, and mass to change the pendulum's behavior.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Hit Targets</h3>
                    <p className="text-gray-300">Click the pendulum bob or use the Release button when it aligns with targets.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-4 h-4 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Complete Levels</h3>
                    <p className="text-gray-300">Hit all targets to complete the level and unlock harder challenges.</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={closeTutorial}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Start Playing
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Make sure to export default!
export default PhysicsGame;