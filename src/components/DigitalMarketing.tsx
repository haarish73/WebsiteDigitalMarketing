import React, { useState, useEffect, useRef } from 'react';
import { Megaphone, Users, TrendingUp, Mail, Share2, Video, Target, Zap, CheckCircle, ArrowRight, BarChart3, Award } from 'lucide-react';

export default function DigitalMarketingServicesPage() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

      ctx.fillStyle = 'rgba(102, 126, 234, 0.6)';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        glow.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

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
    { 
      id: 'social', 
      icon: Share2, 
      title: 'Social Media Marketing', 
      description: 'Build engaged communities and amplify your brand across all social platforms',
      color: '#FF6B6B' 
    },
    { 
      id: 'ppc', 
      icon: Target, 
      title: 'PPC Advertising', 
      description: 'Drive instant traffic and conversions with targeted paid campaigns',
      color: '#4ECDC4' 
    },
    { 
      id: 'content', 
      icon: Megaphone, 
      title: 'Content Creations', 
      description: 'Create compelling content that attracts, engages, and converts your audience',
      color: '#FFE66D' 
    },
    { 
      id: 'email', 
      icon: Mail, 
      title: 'WhatsApp Marketing', 
      description: 'Nurture leads and boost sales with personalized email campaigns',
      color: '#A8E6CF' 
    },
    { 
      id: 'video', 
      icon: Video, 
      title: 'Video Marketing', 
      description: 'Engage audiences with stunning video content that tells your story',
      color: '#FF6B6B' 
    },
    { 
      id: 'analytics', 
      icon: BarChart3, 
      title: 'Marketing Analytics', 
      description: 'Make data-driven decisions with comprehensive performance tracking',
      color: '#4ECDC4' 
    },
  ];

  const benefits = [
    'Increase Brand Awareness by 400%',
    'Generate High-Quality Leads',
    'Boost Customer Engagement',
    'Maximize Marketing ROI',
    'Build Lasting Relationships',
    'Scale Your Business Growth',
  ];

  const approach = [
    { step: '01', title: 'Discovery', description: 'Understand your business, goals, and target audience' },
    { step: '02', title: 'Strategy', description: 'Develop a custom multi-channel marketing plan' },
    { step: '03', title: 'Execution', description: 'Launch campaigns across all digital channels' },
    { step: '04', title: 'Optimization', description: 'Continuously improve based on real-time data' },
  ];

  const stats = [
    { number: '500+', label: 'Campaigns Launched', icon: Zap },
    { number: '98%', label: 'Client Satisfaction', icon: Award },
    { number: '350%', label: 'Avg ROI Growth', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ background: '#0a0e27' }}
      />

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

      <div className="relative z-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="container mx-auto text-center">
            <div 
              style={{
                opacity: Math.max(0, 1 - scrollY / 400),
                transform: `translateY(${scrollY * 0.5}px)`,
                transition: 'all 0.3s',
              }}
            >
              <div className="mb-8 inline-block">
                <div 
                  className="w-32 h-32 mx-auto rounded-3xl overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
                    boxShadow: '0 30px 80px rgba(255, 107, 107, 0.6), 0 0 100px rgba(78, 205, 196, 0.4)',
                    animation: 'glow 3s ease-in-out infinite',
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Megaphone className="w-16 h-16 text-white" />
                  </div>
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    style={{
                      animation: 'shine 4s infinite',
                    }}
                  />
                </div>
              </div>

              <h1 
                className="text-7xl md:text-8xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'textGlow 3s ease-in-out infinite',
                }}
              >
                Digital Marketing Services
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Transform your online presence with comprehensive digital marketing strategies that drive real results
              </p>

                         </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <h2 
              className="text-5xl md:text-6xl font-bold text-center mb-6"
              style={{
                background: 'linear-gradient(135deg, #4ECDC4 0%, #FFE66D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Our Digital Marketing Solutions
            </h2>
            <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              End-to-end digital marketing services to grow your brand and dominate your market
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isHovered = hoveredItem === service.id;
                
                return (
                  <div
                    key={service.id}
                    className="relative"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    }}
                    onMouseEnter={() => setHoveredItem(service.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div 
                      className="p-8 rounded-3xl transition-all duration-500"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(15px)',
                        border: `2px solid ${isHovered ? service.color : 'rgba(255, 255, 255, 0.15)'}`,
                        boxShadow: isHovered 
                          ? `0 30px 80px ${service.color}60, 0 0 100px ${service.color}40`
                          : '0 8px 25px rgba(0,0,0,0.3)',
                        transform: isHovered ? 'translateY(-15px) scale(1.03)' : 'translateY(0)',
                      }}
                    >
                      <div 
                        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 relative overflow-hidden"
                        style={{
                          background: isHovered 
                            ? `linear-gradient(135deg, ${service.color}, ${service.color}dd)` 
                            : 'rgba(255, 255, 255, 0.1)',
                          border: `2px solid ${isHovered ? service.color : 'rgba(255, 255, 255, 0.2)'}`,
                          boxShadow: isHovered 
                            ? `0 20px 50px ${service.color}80, 0 0 60px ${service.color}60` 
                            : '0 8px 25px rgba(0,0,0,0.3)',
                          transform: isHovered ? 'rotateZ(8deg) scale(1.1)' : 'rotateZ(0)',
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
                        <Icon className="w-10 h-10 text-white relative z-10" />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-lg">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div 
              className="rounded-3xl p-12 relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={index} 
                      className="text-center"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                      }}
                    >
                      <div 
                        className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-500"
                        style={{
                          background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                          boxShadow: '0 20px 50px rgba(255, 107, 107, 0.5)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.2) rotate(360deg)';
                          e.currentTarget.style.boxShadow = '0 30px 70px rgba(78, 205, 196, 0.7)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                          e.currentTarget.style.boxShadow = '0 20px 50px rgba(255, 107, 107, 0.5)';
                        }}
                      >
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                      <div 
                        className="text-6xl font-bold mb-3"
                        style={{
                          background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {stat.number}
                      </div>
                      <div className="text-xl text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <h2 
              className="text-5xl md:text-6xl font-bold text-center mb-16"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Why Partner With Us?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-6 rounded-2xl transition-all duration-500"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(10px)';
                    e.currentTarget.style.background = 'rgba(78, 205, 196, 0.1)';
                    e.currentTarget.style.borderColor = '#4ECDC4';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
                  <span className="text-lg text-white font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <h2 
              className="text-5xl md:text-6xl font-bold text-center mb-6"
              style={{
                background: 'linear-gradient(135deg, #FFE66D 0%, #FF6B6B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Our Approach
            </h2>
            <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              A proven framework designed to maximize your marketing success
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {approach.map((item, index) => (
                <div
                  key={index}
                  className="text-center"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                  }}
                >
                  <div 
                    className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl font-bold transition-all duration-500"
                    style={{
                      background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                      boxShadow: '0 20px 50px rgba(255, 107, 107, 0.5)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.2) rotateY(180deg)';
                      e.currentTarget.style.boxShadow = '0 30px 70px rgba(78, 205, 196, 0.7)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) rotateY(0deg)';
                      e.currentTarget.style.boxShadow = '0 20px 50px rgba(255, 107, 107, 0.5)';
                    }}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-lg">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div 
              className="rounded-3xl p-16 text-center relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <h2 
                className="text-5xl md:text-6xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Ready to Dominate Digital?
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Let's build a comprehensive digital marketing strategy that drives growth, engagement, and revenue for your business.
              </p>
              <a href="tel:9030492596">
  <button 
    className="px-12 py-5 text-xl font-bold text-white rounded-full inline-flex items-center gap-3"
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
    Launch Your Campaign
    <ArrowRight className="w-6 h-6" />
  </button>
</a>

            </div>
          </div>
        </section>
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

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}