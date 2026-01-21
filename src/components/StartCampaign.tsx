import React, { useState, useEffect, useRef } from 'react';
import { Megaphone, Users, BarChart3, Globe, Video, Newspaper, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StartCampaign() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated background (UNCHANGED)
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

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 3 + 1,
    }));

    let t = 0;
    let id: number;

    const animate = () => {
      t += 0.008;

      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, '#0a0e27');
      g.addColorStop(0.5, '#1a1f4d');
      g.addColorStop(1, '#0f1729');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = 'rgba(102,126,234,0.6)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      id = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const services = [
    { id: 'campaign', title: 'Election Campaign Management', icon: Megaphone },
    { id: 'voters', title: 'Voter Outreach & Booth Strategy', icon: Users },
    { id: 'analytics', title: 'Political Data & Analytics', icon: BarChart3 },
    { id: 'digital', title: 'Digital & Social Media Campaigns', icon: Globe },
    { id: 'video', title: 'Video, Reels & Media Content', icon: Video },
    { id: 'press', title: 'Press & Media Relations', icon: Newspaper },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Mouse Glow */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: 600,
          height: 600,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(102,126,234,0.25), transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      {/* CONTENT */}
      <div className="relative z-20 container mx-auto px-6 py-20">

        {/* HERO */}
        <div className="text-center max-w-5xl mx-auto mb-20">
         

          <h1
            className="text-6xl md:text-7xl font-extrabold mb-6"
            style={{
              background:
                'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Connect with Voters <br /> Like Never Before
          </h1>

          <p className="text-xl text-gray-300 mb-10">
            Powerful political PR & digital campaign tools to amplify your message,
            influence public opinion, and win trust across India.
          </p>

          
        </div>

        {/* WHAT IS POLITICAL PR */}
        <div className="max-w-4xl mx-auto mb-24 text-center">
          <h2 className="text-4xl font-bold mb-6">What is Political PR?</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Political Public Relations is the art and science of shaping public
            perception, managing narratives, and building voter trust through
            digital platforms, media outreach, and grassroots communication.
            We help leaders, parties, and movements connect authentically with
            citizens using data-driven and ethical strategies.
          </p>
        </div>

        {/* SERVICES */}
        <div className="mb-28">
          <h2 className="text-4xl font-bold text-center mb-14">
            Our Political PR Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((s) => {
              const Icon = s.icon;
              const isHovered = hoveredItem === s.id;

              return (
                <div
                  key={s.id}
                  onMouseEnter={() => setHoveredItem(s.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="p-8 rounded-3xl transition-all duration-500 cursor-pointer"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(15px)',
                    border: '2px solid rgba(255,255,255,0.15)',
                    transform: isHovered
                      ? 'translateY(-12px) scale(1.05)'
                      : 'translateY(0)',
                    boxShadow: isHovered
                      ? '0 25px 60px rgba(78,205,196,0.4)'
                      : '0 10px 30px rgba(0,0,0,0.3)',
                  }}
                >
                  <Icon className="w-12 h-12 mb-6 text-cyan-400" />
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Win Voter Trust?
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            Let’s build a powerful, ethical, and high-impact political campaign
            together.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-16 py-6 rounded-2xl text-white text-xl font-bold transition-all duration-500"
            style={{
              background:
                'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
              boxShadow:
                '0 30px 80px rgba(255,107,107,0.6), 0 0 80px rgba(78,205,196,0.4)',
            }}
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
