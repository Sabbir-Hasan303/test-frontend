'use client';

import { useState, useEffect } from 'react';

export function Timer({ endTime }) {
  const [timeLeft, setTimeLeft] = useState(null);

  // Function to calculate the remaining time
  function calculateTimeLeft() {
    const difference = new Date(endTime).getTime() - Date.now();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  // Set up the timer
  useEffect(() => {
    if (!endTime) return;

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (!timeLeft) {
    // Avoid rendering until `timeLeft` is calculated
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center space-x-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="text-3xl font-bold bg-white text-primary rounded-lg p-2 w-16 text-center">
            {value.toString().padStart(2, '0')}
          </div>
          <span className="text-xs uppercase mt-1">{unit}</span>
        </div>
      ))}
    </div>
  );
}
