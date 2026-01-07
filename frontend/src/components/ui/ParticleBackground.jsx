// components/ui/ParticleBackground.jsx
import React, { useRef, useEffect } from 'react';

const ParticleBackground = ({ variant = 'default' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = variant === 'quiz' ? 100 : 150;
    
    // Color schemes based on variant
    const colorSchemes = {
      default: [
        'rgba(236, 72, 153, 0.3)',  // Pink
        'rgba(139, 92, 246, 0.3)',  // Purple
        'rgba(59, 130, 246, 0.3)',  // Blue
        'rgba(16, 185, 129, 0.3)',  // Emerald
        'rgba(245, 158, 11, 0.3)',  // Amber
      ],
      quiz: [
        'rgba(236, 72, 153, 0.4)',  // Pink
        'rgba(139, 92, 246, 0.4)',  // Purple
        'rgba(59, 130, 246, 0.4)',  // Blue
        'rgba(16, 185, 129, 0.4)',  // Emerald
      ],
      dashboard: [
        'rgba(236, 72, 153, 0.25)',  // Pink
        'rgba(139, 92, 246, 0.25)',  // Purple
        'rgba(59, 130, 246, 0.25)',  // Blue
      ]
    };

    const particleColors = colorSchemes[variant] || colorSchemes.default;
    
    // Background gradients based on variant
    const backgroundGradients = {
      default: 'radial-gradient(ellipse at center, rgba(251, 207, 232, 0.1) 0%, rgba(245, 243, 255, 0.05) 50%, transparent 100%)',
      quiz: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.08) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
      dashboard: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.06) 0%, rgba(245, 243, 255, 0.03) 50%, transparent 100%)'
    };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Create gradient background
      if (variant !== 'default') {
        const gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          Math.max(canvas.width, canvas.height) / 2
        );
        
        gradient.addColorStop(0, variant === 'quiz' ? 'rgba(251, 207, 232, 0.15)' : 'rgba(251, 207, 232, 0.1)');
        gradient.addColorStop(0.5, variant === 'quiz' ? 'rgba(245, 243, 255, 0.08)' : 'rgba(245, 243, 255, 0.05)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (variant === 'quiz' ? 3 : 2) + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
        this.alpha = Math.random() * 0.4 + 0.1;
        this.waveOffset = Math.random() * Math.PI * 2;
        this.waveAmplitude = Math.random() * 0.5 + 0.2;
        this.waveFrequency = Math.random() * 0.01 + 0.005;
      }

      update(time) {
        // Gentle wave-like motion
        const waveX = Math.sin(time * 0.001 + this.waveOffset) * this.waveAmplitude;
        const waveY = Math.cos(time * 0.001 + this.waveOffset) * this.waveAmplitude;
        
        this.x += this.speedX + waveX;
        this.y += this.speedY + waveY;

        // Bounce off edges with slight drift
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.y > canvas.height + 10) this.y = -10;
        if (this.y < -10) this.y = canvas.height + 10;
      }

      draw() {
        // Draw glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner highlight
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, 0.3)`;
        ctx.fill();
        
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particles
    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Draw connecting lines with gradient colors
    const drawLines = () => {
      const maxDistance = variant === 'quiz' ? 120 : 100;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3;
            
            // Create gradient for the line
            const lineGradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            
            lineGradient.addColorStop(0, particles[i].color.replace('0.3', opacity.toString()));
            lineGradient.addColorStop(1, particles[j].color.replace('0.3', opacity.toString()));
            
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = variant === 'quiz' ? 0.8 : 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Draw floating shapes
    const drawShapes = (time) => {
      const shapes = [
        { type: 'circle', x: canvas.width * 0.2, y: canvas.height * 0.3, size: 80 },
        { type: 'triangle', x: canvas.width * 0.8, y: canvas.height * 0.7, size: 60 },
        { type: 'circle', x: canvas.width * 0.7, y: canvas.height * 0.2, size: 50 },
      ];

      shapes.forEach((shape, index) => {
        const pulse = Math.sin(time * 0.001 + index) * 0.2 + 0.8;
        const alpha = 0.02 * pulse;
        
        ctx.fillStyle = `rgba(236, 72, 153, ${alpha})`;
        ctx.globalAlpha = alpha;
        
        ctx.beginPath();
        if (shape.type === 'circle') {
          ctx.arc(
            shape.x + Math.sin(time * 0.0005 + index) * 20,
            shape.y + Math.cos(time * 0.0005 + index) * 20,
            shape.size * pulse,
            0,
            Math.PI * 2
          );
        } else if (shape.type === 'triangle') {
          const x = shape.x + Math.sin(time * 0.0005 + index) * 20;
          const y = shape.y + Math.cos(time * 0.0005 + index) * 20;
          const size = shape.size * pulse;
          
          ctx.moveTo(x, y - size);
          ctx.lineTo(x + size, y + size);
          ctx.lineTo(x - size, y + size);
          ctx.closePath();
        }
        ctx.fill();
      });
    };

    // Animation loop
    let animationId;
    let startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now() - startTime;
      
      // Clear with a subtle fade effect
      ctx.fillStyle = variant === 'quiz' 
        ? 'rgba(251, 207, 232, 0.02)'
        : 'rgba(245, 243, 255, 0.015)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update(currentTime);
        particle.draw();
      });

      // Draw connecting lines
      drawLines();
      
      // Draw floating shapes (only for quiz variant)
      if (variant === 'quiz') {
        drawShapes(currentTime);
      }

      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    initParticles();
    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: variant === 'quiz' 
          ? 'linear-gradient(135deg, #fbcfe8 0%, #f5f3ff 25%, #e0e7ff 50%, #dbeafe 75%, #f0f9ff 100%)'
          : variant === 'dashboard'
          ? 'linear-gradient(135deg, #fdf2f8 0%, #faf5ff 50%, #eff6ff 100%)'
          : 'radial-gradient(ellipse at center, #fdf2f8 0%, #faf5ff 50%, #eff6ff 100%)'
      }}
    />
  );
};

export default ParticleBackground;