// App.jsx - UPDATED with GamesPage
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SimulationProvider } from './contexts/SimulationContext';
import Layout from './components/common/Layout';
import LoadingScreen from './components/ui/LoadingScreen';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Lazy load pages for better performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const SimulationPage = lazy(() => import('./pages/SimulationPage'));
const CalculationsPage = lazy(() => import('./pages/CalculationsPage'));
const GraphsPage = lazy(() => import('./pages/GraphsPage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const TutorialsPage = lazy(() => import('./pages/TutorialsPage'));
const GamesPage = lazy(() => import('./pages/GamesPage')); // ADDED
const GamePage = lazy(() => import('./pages/GamePage')); // ADDED (for the actual game)

function App() {
  return (
    <Router>
      <AuthProvider>
        <SimulationProvider>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/simulation" element={<SimulationPage />} />
                  <Route path="/games" element={<GamesPage />} /> {/* ADDED */}
                  <Route path="/calculations" element={<CalculationsPage />} />
                  <Route path="/graphs" element={<GraphsPage />} />
                  <Route path="/quiz" element={<QuizPage />} />
                  <Route path="/tutorials" element={<TutorialsPage />} />
                </Route>
                {/* GamePage might not need the Layout wrapper if it's fullscreen */}
                <Route path="/game" element={<GamePage />} /> {/* ADDED */}
              </Route>
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </SimulationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;