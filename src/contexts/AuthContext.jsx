// src/contexts/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "firebase/auth";

import { auth, googleProvider } from "../firebase";

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userSimulations, setUserSimulations] = useState([]);

  // 🔁 Firebase auth persistence
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL
        };

        setUser(userData);
        localStorage.setItem("shm_user", JSON.stringify(userData));
        loadUserSimulations(userData.id);
      } else {
        setUser(null);
        setUserSimulations([]);
        localStorage.removeItem("shm_user");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // ---------- AUTH METHODS ----------

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const signup = async (email, password, name) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const signupWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    if (user) {
      saveUserSimulations(user.id, userSimulations);
    }
    await signOut(auth);
  };

  // ---------- SIMULATION STORAGE ----------

  const loadUserSimulations = (userId) => {
    try {
      const saved = JSON.parse(localStorage.getItem("shm_simulations") || "{}");
      setUserSimulations(saved[userId] || []);
    } catch {
      setUserSimulations([]);
    }
  };

  const saveUserSimulations = useCallback((userId, simulations) => {
    const saved = JSON.parse(localStorage.getItem("shm_simulations") || "{}");
    saved[userId] = simulations;
    localStorage.setItem("shm_simulations", JSON.stringify(saved));
  }, []);

  const saveSimulation = useCallback(
    (data) => {
      if (!user) return;

      const newSim = {
        id: Date.now().toString(),
        ...data,
        userId: user.id,
        createdAt: new Date().toISOString()
      };

      const updated = [newSim, ...userSimulations];
      setUserSimulations(updated);
      saveUserSimulations(user.id, updated);

      return { success: true };
    },
    [user, userSimulations, saveUserSimulations]
  );

  const value = {
    user,
    loading,
    isAuthenticated: !!user,

    // auth
    login,
    signup,
    loginWithGoogle,
    signupWithGoogle,
    logout,

    // simulations
    saveSimulation,
    userSimulations
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
