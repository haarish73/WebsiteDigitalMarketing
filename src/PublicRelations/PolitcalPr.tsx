import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Phone, Users, Send, Volume2, BarChart3, Zap, CheckCircle, ArrowRight, Menu, X } from 'lucide-react';
import pocharam from '../image/Pocharam Srinivas Reddy.png'

function ContactUsModal({ onClose }: { onClose?: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg px-4">
      <div
        className="w-full max-w-2xl rounded-3xl p-10 relative"
        style={{
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255,255,255,0.15)',
          boxShadow: '0 30px 80px rgba(78,205,196,0.25)',
        }}
      >
        {/* CLOSE */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/60 hover:text-white"
          >
            ✕
          </button>
        )}

        {/* TITLE */}
        <h2
          className="text-4xl font-bold text-center mb-8"
          style={{
            background:
              'linear-gradient(135deg, #FF6B6B, #4ECDC4, #FFE66D)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Contact Us
        </h2>
        
        <form className="space-y-6">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
            />

            <button
              type="submit"
              className="w-full py-4 rounded-xl text-black font-semibold text-lg bg-gradient-to-r from-red-400 to-cyan-400 hover:scale-105 transition"
            >
              Send Message →
            </button>
          </form>
      </div>
    </div>
  );
}

export default function PoliticalPRPlatform() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
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

  const features = [
    {
      id: 'bulk-sms',
      icon: MessageSquare,
      title: 'Bulk SMS',
      description: 'Send millions of personalized messages instantly to your voter base',
      color: '#FF6B6B',
      stats: '10M+ messages/day',
      image: '📱'
    },
    {
      id: 'voice-calls',
      icon: Phone,
      title: 'Voice Calls',
      description: 'Automated voice campaigns with personalized greetings and messages',
      color: '#4ECDC4',
      stats: '99.9% uptime',
      image: '📞'
    },
    {
      id: 'teleconference',
      icon: Users,
      title: 'Tele-Conference',
      description: 'Host virtual rallies and town halls with thousands of participants',
      color: '#FFE66D',
      stats: '50K+ capacity',
      image: '🎤'
    },
    {
      id: 'whatsapp',
      icon: Send,
      title: 'WhatsApp Broadcast',
      description: 'Reach your audience on WhatsApp with rich media and instant updates',
      color: '#A8E6CF',
      stats: 'Rich media support',
      image: '💬'
    },
    {
      id: 'voice-ads',
      icon: Volume2,
      title: 'Voice Ads',
      description: 'Create and deploy professional voice advertisements across networks',
      color: '#667EEA',
      stats: 'Multi-language',
      image: '📢'
    },
    {
      id: 'analytics',
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track campaign performance with detailed insights and metrics',
      color: '#F093FB',
      stats: 'Live dashboards',
      image: '📊'
    }
  ];

  const plans = [
    {
      name: 'Starter',
      price: '₹49,999',
      period: '/month',
      features: [
        '100K SMS credits',
        '10K voice calls',
        'Basic analytics',
        'WhatsApp broadcast (5K)',
        'Email support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '₹1,99,999',
      period: '/month',
      features: [
        '1M SMS credits',
        '100K voice calls',
        'Advanced analytics',
        'WhatsApp broadcast (50K)',
        'Tele-conference (1K)',
        'Priority support',
        'Voice ads (10K)'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: [
        'Unlimited SMS',
        'Unlimited voice calls',
        'Full analytics suite',
        'Unlimited WhatsApp',
        'Unlimited tele-conference',
        'Dedicated support',
        'Custom integrations',
        'API access'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
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
            

            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px rgba(255, 107, 107, 0.5))',
                animation: 'textGlow 3s ease-in-out infinite',
              }}
            >
              Connect with Voters
              <br />
              Like Never Before
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto">
              Powerful digital tools to amplify your political message and reach millions across India
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="px-10 py-5 rounded-2xl text-white text-lg font-bold transition-all duration-500 flex items-center gap-3"
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
                Start Campaign <ArrowRight />
              </Link>

             
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
              {[
                { value: '500M+', label: 'Messages Sent' },
                { value: '2000+', label: 'Campaigns' },
                { value: '150+', label: 'Political Parties' },
                { value: '99.9%', label: 'Delivery Rate' }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Powerful Features
            </h2>
            <p className="text-xl text-white/70">Everything you need for a successful campaign</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isHovered = hoveredFeature === feature.id;
              
              return (
                <div
                  key={feature.id}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="p-8 rounded-3xl transition-all duration-500 cursor-pointer relative overflow-hidden"
                  style={{
                    background: isHovered 
                      ? 'rgba(255, 255, 255, 0.12)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(15px)',
                    border: `2px solid ${isHovered ? feature.color : 'rgba(255, 255, 255, 0.1)'}`,
                    boxShadow: isHovered 
                      ? `0 20px 60px ${feature.color}40` 
                      : '0 8px 25px rgba(0,0,0,0.3)',
                    transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0)',
                  }}
                >
                  {/* Large Feature Image Background */}
                  <div 
                    className="absolute top-6 right-6 text-8xl opacity-10 transition-all duration-500"
                    style={{
                      transform: isHovered ? 'scale(1.2) rotate(10deg)' : 'scale(1)',
                      filter: `drop-shadow(0 0 20px ${feature.color})`,
                    }}
                  >
                    {feature.image}
                  </div>

                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 relative overflow-hidden"
                    style={{
                      background: isHovered 
                        ? `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)` 
                        : 'rgba(255, 255, 255, 0.1)',
                      border: `2px solid ${isHovered ? feature.color : 'rgba(255, 255, 255, 0.2)'}`,
                      boxShadow: isHovered 
                        ? `0 20px 50px ${feature.color}80, 0 0 60px ${feature.color}60` 
                        : '0 8px 25px rgba(0,0,0,0.3)',
                      transform: isHovered ? 'rotateZ(8deg) scale(1.1)' : 'rotateZ(0)',
                    }}
                  >
                    {isHovered && (
                      <div 
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: feature.color,
                          opacity: 0.3,
                          animation: 'pulse 1.5s infinite',
                        }}
                      />
                    )}
                    <Icon size={32} style={{ color: isHovered ? '#fff' : feature.color }} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 mb-4 leading-relaxed">{feature.description}</p>
                  
                  <div 
                    className="inline-block px-4 py-2 rounded-lg text-sm font-semibold mb-6"
                    style={{
                      background: `${feature.color}20`,
                      color: feature.color,
                    }}
                  >
                    {feature.stats}
                  </div>

                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    style={{
                      background: isHovered 
                        ? `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)` 
                        : 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      border: `2px solid ${isHovered ? feature.color : 'rgba(255, 255, 255, 0.2)'}`,
                      boxShadow: isHovered ? `0 10px 30px ${feature.color}50` : 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Contact Us <ArrowRight size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                background: 'linear-gradient(135deg, #4ECDC4 0%, #FFE66D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Choose Your Plan
            </h2>
            <p className="text-xl text-white/70">Flexible pricing for campaigns of all sizes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl transition-all duration-500 relative"
                style={{
                  background: plan.popular 
                    ? 'linear-gradient(135deg, rgba(255, 107, 107, 0.15), rgba(78, 205, 196, 0.15))' 
                    : 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  border: plan.popular 
                    ? '2px solid #4ECDC4' 
                    : '2px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: plan.popular 
                    ? '0 25px 60px rgba(78, 205, 196, 0.3)' 
                    : '0 8px 25px rgba(0,0,0,0.3)',
                  transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {plan.popular && (
                  <div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-sm font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                      color: 'white',
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/60 ml-2">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle size={20} style={{ color: '#4ECDC4' }} />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="w-full py-4 rounded-xl font-semibold transition-all duration-300"
                  style={{
                    background: plan.popular 
                      ? 'linear-gradient(135deg, #FF6B6B, #4ECDC4)' 
                      : 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: plan.popular ? 'none' : '2px solid rgba(255, 255, 255, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = plan.popular 
                      ? '0 15px 40px rgba(255, 107, 107, 0.5)' 
                      : '0 10px 30px rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Reviews Section */}
<div className="max-w-4xl mx-auto px-6 py-20">
  <div className="text-center mb-14">
  <h2
  className="text-4xl md:text-5xl font-bold mb-4"
  style={{
    color: 'rgba(255, 255, 255, 0.85)', // dark white
  }}
>
  Client Review
</h2>

    <p className="text-xl text-white/70">
      Trusted by political leaders across India
    </p>
  </div>

  <div className="text-center">
{/* Big Passport Photo */}
<div
  className="mx-auto mb-6 w-72 h-56 rounded-2xl p-2 flex items-center justify-center"
  style={{
    background: 'rgba(255,255,255,0.08)',
    border: '3px solid rgba(78,205,196,0.8)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 25px 60px rgba(78,205,196,0.45)',
  }}
>
  <img src={pocharam} 
  alt="Client Photo"
    className="w-full h-full object-cover rounded-xl"
  />
</div>


    {/* Details Card */}
    <div
      className="p-10 rounded-3xl max-w-2xl mx-auto transition-all duration-500"
      style={{
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(18px)',
        border: '2px solid rgba(255,255,255,0.15)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
      }}
    >
      <h4 className="text-2xl font-bold text-white mb-1">
        Pocharam Srinivas Reddy
      </h4>
      <p className="text-sm text-white/60 mb-4">
        State Campaign Committee
      </p>

      {/* Rating */}
      <div className="flex justify-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-2xl ${
              i < 5 ? 'text-yellow-400' : 'text-white/20'
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Review */}
      <p className="text-white/80 text-lg leading-relaxed">
        “This platform helped us reach millions of voters with clarity,
        speed, and measurable impact. A must-have for modern campaigns.”
      </p>
    </div>
  </div>
</div>


        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div 
            className="p-12 md:p-16 rounded-3xl text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(78, 205, 196, 0.2))',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Win Your Campaign?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Join thousands of political leaders using Social Craft Circle to connect with voters
            </p>
           <Link
  to="/contact"
  className="px-12 py-5 rounded-2xl text-white text-lg font-bold transition-all duration-500 inline-flex items-center gap-3"
  style={{
    background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
    boxShadow: '0 25px 60px rgba(255, 107, 107, 0.6)',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
    e.currentTarget.style.boxShadow = '0 35px 80px rgba(255, 107, 107, 0.8)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
  }}
>
  Start Free Trial <Zap />
</Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center text-white/60">
              <p>© 2026 PolConnect. Empowering Political Communication.</p>
            </div>
          </div>
        </footer>
      </div>

      {showContactForm && <ContactUsModal onClose={() => setShowContactForm(false)} />}


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