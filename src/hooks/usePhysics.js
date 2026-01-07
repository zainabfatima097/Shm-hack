import { useMemo } from 'react';
import { calculateAllValues } from '../utils/physics';

export const usePhysics = (simulationType, parameters, time) => {
  const values = useMemo(() => {
    return calculateAllValues(simulationType, parameters, time);
  }, [simulationType, parameters, time]);

  return values;
};