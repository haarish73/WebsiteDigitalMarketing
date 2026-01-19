import React, { useState, useEffect, useRef } from 'react';

export default function BackgroundAnimation() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{x: number, y: number, vx: number, vy: number, size: number}> = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1
      });
    }

    let time = 0;
    let animationId: number;

    const animate = () => {
      time += 0.005;

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
      gradient.addColorStop(0.5, 'rgba(107, 123, 62, 0.01)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.02)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle wave effect
      for (let layer = 0; layer < 2; layer++) {
        ctx.beginPath();
        const offset = time * (0.2 + layer * 0.1);
        const amplitude = 30 + layer * 15;
        const frequency = 0.001 - layer * 0.0002;

        for (let x = 0; x <= width; x += 8) {
          const y = height * (0.6 + layer * 0.1) +
                    Math.sin(x * frequency + offset) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const colors = [
          'rgba(107, 123, 62, 0.03)',
          'rgba(107, 123, 62, 0.02)'
        ];
        ctx.fillStyle = colors[layer];
        ctx.fill();
      }

      // Particles
      ctx.fillStyle = 'rgba(107, 123, 62, 0.4)';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        glow.addColorStop(0, 'rgba(107, 123, 62, 0.2)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ background: 'transparent' }}
      />

      {/* Mouse-following glow effect */}
      <div
        className="fixed pointer-events-none transition-all duration-300 z-10"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(107, 123, 62, 0.1), transparent 50%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(30px)',
        }}
      />
    </>
  );
}