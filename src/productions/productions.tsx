import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Video, Camera, Film, Mic, Music, Sparkles, Award, Users, Clock, CheckCircle, ArrowRight, Play, Star, TrendingUp } from 'lucide-react';
import HillockImage from '../image/Hillock.png';
import PocharamImage from '../image/Pocharam Srinivas Reddy.png';

export default function ProductionStudio() {
  const navigate = useNavigate();
  const [hoveredOffering, setHoveredOffering] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

  const offerings = [
    { num: '01', title: 'Promotional Videos', icon: '🎬', color: '#FF6B6B' },
    { num: '02', title: 'Corporate Videos', icon: '💼', color: '#4ECDC4' },
    { num: '03', title: 'Explainer Videos', icon: '🎓', color: '#FFE66D' },
    { num: '04', title: 'Training Videos', icon: '📚', color: '#A8E6CF' },
    { num: '05', title: 'Testimonial Videos', icon: '⭐', color: '#667EEA' },
    { num: '06', title: 'Event Videos', icon: '🎪', color: '#F093FB' },
    { num: '07', title: 'Documentary Videos', icon: '🎥', color: '#FF6B6B' },
    { num: '08', title: 'Music Videos', icon: '🎵', color: '#4ECDC4' },
    { num: '09', title: 'Animated Videos', icon: '✨', color: '#FFE66D' },
    { num: '10', title: 'Social Media Videos', icon: '📱', color: '#A8E6CF' },
    { num: '11', title: 'Podcasts', icon: '🎙️', color: '#667EEA' },
    { num: '12', title: 'Dance Videos', icon: '💃', color: '#F093FB' }
  ];

  const portfolioItems = [
    { title: 'Brand Campaign 2024', category: 'Corporate', views: '2.5M', image: '🎬' },
    { title: 'Product Launch', category: 'Promotional', views: '1.8M', image: '🚀' },
    { title: 'Documentary Series', category: 'Documentary', views: '3.2M', image: '🎥' },
    { title: 'Music Video Production', category: 'Music', views: '5.1M', image: '🎵' }
  ];

const testimonials = [
  {
    name: 'Sudhamsh Reddy',
    role: 'CEO, Hillock Resort',
    text: "We partnered with them for our resort's marketing and sales growth, and the results were impressive. Their approach is strategic, transparent, and focused on real business outcomes. A reliable digital marketing partner.",
    rating: 5,
    image: HillockImage
  },
];


  const stats = [
    { icon: Video, value: '10+', label: 'Projects Completed' },
    { icon: Users, value: '20+', label: 'Happy Clients' },
    { icon: Award, value: '10+', label: 'Awards Won' },
    { icon: Clock, value: '2+', label: 'Years Experience' }
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden pt-24 md:pt-32">

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: '#0a0e27' }}
      />

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

      <div className="relative z-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="text-center">
            <div
              className="inline-block mb-8 px-8 py-3 rounded-full"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <h2
                className="text-6xl md:text-8xl font-black mb-2"
                style={{
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 30px rgba(255, 107, 107, 0.5))',
                }}
              >
                Create. Capture. Convert.
              </h2>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Cinematic Excellence
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #4ECDC4 0%, #FFE66D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Meets Creative Vision
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto">
              We transform ideas into captivating visual stories that inspire, engage, and leave lasting impressions
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => navigate('/start-project')}
                className="px-12 py-6 rounded-2xl text-white text-lg font-bold transition-all duration-500 flex items-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
                  backgroundSize: '200% 200%',
                  boxShadow: '0 25px 60px rgba(255, 107, 107, 0.6), 0 0 80px rgba(78, 205, 196, 0.4)',
                  animation: 'gradientShift 4s ease infinite',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 35px 80px rgba(255, 107, 107, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <Play fill="white" /> Start Your Project
              </button>

              <button
                className="px-12 py-6 rounded-2xl text-white text-lg font-semibold transition-all duration-300 flex items-center gap-3"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Film /> View Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl text-center transition-all duration-500"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(15px)',
                    border: '2px solid rgba(255, 255, 255, 0.15)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(78, 205, 196, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={40} className="mx-auto mb-4" style={{ color: '#4ECDC4' }} />
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/60">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Offerings Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="mb-16">
            <div
              className="inline-block px-10 py-6 rounded-3xl mb-8"
              style={{
                background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.3), rgba(102, 126, 234, 0.3))',
                backdropFilter: 'blur(20px)',
                border: '3px solid rgba(255, 255, 255, 0.2)',
                transform: 'rotate(-2deg)',
              }}
            >
              <h2
                className="text-5xl md:text-6xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Our Offerings.
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {offerings.map((offering) => {
              const isHovered = hoveredOffering === offering.num;
              return (
                <div
                  key={offering.num}
                  onMouseEnter={() => setHoveredOffering(offering.num)}
                  onMouseLeave={() => setHoveredOffering(null)}
                  className="group relative overflow-hidden rounded-3xl transition-all duration-500 cursor-pointer"
                  style={{
                    background: isHovered
                      ? `linear-gradient(135deg, ${offering.color}40, ${offering.color}20)`
                      : 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(15px)',
                    border: `3px solid ${isHovered ? offering.color : 'rgba(255, 255, 255, 0.15)'}`,
                    boxShadow: isHovered
                      ? `0 25px 70px ${offering.color}60, 0 0 100px ${offering.color}40`
                      : '0 10px 30px rgba(0,0,0,0.3)',
                    transform: isHovered ? 'translateX(10px) scale(1.02)' : 'translateX(0)',
                  }}
                >
                  {/* Background Icon */}
                  <div
                    className="absolute -right-8 -top-8 text-9xl transition-all duration-500"
                    style={{
                      opacity: isHovered ? 0.2 : 0.05,
                      transform: isHovered ? 'rotate(15deg) scale(1.3)' : 'rotate(0deg) scale(1)',
                      filter: `drop-shadow(0 0 30px ${offering.color})`,
                    }}
                  >
                    {offering.icon}
                  </div>

                  <div className="relative p-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div
                        className="text-5xl font-black transition-all duration-300"
                        style={{
                          color: isHovered ? offering.color : 'rgba(255, 255, 255, 0.3)',
                          textShadow: isHovered ? `0 0 30px ${offering.color}` : 'none',
                        }}
                      >
                        {offering.num}
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                          {offering.title}
                        </h3>
                        <div
                          className="h-1 rounded-full transition-all duration-500"
                          style={{
                            width: isHovered ? '100px' : '0px',
                            background: offering.color,
                          }}
                        />
                      </div>
                    </div>

                    <ArrowRight
                      size={32}
                      className="transition-all duration-300"
                      style={{
                        color: offering.color,
                        transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
                        opacity: isHovered ? 1 : 0.5,
                      }}
                    />
                  </div>

                  {/* Animated shine effect */}
                  {isHovered && (
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      style={{
                        animation: 'shine 2s infinite',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Portfolio Showcase */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                background: 'linear-gradient(135deg, #FFE66D 0%, #FF6B6B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Featured Work
            </h2>
            <p className="text-xl text-white/70">Projects that made an impact</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolioItems.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 30px 80px rgba(255, 107, 107, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="h-64 flex items-center justify-center text-9xl relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(78, 205, 196, 0.2))',
                  }}
                >
                  {item.image}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play size={60} fill="white" className="text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="px-4 py-1 rounded-full text-sm font-semibold"
                      style={{
                        background: 'rgba(78, 205, 196, 0.2)',
                        color: '#4ECDC4',
                      }}
                    >
                      {item.category}
                    </span>
                    <div className="flex items-center gap-2 text-white/60">
                      <TrendingUp size={18} />
                      <span>{item.views} views</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                background: 'linear-gradient(135deg, #4ECDC4 0%, #667EEA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Client Love
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div
              className="p-12 rounded-3xl"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div className="flex items-center gap-6 mb-6">
                <img
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="w-48 h-20 rounded-md object-cover border-4"
                  style={{
                    borderColor: '#4ECDC4',
                    boxShadow: '0 0 20px rgba(78, 205, 196, 0.5)'
                  }}
                />
                <div className="flex gap-2">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={28} fill="#FFE66D" style={{ color: '#FFE66D' }} />
                  ))}
                </div>
              </div>
              <p className="text-2xl text-white/90 mb-8 leading-relaxed">
                "{testimonials[activeTestimonial].text}"
              </p>

              <div>
                <div className="text-xl font-bold text-white">
                  {testimonials[activeTestimonial].name}
                </div>
                <div className="text-white/60">
                  {testimonials[activeTestimonial].role}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className="w-3 h-3 rounded-full transition-all duration-300"
                  style={{
                    background: activeTestimonial === idx ? '#4ECDC4' : 'rgba(255, 255, 255, 0.3)',
                    width: activeTestimonial === idx ? '40px' : '12px',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div
            className="p-16 rounded-3xl text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(78, 205, 196, 0.2))',
              backdropFilter: 'blur(20px)',
              border: '3px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Create Magic?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Let's bring your vision to life with stunning visuals that captivate and inspire
            </p>
            <Link to="/contact">
  <button
    className="px-16 py-6 rounded-2xl text-white text-xl font-bold transition-all duration-500 inline-flex items-center gap-3"
    style={{
      background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
      boxShadow: '0 25px 60px rgba(255, 107, 107, 0.6)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
    }}
  >
    <Camera /> Book a Consultation
  </button>
</Link>
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

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}