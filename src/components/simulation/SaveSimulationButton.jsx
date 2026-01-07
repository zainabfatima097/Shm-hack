// components/simulation/SaveSimulationButton.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Save, FolderOpen, Bookmark, Upload, Cloud, Lock } from 'lucide-react';

const SaveSimulationButton = ({ 
  onQuickSave, 
  onOpenSaveModal, 
  onOpenSavedList,
  savedCount = 0,
  isAuthenticated = false 
}) => {
  return (
    <div className="flex items-center gap-3">
      {/* Quick Save Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onQuickSave}
        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-300/50 transition-all shadow-sm"
      >
        <Save className="w-4 h-4" />
        Quick Save
      </motion.button>

      {/* Saved List Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpenSavedList}
        className="relative p-2.5 bg-white/60 backdrop-blur-sm border border-pink-200 text-gray-700 rounded-xl hover:bg-pink-50 hover:text-gray-800 hover:border-pink-300 transition-all group shadow-sm"
      >
        <FolderOpen className="w-5 h-5" />
        
        {savedCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full flex items-center justify-center shadow-sm">
            {savedCount > 9 ? '9+' : savedCount}
          </span>
        )}
        
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
          <div className="bg-white/90 backdrop-blur-sm border border-pink-200 text-gray-800 text-xs rounded-lg py-1.5 px-3 whitespace-nowrap shadow-lg">
            {savedCount} saved {savedCount === 1 ? 'simulation' : 'simulations'}
            <div className="absolute bottom-0 right-3 transform translate-y-1/2 rotate-45 w-2 h-2 bg-pink-200 border-r border-b border-pink-200"></div>
          </div>
        </div>
      </motion.button>

      {/* Save Options Button */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenSaveModal}
          className="p-2.5 bg-white/60 backdrop-blur-sm border border-pink-200 text-gray-700 rounded-xl hover:bg-pink-50 hover:text-gray-800 hover:border-pink-300 transition-all group shadow-sm"
        >
          <Bookmark className="w-5 h-5" />
          
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
            <div className="bg-white/90 backdrop-blur-sm border border-pink-200 text-gray-800 text-xs rounded-lg py-1.5 px-3 whitespace-nowrap shadow-lg">
              Save with options
              <div className="absolute bottom-0 right-3 transform translate-y-1/2 rotate-45 w-2 h-2 bg-pink-200 border-r border-b border-pink-200"></div>
            </div>
          </div>
        </motion.button>
      </div>
      
      {/* Auth Status Badge */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm ${
          isAuthenticated
            ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200'
            : 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border border-amber-200'
        }`}
      >
        {isAuthenticated ? (
          <>
            <Cloud className="w-4 h-4" />
            <span className="hidden sm:inline">Saved to cloud</span>
            <span className="sm:hidden">Cloud</span>
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline">Local only</span>
            <span className="sm:hidden">Local</span>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SaveSimulationButton;