import { useRef, useEffect, useCallback } from 'react';

export const useAnimation = (callback, dependencies = []) => {
  const animationRef = useRef();
  const lastTimeRef = useRef();

  const animate = useCallback((currentTime) => {
    if (!lastTimeRef.current) lastTimeRef.current = currentTime;
    const deltaTime = (currentTime - lastTimeRef.current) * 0.001;
    
    callback(deltaTime);
    lastTimeRef.current = currentTime;
    
    animationRef.current = requestAnimationFrame(animate);
  }, [callback]);

  const startAnimation = useCallback(() => {
    if (!animationRef.current) {
      lastTimeRef.current = undefined;
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopAnimation();
    };
  }, [stopAnimation]);

  return { startAnimation, stopAnimation };
};