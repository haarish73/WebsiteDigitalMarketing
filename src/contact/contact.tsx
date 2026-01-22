import React, { useState, useEffect, useRef } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
 
  Instagram,
  Facebook,
  Globe,
  Send,
  MessageCircle
} from 'lucide-react';


export default function ContactSection() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);



  const contactDetails = [
    { icon: Mail, label: 'EMAIL', value: 'connect@socialcraftscircle.com', href: 'mailto:connect@socialcraftscircle.com', color: '#FF6B6B' },
    { icon: Phone, label: 'PHONE', value: '+91 9030492596', href: 'tel:9030492596', color: '#4ECDC4' },
    { icon: MapPin, label: 'LOCATION', value: 'Hyderabad, Telangana, India', href: '#', color: '#FFE66D' },
    { icon: Globe, label: 'WEBSITE', value: 'www.socialcraftcircle.com', href: 'https://Social Craft Circledigital.com', color: '#A8E6CF' },
  ];

const socialMedia = [
  { icon: Linkedin, label: 'LinkedIn', href: '#', color: '#0077B5' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/14UEwCejdcF/', color: '#1877F2' },
  { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/919030492596', color: '#25D366' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/socialcrafts.india?igsh=amJxY28yNnc0ZjJh', color: '#E4405F' },
];


  const services = [
    'SEO Marketing',
    'Social Media Management',
    'Content Creation',
    'PPC Advertising',
    'Whatsapp Marketing',
    'Analytics & Reporting'
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Dark Background Canvas */}


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
      <div className="relative z-20 container mx-auto px-4 pt-24 pb-16">
        {/* Header Section with Bright Colors */}
        <div className="text-center mb-16">
          <div 
            className="inline-block mb-8 relative"
          >
            <div 
              className="w-52 h-52 rounded-3xl mt-8 ml-8 overflow-hidden relative"
            >
              <img src={new URL('../image/CompanyLogo.webp', import.meta.url).href} alt="Company Logo" className="w-full h-full object-cover" />
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