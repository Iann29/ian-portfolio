import React, { useEffect, useRef, useState } from 'react';
import RainEffect from './RainEffect';
import ThunderEffect from './ThunderEffect';
import MountainLight from './MountainLight';

const HeroEffects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <RainEffect />
      <MountainLight />
      {isVisible && <ThunderEffect />}
    </div>
  );
};

export default HeroEffects;