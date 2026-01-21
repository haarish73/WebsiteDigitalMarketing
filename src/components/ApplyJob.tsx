import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedPageTemplate() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
    }));

    let time = 0;
    let frame: number;

    const animate = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, '#0a0e27');
      bg.addColorStop(0.5, '#1a1f4d');
      bg.addColorStop(1, '#0f1729');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(102,126,234,0.6)';
        ctx.fill();
      });

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Mouse Glow */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(102,126,234,0.25), transparent 60%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(40px)',
        }}
      />

      {/* CONTENT */}
      <div className="relative z-20 container mx-auto px-4 py-16">
        <h1
          className="text-6xl font-bold text-center mb-16"
          style={{
            background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4,#FFE66D)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(255,107,107,0.5))',
          }}
        >
          Careers
        </h1>

        {/* APPLY NOW FORM */}
        <div
          className="max-w-4xl mx-auto p-10 rounded-3xl"
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(15px)',
            border: '2px solid rgba(255,255,255,0.15)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          }}
        >
          <h2
            className="text-4xl font-bold text-center mb-10"
            style={{
              background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4,#FFE66D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Apply Now
          </h2>

          <form className="grid md:grid-cols-2 gap-6">
            <input required placeholder="Full Name *" style={inputStyle} />
            <input required type="email" placeholder="Email Address *" style={inputStyle} />
            <input required placeholder="Phone Number *" style={inputStyle} />
            <input placeholder="Current City / Location" style={inputStyle} />
            <input placeholder="LinkedIn Profile URL" style={inputStyle} />
            <input type="file" required accept=".pdf,.doc,.docx" style={inputStyle} />

            <input placeholder="Portfolio / Website URL" style={inputStyle} />
            <select required style={inputStyle}>
              <option value="">Total Experience</option>
              <option>Fresher</option>
              <option>0–1 Years</option>
              <option>1–3 Years</option>
              <option>3+ Years</option>
            </select>

            <textarea
              required
              minLength={300}
              maxLength={500}
              placeholder="Why should we hire you? (300–500 characters)"
              rows={5}
              className="md:col-span-2"
              style={inputStyle}
            />

            <select style={inputStyle}>
              <option value="">Notice Period</option>
              <option>Immediate</option>
              <option>15 Days</option>
              <option>30 Days</option>
              <option>60 Days</option>
            </select>

            <input placeholder="Expected Salary" style={inputStyle} />

            <label className="md:col-span-2 text-gray-200 flex gap-3">
              <input type="checkbox" required />
              I confirm that the information provided is accurate.
            </label>

            <button
              type="submit"
              className="md:col-span-2 py-5 rounded-xl text-xl font-semibold"
              style={{
                background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4,#FFE66D)',
                backgroundSize: '200% 200%',
                boxShadow: '0 25px 60px rgba(255,107,107,0.6)',
                animation: 'gradientShift 4s ease infinite',
              }}
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '14px 18px',
  borderRadius: '14px',
  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(12px)',
  border: '2px solid rgba(255,255,255,0.15)',
  color: 'white',
  outline: 'none',
};
