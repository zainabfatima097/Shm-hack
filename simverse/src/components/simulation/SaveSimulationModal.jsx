// components/simulation/SaveSimulationModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Tag, FileText, Clock } from 'lucide-react';

const SaveSimulationModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setIsSaving(true);
    try {
      await onSave(title, description);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error saving simulation:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  const handleQuickSave = () => {
    const now = new Date();
    const quickTitle = `Simulation ${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    onSave(quickTitle, 'Quick save');
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gradient-to-b from-white/95 to-pink-50/95 backdrop-blur-sm border border-pink-200 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl shadow-pink-300/20"
          >
            {/* Header */}
            <div className="p-6 border-b border-pink-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 shadow-sm">
                    <Save className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 font-display">Save Simulation</h2>
                    <p className="text-sm text-gray-600">Save current parameters and state</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-pink-50 rounded-lg transition-colors border border-pink-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                {/* Title Input */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Tag className="w-4 h-4 text-pink-500" />
                    Simulation Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Spring-Mass Demo with Damping"
                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                    required
                    autoFocus
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 text-pink-500" />
                    Description (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add notes about this simulation, what parameters you used, observations..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-pink-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all resize-none"
                  />
                </div>

                {/* Auto-generated preview */}
                <div className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100">
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Will be saved as:
                  </p>
                  <p className="text-sm text-gray-800 font-medium font-mono truncate bg-white/60 px-2 py-1 rounded">
                    {title.trim() || `simulation_${new Date().getTime().toString().slice(-6)}`}
                  </p>
                </div>
              </div>

              {/* Quick Save Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleQuickSave}
                  className="w-full py-2.5 border border-pink-200 text-gray-700 rounded-xl hover:bg-pink-50 hover:text-gray-800 hover:border-pink-300 transition-all text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  Quick Save with Auto-generated Name
                </button>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-pink-200">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-pink-50 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!title.trim() || isSaving}
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-300/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-sm"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Simulation
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SaveSimulationModal;