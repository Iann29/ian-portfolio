import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC<{ onLoadingComplete: () => void }> = ({ onLoadingComplete }) => {
  const [scale, setScale] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Start the expansion animation
    setScale(1);

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
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      style={{
        opacity,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      <div 
        className="w-4 h-4 bg-white rounded-full"
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 1s cubic-bezier(0.85, 0, 0.15, 1)',
          transformOrigin: 'center',
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 70%)',
          transform: `scale(${scale})`,
          transition: 'transform 1s cubic-bezier(0.85, 0, 0.15, 1)',
          transformOrigin: 'center',
        }}
      />
    </div>
  );
};

export default LoadingScreen;