"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date; // sudah dalam Jakarta time
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime(); // no offset

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  return (
    <div className="flex items-center space-x-2 font-mono">
      <div className="bg-gray-800 text-white px-2 py-1 rounded">
        {formatTime(timeLeft.hours)}
      </div>
      <span className="text-gray-800">:</span>
      <div className="bg-gray-800 text-white px-2 py-1 rounded">
        {formatTime(timeLeft.minutes)}
      </div>
      <span className="text-gray-800">:</span>
      <div className="bg-gray-800 text-white px-2 py-1 rounded">
        {formatTime(timeLeft.seconds)}
      </div>
    </div>
  );
}
