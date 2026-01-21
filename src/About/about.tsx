import React, { useState, useEffect, useRef } from 'react';
import { Target, Users, Award, TrendingUp, Zap, Heart, Lightbulb, Rocket, BarChart3, Globe2 } from 'lucide-react';

export default function AboutPage() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);



  const values = [
    { icon: Target, title: 'Strategic Focus', description: 'Data-driven strategies tailored to your unique business goals', color: '#FF6B6B' },
    { icon: Users, title: 'Client Partnership', description: 'Building lasting relationships through transparency and trust', color: '#4ECDC4' },
    { icon: Award, title: 'Excellence', description: 'Delivering exceptional results that exceed expectations', color: '#FFE66D' },
    { icon: TrendingUp, title: 'Growth Mindset', description: 'Constantly evolving with the latest digital trends', color: '#A8E6CF' },
  ];

  const stats = [
    { number: '500+', label: 'Clients Served', icon: Users, color: '#FF6B6B' },
    { number: '250%', label: 'Avg ROI Increase', icon: TrendingUp, color: '#4ECDC4' },
    { number: '15+', label: 'Years Experience', icon: Award, color: '#FFE66D' },
    { number: '98%', label: 'Client Satisfaction', icon: Heart, color: '#A8E6CF' },
  ];

  const whyChooseUs = [
    { icon: Lightbulb, title: 'Innovative Strategies', description: 'Cutting-edge digital marketing tactics that keep you ahead of the competition' },
    { icon: Rocket, title: 'Rapid Results', description: 'Fast-tracking your growth with agile and responsive campaigns' },
    { icon: BarChart3, title: 'Measurable Impact', description: 'Complete transparency with detailed analytics and ROI tracking' },
    { icon: Globe2, title: 'Global Reach', description: 'Expanding your brand presence across markets and platforms' },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">


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

      <div className="relative z-20 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div
            className="inline-block mb-8 relative"
            style={{
              transform: 'perspective(1200px) rotateY(0deg)',
              transition: 'transform 0.6s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'perspective(1200px) rotateY(15deg) translateZ(30px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1200px) rotateY(0deg)';
            }}
          >
            <div
              className="w-32 h-32 rounded-3xl mx-auto overflow-hidden relative"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
                boxShadow: '0 30px 80px rgba(255, 107, 107, 0.6), 0 0 100px rgba(78, 205, 196, 0.4)',
                animation: 'glow 3s ease-in-out infinite',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent flex items-center justify-center">
                <Zap className="w-16 h-16 text-white drop-shadow-2xl" />
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                style={{
                  animation: 'shine 4s infinite',
                  transform: 'translateX(-100%) skew(-20deg)',
                }}
              />
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
            Social Crafts Circle
          </h1>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We are a passionate team of digital marketing experts dedicated to transforming businesses through innovative strategies, creative campaigns, and data-driven results.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div
            className="p-12 rounded-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(15px)',
              border: '2px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
            }}
          >
            <h2
              className="text-4xl font-bold mb-6 text-center"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Our Story
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-4">
              Founded in 2026, Social Crafts Circle Digital emerged from a simple vision: to help businesses harness the power of digital marketing to achieve extraordinary growth. What started as a small team of three passionate marketers has evolved into a full-service agency serving clients across the globe.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              Today, we combine cutting-edge technology with creative excellence to deliver campaigns that don't just meet expectations—they shatter them. Our approach is built on collaboration, innovation, and an unwavering commitment to our clients' success.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-8 rounded-2xl transition-all duration-500 cursor-pointer relative overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                  transform: 'perspective(1000px) rotateX(0deg)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-10px) scale(1.05)';
                  e.currentTarget.style.boxShadow = `0 25px 60px ${stat.color}50`;
                  e.currentTarget.style.background = `linear-gradient(135deg, ${stat.color}20, rgba(255, 255, 255, 0.1))`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <Icon className="w-12 h-12 mx-auto mb-4" style={{ color: stat.color, filter: `drop-shadow(0 0 10px ${stat.color})` }} />
                <div
                  className="text-5xl font-bold mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}cc)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.number}
                </div>
                <p className="text-gray-300 font-semibold">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2
            className="text-5xl font-bold mb-12 text-center"
            style={{
              background: 'linear-gradient(135deg, #4ECDC4, #FFE66D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-6 p-8 rounded-2xl transition-all duration-500 cursor-pointer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(15px)',
                    border: '2px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                    transform: hoveredItem === value.title ? 'translateX(15px)' : 'translateX(0)',
                  }}
                  onMouseEnter={() => setHoveredItem(value.title)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 relative overflow-hidden"
                    style={{
                      background: hoveredItem === value.title
                        ? `linear-gradient(135deg, ${value.color}, ${value.color}dd)`
                        : 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: `2px solid ${hoveredItem === value.title ? value.color : 'rgba(255, 255, 255, 0.2)'}`,
                      boxShadow: hoveredItem === value.title
                        ? `0 20px 50px ${value.color}80, 0 0 60px ${value.color}60`
                        : '0 8px 25px rgba(0,0,0,0.3)',
                      transform: hoveredItem === value.title ? 'translateY(-10px) rotateZ(8deg) scale(1.1)' : 'translateY(0)',
                    }}
                  >
                    <Icon
                      size={28}
                      style={{
                        color: hoveredItem === value.title ? '#fff' : value.color,
                        filter: `drop-shadow(0 0 10px ${value.color})`,
                      }}
                    />
                    {hoveredItem === value.title && (
                      <>
                        <div
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background: value.color,
                            opacity: 0.3,
                            animation: 'pulse 1.5s infinite',
                          }}
                        />
                        <div
                          className="absolute inset-0 rounded-2xl border-2"
                          style={{
                            borderColor: value.color,
                            animation: 'ping 2s infinite',
                          }}
                        />
                      </>
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <h2
            className="text-5xl font-bold mb-12 text-center"
            style={{
              background: 'linear-gradient(135deg, #FFE66D, #FF6B6B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF'];
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl transition-all duration-500 cursor-pointer relative overflow-hidden group"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(15px)',
                    border: '2px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                    transform: 'perspective(1000px) rotateX(0deg)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-10px) scale(1.05)';
                    e.currentTarget.style.boxShadow = `0 25px 60px ${colors[index]}50`;
                    e.currentTarget.style.background = `linear-gradient(135deg, ${colors[index]}30, rgba(255, 255, 255, 0.1))`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Icon className="w-12 h-12 mb-4 relative z-10" style={{ color: colors[index], filter: `drop-shadow(0 0 10px ${colors[index]})` }} />
                  <h3 className="text-xl font-bold text-white mb-3 relative z-10">{item.title}</h3>
                  <p className="text-gray-300 relative z-10">{item.description}</p>
                </div>
              );
            })}
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
