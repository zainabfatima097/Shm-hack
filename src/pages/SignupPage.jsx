// pages/SignupPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, Cpu, Check, Chrome, Sparkles, Brain } from 'lucide-react';
import ParticleBackground from '../components/ui/ParticleBackground';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [strength, setStrength] = useState(0);
  
  const { signup, signupWithGoogle } = useAuth();
  const navigate = useNavigate();

  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { label: 'Contains number', met: /\d/.test(formData.password) },
    { label: 'Contains special character', met: /[!@#$%^&*]/.test(formData.password) }
  ];

  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;
    setStrength((score / 5) * 100);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (strength < 60) {
      setError('Password is too weak. Please choose a stronger password.');
      return;
    }

    setLoading(true);
    const result = await signup(formData.email, formData.password, formData.name);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);
    
    const result = await signupWithGoogle();
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with ParticleBackground */}
      <ParticleBackground variant="default" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/20 via-purple-50/10 to-blue-50/10" />

      <div className="relative flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Logo/Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Link to="/" className="inline-block">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <Brain className="w-8 h-8 text-white" />
              </motion.div>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 font-display">
              Create Your Account
            </h1>
            <p className="text-gray-600">
              Start your physics simulation journey today
            </p>
          </motion.div>

          {/* Signup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-xl border border-pink-200 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                >
                  <p className="text-red-500 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Google Signup Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleSignup}
                disabled={loading}
                className="w-full mb-6 py-3 px-4 bg-white border border-pink-200 text-gray-800 font-medium rounded-xl hover:bg-pink-50 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Chrome className="w-5 h-5" />
                <span>Sign up with Google</span>
              </motion.button>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-pink-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/80 text-gray-500">Or sign up with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-12 py-3 bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Password Strength */}
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">Password strength</span>
                      <span className={`text-xs font-medium ${
                        strength < 40 ? 'text-red-500' :
                        strength < 70 ? 'text-amber-500' : 'text-emerald-500'
                      }`}>
                        {strength < 40 ? 'Weak' : strength < 70 ? 'Fair' : 'Strong'}
                      </span>
                    </div>
                    <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          strength < 40 ? 'bg-red-500' :
                          strength < 70 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${strength}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="mt-3 space-y-2">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          req.met ? 'bg-emerald-500' : 'bg-pink-100'
                        }`}>
                          {req.met && <Check size={12} className="text-white" />}
                        </div>
                        <span className={`text-xs ${req.met ? 'text-emerald-600' : 'text-gray-500'}`}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-12 pr-12 py-3 bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-4 h-4 rounded bg-white/60 border-pink-300 text-pink-500 focus:ring-pink-300 focus:ring-offset-0"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <Link to="/terms" className="text-pink-600 hover:text-pink-700">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-pink-600 hover:text-pink-700">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-300/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                    </>
                  )}
                </motion.button>
              </form>

              {/* Already have account */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-pink-600 hover:text-pink-700 font-semibold transition-colors"
                  >
                    Sign in instead
                  </Link>
                </p>
              </div>

              {/* Benefits */}
              <div className="mt-8 p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-pink-200">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  <p className="text-sm font-medium text-gray-700">Free account benefits</p>
                </div>
                <div className="space-y-2">
                  {['Unlimited simulations', 'Interactive quizzes', 'Progress tracking', 'Community access'].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Back to home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to homepage
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;