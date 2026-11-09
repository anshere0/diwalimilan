import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  fadeSpeed: number;
  color: string;
  twinkle: number;
}

export const SparklerCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = Math.min(width < 768 ? 35 : 70, 80);
    const particles: Particle[] = [];
    const colors = [
      'rgba(214, 173, 96, ',  // Antique Gold
      'rgba(232, 154, 39, ',  // Marigold Orange
      'rgba(255, 230, 160, ', // Warm Starlight
      'rgba(255, 111, 30, ',  // Flame Ember
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.8,
        speedY: -(Math.random() * 0.6 + 0.2), // Gently rise like warm embers
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.1,
        maxOpacity: Math.random() * 0.7 + 0.2,
        fadeSpeed: Math.random() * 0.01 + 0.003,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkle: Math.random() * Math.PI * 2,
      });
    }

    // Touch / Cursor Interactive spark effect
    const cursor = { x: -1000, y: -1000, active: false };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      cursor.active = true;
      if ('touches' in e && e.touches.length > 0) {
        cursor.x = e.touches[0].clientX;
        cursor.y = e.touches[0].clientY;
      } else if ('clientX' in e) {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Draw and update embers
      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.twinkle += 0.05;

        // Wrap around top
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Twinkle factor
        const currentOpacity = Math.max(
          0.05,
          p.opacity * (0.7 + 0.3 * Math.sin(p.twinkle))
        );

        // Glow halo
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 3.5
        );
        gradient.addColorStop(0, `${p.color}${currentOpacity})`);
        gradient.addColorStop(0.5, `${p.color}${currentOpacity * 0.4})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Core bright spark
        ctx.fillStyle = `${p.color}${Math.min(1, currentOpacity * 1.5)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Cursor sparkle trail when active
      if (cursor.active && cursor.x > 0 && cursor.y > 0) {
        ctx.save();
        ctx.strokeStyle = `rgba(214, 173, 96, ${0.15 + 0.1 * Math.sin(tick * 0.2)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, 16 + 4 * Math.sin(tick * 0.2), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      style={{ willChange: 'transform' }}
    />
  );
};

