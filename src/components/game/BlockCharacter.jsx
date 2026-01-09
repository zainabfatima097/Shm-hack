import React from 'react';
import { motion } from 'framer-motion';

const BlockCharacter = ({ type = 'scientist', size = 'normal' }) => {
  const characterStyles = {
    scientist: {
      body: 'from-blue-600 to-indigo-800',
      head: 'from-gray-300 to-gray-500',
      accessories: ['👓', '📐'],
      hat: 'graduation'
    },
    pendulum: {
      body: 'from-emerald-600 to-teal-800', 
      head: 'from-amber-300 to-orange-500',
      accessories: ['⏱️', '⚖️'],
      hat: 'none'
    },
    engineer: {
      body: 'from-purple-600 to-pink-800',
      head: 'from-yellow-300 to-yellow-500',
      accessories: ['🔧', '⚙️'],
      hat: 'hardhat'
    },
    player: {
      body: 'from-amber-600 to-orange-800',
      head: 'from-red-300 to-red-500',
      accessories: ['🎮', '🏆'],
      hat: 'gamer'
    }
  };

  const style = characterStyles[type];
  const scale = size === 'large' ? 1.5 : size === 'small' ? 0.8 : 1;

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{ transform: `scale(${scale})` }}
      className="relative inline-block"
    >
      {/* Character Container */}
      <div className="relative">
        {/* Hat */}
        {style.hat === 'graduation' && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-gradient-to-r from-black to-gray-800 rounded-t-lg">
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gradient-to-r from-black to-gray-800"></div>
          </div>
        )}
        
        {style.hat === 'hardhat' && (
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-t-lg">
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-yellow-600"></div>
          </div>
        )}
        
        {style.hat === 'gamer' && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-20 h-10 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg">
            <div className="absolute inset-2 bg-black/30 rounded"></div>
          </div>
        )}

        {/* Head */}
        <div className={`w-24 h-24 bg-gradient-to-br ${style.head} relative z-10 border-4 border-gray-900`}>
          {/* Pixel grid for head */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-2">
            {/* Eyes */}
            <div className="col-start-2 row-start-2 bg-gray-900 rounded"></div>
            <div className="col-start-3 row-start-2 bg-gray-900 rounded"></div>
            {/* Mouth */}
            <div className="col-start-2 col-span-2 row-start-4 bg-gray-900 rounded"></div>
          </div>
          
          {/* Accessories */}
          <div className="absolute -top-2 -left-2 text-2xl">
            {style.accessories[0]}
          </div>
          <div className="absolute -top-2 -right-2 text-2xl">
            {style.accessories[1]}
          </div>
        </div>

        {/* Body */}
        <div className={`w-32 h-40 bg-gradient-to-b ${style.body} mt-2 border-4 border-gray-900`}>
          {/* Block pattern body */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-5 gap-1 p-2">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="bg-gray-900/50 rounded-sm"></div>
            ))}
          </div>
        </div>

        {/* Arms */}
        <div className="absolute top-8 -left-8 w-8 h-24 bg-gradient-to-b from-gray-700 to-gray-900 rotate-45 rounded"></div>
        <div className="absolute top-8 -right-8 w-8 h-24 bg-gradient-to-b from-gray-700 to-gray-900 -rotate-45 rounded"></div>

        {/* Legs */}
        <div className="absolute bottom-0 left-4 w-10 h-12 bg-gradient-to-b from-gray-800 to-black"></div>
        <div className="absolute bottom-0 right-4 w-10 h-12 bg-gradient-to-b from-gray-800 to-black"></div>

        {/* Floating Physics Symbols */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-16 -right-8 text-3xl"
        >
          θ
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-8 -left-8 text-3xl"
        >
          ω
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlockCharacter;