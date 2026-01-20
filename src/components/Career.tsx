import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import JoinTeamForm from './Form';

export default function AnimatedPageTemplate() {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Track mouse position for dynamic glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated canvas background
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

    // Create floating particles
    const particles: Array<{x: number, y: number, vx: number, vy: number, size: number}> = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1
      });
    }

    let time = 0;
    let animationId: number;

    const animate = () => {
      time += 0.008;

      // Dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0a0e27');
      gradient.addColorStop(0.5, '#1a1f4d');
      gradient.addColorStop(1, '#0f1729');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Animated waves (4 layers)
      for (let layer = 0; layer < 4; layer++) {
        ctx.beginPath();
        const offset = time * (0.4 + layer * 0.15);
        const amplitude = 80 + layer * 25;
        const frequency = 0.002 - layer * 0.0003;

        for (let x = 0; x <= width; x += 4) {
          const y = height * (0.4 + layer * 0.15) +
                    Math.sin(x * frequency + offset) * amplitude +
                    Math.cos(x * frequency * 1.5 + offset * 1.3) * (amplitude * 0.6);
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
          'rgba(102, 126, 234, 0.12)',
          'rgba(118, 75, 162, 0.10)',
          'rgba(78, 205, 196, 0.08)',
          'rgba(255, 107, 107, 0.06)'
        ];
        ctx.fillStyle = colors[layer];
        ctx.fill();
      }

      // Floating particles with glow
      ctx.fillStyle = 'rgba(102, 126, 234, 0.6)';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        glow.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Rotating geometric shapes
      ctx.save();
      ctx.translate(width * 0.15, height * 0.25);
      ctx.rotate(time * 0.3);
      ctx.strokeStyle = 'rgba(78, 205, 196, 0.2)';
      ctx.lineWidth = 2;
      ctx.strokeRect(-60, -60, 120, 120);
      ctx.restore();

      ctx.save();
      ctx.translate(width * 0.85, height * 0.7);
      ctx.rotate(-time * 0.4);
      ctx.strokeStyle = 'rgba(255, 107, 107, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Dark Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: '#0a0e27' }}
      />

      {/* Dynamic mouse glow */}
      <div 
        className="absolute pointer-events-none transition-all duration-500 z-10"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.25), transparent 60%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Your Content Goes Here */}
      <div className="relative z-20">

        {/* ===== CAREERS HERO SECTION ===== */}
        <section className="text-center py-24">
          <h1
            className="text-6xl font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #FFE66D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Careers in Smart Crafts Circle
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Build brands, scale businesses, and grow your career in a fast-paced digital agency.
          </p>

          <div className="flex justify-center gap-6">
            <button onClick={() => navigate('/career-openings')} className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-red-400 to-cyan-400 text-black hover:scale-110 transition">
              View Open Roles
            </button>
           
          </div>
        </section>

        {/* ===== WHY JOIN US ===== */}
        <section className="py-24">
          <h2 className="text-4xl font-bold text-center mb-14 text-white">
            Why Work With Us
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: 'Real Brand Growth', desc: 'Work on live campaigns with measurable ROI.' },
              { title: 'Fast Learning Curve', desc: 'Hands-on experience with tools & strategies.' },
              { title: 'Creative Freedom', desc: 'Ideas matter more than hierarchy.' },
              { title: 'Performance Driven', desc: 'Results > random marketing.' },
              { title: 'Multi-Industry Exposure', desc: 'E-commerce, startups, local & global brands.' },
              { title: 'Career Growth', desc: 'Clear growth path and leadership opportunities.' },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <JoinTeamForm/>

        {/* ===== LIFE AT OUR AGENCY ===== */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Life at Our Agency
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed">
              We are a team of strategists, creatives, and performance marketers who love
              solving real business problems. From brainstorming ad creatives to scaling
              campaigns, every day is about learning, experimenting, and growing.
            </p>
          </div>
        </section>

      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skew(-20deg); }
          100% { transform: translateX(200%) skew(-20deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 0.15; }
        }
        
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 30px 80px rgba(255, 107, 107, 0.6), 0 0 100px rgba(78, 205, 196, 0.4); }
          50% { box-shadow: 0 35px 100px rgba(255, 107, 107, 0.8), 0 0 140px rgba(78, 205, 196, 0.6); }
        }

        @keyframes textGlow {
          0%, 100% { filter: drop-shadow(0 0 30px rgba(255, 107, 107, 0.5)); }
          50% { filter: drop-shadow(0 0 50px rgba(78, 205, 196, 0.7)); }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

/* 
===============================================
REUSABLE COMPONENT STYLES & PATTERNS
===============================================

1. GLOWING ICON CARD
-------------------
<div 
  className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 relative overflow-hidden"
  style={{
    background: isHovered 
      ? `linear-gradient(135deg, ${color}, ${color}dd)` 
      : 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: `2px solid ${isHovered ? color : 'rgba(255, 255, 255, 0.2)'}`,
    boxShadow: isHovered 
      ? `0 20px 50px ${color}80, 0 0 60px ${color}60` 
      : '0 8px 25px rgba(0,0,0,0.3)',
    transform: isHovered ? 'translateY(-10px) rotateZ(8deg) scale(1.1)' : 'translateY(0)',
  }}
>
  {isHovered && (
    <>
      <div 
        className="absolute inset-0 rounded-2xl"
        style={{
          background: color,
          opacity: 0.3,
          animation: 'pulse 1.5s infinite',
        }}
      />
      <div 
        className="absolute inset-0 rounded-2xl border-2"
        style={{
          borderColor: color,
          animation: 'ping 2s infinite',
        }}
      />
    </>
  )}
</div>

2. 3D PERSPECTIVE CARD
---------------------
<div
  style={{
    transform: 'perspective(1000px) rotateX(0deg)',
    transition: 'transform 0.5s',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-10px) scale(1.05)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg)';
  }}
>
  Your content
</div>

3. GRADIENT TEXT
---------------
<h1 style={{
  background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  filter: 'drop-shadow(0 0 30px rgba(255, 107, 107, 0.5))',
}}>
  Your Text
</h1>

4. ANIMATED BUTTON
-----------------
<button 
  style={{
    background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
    backgroundSize: '200% 200%',
    boxShadow: '0 25px 60px rgba(255, 107, 107, 0.6), 0 0 80px rgba(78, 205, 196, 0.4)',
    animation: 'gradientShift 4s ease infinite',
    transition: 'all 0.5s',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-8px) scale(1.1)';
    e.currentTarget.style.boxShadow = '0 35px 80px rgba(255, 107, 107, 0.8)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
  }}
>
  Click Me
</button>

5. GLOWING LOGO/IMAGE
--------------------
<div 
  className="w-40 h-40 rounded-3xl overflow-hidden relative"
  style={{
    background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
    boxShadow: '0 30px 80px rgba(255, 107, 107, 0.6), 0 0 100px rgba(78, 205, 196, 0.4)',
    animation: 'glow 3s ease-in-out infinite',
  }}
>
  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent">
    Your content
  </div>
  <div 
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
    style={{
      animation: 'shine 4s infinite',
      transform: 'translateX(-100%) skew(-20deg)',
    }}
  />
</div>

6. GLASS MORPHISM CARD
---------------------
<div style={{
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(15px)',
  border: '2px solid rgba(255, 255, 255, 0.15)',
  boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
}}>
  Your content
</div>

COLOR PALETTE
-------------
Primary Red: #FF6B6B
Primary Cyan: #4ECDC4
Primary Yellow: #FFE66D
Primary Green: #A8E6CF
Dark Background: #0a0e27, #1a1f4d, #0f1729
*/





