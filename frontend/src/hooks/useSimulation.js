import { useState, useCallback } from 'react';

export const useSimulation = (initialType = 'spring') => {
  const [simulationType, setSimulationType] = useState(initialType);
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [realTimeData, setRealTimeData] = useState([]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const reset = useCallback(() => {
    setTime(0);
    setRealTimeData([]);
  }, []);

  const addDataPoint = useCallback((dataPoint) => {
    setRealTimeData(prev => {
      const newData = [...prev, dataPoint];
      // Keep only last 500 data points for performance
      return newData.slice(-500);
    });
  }, []);

  return {
    simulationType,
    setSimulationType,
    isPlaying,
    setIsPlaying,
    togglePlayPause,
    time,
    setTime,
    reset,
    realTimeData,
    addDataPoint,
  };
};