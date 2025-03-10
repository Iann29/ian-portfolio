import React, { useEffect, useState } from 'react';

const ThunderEffect: React.FC = () => {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const createThunder = () => {
      // First flash
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 100);

      // Second flash (delayed)
      setTimeout(() => {
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 50);
      }, 200);
    };

    // Random interval between 5 and 15 seconds
    const scheduleNextThunder = () => {
      const delay = Math.random() * 10000 + 5000;
      setTimeout(() => {
        createThunder();
        scheduleNextThunder();
      }, delay);
    };

    scheduleNextThunder();
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-100"
      style={{
        opacity: isFlashing ? 0.2 : 0,
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(200, 200, 255, 0.8))',
      }}
    />
  );
};

export default ThunderEffect;