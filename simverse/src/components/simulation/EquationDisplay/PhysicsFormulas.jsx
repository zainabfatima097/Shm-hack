import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const PhysicsFormulas = () => {
  const [expanded, setExpanded] = useState(false);

  const formulas = [
    {
      category: "Spring-Mass System",
      items: [
        {
          title: "Simple Harmonic Motion",
          equation: "x(t) = A·cos(ωt + φ)",
          description: "General solution for SHM"
        },
        {
          title: "Hooke's Law",
          equation: "F = -k·x",
          description: "Restoring force proportional to displacement"
        },
        {
          title: "Angular Frequency",
          equation: "ω = √(k/m)",
          description: "Depends on stiffness and mass"
        },
        {
          title: "Period",
          equation: "T = 2π/ω = 2π√(m/k)",
          description: "Time for one complete cycle"
        },
        {
          title: "Energy Conservation",
          equation: "E = ½kA² = ½mv² + ½kx²",
          description: "Total energy remains constant"
        }
      ]
    },
    {
      category: "Simple Pendulum",
      items: [
        {
          title: "Small Angle Approximation",
          equation: "sin(θ) ≈ θ (for θ < 15°)",
          description: "Linear approximation for small angles"
        },
        {
          title: "Angular Frequency",
          equation: "ω = √(g/L)",
          description: "Depends on gravity and length"
        },
        {
          title: "Period (Small Angles)",
          equation: "T ≈ 2π√(L/g)",
          description: "Independent of mass and amplitude"
        },
        {
          title: "Potential Energy",
          equation: "U = mgh = mgL(1 - cosθ)",
          description: "Gravitational potential energy"
        },
        {
          title: "Kinetic Energy",
          equation: "K = ½mL²ω²",
          description: "Rotational kinetic energy"
        }
      ]
    },
    {
      category: "General SHM",
      items: [
        {
          title: "Velocity",
          equation: "v(t) = -Aω·sin(ωt + φ)",
          description: "Velocity as function of time"
        },
        {
          title: "Acceleration",
          equation: "a(t) = -Aω²·cos(ωt + φ)",
          description: "Acceleration as function of time"
        },
        {
          title: "Phase Constant",
          equation: "φ = arctan(-v₀/(ωx₀))",
          description: "Initial phase based on initial conditions"
        },
        {
          title: "Phase Space",
          equation: "(x/A)² + (v/(Aω))² = 1",
          description: "Elliptical trajectory in phase space"
        },
        {
          title: "Damped Oscillations",
          equation: "x(t) = Ae^(-βt)·cos(ω't + φ)",
          description: "Exponentially decaying amplitude"
        }
      ]
    }
  ];

  const visibleFormulas = expanded ? formulas : [formulas[0]];

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BookOpen className="text-primary" size={24} />
          <div>
            <h4 className="text-lg font-bold text-gray-800">Physics Formulas Reference</h4>
            <p className="text-gray-600">Key equations for SHM</p>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          {expanded ? (
            <>
              <span className="text-sm">Show Less</span>
              <ChevronUp size={18} />
            </>
          ) : (
            <>
              <span className="text-sm">Show More</span>
              <ChevronDown size={18} />
            </>
          )}
        </button>
      </div>

      <div className="space-y-6">
        {visibleFormulas.map((category, catIndex) => (
          <div key={catIndex} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-primary rounded-full"></div>
              <h5 className="font-bold text-gray-700">{category.category}</h5>
            </div>
            
            <div className="space-y-3">
              {category.items.map((formula, index) => (
                <div 
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-gray-700">{formula.title}</div>
                      <div className="text-sm text-gray-500 mt-1">{formula.description}</div>
                    </div>
                  </div>
                  <div className="mt-3 font-mono text-lg bg-white/80 p-3 rounded border text-gray-800">
                    {formula.equation}
                  </div>
                  {formula.derivation && (
                    <div className="mt-2 text-xs text-gray-500">
                      Derivation: {formula.derivation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!expanded && (
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <button
            onClick={() => setExpanded(true)}
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            + Show {formulas.length - 1} more categories
          </button>
        </div>
      )}
    </div>
  );
};

export default PhysicsFormulas;