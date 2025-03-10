import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC<{ onLoadingComplete: () => void }> = ({ onLoadingComplete }) => {
  const [scale, setScale] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Start the expansion animation
    setScale(100);

    // After expansion, start fade out
    const fadeTimeout = setTimeout(() => {
      setOpacity(0);
    }, 1000);

    // After fade out, notify parent component
    const completeTimeout = setTimeout(() => {
      onLoadingComplete();
    }, 1500);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onLoadingComplete]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black pointer-events-none"
      style={{
        opacity,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      <div 
        className="absolute inset-0 bg-white"
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 1s cubic-bezier(0.85, 0, 0.15, 1)',
          transformOrigin: 'top',
        }}
      />
    </div>
  );
};

export default LoadingScreen;