import React, { useEffect, useRef } from 'react';

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
}

const RainEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize rain drops
    const raindrops: RainDrop[] = [];
    const numberOfDrops = 150; // Reduced number of drops

    for (let i = 0; i < numberOfDrops; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 15 + 8, // Slightly shorter drops
        speed: Math.random() * 3 + 2, // Much slower speed (was 10 + 15)
      });
    }

    // Animation function
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Reduced trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(174, 194, 224, 0.3)'; // More transparent drops
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';

      raindrops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + drop.length, drop.y + drop.length);
        ctx.stroke();

        drop.x += drop.speed;
        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
        if (drop.x > canvas.width) {
          drop.x = -drop.length;
          drop.y = Math.random() * canvas.height;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }} // Slightly reduced overall opacity
    />
  );
};

export default RainEffect;