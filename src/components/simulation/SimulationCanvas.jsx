// components/simulation/SimulationCanvas.jsx
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSimulationContext } from '../../contexts/SimulationContext';

const SimulationCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 500 });
  const { simulationType, parameters, time } = useSimulationContext();
  
  // Update canvas size based on container
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const calculatedHeight = Math.min(500, containerWidth * 0.625); // 16:10 aspect ratio
        setCanvasSize({
          width: containerWidth,
          height: calculatedHeight
        });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // Define drawing functions with useCallback
  const drawSpringMassSystem = useCallback((ctx, width, height) => {
    const centerX = width / 2;
    const wallY = height * 0.2; // Higher up to avoid overlap
    const springLength = 120 + parameters.springConstant * 2;
    const massY = wallY + springLength + parameters.amplitude * 40 * Math.sin(time * Math.sqrt(parameters.springConstant / parameters.mass));
    
    // Clear with semi-transparent for motion trails effect
    ctx.fillStyle = 'rgba(255, 241, 242, 0.1)'; // Light pink background
    ctx.fillRect(0, 0, width, height);
    
    // Draw ceiling
    ctx.beginPath();
    ctx.moveTo(centerX - 150, wallY);
    ctx.lineTo(centerX + 150, wallY);
    ctx.strokeStyle = '#9ca3af'; // Gray-400
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw spring
    ctx.beginPath();
    ctx.moveTo(centerX, wallY);
    
    const coils = 8;
    const coilHeight = springLength / coils;
    for (let i = 0; i < coils; i++) {
      const x1 = centerX - 20;
      const x2 = centerX + 20;
      const y1 = wallY + i * coilHeight;
      const y2 = wallY + (i + 0.5) * coilHeight;
      const y3 = wallY + (i + 1) * coilHeight;
      
      ctx.bezierCurveTo(x1, y1, x2, y2, centerX, y3);
    }
    
    ctx.strokeStyle = '#ec4899'; // Pink-500
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw mass
    const massRadius = 15 + parameters.mass * 4;
    ctx.beginPath();
    ctx.arc(centerX, massY, massRadius, 0, Math.PI * 2);
    
    // Create gradient for mass
    const gradient = ctx.createRadialGradient(centerX, massY, 0, centerX, massY, massRadius);
    gradient.addColorStop(0, '#8b5cf6'); // Violet-500
    gradient.addColorStop(1, '#7c3aed'); // Violet-600
    
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = '#7c3aed';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw equilibrium line
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(centerX - 100, wallY + springLength);
    ctx.lineTo(centerX + 100, wallY + springLength);
    ctx.strokeStyle = '#10b981'; // Emerald-500
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);
  }, [parameters.mass, parameters.springConstant, parameters.amplitude, time]);

  const drawPendulumSystem = useCallback((ctx, width, height) => {
    const pivotX = width / 2;
    const pivotY = height * 0.2; // Higher up to avoid overlap
    const length = parameters.length * 60;
    
    // Calculate pendulum position
    const angle = parameters.angle * Math.cos(time * Math.sqrt(parameters.gravity / parameters.length));
    const bobX = pivotX + length * Math.sin(angle);
    const bobY = pivotY + length * Math.cos(angle);
    const bobRadius = 15 + parameters.mass * 4;
    
    // Clear with semi-transparent for motion trails effect
    ctx.fillStyle = 'rgba(255, 241, 242, 0.1)'; // Light pink background
    ctx.fillRect(0, 0, width, height);
    
    // Draw pivot
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#9ca3af'; // Gray-400
    ctx.fill();
    
    // Draw rod
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(bobX, bobY);
    ctx.strokeStyle = '#10b981'; // Emerald-500
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw bob with gradient
    const gradient = ctx.createRadialGradient(bobX, bobY, 0, bobX, bobY, bobRadius);
    gradient.addColorStop(0, '#8b5cf6'); // Violet-500
    gradient.addColorStop(1, '#7c3aed'); // Violet-600
    
    ctx.beginPath();
    ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = '#7c3aed'; // Violet-600
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw angle arc (only if there's space)
    if (Math.abs(angle) > 0.1 && width > 400) {
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 40, -Math.PI/2, -Math.PI/2 + angle, angle < 0);
      ctx.strokeStyle = '#f59e0b'; // Amber-500
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    // Draw path trace
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, length, Math.PI/2 - parameters.angle, Math.PI/2 + parameters.angle);
    ctx.strokeStyle = 'rgba(236, 72, 153, 0.2)'; // Pink-500 with opacity
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [parameters.length, parameters.angle, parameters.gravity, parameters.mass, time]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    if (simulationType === 'spring') {
      drawSpringMassSystem(ctx, width, height);
    } else {
      drawPendulumSystem(ctx, width, height);
    }
  }, [simulationType, drawSpringMassSystem, drawPendulumSystem, canvasSize]);

  return (
    <div ref={containerRef} className="relative w-full">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="w-full h-auto rounded-2xl bg-gradient-to-br from-pink-50/80 to-purple-50/80 border-2 border-pink-200 shadow-xl shadow-pink-200/30"
      />
      
      {/* Simulation info overlay - Top right corner */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-pink-200 shadow-lg z-10">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${simulationType === 'spring' ? 'bg-pink-500 animate-pulse' : 'bg-emerald-500 animate-pulse'}`} />
          <span className="text-gray-800 text-sm font-semibold font-display">
            {simulationType === 'spring' ? 'Spring-Mass' : 'Pendulum'}
          </span>
        </div>
        <div className="mt-2 text-xs text-gray-600 font-mono bg-pink-50 px-2 py-1 rounded-lg border border-pink-100">
          t = {time.toFixed(2)}s
        </div>
      </div>
      
      {/* Physics info */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-pink-200 shadow-lg z-10 max-w-[180px]">
        <div className="text-xs text-gray-600 mb-2 font-medium">Current Values:</div>
        <div className="space-y-2">
          {simulationType === 'spring' ? (
            <>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-700">Mass:</span>
                <span className="text-xs text-gray-800 font-mono bg-pink-50 px-2 py-1 rounded border border-pink-100">
                  {parameters.mass.toFixed(1)}kg
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-700">Spring:</span>
                <span className="text-xs text-gray-800 font-mono bg-pink-50 px-2 py-1 rounded border border-pink-100">
                  {parameters.springConstant.toFixed(1)}N/m
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-700">Length:</span>
                <span className="text-xs text-gray-800 font-mono bg-pink-50 px-2 py-1 rounded border border-pink-100">
                  {parameters.length.toFixed(2)}m
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-700">Angle:</span>
                <span className="text-xs text-gray-800 font-mono bg-pink-50 px-2 py-1 rounded border border-pink-100">
                  {parameters.angle.toFixed(2)}°
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Empty space indicator for pendulum path */}
      {simulationType === 'pendulum' && (
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-xs text-gray-500/70 font-medium">
          ↕ Path
        </div>
      )}
      
      {/* Responsive note for small screens */}
      <div className="absolute bottom-4 right-4 lg:hidden">
        <div className="text-[10px] text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-pink-200 font-medium">
          Use Control Panel for settings
        </div>
      </div>
    </div>
  );
};

export default SimulationCanvas;