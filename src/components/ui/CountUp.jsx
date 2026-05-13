import React, { useState, useEffect } from 'react';

const CountUp = ({ end, duration = 800, prefix = '', suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo function for smooth deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeProgress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  const value = Number(count).toFixed(decimals);
  const formattedValue = decimals === 0 ? Number(value).toLocaleString() : value;

  return <>{prefix}{formattedValue}{suffix}</>;
};

export default CountUp;
