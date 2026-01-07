// pages/TutorialsPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, GraduationCap, Target, Zap, 
  Clock, Calculator, BarChart3, Download,
  Play, Pause, Settings, ChevronRight,
  AlertCircle, Lightbulb, FileText, Video,
  Eye, Brain, TrendingUp, Shield
} from 'lucide-react';

const TutorialsPage = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const tutorialSections = {
    'getting-started': {
      title: 'Getting Started',
      icon: <Play className="w-5 h-5" />,
      content: [
        {
          title: 'Welcome to SHM Simulator',
          description: 'Learn how to navigate and use all features of our interactive physics simulator.',
          steps: [
            'Sign up for a free account to save your simulations',
            'Explore the dashboard to see your saved work',
            'Use the sidebar to navigate between different sections'
          ]
        },
        {
          title: 'Interface Overview',
          description: 'Understanding the main components of the simulator.',
          steps: [
            'Simulation Canvas: Visual representation of SHM systems',
            'Control Panel: Adjust parameters in real-time',
            'Graph Panel: View displacement, velocity, and energy graphs',
            'Calculations Panel: See live physics calculations'
          ]
        }
      ]
    },
    'experiment-guide': {
      title: 'Experiment Guide',
      icon: <Target className="w-5 h-5" />,
      content: [
        {
          title: 'AIM: Understanding Simple Harmonic Motion',
          description: 'To study the characteristics of Simple Harmonic Motion in spring-mass and pendulum systems.',
          objectives: [
            'Determine the relationship between mass and time period',
            'Study the effect of spring constant on oscillation frequency',
            'Verify energy conservation in SHM',
            'Analyze phase relationships between displacement, velocity, and acceleration'
          ]
        },
        {
          title: 'PROCEDURE: Step-by-Step Guide',
          description: 'Follow these steps to conduct virtual experiments:',
          steps: [
            '1. Select simulation type (Spring-Mass or Pendulum)',
            '2. Set initial parameters using the control panel',
            '3. Click the play button to start the simulation',
            '4. Observe the motion and read live values',
            '5. Adjust parameters while simulation is running',
            '6. Use graphs to analyze the motion',
            '7. Save your simulation for later analysis'
          ]
        }
      ]
    },
    'observations': {
      title: 'Observations & Data',
      icon: <Eye className="w-5 h-5" />,
      content: [
        {
          title: 'What to Observe',
          description: 'Key observations to make during your experiment:',
          observations: [
            'Displacement vs Time: Note the sinusoidal pattern',
            'Velocity vs Time: Maximum at equilibrium, zero at extremes',
            'Acceleration vs Time: Always directed toward equilibrium',
            'Energy vs Time: Total energy remains constant (ideal case)',
            'Phase Difference: Velocity leads displacement by π/2'
          ]
        },
        {
          title: 'Data Recording Tips',
          description: 'How to effectively record your observations:',
          tips: [
            'Use the "Save Simulation" feature to store parameter sets',
            'Export graph data for analysis in other software',
            'Take screenshots at key moments (maximum displacement, equilibrium)',
            'Note the time period for different parameter combinations'
          ]
        }
      ]
    },
    'calculations': {
      title: 'Calculations',
      icon: <Calculator className="w-5 h-5" />,
      content: [
        {
          title: 'Key Formulas',
          description: 'Important SHM formulas used in the simulator:',
          formulas: [
            'Time Period (Spring): T = 2π√(m/k)',
            'Time Period (Pendulum): T = 2π√(L/g)',
            'Angular Frequency: ω = 2π/T = √(k/m)',
            'Maximum Velocity: v_max = Aω',
            'Total Energy: E = ½kA² = ½mv_max²'
          ]
        },
        {
          title: 'Sample Calculations',
          description: 'Example calculations using typical values:',
          examples: [
            'For m=2kg, k=50N/m: T = 2π√(2/50) ≈ 1.26s',
            'For A=1.5m, ω=5rad/s: v_max = 1.5×5 = 7.5m/s',
            'Energy with k=50N/m, A=1.5m: E = 0.5×50×(1.5)² = 56.25J'
          ]
        }
      ]
    },
    'results': {
      title: 'Results & Analysis',
      icon: <TrendingUp className="w-5 h-5" />,
      content: [
        {
          title: 'Expected Results',
          description: 'What you should observe in your experiments:',
          results: [
            'Time period increases with mass (spring system)',
            'Time period increases with length (pendulum)',
            'Time period decreases with spring constant',
            'Amplitude does not affect time period (for small angles)',
            'Energy remains constant in ideal SHM'
          ]
        },
        {
          title: 'Graph Interpretation',
          description: 'How to interpret the graphs:',
          interpretations: [
            'Displacement-Time: Sinusoidal wave showing periodic motion',
            'Velocity-Time: Cosine wave (90° phase shift)',
            'Acceleration-Time: Negative sine wave (180° phase shift from displacement)',
            'Energy-Time: Constant total energy line'
          ]
        }
      ]
    },
    'precautions': {
      title: 'Precautions & Tips',
      icon: <Shield className="w-5 h-5" />,
      content: [
        {
          title: 'Important Precautions',
          description: 'Keep these points in mind for accurate results:',
          precautions: [
            'Small angle approximation: Keep pendulum angle < 15°',
            'Spring limits: Avoid extreme spring constants that cause unrealistic motion',
            'Damping: Account for energy loss in real systems',
            'Units: Ensure consistent units (kg, m, N/m, etc.)',
            'Save frequently: Save your work to avoid losing data'
          ]
        },
        {
          title: 'Learning Tips',
          description: 'Tips for better understanding of SHM:',
          tips: [
            'Start with default parameters and observe',
            'Change one variable at a time to see its effect',
            'Compare spring-mass and pendulum systems',
            'Use the quiz section to test your understanding',
            'Review saved simulations to track your learning progress'
          ]
        }
      ]
    }
  };

  const quickGuides = [
    {
      title: 'Spring-Mass System Tutorial',
      time: '5 min',
      icon: <Zap className="w-6 h-6" />,
      steps: [
        'Set mass and spring constant',
        'Adjust amplitude',
        'Observe oscillation',
        'Analyze graphs'
      ]
    },
    {
      title: 'Pendulum Analysis',
      time: '5 min',
      icon: <Target className="w-6 h-6" />,
      steps: [
        'Set length and mass',
        'Choose initial angle',
        'Watch periodic motion',
        'Study phase space'
      ]
    },
    {
      title: 'Energy Conservation',
      time: '7 min',
      icon: <BarChart3 className="w-6 h-6" />,
      steps: [
        'Run simulation',
        'Monitor energy graphs',
        'Add damping',
        'Analyze energy transfer'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-display">
                SHM <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Tutorials</span>
              </h1>
              <p className="text-gray-600 text-lg">
                Complete guide to using the simulator and understanding Simple Harmonic Motion
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-300 transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Guide
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-pink-600 mb-1">6</div>
              <div className="text-gray-600 text-sm">Sections</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-purple-200 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">30+</div>
              <div className="text-gray-600 text-sm">Learning Points</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">5</div>
              <div className="text-gray-600 text-sm">Quick Guides</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600 mb-1">100%</div>
              <div className="text-gray-600 text-sm">Free Access</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-pink-500" />
                  Tutorial Sections
                </h3>
                <div className="space-y-2">
                  {Object.entries(tutorialSections).map(([key, section]) => (
                    <button
                      key={key}
                      onClick={() => setActiveSection(key)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                        activeSection === key
                          ? 'bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-300 text-pink-600'
                          : 'text-gray-600 hover:bg-pink-50 hover:text-pink-500'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        activeSection === key ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-500'
                      }`}>
                        {section.icon}
                      </div>
                      <span className="font-medium">{section.title}</span>
                      {activeSection === key && (
                        <ChevronRight className="ml-auto w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Guides */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-purple-500" />
                  Quick Guides
                </h3>
                <div className="space-y-4">
                  {quickGuides.map((guide, index) => (
                    <div key={index} className="bg-white/60 rounded-xl p-4 border border-white/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20">
                            {guide.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{guide.title}</h4>
                            <p className="text-sm text-gray-500">{guide.time} read</p>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-1 pl-2">
                        {guide.steps.map((step, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl p-8"
            >
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                  {tutorialSections[activeSection].icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 font-display">
                    {tutorialSections[activeSection].title}
                  </h2>
                  <p className="text-gray-600">
                    Complete guide for {tutorialSections[activeSection].title.toLowerCase()}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-8">
                {tutorialSections[activeSection].content.map((item, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-pink-600 font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 font-display">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        
                        {/* Steps/List */}
                        {item.steps && (
                          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-5 border border-pink-100">
                            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-pink-500" />
                              Steps to Follow:
                            </h4>
                            <ul className="space-y-2">
                              {item.steps.map((step, idx) => (
                                <li key={idx} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                                  <div className="w-6 h-6 rounded-full bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-pink-600 text-sm font-bold">{idx + 1}</span>
                                  </div>
                                  <span className="text-gray-700">{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Objectives */}
                        {item.objectives && (
                          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100">
                            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                              <Target className="w-4 h-4 text-blue-500" />
                              Learning Objectives:
                            </h4>
                            <ul className="space-y-2">
                              {item.objectives.map((objective, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                  </div>
                                  <span className="text-gray-700">{objective}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Observations */}
                        {item.observations && (
                          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100">
                            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                              <Eye className="w-4 h-4 text-emerald-500" />
                              Key Observations:
                            </h4>
                            <ul className="space-y-2">
                              {item.observations.map((observation, idx) => (
                                <li key={idx} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-emerald-600 text-sm">👁️</span>
                                  </div>
                                  <span className="text-gray-700">{observation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Formulas */}
                        {item.formulas && (
                          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
                            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                              <Calculator className="w-4 h-4 text-amber-500" />
                              Key Formulas:
                            </h4>
                            <div className="space-y-3">
                              {item.formulas.map((formula, idx) => (
                                <div key={idx} className="p-3 bg-white/60 rounded-lg">
                                  <code className="text-lg font-mono text-gray-800">{formula}</code>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tips/Precautions */}
                        {(item.tips || item.precautions) && (
                          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-5 border border-rose-100">
                            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-rose-500" />
                              {item.tips ? 'Learning Tips:' : 'Important Precautions:'}
                            </h4>
                            <ul className="space-y-2">
                              {(item.tips || item.precautions).map((tip, idx) => (
                                <li key={idx} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                                  <div className="w-6 h-6 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                                    {item.tips ? '💡' : '⚠️'}
                                  </div>
                                  <span className="text-gray-700">{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12 pt-8 border-t border-pink-100">
                <button
                  onClick={() => {
                    const keys = Object.keys(tutorialSections);
                    const currentIndex = keys.indexOf(activeSection);
                    if (currentIndex > 0) {
                      setActiveSection(keys[currentIndex - 1]);
                    }
                  }}
                  className="px-6 py-3 border border-pink-300 text-pink-600 rounded-xl font-semibold hover:bg-pink-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={Object.keys(tutorialSections).indexOf(activeSection) === 0}
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    const keys = Object.keys(tutorialSections);
                    const currentIndex = keys.indexOf(activeSection);
                    if (currentIndex < keys.length - 1) {
                      setActiveSection(keys[currentIndex + 1]);
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={Object.keys(tutorialSections).indexOf(activeSection) === Object.keys(tutorialSections).length - 1}
                >
                  Next Section
                </button>
              </div>
            </motion.div>

            {/* Call to Action */}
            <div className="mt-8 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-200 rounded-2xl p-8 text-center">
              <GraduationCap className="w-16 h-16 text-pink-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-display">
                Ready to Apply Your Knowledge?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Now that you understand the theory and procedures, head to the simulation page to conduct your own experiments!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/simulation"
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-pink-300 transition-all"
                >
                  Start Simulation
                </a>
                <a
                  href="/quiz"
                  className="px-8 py-3 bg-white/80 border border-pink-300 text-gray-700 rounded-xl font-semibold hover:bg-white transition-all"
                >
                  Test Your Knowledge
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialsPage;