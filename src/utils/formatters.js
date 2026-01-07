export const formatNumber = (num, decimals = 3) => {
  if (isNaN(num)) return '0.000';
  return Math.abs(num) < 0.0001 ? '0.000' : num.toFixed(decimals);
};

export const formatUnit = (value, unit) => {
  return `${formatNumber(value)} ${unit}`;
};

export const formatEquation = (equation, values = {}) => {
  let formatted = equation;
  Object.keys(values).forEach(key => {
    formatted = formatted.replace(`{${key}}`, formatNumber(values[key]));
  });
  return formatted;
};

export const getColorForEnergy = (energy, maxEnergy) => {
  if (maxEnergy === 0) return '#3b82f6';
  const ratio = energy / maxEnergy;
  const hue = 210 + (ratio * 150);
  return `hsl(${hue}, 70%, 60%)`;
};

export const formatTime = (seconds) => {
  if (seconds < 60) return `${formatNumber(seconds, 1)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${formatNumber(remainingSeconds, 1)}s`;
};