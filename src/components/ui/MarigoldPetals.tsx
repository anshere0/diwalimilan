import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angularSpeed: number;
  color: string;
  oscillationSpeed: number;
  oscillationDistance: number;
  initialX: number;
}

export const MarigoldPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const petalCount = width < 768 ? 10 : 20;
    const petals: Petal[] = [];
    const petalColors = ['#E89A27', '#F7B34D', '#FF6F1E', '#D6AD60', '#BF7810'];

    for (let i = 0; i < petalCount; i++) {
      const initX = Math.random() * width;
      petals.push({
        x: initX,
        y: Math.random() * height,
        size: Math.random() * 5 + 4,
        speedY: Math.random() * 0.7 + 0.3,
        speedX: Math.random() * 0.4 - 0.2,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.02,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        oscillationDistance: Math.random() * 25 + 15,
        initialX: initX,
      });
    }

    let t = 0;
    const render = () => {
      t++;
      ctx.clearRect(0, 0, width, height);

      petals.forEach(p => {
        p.y += p.speedY;
        p.x = p.initialX + Math.sin(t * p.oscillationSpeed) * p.oscillationDistance;
        p.angle += p.angularSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.initialX = Math.random() * width;
          p.x = p.initialX;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Draw elegant curved marigold petal
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.45;
        ctx.fill();

        // Delicate inner petal highlight
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.5, p.size * 0.25, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#FFE082';
        ctx.globalAlpha = 0.6;
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-70"
      style={{ willChange: 'transform' }}
    />
  );
};

