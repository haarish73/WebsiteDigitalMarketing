import React, { useState, useEffect, useRef, ReactNode } from 'react';

// --- ICONS (Inline SVGs to avoid dependencies) ---
const Icons = {
  ArrowRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  Star: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFE66D" stroke="#FFE66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Chart: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
  Target: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Palette: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.093 0-.844.563-1.469 1.344-1.469.531 0 1.047.363 1.437.703.375.328.797.516 1.266.516 1.687 0 2.734-1.5 2.734-3.594 0-4.969-3.687-9-8.234-9Z"/></svg>,
  Layout: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
  Megaphone: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>,
};

// --- REUSABLE UI COMPONENTS (Based on your templates) ---

// Pattern 3: Gradient Text
const GradientText = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <span className={`${className}`} style={{
    background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 0 30px rgba(255, 107, 107, 0.3))',
  }}>
    {children}
  </span>
);

// Pattern 4: Animated Button
interface NeonButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}
const NeonButton = ({ children, variant = 'primary' }: NeonButtonProps) => {
    const baseStyle = {
        transition: 'all 0.5s',
        position: 'relative' as const,
        overflow: 'hidden',
    };

    const primaryStyle = {
        background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
        backgroundSize: '200% 200%',
        boxShadow: '0 10px 30px rgba(255, 107, 107, 0.4), 0 0 40px rgba(78, 205, 196, 0.2)',
        animation: 'gradientShift 4s ease infinite',
        color: '#0a0e27',
        fontWeight: 'bold',
    };

    // Glassmorphism style for secondary button
    const secondaryStyle = {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'white',
        boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
    };

    const combinedStyle = variant === 'primary' ? {...baseStyle, ...primaryStyle} : {...baseStyle, ...secondaryStyle};

    return (
    <button 
      className="px-8 py-4 rounded-xl text-lg"
      style={combinedStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
        if(variant === 'primary') e.currentTarget.style.boxShadow = '0 25px 60px rgba(255, 107, 107, 0.6)';
        if(variant === 'secondary') e.currentTarget.style.borderColor = '#4ECDC4';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        if(variant === 'primary') e.currentTarget.style.boxShadow = primaryStyle.boxShadow;
        if(variant === 'secondary') e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }}
    >
      {children}
      {variant === 'secondary' && (
          <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-white to-transparent" 
          style={{ animation: 'shine 3s infinite', transform: 'translateX(-100%) skew(-20deg)' }} />
      )}
    </button>
  );
}

// Pattern 6: Glass Card Container
const GlassCard = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
    <div className={`rounded-3xl p-8 ${className}`} style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}>
        {children}
    </div>
);

// --- MAIN PAGE WRAPPER (From your template) ---
const AnimatedPageWrapper = ({ children }: { children: ReactNode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Track mouse position for dynamic glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated canvas background (Your provided code)
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
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1
      });
    }

    let time = 0;
    let animationId: number;

    const animate = () => {
      time += 0.005;
      ctx.fillStyle = '#0a0e27'; // Solid dark background to avoid trail issues
      ctx.fillRect(0, 0, width, height);

      // Subtle animated waves
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        const offset = time * (0.3 + layer * 0.1);
        const amplitude = 50 + layer * 20;
        const frequency = 0.0015 - layer * 0.0002;
        for (let x = 0; x <= width; x += 10) {
          const y = height * (0.5 + layer * 0.15) +
                    Math.sin(x * frequency + offset) * amplitude;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        const colors = ['rgba(102, 126, 234, 0.05)', 'rgba(78, 205, 196, 0.04)', 'rgba(255, 107, 107, 0.03)'];
        ctx.fillStyle = colors[layer];
        ctx.fill();
      }

      // Particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(78, 205, 196, 0.4)';
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

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#0a0e27] text-white selection:bg-[#FF6B6B] selection:text-white">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Dynamic mouse glow */}
      <div 
        className="absolute pointer-events-none transition-all duration-300 z-10"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(78, 205, 196, 0.15), transparent 60%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Content Wrapper */}
      <div className="relative z-20">
        {children}
      </div>

      {/* Required Animations */}
      <style>{`
        @keyframes shine { 0% { transform: translateX(-100%) skew(-20deg); } 100% { transform: translateX(200%) skew(-20deg); } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.2); } }
      `}</style>
    </div>
  );
}


// ================= PAGE SECTIONS =================

// 1. Hero Section
const HeroSection = () => {
    return (
        <section className="container mx-auto px-4 pt-32 pb-20 flex flex-col items-center text-center">
            <GlassCard className="inline-block px-6 py-2 mb-8 !rounded-full !p-2 !border-opacity-20">
                <span className="text-[#4ECDC4] text-sm font-medium tracking-wider uppercase">Data-Driven Growth Agency</span>
            </GlassCard>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
                We Grow Brands Using<br />
                <GradientText>Data-Driven Digital Marketing</GradientText>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12 leading-relaxed">
                Stop guessing. We translate complex data into actionable strategies that drive measurable revenue growth and market dominance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                <NeonButton variant="primary">Get Free Consultation</NeonButton>
                
            </div>
        </section>
    );
};


