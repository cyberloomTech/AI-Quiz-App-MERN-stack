import React, { useState, useEffect } from 'react';

const TimeProgressBar = ({ duration, reset, seconds }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now() + duration;
    const interval = setInterval(() => {
      const elapsed = startTime - Date.now();
      const percentage = Math.max((elapsed / duration) * 100, 0);
      setProgress(percentage);
      if (percentage <= 0) {
        clearInterval(interval);
      }
    }, 1000 / 60); // update ~60 times per second

    return () => clearInterval(interval);
  }, [reset]);

  return (
    <>
    <div className="text-center">{seconds} s</div>
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-2 bg-blue-600"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    </>
  );
}

export default TimeProgressBar;