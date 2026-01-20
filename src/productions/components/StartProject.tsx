import React, { useState, useEffect, useRef } from 'react';

export default function PremiumInquiryPage() {
  // State for interactivity
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Background Animation (Waves & Particles)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const particles: any[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1
      });
    }

    let time = 0;
    const animate = () => {
      time += 0.005;
      ctx.fillStyle = '#0a0e27';
      ctx.fillRect(0, 0, width, height);

      // Deep Space Waves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const offset = time + (i * 2);
        for (let x = 0; x <= width; x += 10) {
          const y = (height * 0.6) + Math.sin(x * 0.001 + offset) * 50 + Math.cos(x * 0.002) * 30;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height); ctx.lineTo(0, height);
        ctx.fillStyle = `rgba(78, 205, 196, ${0.03 - i * 0.01})`;
        ctx.fill();
      }

      particles.forEach(p => {
        p.x = (p.x + p.vx + width) % width;
        p.y = (p.y + p.vy + height) % height;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projectTypes = [
    { id: 'video', label: 'Video / Productions', icon: '🎬' },
    { id: 'marketing', label: 'Digital Marketing', icon: '📢' },
    { id: 'branding', label: 'Branding & Strategy', icon: '🧠' },
    { id: 'pr-mkt', label: 'Marketing PR', icon: '🗞️' },
    { id: 'pr-pol', label: 'Political PR', icon: '🏛️' },
    { id: 'tech', label: 'Website / Tech', icon: '🌐' },
    { id: 'not-sure', label: 'Not sure (help me decide)', icon: '❓' },
  ];

  return (
    <div className="min-h-screen w-full relative bg-[#0a0e27] text-white font-sans selection:bg-[#4ECDC4]/30 overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
      
      {/* 1. Intro Section */}
      <section className="relative z-10 pt-24 pb-12 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              animation: 'textGlow 4s ease-in-out infinite'
            }}>
          Every great brand starts with a conversation.
        </h1>
        <p className="text-xl text-gray-400 font-light">Tell us about your vision. We’ll handle the rest.</p>
      </section>

      {/* 2. Project Type Selector */}
      <section className="relative z-10 px-6 max-w-5xl mx-auto mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {projectTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelectedType(type.label)}
              onMouseEnter={() => setHoveredItem(type.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`cursor-pointer p-6 rounded-2xl transition-all duration-500 border flex flex-col items-center gap-3 ${
                selectedType === type.label 
                ? 'bg-white/10 border-[#4ECDC4] shadow-[0_0_30px_rgba(78,205,196,0.2)]' 
                : 'bg-white/5 border-white/10'
              }`}
              style={{
                transform: hoveredItem === type.id ? 'translateY(-8px) perspective(1000px) rotateX(10deg)' : 'none',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span className="text-3xl">{type.icon}</span>
              <span className="text-sm font-medium text-center">{type.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Smart Project Form */}
      <section className="relative z-10 px-6 max-w-3xl mx-auto pb-24">
        <div className="p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl"
             style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(20px)' }}>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Full Name" className="bg-white/5 border border-white/10 rounded-xl p-4 focus:border-[#FF6B6B] outline-none transition-all" />
              <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-xl p-4 focus:border-[#FF6B6B] outline-none transition-all" />
            </div>

            <input type="text" placeholder="Company / Brand Name" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-[#4ECDC4] outline-none transition-all" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-gray-500 uppercase tracking-widest ml-1">Project Type</label>
                <input type="text" readOnly value={selectedType} placeholder="Select above..." className="w-full bg-white/10 border border-[#4ECDC4]/30 rounded-xl p-4 text-[#4ECDC4] font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-500 uppercase tracking-widest ml-1">Timeline</label>
                <select className="w-full bg-[#0a0e27] border border-white/10 rounded-xl p-4 outline-none">
                  <option>Flexible</option>
                  <option>Urgent</option>
                  <option>1–3 months</option>
                </select>
              </div>
            </div>

            <textarea placeholder="Tell us about your idea" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-[#FFE66D] outline-none transition-all" />

            {/* 5. Soft CTA */}
            <button className="group relative w-full py-5 rounded-xl text-lg font-bold overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                      boxShadow: '0 20px 40px rgba(255, 107, 107, 0.2)'
                    }}>
              <span className="relative z-10">Let’s Create</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </button>
          </form>

          {/* 4. Trust Signals */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/10 text-center opacity-60 text-xs tracking-widest uppercase">
            <div>500+ Projects</div>
            <div>98% Happy</div>
            <div>Top Rated</div>
            <div>24h Response</div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes textGlow {
          0%, 100% { filter: drop-shadow(0 0 15px rgba(255, 107, 107, 0.3)); }
          50% { filter: drop-shadow(0 0 30px rgba(78, 205, 196, 0.5)); }
        }
      `}</style>
    </div>
  );
}