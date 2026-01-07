import { useState, useEffect, useCallback } from 'react';
import { generateGraphData } from '../utils/dataGenerators';

export const useDataGenerator = (simulationType, parameters) => {
  const [graphData, setGraphData] = useState([]);

  const updateData = useCallback(() => {
    const newData = generateGraphData(simulationType, parameters);
    setGraphData(newData);
  }, [simulationType, parameters]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  return { graphData, updateData };
};