import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, Zap, Target, Brain, Trophy, ArrowRight, Users, Clock, Sparkles, Play, Star } from 'lucide-react';
import TypingIntro from '../components/game/TypingIntro';

const GamesPage = () => {
  const [showIntro, setShowIntro] = useState(true);

  // Check if user has seen intro before
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('physicsGamesIntroSeen');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem('physicsGamesIntroSeen', 'true');
    setShowIntro(false);
  };

  const games = [
    {
      id: 'pendulum-challenge',
      title: 'Pendulum Challenge',
      description: 'Master the physics of pendulum motion with interactive puzzles and timed challenges',
      path: '/game',
      color: 'from-pink-500 to-purple-500',
      icon: <Target className="w-10 h-10" />,
      difficulty: 'Intermediate',
      players: 'Single Player',
      duration: '10-15 min',
      category: 'Physics Puzzle',
      featured: true
    },
    {
      id: 'spring-mass-race',
      title: 'Spring Mass Race',
      description: 'Race against time with spring-mass system calculations and harmonic motion',
      path: '/coming-soon',
      color: 'from-blue-500 to-cyan-500',
      icon: <Zap className="w-10 h-10" />,
      difficulty: 'Beginner',
      players: 'Multiplayer',
      duration: '5-10 min',
      category: 'Speed Challenge',
      featured: false
    },
    {
      id: 'wave-wizard',
      title: 'Wave Wizard',
      description: 'Create perfect harmonic waves and match patterns using SHM principles',
      path: '/coming-soon',
      color: 'from-emerald-500 to-teal-500',
      icon: <Sparkles className="w-10 h-10" />,
      difficulty: 'Advanced',
      players: 'Single Player',
      duration: '15-20 min',
      category: 'Pattern Matching',
      featured: false
    },
    {
      id: 'physics-trivia',
      title: 'Physics Trivia',
      description: 'Test your SHM knowledge with timed questions and compete for high scores',
      path: '/quiz',
      color: 'from-amber-500 to-orange-500',
      icon: <Brain className="w-10 h-10" />,
      difficulty: 'All Levels',
      players: 'Multiplayer',
      duration: '5 min',
      category: 'Trivia',
      featured: true
    }
  ];

  const recentGames = [
    { name: 'Alex Physics', game: 'Pendulum Challenge', score: 2450, time: '2:30' },
    { name: 'Sarah Newton', game: 'Physics Trivia', score: 1800, time: '1:45' },
    { name: 'Mike Faraday', game: 'Pendulum Challenge', score: 2100, time: '3:15' },
  ];

  // Show typing intro first
  if (showIntro) {
    return <TypingIntro onComplete={handleIntroComplete} />;
  }

  // Main games hub
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 50 - 25],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-xl"
            >
              <Gamepad2 className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold font-['Press_Start_2P'] bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                PHYSICS GAMES HUB
              </h1>
              <p className="text-gray-600 font-press-start">Interactive Physics Learning Platform</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowIntro(true)}
              className="ml-auto px-4 py-2 bg-white/80 backdrop-blur-sm border border-pink-300 text-pink-700 rounded-xl text-sm font-['Arcade_Classic'] hover:bg-white transition-all"
            >
              REPLAY INTRO
            </motion.button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-200 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 font-display">Master Physics</h3>
                  <p className="text-sm text-gray-600">Through gameplay</p>
                </div>
              </div>
              <p className="text-gray-700">Learn complex physics concepts through interactive challenges and games.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 font-['Arcade_Classic']">Compete & Learn</h3>
                  <p className="text-sm text-gray-600">Track your progress</p>
                </div>
              </div>
              <p className="text-gray-700">Compete with friends and track your learning progress with detailed analytics.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 font-['Arcade_Classic']">Interactive Learning</h3>
                  <p className="text-sm text-gray-600">Hands-on experience</p>
                </div>
              </div>
              <p className="text-gray-700">Experience physics in action with real-time simulations and visual feedback.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Featured Games */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800 font-['Press_Start_2P']">FEATURED GAMES</h2>
            <div className="flex items-center gap-2 text-pink-600">
              <Star className="w-5 h-5" />
              <span className="font-medium font-['Arcade_Classic']">Most Popular</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {games.filter(game => game.featured).map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-white to-white/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-200 shadow-2xl"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${game.color} flex items-center justify-center shadow-lg`}>
                      {game.icon}
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 text-xs font-semibold font-['Arcade_Classic']">
                        {game.category}
                      </span>
                      <div className="mt-2 flex items-center gap-2 justify-end">
                        <span className="text-sm text-gray-600 font-['Arcade_Classic']">{game.difficulty}</span>
                        <div className={`w-2 h-2 rounded-full ${
                          game.difficulty === 'Beginner' ? 'bg-green-500' :
                          game.difficulty === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3 font-['Press_Start_2P']">{game.title}</h3>
                  <p className="text-gray-600 mb-6">{game.description}</p>

                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700 font-['Arcade_Classic']">{game.players}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700 font-['Arcade_Classic']">{game.duration}</span>
                    </div>
                  </div>

                  <Link
                    to={game.path}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-pink-300/50 transition-all duration-300 font-['Press_Start_2P'] text-sm"
                  >
                    <Play className="w-5 h-5" />
                    PLAY NOW
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Games */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 font-['Press_Start_2P']">ALL GAMES</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all group"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${game.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                  {game.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 text-center font-['Press_Start_2P']">{game.title}</h3>
                <p className="text-sm text-gray-600 mb-4 text-center font-['Arcade_Classic']">{game.category}</p>
                <Link
                  to={game.path}
                  className="block w-full py-2 text-center bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 font-medium rounded-lg hover:from-pink-200 hover:to-purple-200 hover:text-pink-800 transition-all font-['Arcade_Classic'] text-sm border border-pink-300"
                >
                  PLAY GAME
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Press_Start_2P']">RECENT ACTIVITY</h2>
          <div className="space-y-4">
            {recentGames.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl hover:from-pink-100 hover:to-purple-100 transition-all border border-pink-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold font-['Press_Start_2P']">
                    {activity.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 font-['Arcade_Classic']">{activity.name}</h4>
                    <p className="text-sm text-gray-600 font-['Arcade_Classic']">Played {activity.game}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-pink-600 font-['Press_Start_2P']">SCORE: {activity.score}</div>
                  <div className="text-sm text-gray-600 font-arcade">Time: {activity.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-pink-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm font-arcade">
            Physics Games Hub v1.0 • Interactive Learning Platform •{' '}
            <button 
              onClick={() => setShowIntro(true)}
              className="text-pink-600 hover:text-pink-700 transition-colors font-bold"
            >
              Restart Intro
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;