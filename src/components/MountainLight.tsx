import React, { useEffect, useRef } from 'react';

const MountainLight: React.FC = () => {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = lightRef.current;
    if (!light) return;

    const pulseLight = () => {
      light.style.transform = 'scale(1.2) translate(15px, -70px)';
      light.style.opacity = '0.7';
      
      setTimeout(() => {
        light.style.transform = 'scale(0.9) translate(15px, -70px)';
        light.style.opacity = '0.9';
      }, 1500);
    };

    const interval = setInterval(pulseLight, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={lightRef}
      className="absolute top-[15%] left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      style={{
        width: '2px',
        height: '2px',
        background: 'radial-gradient(circle at center, rgba(0, 255, 157, 0.9) 0%, rgba(0, 255, 157, 0) 70%)',
        filter: 'blur(1px)',
        boxShadow: `
          0 0 60px 30px rgba(0, 255, 157, 0.3),
          0 0 100px 60px rgba(0, 255, 157, 0.2),
          0 0 140px 90px rgba(0, 255, 157, 0.1)
        `,
        transition: 'all 1.5s ease-in-out',
        transform: 'translate(15px, -70px)',
      }}
    />
  );
};

export default MountainLight;