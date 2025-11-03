
import { useState, useEffect, useRef } from 'react';

export const useTimer = (initialSeconds: number, isPausedInitial: boolean, onTick: (seconds: number) => void) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(isPausedInitial);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPaused && seconds > 0) {
      intervalRef.current = window.setInterval(() => {
        setSeconds(prev => {
          const newSeconds = prev - 1;
          onTick(newSeconds);
          return newSeconds;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, seconds, onTick]);

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };
  
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return {
    time: formatTime(seconds),
    isPaused,
    togglePause,
  };
};
