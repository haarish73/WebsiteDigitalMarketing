import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

import { 
  ShoppingBag, 
  CreditCard, 
  Smartphone, 
  Globe, 
  Lock, 
  Database, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Layers, 
  Award,
  BarChartHorizontal,
  Rocket,
  ShieldCheck,
  BarChart,
  ArrowUpRight
} from 'lucide-react';

export default function EcommerceDevelopmentPage() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredTimelineIndex, setHoveredTimelineIndex] = useState<number | null>(null);
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

      // Wave Layers
      for (let layer = 0; layer < 4; layer++) {
        ctx.beginPath();
        const offset = time * (0.4 + layer * 0.15);
        const amplitude = 80 + layer * 25;
        const frequency = 0.002 - layer * 0.0003;
        for (let x = 0; x <= width; x += 4) {
          const y = height * (0.4 + layer * 0.15) +
                    Math.sin(x * frequency + offset) * amplitude +
                    Math.cos(x * frequency * 1.5 + offset * 1.3) * (amplitude * 0.6);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
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
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const ecommerceServices = [
    { id: 'custom', icon: ShoppingBag, title: 'Custom Storefronts', description: 'Bespoke UI/UX designs tailored to reflect your brand identity and convert visitors.', color: '#FF6B6B' },
    { id: 'payment', icon: CreditCard, title: 'Secure Payments', description: 'Integration with Stripe, PayPal, and crypto gateways with PCI-DSS compliance.', color: '#4ECDC4' },
    { id: 'mobile', icon: Smartphone, title: 'M-Commerce', description: 'Progressive Web Apps (PWA) and mobile-first experiences for shopping on the go.', color: '#FFE66D' },
    { id: 'inventory', icon: Database, title: 'Inventory Sync', description: 'Real-time stock management across multiple channels and automated restock alerts.', color: '#A8E6CF' },
    { id: 'security', icon: Lock, title: 'Enterprise Security', description: 'Advanced DDoS protection and SSL encryption to keep customer data safe.', color: '#FF6B6B' },
    { id: 'global', icon: Globe, title: 'Multi-Currency', description: 'Expand globally with multi-language support and automatic currency conversion.', color: '#4ECDC4' },
  ];

  // Data for the New Timeline Section
  const whyChooseFeatures = [
    { icon: Globe, title: "One-Stop Solution for Every Business", description: "From single-page websites to full-scale e-commerce stores, we offer complete design and development services under one roof." },
    { icon: Rocket, title: "Scalable & Growth-Driven", description: "Our pricing plans are built to evolve with your business. Each package ensures flexibility, speed, and SEO performance." },
    { icon: Layers, title: "Feature-Rich at Competitive Prices", description: "Every package includes mobile-first design, SEO optimization, and conversion-focused layouts — crafted to deliver growth." },
    { icon: ShieldCheck, title: "Complete Ownership & Transparency", description: "You get 100% control of your website's design, content, and backend. No hidden fees or monthly lock-ins." },
    { icon: BarChart, title: "Built for Long-Term ROI", description: "Every pricing tier is designed for value beyond launch — combining performance, analytics, and post-launch support." }
  ];

  const stats = [
    { number: '200+', label: 'Stores Launched', icon: Zap },
    { number: '99.9%', label: 'Uptime Record', icon: Award },
    { number: '150%', label: 'Avg Conversion Lift', icon: BarChartHorizontal },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden font-sans text-white">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" style={{ background: '#0a0e27' }} />

      {/* Dynamic Glow Cursor */}
      <div 
        className="fixed pointer-events-none transition-all duration-500 z-10"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(78, 205, 196, 0.2), transparent 60%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="container mx-auto text-center">
            <div style={{
                opacity: Math.max(0, 1 - scrollY / 400),
                transform: `translateY(${scrollY * 0.5}px)`,
                transition: 'all 0.3s',
              }}>
              <div className="mb-8 inline-block">
                <div className="w-32 h-32 mx-auto rounded-3xl overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(135deg, #4ECDC4 0%, #667eea 50%, #FF6B6B 100%)',
                    boxShadow: '0 30px 80px rgba(78, 205, 196, 0.6)',
                    animation: 'glow 3s ease-in-out infinite',
                  }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShoppingBag className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
                style={{
                  background: 'linear-gradient(135deg, #4ECDC4 0%, #667eea 50%, #FF6B6B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'textGlow 3s ease-in-out infinite',
                }}>
                Ecommerce <br/> Engineering
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Building high-performance digital storefronts that scale from first sale to global dominance.
              </p>
              <button className="px-12 py-5 text-xl font-bold text-white rounded-full relative overflow-hidden transition-all duration-500 hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, #4ECDC4 0%, #667eea 100%)',
                  boxShadow: '0 25px 60px rgba(78, 205, 196, 0.4)',
                }}>
                Build My Store
              </button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
              Retail-Ready Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ecommerceServices.map((service) => {
                const Icon = service.icon;
                const isHovered = hoveredItem === service.id;
                return (
                  <div
                    key={service.id}
                    className="relative p-8 rounded-3xl transition-all duration-500 border border-white/10"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(15px)',
                      transform: isHovered ? 'translateY(-15px)' : 'translateY(0)',
                      borderColor: isHovered ? service.color : 'rgba(255,255,255,0.1)'
                    }}
                    onMouseEnter={() => setHoveredItem(service.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Icon className="w-12 h-12 mb-6" style={{ color: service.color }} />
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-white font-bold">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- INTEGRATED TIMELINE SECTION START --- */}
        <section className="py-24 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[#a3ff12] text-xl font-bold">✱</span>
                <span className="uppercase tracking-[0.2em] text-sm font-semibold text-gray-400">About HDS</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-10">
                Why Choose Our <br />
                <span className="text-[#a3ff12] drop-shadow-[0_0_15px_rgba(163,255,18,0.3)]">
                    Ecommerce Solutions?
                </span>
              </h2>
            <Link to="/contact">
  <button className="group flex items-center gap-4 bg-white/5 border border-white/10 hover:bg-[#a3ff12] transition-all duration-500 rounded-full pl-8 pr-2 py-2 text-white hover:text-black font-bold text-lg">
    Contact Us
    <div className="bg-[#a3ff12] group-hover:bg-black p-3 rounded-full transition-all">
      <ArrowUpRight className="w-5 h-5 group-hover:text-[#a3ff12] text-black" />
    </div>
  </button>
</Link>

            </div>

            <div className="relative pl-8 md:pl-12 border-l border-white/10">
              {whyChooseFeatures.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = hoveredTimelineIndex === index;
                return (
                  <div 
                    key={index}
                    className="mb-16 last:mb-0 relative"
                    onMouseEnter={() => setHoveredTimelineIndex(index)}
                    onMouseLeave={() => setHoveredTimelineIndex(null)}
                  >
                    {/* Glowing Timeline Dot */}
                    <div className={`absolute -left-[41px] md:-left-[57px] top-0 w-4 h-4 rounded-full border-2 transition-all duration-500 z-10 
                      ${isActive ? 'bg-[#a3ff12] border-[#a3ff12] scale-150 shadow-[0_0_20px_#a3ff12]' : 'bg-[#0a0e27] border-white/30'}`} 
                    />
                    <div className={`mb-4 transition-transform duration-500 ${isActive ? 'scale-110 translate-x-2' : ''}`}>
                      <Icon className={`w-12 h-12 ${isActive ? 'text-[#a3ff12]' : 'text-white/50'}`} strokeWidth={1.5} />
                    </div>
                    <h3 className={`text-2xl font-bold mb-4 transition-all duration-300 ${isActive ? 'text-white' : 'text-white/80'}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-lg leading-relaxed font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70'}`}>
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* --- INTEGRATED TIMELINE SECTION END --- */}

        {/* Stats & Trust */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
              Our Achievements
            </h2>
            <div className="rounded-3xl p-12 bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-5xl font-bold mb-2">{stat.number}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 pb-48">
          <div className="container mx-auto text-center bg-gradient-to-br from-white/5 to-transparent p-16 rounded-[40px] border border-white/10">
            <h2 className="text-5xl font-bold mb-8">Ready to start selling?</h2>
            <button className="px-10 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 mx-auto hover:bg-gray-200 transition-colors">
              Schedule a Consultation <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes glow {
          0%, 100% { box-shadow: 0 30px 80px rgba(78, 205, 196, 0.4); }
          50% { box-shadow: 0 35px 100px rgba(102, 126, 234, 0.6); }
        }
        @keyframes textGlow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(78, 205, 196, 0.3)); }
          50% { filter: drop-shadow(0 0 40px rgba(102, 126, 234, 0.5)); }
        }
      `}</style>
    </div>
  );
}