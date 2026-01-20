import React, { useState, useEffect, useRef } from 'react';

export default function PremiumInquiryPage() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    timeline: 'Flexible',
    message: ''
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: any[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.5 + 0.5
      });
    }

    let time = 0;
    const animate = () => {
      time += 0.008;
      const width = canvas.width;
      const height = canvas.height;

      // Deep space gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0a0e27');
      gradient.addColorStop(0.5, '#1a1f3a');
      gradient.addColorStop(1, '#0f1229');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Ethereal waves
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const offset = time + (i * 1.5);
        const baseY = height * (0.3 + i * 0.15);
        
        for (let x = 0; x <= width; x += 8) {
          const y = baseY + 
                    Math.sin(x * 0.003 + offset) * 40 + 
                    Math.cos(x * 0.002 + offset * 0.5) * 25 +
                    Math.sin(x * 0.001 + offset * 1.5) * 15;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        
        const waveGradient = ctx.createLinearGradient(0, baseY - 60, 0, height);
        waveGradient.addColorStop(0, `rgba(78, 205, 196, ${0.04 - i * 0.008})`);
        waveGradient.addColorStop(0.5, `rgba(255, 107, 107, ${0.02 - i * 0.005})`);
        waveGradient.addColorStop(1, `rgba(78, 205, 196, ${0.01 - i * 0.002})`);
        ctx.fillStyle = waveGradient;
        ctx.fill();
      }

      // Enhanced particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(time * 2 + i * 0.1) * 0.3 + 0.7;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        
        const particleGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        particleGradient.addColorStop(0, `rgba(255, 255, 255, ${0.6 * pulse})`);
        particleGradient.addColorStop(0.5, `rgba(78, 205, 196, ${0.3 * pulse})`);
        particleGradient.addColorStop(1, 'rgba(78, 205, 196, 0)');
        ctx.fillStyle = particleGradient;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
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

  const handleSubmit = () => {
    console.log('Form submitted:', { ...formData, projectType: selectedType });
    alert('Thank you! We\'ll be in touch within 24 hours.');
  };

  return (
    <div className="min-h-screen w-full relative bg-[#0a0e27] text-white font-sans selection:bg-[#4ECDC4]/30 overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-12 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              animation: 'textGlow 4s ease-in-out infinite'
            }}>
          Every great brand starts with a conversation.
        </h1>
        <p className="text-xl text-gray-400 font-light">Tell us about your vision. We'll handle the rest.</p>
      </section>

      {/* Project Type Selector */}
      <section className="relative z-10 px-6 max-w-5xl mx-auto mb-16">
        <p className="text-center text-sm text-gray-500 uppercase tracking-widest mb-8">What brings you here today?</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {projectTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelectedType(type.label)}
              onMouseEnter={() => setHoveredItem(type.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`cursor-pointer p-6 rounded-2xl transition-all duration-500 border flex flex-col items-center gap-3 ${
                selectedType === type.label 
                ? 'bg-white/10 border-[#4ECDC4] shadow-[0_0_30px_rgba(78,205,196,0.3)]' 
                : 'bg-white/5 border-white/10'
              }`}
              style={{
                transform: hoveredItem === type.id ? 'translateY(-8px) scale(1.05)' : 'none',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span className="text-3xl">{type.icon}</span>
              <span className="text-sm font-medium text-center">{type.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Smart Project Form */}
      <section className="relative z-10 px-6 max-w-3xl mx-auto pb-24">
        <div className="p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl"
             style={{ background: 'rgba(10, 14, 39, 0.6)', backdropFilter: 'blur(20px)' }}>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Full Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-xl p-4 focus:border-[#FF6B6B] outline-none transition-all" 
              />
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-[#FF6B6B] outline-none transition-all" 
                />
                <p className="text-[10px] text-gray-600 mt-1 ml-1">Your information stays private. Always.</p>
              </div>
            </div>

            <input 
              type="text" 
              placeholder="Company / Brand Name" 
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-[#4ECDC4] outline-none transition-all" 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-gray-500 uppercase tracking-widest ml-1">Project Type</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedType} 
                  placeholder="Select above..." 
                  className="w-full bg-white/10 border border-[#4ECDC4]/30 rounded-xl p-4 text-[#4ECDC4] font-bold cursor-default" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-500 uppercase tracking-widest ml-1">Timeline</label>
                <select 
                  value={formData.timeline}
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                  className="w-full bg-[#0a0e27] border border-white/10 rounded-xl p-4 outline-none cursor-pointer"
                >
                  <option>Flexible</option>
                  <option>Urgent (within 2 weeks)</option>
                  <option>1–3 months</option>
                  <option>3–6 months</option>
                </select>
              </div>
            </div>

            <textarea 
              placeholder="Tell us about your idea, challenge, or vision" 
              rows={4} 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-[#FFE66D] outline-none transition-all resize-none" 
            />

            {/* CTA Button */}
            <button 
              onClick={handleSubmit}
              className="group relative w-full py-5 rounded-xl text-lg font-bold overflow-hidden transition-all duration-500 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                boxShadow: '0 20px 40px rgba(255, 107, 107, 0.3)'
              }}
            >
              <span className="relative z-10">Let's Create Together</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </button>

            {/* Reassurance Line */}
            <p className="text-center text-sm text-gray-500 mt-4">
              No pressure. No sales calls. Just a genuine conversation about what's possible.
            </p>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/10 text-center text-xs tracking-widest uppercase">
            <div className="opacity-60">
              <div className="text-2xl font-bold text-[#4ECDC4] mb-1">500+</div>
              <div className="text-gray-500">Projects Delivered</div>
            </div>
            <div className="opacity-60">
              <div className="text-2xl font-bold text-[#FF6B6B] mb-1">98%</div>
              <div className="text-gray-500">Client Satisfaction</div>
            </div>
            <div className="opacity-60">
              <div className="text-2xl font-bold text-[#FFE66D] mb-1">Award</div>
              <div className="text-gray-500">Winning Team</div>
            </div>
            <div className="opacity-60">
              <div className="text-2xl font-bold text-[#4ECDC4] mb-1">24h</div>
              <div className="text-gray-500">Response Time</div>
            </div>
          </div>

          {/* Additional Trust Line */}
          <p className="text-center text-xs text-gray-600 mt-6">
            Trusted by founders, political campaigns, and global brands.
          </p>
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