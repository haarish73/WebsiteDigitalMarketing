import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Facebook, Globe, Send, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
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

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0a0e27');
      gradient.addColorStop(0.5, '#1a1f4d');
      gradient.addColorStop(1, '#0f1729');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Animated waves
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

      // Floating particles
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

  const contactDetails = [
    { icon: Mail, label: 'EMAIL', value: 'contact@Social Craft Circledigital.com', href: 'mailto:contact@Social Craft Circledigital.com', color: '#FF6B6B' },
    { icon: Phone, label: 'PHONE', value: '866-908-4748', href: 'tel:8669084748', color: '#4ECDC4' },
    { icon: MapPin, label: 'LOCATION', value: 'United States', href: '#', color: '#FFE66D' },
    { icon: Globe, label: 'WEBSITE', value: 'www.Social Craft Circledigital.com', href: 'https://Social Craft Circledigital.com', color: '#A8E6CF' },
  ];

  const socialMedia = [
    { icon: Linkedin, label: 'LinkedIn', href: '#', color: '#0077B5' },
    { icon: Facebook, label: 'Facebook', href: '#', color: '#1877F2' },
    { icon: Twitter, label: 'Twitter', href: '#', color: '#1DA1F2' },
    { icon: Instagram, label: 'Instagram', href: '#', color: '#E4405F' },
  ];

  const services = [
    'SEO Marketing',
    'Social Media Management',
    'Content Creation',
    'PPC Advertising',
    'Email Marketing',
    'Analytics & Reporting'
  ];

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

      {/* Bright Foreground Content */}
      <div className="relative z-20 container mx-auto px-4 py-16">
        {/* Header Section with Bright Colors */}
        <div className="text-center mb-16">
          <div 
            className="inline-block mb-8 relative"
          >
            <div 
              className="w-40 h-40 rounded-3xl mx-auto overflow-hidden relative"
            >
              <img src={new URL('../image/CompanyLogo.png', import.meta.url).href} alt="Company Logo" className="w-full h-full object-cover" />
            </div>
          </div>

          <h1 
            className="text-6xl md:text-7xl font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(255, 107, 107, 0.5))',
              animation: 'textGlow 3s ease-in-out infinite',
            }}
          >
            Social Craft Circle
          </h1>
          <p className="text-3xl font-light text-gray-300 mb-4">
            Digital Marketing Agency
          </p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transforming businesses through innovative digital marketing strategies
          </p>
        </div>

        {/* Main Content Grid with Bright Colors */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto mb-16">
          {/* Get In Touch Section */}
          <div>
            <h2 className="text-4xl font-bold mb-10 flex items-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
              <MessageCircle className="text-cyan-400" size={40} />
              Get In Touch
            </h2>
            <div className="space-y-6">
              {contactDetails.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-6 group cursor-pointer transition-all duration-500"
                    style={{
                      transform: hoveredIcon === item.label ? 'translateX(15px) scale(1.05)' : 'translateX(0)',
                    }}
                    onMouseEnter={() => setHoveredIcon(item.label)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 relative overflow-hidden flex-shrink-0"
                      style={{
                        background: hoveredIcon === item.label 
                          ? `linear-gradient(135deg, ${item.color}, ${item.color}dd)` 
                          : 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${hoveredIcon === item.label ? item.color : 'rgba(255, 255, 255, 0.2)'}`,
                        boxShadow: hoveredIcon === item.label 
                          ? `0 20px 50px ${item.color}80, 0 0 60px ${item.color}60` 
                          : '0 8px 25px rgba(0,0,0,0.3)',
                        transform: hoveredIcon === item.label ? 'translateY(-10px) rotateZ(8deg) scale(1.1)' : 'translateY(0) rotateZ(0deg) scale(1)',
                      }}
                    >
                      <Icon 
                        size={32} 
                        className="relative z-10 transition-all duration-500"
                        style={{
                          color: hoveredIcon === item.label ? '#fff' : item.color,
                          filter: `drop-shadow(0 0 10px ${item.color})`,
                        }}
                      />
                      {hoveredIcon === item.label && (
                        <>
                          <div 
                            className="absolute inset-0 rounded-2xl"
                            style={{
                              background: item.color,
                              opacity: 0.3,
                              animation: 'pulse 1.5s infinite',
                            }}
                          />
                          <div 
                            className="absolute inset-0 rounded-2xl border-2"
                            style={{
                              borderColor: item.color,
                              animation: 'ping 2s infinite',
                            }}
                          />
                        </>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold uppercase tracking-widest mb-1"
                         style={{ color: item.color }}>
                        {item.label}
                      </p>
                      <p className="text-xl font-bold text-white">{item.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Our Services Section */}
          <div>
            <h2 className="text-4xl font-bold mb-10 flex items-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, #4ECDC4, #FFE66D)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
              <Send className="text-yellow-400" size={40} />
              Our Services
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(15px)',
                    border: '2px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                    transform: 'perspective(1000px) rotateX(0deg)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-10px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 25px 60px rgba(255, 107, 107, 0.5)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #FF6B6B, #4ECDC4)';
                    e.currentTarget.style.border = '2px solid rgba(255, 107, 107, 0.8)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.border = '2px solid rgba(255, 255, 255, 0.15)';
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <p className="text-base font-bold text-gray-300 group-hover:text-white transition-colors text-center relative z-10">
                    {service}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Connect With Us Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center"
              style={{
                background: 'linear-gradient(135deg, #A8E6CF, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
            Connect With Us
          </h2>
          <div className="flex justify-center gap-6 mb-12">
            {socialMedia.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  className="group relative"
                  onMouseEnter={() => setHoveredIcon(social.label)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 cursor-pointer relative overflow-hidden"
                    style={{
                      background: hoveredIcon === social.label 
                        ? `linear-gradient(135deg, ${social.color}, ${social.color}dd)` 
                        : 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: `3px solid ${hoveredIcon === social.label ? social.color : 'rgba(255, 255, 255, 0.2)'}`,
                      boxShadow: hoveredIcon === social.label 
                        ? `0 30px 70px ${social.color}70, 0 0 80px ${social.color}50` 
                        : '0 8px 25px rgba(0,0,0,0.3)',
                      transform: hoveredIcon === social.label ? 'translateY(-15px) scale(1.2) rotateZ(-10deg)' : 'translateY(0) scale(1) rotateZ(0deg)',
                    }}
                  >
                    <Icon 
                      size={32} 
                      className="relative z-10 transition-all duration-500"
                      style={{
                        color: hoveredIcon === social.label ? '#fff' : social.color,
                        filter: `drop-shadow(0 0 15px ${social.color})`,
                      }}
                    />
                    {hoveredIcon === social.label && (
                      <>
                        <div 
                          className="absolute inset-0 rounded-2xl border-3"
                          style={{
                            borderColor: social.color,
                            animation: 'ping 2s infinite',
                          }}
                        />
                        <div 
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background: social.color,
                            opacity: 0.3,
                            animation: 'pulse 1.5s infinite',
                          }}
                        />
                      </>
                    )}
                  </div>
                </a>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button 
              className="px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-500 relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
                backgroundSize: '200% 200%',
                color: '#fff',
                boxShadow: '0 25px 60px rgba(255, 107, 107, 0.6), 0 0 80px rgba(78, 205, 196, 0.4)',
                animation: 'gradientShift 4s ease infinite',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 35px 80px rgba(255, 107, 107, 0.8), 0 0 120px rgba(78, 205, 196, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 25px 60px rgba(255, 107, 107, 0.6), 0 0 80px rgba(78, 205, 196, 0.4)';
              }}
            >
              <span className="relative z-10 drop-shadow-lg">Start Your Digital Journey</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            </button>
          </div>
        </div>
      </div>

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