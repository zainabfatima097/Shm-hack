// pages/QuizPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, CheckCircle, XCircle, 
  Zap, Target, Clock, TrendingUp,
  Brain, Award, Star,
  Search, Activity, Sparkles, 
  ChevronRight, ChevronLeft, RefreshCw,
  BarChart3, Calculator, Hash,
  Cpu
} from 'lucide-react';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [quizMode, setQuizMode] = useState('practice');
  const [searchTerm, setSearchTerm] = useState('');

  const physicsQuizzes = {
    basics: {
      title: 'SHM Basics',
      description: 'Fundamental concepts of Simple Harmonic Motion',
      icon: <Brain className="w-6 h-6" />,
      gradient: 'from-pink-500 to-purple-500',
      type: 'basics',
      difficulty: 'Beginner',
      questions: [
        {
          question: 'What defines Simple Harmonic Motion?',
          options: [
            'Motion where acceleration is proportional to displacement and directed toward equilibrium',
            'Motion with constant velocity',
            'Motion under constant acceleration',
            'Circular motion with constant radius'
          ],
          correctAnswer: 0,
          explanation: 'SHM is characterized by acceleration ∝ -displacement (F = -kx)'
        },
        {
          question: 'The restoring force in SHM is always directed:',
          options: [
            'Toward the equilibrium position',
            'Away from the equilibrium position',
            'In the direction of motion',
            'Perpendicular to displacement'
          ],
          correctAnswer: 0,
          explanation: 'Restoring force always acts to bring the system back to equilibrium'
        },
        {
          question: 'What is the phase of oscillation at t=0 called?',
          options: [
            'Initial phase',
            'Final phase',
            'Phase constant',
            'Both A and C'
          ],
          correctAnswer: 3,
          explanation: 'Phase constant (φ) determines initial position and velocity'
        }
      ]
    },
    springMass: {
      title: 'Spring-Mass System',
      description: 'Questions about spring-mass oscillators',
      icon: <Zap className="w-6 h-6" />,
      gradient: 'from-emerald-500 to-cyan-500',
      type: 'spring',
      difficulty: 'Intermediate',
      questions: [
        {
          question: 'For a spring-mass system, the time period depends on:',
          options: [
            'Mass and spring constant only',
            'Amplitude and mass',
            'Spring constant and amplitude',
            'Mass, spring constant, and amplitude'
          ],
          correctAnswer: 0,
          explanation: 'T = 2π√(m/k), independent of amplitude for small oscillations'
        },
        {
          question: 'If spring constant is doubled, the time period becomes:',
          options: [
            '1/√2 times original',
            '√2 times original',
            '2 times original',
            '4 times original'
          ],
          correctAnswer: 0,
          explanation: 'T ∝ 1/√k, so if k doubles, T becomes 1/√2 times'
        },
        {
          question: 'Maximum velocity in spring-mass system occurs at:',
          options: [
            'Equilibrium position',
            'Extreme positions',
            'Midway between extremes',
            'Velocity is constant'
          ],
          correctAnswer: 0,
          explanation: 'Velocity is maximum at equilibrium (x=0)'
        }
      ]
    },
    pendulum: {
      title: 'Simple Pendulum',
      description: 'Questions about pendulum motion',
      icon: <Target className="w-6 h-6" />,
      gradient: 'from-orange-500 to-amber-500',
      type: 'pendulum',
      difficulty: 'Intermediate',
      questions: [
        {
          question: 'Time period of simple pendulum depends on:',
          options: [
            'Length and acceleration due to gravity',
            'Mass and length',
            'Amplitude and mass',
            'Length only'
          ],
          correctAnswer: 0,
          explanation: 'T = 2π√(L/g), independent of mass for small angles'
        },
        {
          question: 'If length of pendulum is quadrupled, time period becomes:',
          options: [
            '2 times original',
            '4 times original',
            '√2 times original',
            'Same as original'
          ],
          correctAnswer: 0,
          explanation: 'T ∝ √L, so if L becomes 4L, T becomes 2T'
        },
        {
          question: 'For a simple pendulum, restoring force is provided by:',
          options: [
            'Component of gravity along tangent',
            'Tension in the string',
            'Centripetal force',
            'All of the above'
          ],
          correctAnswer: 0,
          explanation: 'The tangential component of gravity acts as restoring force'
        }
      ]
    },
    energy: {
      title: 'Energy in SHM',
      description: 'Kinetic and potential energy questions',
      icon: <Activity className="w-6 h-6" />,
      gradient: 'from-blue-500 to-indigo-500',
      type: 'energy',
      difficulty: 'Advanced',
      questions: [
        {
          question: 'Total energy in SHM is:',
          options: [
            'Constant',
            'Maximum at extremes',
            'Minimum at equilibrium',
            'Varies sinusoidally'
          ],
          correctAnswer: 0,
          explanation: 'In ideal SHM, total mechanical energy is conserved'
        },
        {
          question: 'At extreme positions, the energy is:',
          options: [
            'All potential',
            'All kinetic',
            'Half potential, half kinetic',
            'Maximum kinetic'
          ],
          correctAnswer: 0,
          explanation: 'At extremes, velocity = 0, so KE = 0, all energy is potential'
        },
        {
          question: 'When KE = PE in SHM, displacement is:',
          options: [
            'x = A/√2',
            'x = A/2',
            'x = A',
            'x = 0'
          ],
          correctAnswer: 0,
          explanation: 'When KE = PE, x = ±A/√2 from energy equations'
        }
      ]
    }
  };

  const [selectedQuiz, setSelectedQuiz] = useState('basics');
  const currentQuiz = physicsQuizzes[selectedQuiz];
  const questions = currentQuiz.questions;

  const quizStats = [
    {
      title: 'Total Questions',
      value: Object.values(physicsQuizzes).reduce((sum, quiz) => sum + quiz.questions.length, 0),
      change: '+12%',
      icon: <Cpu className="w-6 h-6" />,
      gradient: 'from-pink-500 to-purple-500'
    },
    {
      title: 'Average Score',
      value: '82%',
      change: '+5%',
      icon: <Target className="w-6 h-6" />,
      gradient: 'from-emerald-500 to-cyan-500'
    },
    {
      title: 'Fastest Time',
      value: '48s',
      change: '-12s',
      icon: <Clock className="w-6 h-6" />,
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      title: 'Quiz Completed',
      value: '156',
      change: '+32%',
      icon: <Trophy className="w-6 h-6" />,
      gradient: 'from-blue-500 to-indigo-500'
    }
  ];

  const quickActions = [
    {
      title: 'Practice Mode',
      description: 'Learn at your own pace',
      icon: <Brain className="w-6 h-6" />,
      gradient: 'from-pink-500 to-purple-500',
      action: () => startQuiz('practice')
    },
    {
      title: 'Timed Challenge',
      description: 'Test speed and accuracy',
      icon: <Clock className="w-6 h-6" />,
      gradient: 'from-emerald-500 to-cyan-500',
      action: () => startQuiz('timed')
    },
    {
      title: 'Review Progress',
      description: 'View your quiz history',
      icon: <BarChart3 className="w-6 h-6" />,
      gradient: 'from-orange-500 to-amber-500',
      action: () => console.log('Review Progress')
    },
    {
      title: 'Flashcards',
      description: 'Quick concept review',
      icon: <Target className="w-6 h-6" />,
      gradient: 'from-blue-500 to-indigo-500',
      action: () => console.log('Flashcards')
    }
  ];

  // Timer effect
  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  const startQuiz = (mode) => {
    setQuizStarted(true);
    setQuizMode(mode);
    if (mode === 'timed') {
      setTimeLeft(60);
      setTimerActive(true);
    }
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswerHistory([]);
  };

  const handleTimeUp = () => {
    setTimerActive(false);
    setShowResult(true);
  };

  const handleAnswerSelect = (index) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setAnswerHistory(prev => [...prev, {
      question: currentQuestion,
      selected: index,
      correct: isCorrect,
      time: 60 - timeLeft
    }]);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setTimerActive(false);
        setShowResult(true);
      }
    }, 1500);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(null);
      const prevAnswer = answerHistory.find(h => h.question === currentQuestion - 1);
      if (prevAnswer) {
        setSelectedAnswer(prevAnswer.selected);
      }
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setShowResult(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setTimeLeft(60);
    setTimerActive(false);
    setAnswerHistory([]);
  };

  const getGrade = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return { grade: 'A+', color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
    if (percentage >= 80) return { grade: 'A', color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-500', bg: 'bg-blue-500/10' };
    if (percentage >= 60) return { grade: 'C', color: 'text-amber-500', bg: 'bg-amber-500/10' };
    return { grade: 'F', color: 'text-red-500', bg: 'bg-red-500/10' };
  };

  const calculateAccuracy = () => {
    return answerHistory.length > 0 
      ? (answerHistory.filter(h => h.correct).length / answerHistory.length) * 100 
      : 0;
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-display">
                  SHM <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Quiz Challenge
                  </span>
                </h1>
                <p className="text-gray-600 text-lg">
                  Test your knowledge of Simple Harmonic Motion with these challenging questions
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => startQuiz('practice')}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-pink-300 transition-all"
              >
                <Trophy size={20} />
                Start Quick Quiz
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quizStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 hover:border-pink-300 transition-all shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                    {stat.icon}
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 rounded-full">
                    <TrendingUp size={12} className="text-emerald-500" />
                    <span className="text-emerald-600 text-xs font-semibold">{stat.change}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quiz Selection */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 font-display">
                    <Brain className="w-5 h-5 text-pink-500" />
                    Select Quiz Category
                  </h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search quizzes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white/60 border border-pink-200 rounded-xl px-10 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(physicsQuizzes)
                    .filter(([key, quiz]) => 
                      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(([key, quiz]) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedQuiz(key)}
                      className={`bg-white/60 backdrop-blur-sm border rounded-xl p-5 text-left transition-all duration-300 group ${
                        selectedQuiz === key 
                          ? 'border-pink-300 bg-pink-50/50' 
                          : 'border-pink-200 hover:border-pink-300'
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${quiz.gradient}`}>
                          {quiz.icon}
                        </div>
                        <div>
                          <h3 className="text-gray-800 font-semibold">{quiz.title}</h3>
                          <p className="text-gray-600 text-sm">{quiz.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-1 bg-pink-100 text-pink-600 rounded-lg text-xs font-medium">
                          {quiz.difficulty}
                        </span>
                        <span className="text-gray-600 text-sm">
                          {quiz.questions.length} questions
                        </span>
                      </div>
                      <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${quiz.gradient} rounded-full transition-all duration-500 ${
                        selectedQuiz === key ? 'w-full' : ''
                      }`} />
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 font-display">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    Quick Actions
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Activity size={14} className="text-emerald-500 animate-pulse" />
                    Active
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      onClick={action.action}
                      className="bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl p-5 hover:border-pink-300 transition-all duration-300 group text-left"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${action.gradient}`}>
                          {action.icon}
                        </div>
                        <div>
                          <h3 className="text-gray-800 font-semibold">{action.title}</h3>
                          <p className="text-gray-600 text-sm">{action.description}</p>
                        </div>
                      </div>
                      <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${action.gradient} rounded-full transition-all duration-500`} />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Selected Quiz Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 font-display">
                    <Star className="w-5 h-5 text-amber-500" />
                    Selected Quiz
                  </h2>
                  <div className={`px-3 py-1 rounded-lg bg-gradient-to-br ${currentQuiz.gradient} text-white text-sm font-medium`}>
                    {currentQuiz.difficulty}
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${currentQuiz.gradient}`}>
                      {currentQuiz.icon}
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-semibold">{currentQuiz.title}</h3>
                      <p className="text-gray-600 text-sm">{currentQuiz.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-pink-50/50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-gray-800 mb-1">{currentQuiz.questions.length}</div>
                      <div className="text-gray-600 text-sm">Questions</div>
                    </div>
                    <div className="bg-purple-50/50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-gray-800 mb-1">10 min</div>
                      <div className="text-gray-600 text-sm">Avg. Time</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startQuiz('practice')}
                    className="flex-1 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-300 transition-all"
                  >
                    Practice
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startQuiz('timed')}
                    className="flex-1 py-2.5 bg-white/60 backdrop-blur-sm border border-pink-300 text-gray-800 rounded-xl font-semibold hover:bg-white/80 transition-colors"
                  >
                    Timed
                  </motion.button>
                </div>
              </motion.div>

              {/* Quiz Tips */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="w-5 h-5 text-pink-500" />
                  <h3 className="text-gray-800 font-semibold font-display">Quiz Tip</h3>
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  In SHM, remember that the restoring force is always proportional to displacement and directed toward the equilibrium position.
                </p>
                <div className="text-xs text-gray-600">
                  <span className="font-medium">Formula:</span> F = -kx
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const grade = getGrade();
    const accuracy = calculateAccuracy();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Result Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-6">
              <div className={`w-24 h-24 mx-auto rounded-full ${grade.bg} border-4 border-white shadow-lg flex items-center justify-center`}>
                <Award className={`w-12 h-12 ${grade.color}`} />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-display">Quiz Complete!</h1>
            <p className="text-gray-600 text-lg">
              {quizMode === 'timed' ? 'Timed Challenge Finished' : 'Practice Session Completed'}
            </p>
          </motion.div>

          {/* Score Card */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-8 mb-8 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-800 mb-2">{score}/{questions.length}</div>
                <div className="text-gray-600">Score</div>
                <div className={`mt-2 px-3 py-1 rounded-full inline-block ${grade.bg}`}>
                  <span className={grade.color}>Grade: {grade.grade}</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-800 mb-2">{accuracy.toFixed(1)}%</div>
                <div className="text-gray-600">Accuracy</div>
                <div className="mt-4 h-2 bg-pink-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${accuracy}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-800 mb-2">
                  {quizMode === 'timed' ? `${60 - timeLeft}s` : '∞'}
                </div>
                <div className="text-gray-600">Time Taken</div>
                {quizMode === 'timed' && (
                  <div className="mt-2 text-sm text-gray-600">
                    {timeLeft > 0 ? `${timeLeft}s remaining` : 'Time expired'}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Question Review */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3 font-display">
              <Brain className="w-5 h-5 text-pink-500" />
              Review Answers
            </h3>
            
            <div className="space-y-4">
              {questions.map((q, index) => {
                const answer = answerHistory.find(h => h.question === index);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border ${
                      answer?.correct 
                        ? 'bg-emerald-500/10 border-emerald-500/20' 
                        : 'bg-red-500/10 border-red-500/20'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        answer?.correct ? 'bg-emerald-500/20' : 'bg-red-500/20'
                      }`}>
                        {answer?.correct ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-gray-800 font-medium">Q{index + 1}: {q.question}</h4>
                        <p className="text-gray-700 text-sm mt-2">
                          <span className="font-semibold">Correct Answer:</span> {q.options[q.correctAnswer]}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">{q.explanation}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restartQuiz}
              className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-300 transition-all flex items-center justify-center gap-3"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setQuizStarted(false);
                setShowResult(false);
              }}
              className="flex-1 py-3 bg-white/60 backdrop-blur-sm border border-pink-300 text-gray-800 rounded-xl font-semibold hover:bg-white/80 transition-colors flex items-center justify-center gap-3"
            >
              <Brain className="w-5 h-5" />
              Choose Another Quiz
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Quiz Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 font-display">{currentQuiz.title} Quiz</h1>
              <p className="text-gray-600">{currentQuiz.description}</p>
            </div>
            
            <div className="flex items-center gap-4">
              {quizMode === 'timed' && (
                <div className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-500" />
                    <span className="text-gray-800 font-mono">{timeLeft}s</span>
                  </div>
                </div>
              )}
              
              <div className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-pink-500" />
                  <span className="text-gray-800">
                    {currentQuestion + 1}/{questions.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-pink-100 rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
        </div>

        {/* Current Question */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-8 mb-8 shadow-lg"
        >
          <div className="mb-2">
            <span className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-600 rounded-full text-sm font-medium">
              Question {currentQuestion + 1}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-8 font-display">
            {questions[currentQuestion].question}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => {
              const isCorrect = index === questions[currentQuestion].correctAnswer;
              const isSelected = selectedAnswer === index;
              
              let bgClass = 'bg-white/60 hover:bg-pink-50/50';
              let borderClass = 'border-pink-200';
              let textClass = 'text-gray-800';
              
              if (selectedAnswer !== null) {
                if (isSelected) {
                  bgClass = isCorrect ? 'bg-emerald-500/10' : 'bg-red-500/10';
                  borderClass = isCorrect ? 'border-emerald-500/30' : 'border-red-500/30';
                  textClass = isCorrect ? 'text-emerald-600' : 'text-red-600';
                } else if (isCorrect) {
                  bgClass = 'bg-emerald-500/10';
                  borderClass = 'border-emerald-500/20';
                  textClass = 'text-emerald-600';
                }
              }
              
              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                  whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 text-left rounded-xl border transition-all duration-300 ${bgClass} ${borderClass} ${
                    selectedAnswer === null ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        selectedAnswer === null 
                          ? 'bg-pink-100 text-pink-600' 
                          : isSelected
                            ? isCorrect 
                              ? 'bg-emerald-500 text-white' 
                              : 'bg-red-500 text-white'
                            : isCorrect
                              ? 'bg-emerald-500 text-white'
                              : 'bg-pink-100 text-pink-600'
                      }`}>
                        <span className="font-semibold">
                          {String.fromCharCode(65 + index)}
                        </span>
                      </div>
                      <span className={`text-lg ${textClass}`}>
                        {option}
                      </span>
                    </div>
                    
                    {selectedAnswer !== null && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    )}
                    {selectedAnswer !== null && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation (after answer) */}
          {selectedAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-pink-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <Brain className="w-5 h-5 text-pink-500" />
                <span className="text-gray-800 font-medium">Explanation</span>
              </div>
              <p className="text-gray-700">
                {questions[currentQuestion].explanation}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-3 ${
              currentQuestion === 0
                ? 'bg-white/30 text-gray-400 cursor-not-allowed'
                : 'bg-white/60 text-gray-800 hover:bg-white/80'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </motion.button>
          
          <div className="flex items-center gap-4">
            <button
              onClick={restartQuiz}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Restart
            </button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-300 transition-all flex items-center gap-3"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;