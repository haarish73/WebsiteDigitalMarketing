import React, { useState, useEffect, useRef } from 'react';
import { Code, Zap, Shield, Rocket, CheckCircle, Users, TrendingUp, Award, ArrowRight, Phone, Mail, Star, Globe, ShoppingCart, Heart, GraduationCap, Building, DollarSign } from 'lucide-react';

export default function WordPressDevelopmentPage() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activePrice, setActivePrice] = useState<string | null>(null);
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
      gradient.addColorStop(0.5, '#0d1b2a');
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
          'rgba(0, 255, 127, 0.08)',
          'rgba(0, 230, 118, 0.06)',
          'rgba(34, 211, 238, 0.05)',
          'rgba(0, 200, 100, 0.04)'
        ];
        ctx.fillStyle = colors[layer];
        ctx.fill();
      }

      ctx.fillStyle = 'rgba(0, 255, 127, 0.5)';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        glow.addColorStop(0, 'rgba(0, 255, 127, 0.3)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.save();
      ctx.translate(width * 0.15, height * 0.25);
      ctx.rotate(time * 0.3);
      ctx.strokeStyle = 'rgba(0, 255, 127, 0.15)';
      ctx.lineWidth = 2;
      ctx.strokeRect(-60, -60, 120, 120);
      ctx.restore();

      ctx.save();
      ctx.translate(width * 0.85, height * 0.7);
      ctx.rotate(-time * 0.4);
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
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

  const industries = [
    { name: 'Healthcare', icon: Heart, color: '#00ff7f' },
    { name: 'Real Estate', icon: Building, color: '#22d3ee' },
    { name: 'Financial Services', icon: DollarSign, color: '#00ff7f' },
    { name: 'Education', icon: GraduationCap, color: '#22d3ee' },
    { name: 'E-commerce', icon: ShoppingCart, color: '#00ff7f' },
    { name: 'Startups', icon: Rocket, color: '#22d3ee' },
  ];

  const features = [
    { icon: Zap, title: 'One-Stop Solution', desc: 'Complete WordPress development from start to finish' },
    { icon: TrendingUp, title: 'Scalable & Future-Ready', desc: 'Built to grow with your business needs' },
    { icon: Award, title: 'Feature-Rich', desc: 'Competitive pricing without compromising quality' },
    { icon: Shield, title: 'Complete Ownership', desc: 'Full control and ownership of your website' },
  ];

  const pricing = [
    { 
      name: 'Startup', 
      price: '₹20,000', 
      features: ['5-Page Website', 'Responsive Design', 'Basic SEO', 'Contact Form', '1 Month Support'],
      popular: false 
    },
    { 
      name: 'Small Business', 
      price: '₹30,000', 
      features: ['10-Page Website', 'Advanced Design', 'Premium SEO', 'Blog Integration', '3 Months Support', 'Social Media Integration'],
      popular: true 
    },
    { 
      name: 'Enterprise', 
      price: '₹45,000', 
      features: ['Unlimited Pages', 'E-commerce Ready', 'Advanced SEO', 'Custom Features', '6 Months Support', 'Priority Support', 'Performance Optimization'],
      popular: false 
    },
  ];

  const process = [
    { title: 'Strategy', desc: 'Understanding your goals and planning', icon: '01' },
    { title: 'Design', desc: 'Creating stunning visual experiences', icon: '02' },
    { title: 'Development', desc: 'Building your WordPress website', icon: '03' },
    { title: 'Hosting & Domain', desc: 'Setup and configuration', icon: '04' },
    { title: 'Testing', desc: 'Quality assurance and optimization', icon: '05' },
    { title: 'Post-Launch Support', desc: 'Ongoing maintenance and updates', icon: '06' },
  ];

  const technologies = ['WordPress', 'WooCommerce', 'Shopify', 'Magento', 'AWS'];

  const testimonials = [
    { name: 'Rajesh Kumar', company: 'HealthCare Plus', text: 'They delivered a stunning healthcare website that increased our patient inquiries by 200%!', rating: 5 },
    { name: 'Priya Sharma', company: 'Real Estate Pro', text: 'Professional team, amazing results. Our property listings look incredible now.', rating: 5 },
    { name: 'Amit Patel', company: 'StartupHub', text: 'Best investment for our startup. The website helped us secure funding!', rating: 5 },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ background: '#0a0e27' }} />
      
      <div 
        className="absolute pointer-events-none transition-all duration-500 z-10"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0, 255, 127, 0.15), transparent 60%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col justify-center">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-6 inline-block px-6 py-2 rounded-full"
                 style={{
                   background: 'rgba(0, 255, 127, 0.1)',
                   border: '2px solid rgba(0, 255, 127, 0.3)',
                   backdropFilter: 'blur(10px)',
                 }}>
              <span className="text-sm font-semibold" style={{ color: '#00ff7f' }}>
                Premium WordPress Solutions
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(135deg, #00ff7f 0%, #22d3ee 50%, #00ff7f 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'textGlow 3s ease-in-out infinite',
                }}>
              Best WordPress Website Design & Development Services
            </h1>

            <p className="text-xl md:text-2xl mb-4" style={{ color: '#00ff7f' }}>
              Mobile Optimized Websites at the Best Prices
            </p>

            <p className="text-lg mb-12" style={{ color: '#a0aec0' }}>
              Fast, responsive, SEO-friendly WordPress websites built to grow businesses.
            </p>

            <div className="flex flex-wrap gap-6 justify-center">
              <button 
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500 flex items-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00c864 100%)',
                  color: '#0a0e27',
                  boxShadow: '0 25px 60px rgba(0, 255, 127, 0.4), 0 0 80px rgba(0, 255, 127, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 35px 80px rgba(0, 255, 127, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 255, 127, 0.4)';
                }}>
                Let's Create My Website
                <ArrowRight size={20} />
              </button>

              <button 
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500 flex items-center gap-3"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(0, 255, 127, 0.3)',
                  color: '#00ff7f',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}>
                <Phone size={20} />
                Call Us Now
              </button>
            </div>
          </div>
        </div>

        {/* Industries Section */}
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: '#ffffff' }}>
            Industries We Serve
          </h2>
          <p className="text-center mb-16 text-xl" style={{ color: '#a0aec0' }}>
            Tailored WordPress solutions for every sector
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, idx) => {
              const Icon = industry.icon;
              const isHovered = hoveredItem === `industry-${idx}`;
              
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredItem(`industry-${idx}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="flex flex-col items-center gap-4 p-6 rounded-2xl transition-all duration-500"
                  style={{
                    background: isHovered ? 'rgba(0, 255, 127, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                    border: `2px solid ${isHovered ? industry.color : 'rgba(255, 255, 255, 0.1)'}`,
                    backdropFilter: 'blur(10px)',
                    transform: isHovered ? 'translateY(-10px) scale(1.05)' : 'translateY(0)',
                    boxShadow: isHovered ? `0 20px 50px ${industry.color}40` : 'none',
                  }}>
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center relative"
                    style={{
                      background: isHovered ? industry.color : 'rgba(255, 255, 255, 0.05)',
                      boxShadow: isHovered ? `0 0 30px ${industry.color}80` : 'none',
                    }}>
                    {isHovered && (
                      <div 
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: industry.color,
                          opacity: 0.3,
                          animation: 'pulse 1.5s infinite',
                        }}
                      />
                    )}
                    <Icon size={32} style={{ color: isHovered ? '#0a0e27' : industry.color }} />
                  </div>
                  <span className="font-semibold text-center" style={{ color: isHovered ? industry.color : '#ffffff' }}>
                    {industry.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl"
               style={{
                 background: 'rgba(0, 255, 127, 0.05)',
                 border: '2px solid rgba(0, 255, 127, 0.2)',
                 backdropFilter: 'blur(15px)',
               }}>
            <div className="text-6xl font-bold mb-4" style={{ color: '#00ff7f' }}>50+</div>
            <p className="text-2xl mb-2" style={{ color: '#ffffff' }}>Successful WordPress Projects Delivered</p>
            <p className="text-xl mb-6" style={{ color: '#a0aec0' }}>Across Industries</p>
            <div className="text-3xl font-bold" style={{
              background: 'linear-gradient(135deg, #00ff7f 0%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Every Type of Website You Need. Delivered.
            </div>
          </div>
        </div>

        {/* Performance Highlight */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { value: '70%', label: 'Performance Improvement', icon: TrendingUp },
              { value: '100%', label: 'Speed Optimization', icon: Zap },
              { value: '3x', label: 'Conversion Growth', icon: Award },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx}
                  className="p-8 rounded-3xl text-center transition-all duration-500"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(0, 255, 127, 0.2)',
                    backdropFilter: 'blur(15px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 255, 127, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                  <Icon size={48} className="mx-auto mb-4" style={{ color: '#00ff7f' }} />
                  <div className="text-5xl font-bold mb-2" style={{ color: '#00ff7f' }}>{stat.value}</div>
                  <p className="text-lg" style={{ color: '#a0aec0' }}>{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: '#ffffff' }}>
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              const isHovered = hoveredItem === `feature-${idx}`;
              
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredItem(`feature-${idx}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="p-8 rounded-2xl transition-all duration-500"
                  style={{
                    background: isHovered ? 'rgba(0, 255, 127, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    border: `2px solid ${isHovered ? '#00ff7f' : 'rgba(255, 255, 255, 0.1)'}`,
                    backdropFilter: 'blur(15px)',
                    transform: isHovered ? 'perspective(1000px) rotateX(10deg) translateY(-10px) scale(1.05)' : 'perspective(1000px) rotateX(0deg)',
                    boxShadow: isHovered ? '0 20px 50px rgba(0, 255, 127, 0.3)' : 'none',
                  }}>
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative"
                    style={{
                      background: isHovered ? '#00ff7f' : 'rgba(0, 255, 127, 0.1)',
                    }}>
                    {isHovered && (
                      <div 
                        className="absolute inset-0 rounded-xl border-2"
                        style={{
                          borderColor: '#00ff7f',
                          animation: 'ping 2s infinite',
                        }}
                      />
                    )}
                    <Icon size={32} style={{ color: isHovered ? '#0a0e27' : '#00ff7f' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#ffffff' }}>{feature.title}</h3>
                  <p style={{ color: '#a0aec0' }}>{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: '#ffffff' }}>
            Transparent Pricing
          </h2>
          <p className="text-center mb-16 text-xl" style={{ color: '#a0aec0' }}>
            Choose the perfect package for your business
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, idx) => {
              const isHovered = hoveredItem === `price-${idx}`;
              
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredItem(`price-${idx}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => setActivePrice(plan.name)}
                  className="p-8 rounded-3xl transition-all duration-500 cursor-pointer relative overflow-hidden"
                  style={{
                    background: plan.popular || isHovered ? 'rgba(0, 255, 127, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    border: `2px solid ${plan.popular || isHovered ? '#00ff7f' : 'rgba(255, 255, 255, 0.1)'}`,
                    backdropFilter: 'blur(15px)',
                    transform: isHovered ? 'translateY(-15px) scale(1.05)' : plan.popular ? 'translateY(-8px)' : 'translateY(0)',
                    boxShadow: isHovered || plan.popular ? '0 30px 70px rgba(0, 255, 127, 0.4)' : 'none',
                  }}>
                  {plan.popular && (
                    <div 
                      className="absolute top-0 right-0 px-4 py-1 text-sm font-bold rounded-bl-2xl"
                      style={{
                        background: '#00ff7f',
                        color: '#0a0e27',
                      }}>
                      POPULAR
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#ffffff' }}>{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold" style={{ color: '#00ff7f' }}>{plan.price}</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-3">
                        <CheckCircle size={20} style={{ color: '#00ff7f', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ color: '#a0aec0' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className="w-full py-4 rounded-xl font-semibold transition-all duration-300"
                    style={{
                      background: plan.popular || isHovered ? '#00ff7f' : 'rgba(0, 255, 127, 0.2)',
                      color: plan.popular || isHovered ? '#0a0e27' : '#00ff7f',
                      border: `2px solid ${plan.popular || isHovered ? '#00ff7f' : 'rgba(0, 255, 127, 0.3)'}`,
                    }}>
                    Choose Plan
                  </button>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <button 
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(0, 255, 127, 0.3)',
                color: '#00ff7f',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'scale(1)';
              }}>
              View Detailed Pricing & Packages
            </button>
          </div>
        </div>

        {/* Process Section */}
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: '#ffffff' }}>
            Our Process
          </h2>

          <div className="max-w-5xl mx-auto">
            {process.map((step, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-6 mb-8 p-6 rounded-2xl transition-all duration-500"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 127, 0.05)';
                  e.currentTarget.style.borderColor = '#00ff7f';
                  e.currentTarget.style.transform = 'translateX(10px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}>
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-2xl"
                  style={{
                    background: 'rgba(0, 255, 127, 0.2)',
                    color: '#00ff7f',
                  }}>
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>{step.title}</h3>
                  <p style={{ color: '#a0aec0' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Work With Us */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto p-12 rounded-3xl text-center"
               style={{
                 background: 'rgba(0, 255, 127, 0.05)',
                 border: '2px solid rgba(0, 255, 127, 0.2)',
                 backdropFilter: 'blur(15px)',
               }}>
            <h2 className="text-4xl font-bold mb-12" style={{ color: '#ffffff' }}>
              Why Work With Us?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              {[
                { icon: Award, text: '50+ Websites Delivered' },
                { icon: Users, text: '10+ Years Experience' },
                { icon: Zap, text: 'Fast Support' },
                { icon: DollarSign, text: 'Cost-Effective Packages' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(0, 255, 127, 0.2)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    }}>
                    <Icon size={32} style={{ color: '#00ff7f' }} />
                    <span className="text-lg" style={{ color: '#ffffff' }}>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: '#ffffff' }}>
            Technologies We Use
          </h2>

          <div className="flex flex-wrap gap-6 justify-center max-w-4xl mx-auto">
            {technologies.map((tech, idx) => (
              <div 
                key={idx}
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(0, 255, 127, 0.2)',
                  color: '#00ff7f',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#00ff7f';
                  e.currentTarget.style.color = '#0a0e27';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = '#00ff7f';
                  e.currentTarget.style.transform = 'scale(1)';
                }}>
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: '#ffffff' }}>
            Client Success Stories
          </h2>
          <p className="text-center mb-16 text-xl" style={{ color: '#a0aec0' }}>
            Stories that inspire results and long-term partnerships
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-2xl transition-all duration-500"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(15px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 127, 0.08)';
                  e.currentTarget.style.borderColor = '#00ff7f';
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 255, 127, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="#00ff7f" style={{ color: '#00ff7f' }} />
                  ))}
                </div>
                <p className="mb-6 text-lg" style={{ color: '#a0aec0' }}>"{testimonial.text}"</p>
                <div>
                  <p className="font-bold" style={{ color: '#ffffff' }}>{testimonial.name}</p>
                  <p className="text-sm" style={{ color: '#00ff7f' }}>{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(0, 255, 127, 0.3)',
                color: '#00ff7f',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'scale(1)';
              }}>
              View All Testimonials
            </button>
          </div>
        </div>

        {/* Final CTA */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center p-16 rounded-3xl relative overflow-hidden"
               style={{
                 background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.15) 0%, rgba(34, 211, 238, 0.15) 100%)',
                 border: '2px solid rgba(0, 255, 127, 0.3)',
                 backdropFilter: 'blur(15px)',
               }}>
            <h2 className="text-5xl font-bold mb-6" style={{ color: '#ffffff' }}>
              Ready to Build Your Dream Website?
            </h2>
            <p className="text-xl mb-10" style={{ color: '#a0aec0' }}>
              Let's transform your business with a stunning WordPress website
            </p>

            <div className="flex flex-wrap gap-6 justify-center">
              <button 
                className="px-10 py-5 rounded-xl font-semibold text-xl transition-all duration-500 flex items-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00c864 100%)',
                  color: '#0a0e27',
                  boxShadow: '0 25px 60px rgba(0, 255, 127, 0.5)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 35px 80px rgba(0, 255, 127, 0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 255, 127, 0.5)';
                }}>
                Get Started Today
                <Rocket size={24} />
              </button>

              <button 
                className="px-10 py-5 rounded-xl font-semibold text-xl transition-all duration-500 flex items-center gap-3"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '2px solid rgba(0, 255, 127, 0.4)',
                  color: '#00ff7f',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 127, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}>
                <Mail size={24} />
                Contact Us
              </button>
            </div>
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

        @keyframes textGlow {
          0%, 100% { filter: drop-shadow(0 0 30px rgba(0, 255, 127, 0.5)); }
          50% { filter: drop-shadow(0 0 50px rgba(34, 211, 238, 0.7)); }
        }
      `}</style>
    </div>
  );
}