// 2. Services Section (Using Patterns 1, 2, & 6)
interface ServiceCardProps {
    title: string;
    benefit: string;
    icon: ReactNode;
    color: string;
}

const ServiceCard = ({ title, benefit, icon, color }: ServiceCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        // Pattern 2: 3D Perspective & Pattern 6: Glass Morphism combination
        <div
            className="rounded-3xl p-8 h-full flex flex-col transition-all duration-500 group"
            style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${isHovered ? color : 'rgba(255, 255, 255, 0.08)'}`,
                transform: isHovered ? 'perspective(1000px) rotateX(5deg) translateY(-10px) scale(1.02)' : 'perspective(1000px) rotateX(0deg)',
                boxShadow: isHovered ? `0 20px 40px ${color}30` : '0 8px 32px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Pattern 1 Simplified: Glowing Icon */}
            <div className="mb-6 relative">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white transition-all duration-500 relative z-10`}
                    style={{ background: isHovered ? color : 'rgba(255,255,255,0.1)' }}>
                    {icon}
                </div>
                {/* Glow behind icon */}
                <div className={`absolute inset-0 bg-[${color}] blur-xl opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-60' : ''}`} style={{ backgroundColor: color }}></div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
            <p className="text-gray-400 mb-8 flex-grow text-lg">{benefit}</p>

            <a href="#" className={`flex items-center gap-2 text-lg font-medium transition-colors duration-300`} style={{ color: isHovered ? color : 'white' }}>
                Learn more <Icons.ArrowRight />
            </a>
        </div>
    );
}

const ServicesSection = () => {
    const servicesStr = [
        { title: "Social Media Marketing", benefit: "Build engaged communities that convert into loyal customers.", icon: <Icons.Chart />, color: "#FF6B6B" },
        { title: "Performance Ads", benefit: "Maximize ROI with laser-targeted campaigns on Meta & Google.", icon: <Icons.Target />, color: "#4ECDC4" },
        { title: "SEO & Content", benefit: "Drive dominant organic visibility that lasts long-term.", icon: <Icons.Search />, color: "#FFE66D" },
        { title: "Branding & Creative", benefit: "Stand out in crowded markets with unforgettable visual identity.", icon: <Icons.Palette />, color: "#FF6B6B" },
        { title: "Website & Landing Pages", benefit: "High-converting digital experiences engineered for sales.", icon: <Icons.Layout />, color: "#4ECDC4" },
        { title: "Influencer / PR Campaigns", benefit: "Leverage authentic voices for massive brand reach.", icon: <Icons.Megaphone />, color: "#FFE66D" },
    ];

    return (
        <section className="container mx-auto px-4 py-24 relative z-20">
             <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Expertise</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">We don't just list services. We deliver integrated solutions focused on outcomes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesStr.map((service, index) => (
                    <ServiceCard key={index} {...service} />
                ))}
            </div>
        </section>
    );
};


// 3. Testimonials Section
const TestimonialsSection = () => {
    const testimonials = [
        { name: "Alex R.", company: "TechStart Inc.", quote: "They doubled our leads in 90 days. The data-driven approach is real.", rating: 5, color: "#FF6B6B" },
        { name: "Sarah L.", company: "GrowthCo", quote: "Our CAC dropped by 40% while scaling ad spend. Phenomenal results.", rating: 5, color: "#4ECDC4" },
        { name: "Marcus K.", company: "Apex Solutions", quote: "Finally an agency that understands revenue, not just vanity metrics.", rating: 5, color: "#FFE66D" },
    ];

    return (
        <section className="container mx-auto px-4 py-24">
             <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6"><GradientText>Trusted By Growth Brands</GradientText></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((item, index) => (
                    <GlassCard key={index} className="hover:!border-opacity-30 transition-all duration-300">
                        <div className="flex gap-1 mb-6">
                            {[...Array(item.rating)].map((_, i) => <Icons.Star key={i} />)}
                        </div>
                        <p className="text-xl leading-relaxed text-gray-200 italic mb-8">"{item.quote}"</p>
                        <div className="flex items-center">
                             {/* Pattern 5 simplified: Glowing Avatar placeholder */}
                            <div className="w-12 h-12 rounded-full mr-4 relative overflow-hidden" style={{ border: `2px solid ${item.color}` }}>
                                 <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                                 {/* Placeholder for actual image */}
                                 <div className="w-full h-full bg-[#ffffff10]"></div> 
                            </div>
                            <div>
                                <h4 className="font-bold">{item.name}</h4>
                                <p className="text-sm text-gray-400">{item.company}</p>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
};


// ================= FINAL ASSEMBLED PAGE =================
export default function AgencyLandingPage() {
  return (
    <AnimatedPageWrapper>
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      
      {/* Simple Footer for completion */}
      <footer className="container mx-auto px-4 py-12 text-center text-gray-500 border-t border-white/10">
          <p>© 2024 DataGrow Agency. All rights reserved.</p>
      </footer>
    </AnimatedPageWrapper>
  );
}