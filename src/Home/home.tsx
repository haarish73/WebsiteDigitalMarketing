import React, { useState, useEffect, useRef } from 'react';
import { Zap, Target, TrendingUp, Users, BarChart3, Rocket, ChevronRight, Play } from 'lucide-react';
import ConsultationForm from '../components/Consulation';

export default function DigitalMarketingHomepage() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [showConsultation, setShowConsultation] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Track mouse position for dynamic glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const services = [
    { icon: Zap, title: 'SEO Optimization', color: '#FF6B6B', desc: 'Dominate search rankings' },
    { icon: Target, title: 'Paid Advertising', color: '#4ECDC4', desc: 'ROI-focused campaigns' },
    { icon: TrendingUp, title: 'Social Media', color: '#FFE66D', desc: 'Viral content strategy' },
    { icon: Users, title: 'Brand Strategy', color: '#A8E6CF', desc: 'Build lasting connections' },
    { icon: BarChart3, title: 'Analytics', color: '#FF6B6B', desc: 'Data-driven insights' },
    { icon: Rocket, title: 'Growth Hacking', color: '#4ECDC4', desc: 'Exponential scaling' },
  ];

  const stats = [
    { value: '500+', label: 'Clients Served' },
    { value: '250%', label: 'Avg ROI Increase' },
    { value: '50M+', label: 'Leads Generated' },
    { value: '98%', label: 'Client Satisfaction' },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Dark Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ background: '#0a0e27' }}
      />

      {/* Dynamic mouse glow */}
      <div 
        className="fixed pointer-events-none transition-all duration-500 z-10"
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

      {/* Content Container */}
      <div className="relative z-20">

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div 
            className="inline-block mb-6 px-6 py-2 rounded-full text-sm font-semibold text-white"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(15px)',
              border: '2px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            🚀 Trusted by 500+ Growing Brands
          </div>
          
          <h1 
            className="text-7xl font-bold mb-6 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(255, 107, 107, 0.5))',
              animation: 'textGlow 3s ease-in-out infinite',
            }}
          >
            Scale Your Business<br />with Data-Driven Marketing
          </h1>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12">
            We combine cutting-edge technology with creative strategy to deliver measurable results that transform your digital presence.
          </p>

          <div className="flex gap-6 justify-center items-center">
            <button 
              className="px-10 py-4 rounded-full text-white font-bold text-lg flex items-center gap-3"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
                backgroundSize: '200% 200%',
                boxShadow: '0 25px 60px rgba(255, 107, 107, 0.6), 0 0 80px rgba(78, 205, 196, 0.4)',
                animation: 'gradientShift 4s ease infinite',
                transition: 'all 0.5s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 35px 80px rgba(255, 107, 107, 0.8), 0 0 120px rgba(78, 205, 196, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 25px 60px rgba(255, 107, 107, 0.6), 0 0 80px rgba(78, 205, 196, 0.4)';
              }}
            >
              Start Growing Today
              <ChevronRight size={20} />
            </button>

            <button 
              className="px-10 py-4 rounded-full text-white font-bold text-lg flex items-center gap-3"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(15px)',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Play size={20} fill="white" />
              Watch Demo
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div 
                key={i}
                className="text-center p-8 rounded-3xl transition-all duration-500"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  transform: hoveredItem === `stat-${i}` ? 'translateY(-10px) scale(1.05)' : 'translateY(0)',
                }}
                onMouseEnter={() => setHoveredItem(`stat-${i}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div 
                  className="text-5xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-white/60 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="container mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 
              className="text-5xl font-bold mb-4"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Our Services
            </h2>
            <p className="text-white/70 text-lg">Comprehensive solutions for modern digital challenges</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              const isHovered = hoveredItem === `service-${i}`;
              
              return (
                <div
                  key={i}
                  className="p-8 rounded-3xl transition-all duration-500 cursor-pointer"
                  style={{
                    background: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(15px)',
                    border: `2px solid ${isHovered ? service.color + '80' : 'rgba(255, 255, 255, 0.1)'}`,
                    boxShadow: isHovered ? `0 20px 50px ${service.color}40` : '0 8px 25px rgba(0,0,0,0.3)',
                    transform: isHovered ? 'translateY(-15px)' : 'translateY(0)',
                  }}
                  onMouseEnter={() => setHoveredItem(`service-${i}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden"
                    style={{
                      background: isHovered 
                        ? `linear-gradient(135deg, ${service.color}, ${service.color}dd)` 
                        : 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: `2px solid ${isHovered ? service.color : 'rgba(255, 255, 255, 0.2)'}`,
                      boxShadow: isHovered 
                        ? `0 20px 50px ${service.color}80, 0 0 60px ${service.color}60` 
                        : '0 8px 25px rgba(0,0,0,0.3)',
                      transform: isHovered ? 'rotateZ(8deg) scale(1.1)' : 'rotateZ(0)',
                      transition: 'all 0.5s',
                    }}
                  >
                    {isHovered && (
                      <>
                        <div 
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background: service.color,
                            opacity: 0.3,
                            animation: 'pulse 1.5s infinite',
                          }}
                        />
                        <div 
                          className="absolute inset-0 rounded-2xl border-2"
                          style={{
                            borderColor: service.color,
                            animation: 'ping 2s infinite',
                          }}
                        />
                      </>
                    )}
                    <Icon size={36} color="white" className="relative z-10" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-white/60">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-24">
          <div 
            className="rounded-[40px] p-16 text-center relative overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(15px)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
                animation: 'gradientShift 8s ease infinite',
                backgroundSize: '200% 200%',
              }}
            />
            
            <div className="relative z-10">
              <h2 
                className="text-5xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Ready to 10x Your Growth?
              </h2>
              <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
                Join hundreds of successful brands who've transformed their digital presence with our proven strategies.
              </p>
              
              <button 
                onClick={() => setShowConsultation(true)}
                className="px-12 py-5 rounded-full text-white font-bold text-lg"
                style={{
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                  boxShadow: '0 25px 60px rgba(255, 107, 107, 0.6)',
                  transition: 'all 0.5s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 35px 80px rgba(255, 107, 107, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(255, 107, 107, 0.6)';
                }}
              >
                Schedule Free Consultation
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-white/10">
          <div className="text-center text-white/50">
            <p>© 2026 DigiBoost. Elevating brands through innovation.</p>
          </div>
        </footer>
      </div>

      {/* Consultation Modal */}
      {showConsultation && (
        <ConsultationForm onClose={() => setShowConsultation(false)} />
      )}

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