import React, { useEffect, useRef } from 'react';

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  width: number;
}

const RainEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Habilita a pixelização
      ctx.imageSmoothingEnabled = false;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const raindrops: RainDrop[] = [];
    const numberOfDrops = 100;

    for (let i = 0; i < numberOfDrops; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 12 + 6,
        speed: Math.random() * 2 + 1,
        width: Math.floor(Math.random() * 2) + 1 // Largura variável para mais pixelização
      });
    }

    const drawPixelatedLine = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      length: number,
      width: number
    ) => {
      const pixelSize = 2; // Tamanho do pixel
      const steps = Math.floor(length / pixelSize);
      
      for (let i = 0; i < steps; i++) {
        const opacity = 1 - (i / steps) * 0.7; // Fade out gradual
        ctx.fillStyle = `rgba(174, 194, 224, ${opacity})`;
        ctx.fillRect(
          Math.floor(x / pixelSize) * pixelSize,
          Math.floor((y + i * pixelSize) / pixelSize) * pixelSize,
          width * pixelSize,
          pixelSize
        );
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      raindrops.forEach((drop) => {
        drawPixelatedLine(ctx, drop.x, drop.y, drop.length, drop.width);

        drop.y += drop.speed * 2;
        drop.x += drop.speed * 0.5; // Adiciona movimento diagonal

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
      style={{ 
        opacity: 0.6,
        imageRendering: 'pixelated' // Força renderização pixelada
      }}
    />
  );
};

export default RainEffect;