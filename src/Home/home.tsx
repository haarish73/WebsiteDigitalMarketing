import React, { useState, useEffect, useRef } from 'react';
import { Zap, Target, TrendingUp, Users, BarChart3, Rocket, ChevronRight, Play, Building, Heart, Home, DollarSign, GraduationCap, ShoppingCart, Plane, Code, icons } from 'lucide-react';
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

    let time = 0;
    let animationId: number;

    const animate = () => {
      time += 0.004;
      
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#18181b');
      gradient.addColorStop(0.5, '#27272a');
      gradient.addColorStop(1, '#18181b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Dotted pattern
      ctx.fillStyle = 'rgba(161, 161, 170, 0.1)';
      for (let x = 0; x < width; x += 30) {
        for (let y = 0; y < height; y += 30) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Animated gradient bands
      for (let i = 0; i < 3; i++) {
        const y = (height / 4) * (i + 1) + Math.sin(time + i) * 20;
        const bandGradient = ctx.createLinearGradient(0, y - 40, 0, y + 40);
        bandGradient.addColorStop(0, 'rgba(161, 161, 170, 0)');
        bandGradient.addColorStop(0.5, 'rgba(161, 161, 170, 0.08)');
        bandGradient.addColorStop(1, 'rgba(161, 161, 170, 0)');
        ctx.fillStyle = bandGradient;
        ctx.fillRect(0, y - 40, width, 80);
      }

      // Corner accent
      ctx.strokeStyle = 'rgba(212, 212, 216, 0.15)';
      ctx.lineWidth = 3;
      ctx.strokeRect(60, 60, 100, 100);

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const industries = [
    {name: "Small Crafts Circle", icon: Code },
    { name: "Local Small Businesses", icon: Building },
    { name: "Healthcare & Medical", icon: Heart },
    { name: "Real Estate & Property", icon: Home },
    {name:"Digital Marketing", icon: Plane },
    { name: "Education & eLearning", icon: GraduationCap },
    { name: "Retail & E-Commerce", icon: ShoppingCart }
  
  ];

  const stats = [
    { value: '500+', label: 'Clients Served' },
    { value: '250%', label: 'Avg ROI Increase' },
    { value: '50M+', label: 'Leads Generated' },
    { value: '98%', label: 'Client Satisfaction' },
  ];

  const services = [
    {
      title: 'Digital Marketing',
      desc: 'Comprehensive digital marketing strategies to boost your online presence and drive targeted traffic.',
      icon: Zap,
      color: '#FF6B6B'
    },
    {
      title: 'SEO Optimization',
      desc: 'Improve your search engine rankings and visibility with our expert SEO services.',
      icon: Target,
      color: '#4ECDC4'
    },
    {
      title: 'Social Media Marketing',
      desc: 'Engage your audience and build brand loyalty through strategic social media campaigns.',
      icon: TrendingUp,
      color: '#FFE66D'
    },
    {
      title: 'Content Creation',
      desc: 'Create compelling content that resonates with your audience and drives conversions.',
      icon: Users,
      color: '#FF6B6B'
    },
    {
      title: 'Analytics & Insights',
      desc: 'Data-driven insights to optimize your marketing efforts and maximize ROI.',
      icon: BarChart3,
      color: '#4ECDC4'
    },
    {
      title: 'Brand Strategy',
      desc: 'Develop a strong brand identity that sets you apart from the competition.',
      icon: Rocket,
      color: '#FFE66D'
    }
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ background: '#18181b' }} />
      
      {/* Mouse glow effect */}
      <div 
        className="absolute pointer-events-none transition-all duration-700 z-10"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(212, 212, 216, 0.1), transparent 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(65px)',
        }}
      />
      
      {/* Content Area */}
      <div className="relative z-20">

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-40 text-center">
          <h1 
            className="text-7xl font-bold mb-6 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #a1a1aa 0%, #d4d4d8 50%, #e4e4e7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 18px rgba(161, 161, 170, 0.25))',
            }}
          >
            Social Crafts Circle
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 flex justify-center gap-2">
            {"Crafting Brands Creating Impacts".split(" ").map((word, index) => (
              <span
                key={index}
                className="inline-block"
                style={{
                  animation: `fadeInWord 0.5s ease-out forwards`,
                  animationDelay: `${index * 0.2}s`,
                  opacity: 0,
                }}
              >
                {word}
              </span>
            ))}
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

        {/* Industries Marquee */}
       <div className="mt-52 py-8 overflow-hidden whitespace-nowrap flex items-center"

          style={{
            background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 8s ease infinite',
          }}>
          <div className="flex animate-marquee">
            {[...industries, ...industries].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center mx-12">
                  <Icon className="w-8 h-8 text-white mr-4" />
                  <span className="text-white text-xl font-bold uppercase tracking-wide">{item.name}</span>
                  <span className="text-white mx-8 text-2xl">✱</span>
                </div>
              );
            })}
          </div>
        </div>

        <AboutSection />

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

        {/* SERVICES SECTION */}
        <section id="services" className="container mx-auto px-6 py-24">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-lime-400 font-semibold tracking-widest mb-2">
              * OUR SERVICES
            </p>
            <h2 className="text-5xl font-bold text-white leading-tight">
              <span className="text-lime-400">Digital Marketing</span> Services <br />
              We Offer
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 flex-wrap mb-12">
            {[
              "Website Development Services",
              
              "Digital Marketing",
            ].map((tab, i) => (
              <button
                key={i}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition
                  ${
                    i === 0
                      ? "bg-lime-400 text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "WordPress Website Development Services",
                img: new URL('../image/WordPress .png', import.meta.url).href,
              },
              {
                title: "Shopify Website Development Services",
                img: new URL('../image/Shopify.png', import.meta.url).href,
              },
              {
                title: "E-Commerce Website Development Services",
                img: new URL('../image/E-Commerce Website.png', import.meta.url).href,
              },
              {
                title: "Website Redesign & Revamp",
                img: new URL('../image/Development Services.png', import.meta.url).href,
              },
              {
                title: "UI/UX Design",
                img: new URL('../image/uiux design.png', import.meta.url).href,
              },
              {
                title: "Website Development Services",
                img: new URL('../image/Website.png', import.meta.url).href,
              },
            ].map((service, i) => (
              <div
                key={i}
                className="group rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-lime-400/60 transition"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />
                </div>

                <div className="p-6">
                  <h3 className="text-white font-semibold text-lg">
                    {service.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FREE QUOTE SECTION */}
        <section className="container mx-auto px-6 py-24">
          <h2 className="text-4xl font-light text-white mb-12 text-center">
            Get a <span className="text-lime-400 font-semibold">Free Quote</span> Today!
          </h2>

          <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <form>
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-5 py-4 rounded-xl bg-transparent border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-lime-400 transition font-bold"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-5 py-4 rounded-xl bg-transparent border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-lime-400 transition font-bold"
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <input
                  type="tel"
                  placeholder="Phone No"
                  className="w-full px-5 py-4 rounded-xl bg-transparent border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-lime-400 transition font-bold"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full px-5 py-4 rounded-xl bg-transparent border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-lime-400 transition font-bold"
                />
              </div>

              {/* Message */}
              <div className="mb-10">
                <textarea
                  rows={5}
                  placeholder="Message"
                  className="w-full px-5 py-4 rounded-xl bg-transparent border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-lime-400 transition resize-none font-bold"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-lime-400 text-black font-semibold tracking-wide hover:brightness-110 transition"
              >
                Submit Message
              </button>

              {/* Small Dot Indicator */}
              <div className="flex justify-center mt-6">
                <span className="w-2 h-2 rounded-full bg-lime-400" />
              </div>
            </form>
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

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          display: flex;
          animation: marquee 40s linear infinite;
        }
        
        @keyframes fadeInWord {
          from {
            opacity: 0;
            transform: translateY(20px);
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

function AboutSection() {
  return (
  <section className="relative w-full pt-52 pb-28 px-6 md:px-16 bg-transparent">

  <div className="max-w-6xl mx-auto">

    {/* Main Text */}
    <p className="text-[1.65rem] md:text-[2.75rem] font-normal leading-[1.25] text-white/90">
      We are{" "}
      <span className="text-cyan-400 font-semibold">
        Smart Crafts Circle
      </span>
      , a creative digital marketing studio focused on building brands,
      driving growth, and shaping powerful online identities. From{" "}
      <span className="text-cyan-400 italic font-medium">
        strategic marketing
      </span>{" "}
      to high-impact digital experiences, we help businesses connect,
      convert, and scale in the digital world.
    </p>

    {/* Divider */}
    <div className="mt-16 h-px w-24 bg-cyan-500/40" />

    {/* Stats */}
    <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-16">
      
      <div>
        <h2 className="text-6xl md:text-7xl font-semibold tracking-tight text-cyan-400">
          100%
        </h2>
        <p className="mt-3 text-xs tracking-[0.3em] text-gray-400 uppercase">
          Client Satisfaction
        </p>
      </div>

      <div>
        <h2 className="text-6xl md:text-7xl font-semibold tracking-tight text-cyan-400">
          360°
        </h2>
        <p className="mt-3 text-xs tracking-[0.3em] text-gray-400 uppercase">
          Digital Marketing Solutions
        </p>
      </div>

    </div>
  </div>
</section>

  );
}
