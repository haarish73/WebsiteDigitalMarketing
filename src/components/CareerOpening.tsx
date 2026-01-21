import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, MapPin, Clock, TrendingUp, Users, Zap, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AnimatedPageTemplate() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  // Track mouse position for dynamic glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);



  const jobOpenings = [
    {
      id: 'seo-specialist',
      title: 'SEO Specialist',
      department: 'Digital Marketing',
      location: 'Mumbai, India',
      type: 'Full-time',
      color: '#4ECDC4',
      description: 'Drive organic growth through strategic SEO initiatives and data-driven optimization.',
      requirements: ['3+ years SEO experience', 'Google Analytics certified', 'Technical SEO expertise', 'Content strategy skills']
    },
    {
      id: 'social-media-manager',
      title: 'Social Media Manager',
      department: 'Content & Community',
      location: 'Remote',
      type: 'Full-time',
      color: '#FF6B6B',
      description: 'Build and engage our community across all social platforms with creative campaigns.',
      requirements: ['5+ years social media experience', 'Strong copywriting skills', 'Analytics proficiency', 'Brand storytelling expertise']
    },
    {
      id: 'ppc-specialist',
      title: 'PPC Specialist',
      department: 'Paid Media',
      location: 'Hybrid',
      type: 'Full-time',
      color: '#FFE66D',
      description: 'Manage and optimize high-performance paid advertising campaigns across multiple platforms.',
      requirements: ['Google Ads certified', '4+ years PPC experience', 'Budget management skills', 'A/B testing expertise']
    },
    {
      id: 'content-strategist',
      title: 'Content Strategist',
      department: 'Content Marketing',
      location: 'Mumbai, India',
      type: 'Full-time',
      color: '#A8E6CF',
      description: 'Develop compelling content strategies that drive engagement and conversions.',
      requirements: ['Content marketing experience', 'SEO knowledge', 'Editorial skills', 'Strategic thinking']
    },
    {
      id: 'email-marketing',
      title: 'Email Marketing Specialist',
      department: 'Marketing Automation',
      location: 'Remote',
      type: 'Contract',
      color: '#667EEA',
      description: 'Create and execute email campaigns that nurture leads and drive customer retention.',
      requirements: ['Email platform expertise', 'Segmentation skills', 'HTML/CSS knowledge', 'Analytics experience']
    },
    {
      id: 'marketing-analyst',
      title: 'Marketing Data Analyst',
      department: 'Analytics',
      location: 'Hybrid',
      type: 'Full-time',
      color: '#F093FB',
      description: 'Transform marketing data into actionable insights that drive business growth.',
      requirements: ['SQL & Python skills', 'Dashboard creation', 'Statistical analysis', 'Data visualization']
    }
  ];

  const benefits = [
    { icon: TrendingUp, title: 'Career Growth', description: 'Continuous learning and advancement opportunities', color: '#4ECDC4' },
    { icon: Users, title: 'Collaborative Team', description: 'Work with talented marketers and creatives', color: '#FF6B6B' },
    { icon: Zap, title: 'Cutting-Edge Tools', description: 'Access to the latest marketing technologies', color: '#FFE66D' },
    { icon: Award, title: 'Competitive Pay', description: 'Industry-leading compensation and benefits', color: '#A8E6CF' }
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

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 
            className="text-7xl font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #667EEA 0%, #4ECDC4 50%, #FFE66D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(102, 126, 234, 0.6))',
              animation: 'textGlow 3s ease-in-out infinite',
            }}
          >
            Join Our Team
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Shape the future of digital marketing with a team that values innovation, creativity, and data-driven excellence.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-12 mt-12">
            {[
              { number: '50+', label: 'Team Members' },
              { number: '100+', label: 'Clients Worldwide' },
              { number: '5+', label: 'Years Experience' }
            ].map((stat, i) => (
              <div 
                key={i}
                className="text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid rgba(102, 126, 234, 0.3)',
                  padding: '20px 40px',
                  borderRadius: '16px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                }}
              >
                <div 
                  className="text-4xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #667EEA, #4ECDC4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Join Us Section */}
        <div className="mb-20">
          <h2 
            className="text-5xl font-bold text-center mb-12"
            style={{
              background: 'linear-gradient(135deg, #4ECDC4, #667EEA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Why Join Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              const isHovered = hoveredItem === `benefit-${i}`;
              
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredItem(`benefit-${i}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="text-center p-8 rounded-2xl transition-all duration-500"
                  style={{
                    background: isHovered ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(15px)',
                    border: `2px solid ${isHovered ? benefit.color : 'rgba(255, 255, 255, 0.1)'}`,
                    boxShadow: isHovered ? `0 25px 50px ${benefit.color}40` : '0 8px 25px rgba(0,0,0,0.3)',
                    transform: isHovered ? 'translateY(-10px) scale(1.05)' : 'translateY(0)',
                  }}
                >
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 relative overflow-hidden"
                    style={{
                      background: isHovered 
                        ? `linear-gradient(135deg, ${benefit.color}, ${benefit.color}dd)` 
                        : 'rgba(255, 255, 255, 0.1)',
                      border: `2px solid ${isHovered ? benefit.color : 'rgba(255, 255, 255, 0.2)'}`,
                      boxShadow: isHovered 
                        ? `0 20px 50px ${benefit.color}60, 0 0 60px ${benefit.color}40` 
                        : '0 8px 25px rgba(0,0,0,0.3)',
                    }}
                  >
                    {isHovered && (
                      <>
                        <div 
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background: benefit.color,
                            opacity: 0.3,
                            animation: 'pulse 1.5s infinite',
                          }}
                        />
                        <div 
                          className="absolute inset-0 rounded-2xl border-2"
                          style={{
                            borderColor: benefit.color,
                            animation: 'ping 2s infinite',
                          }}
                        />
                      </>
                    )}
                    <Icon size={32} style={{ color: isHovered ? '#fff' : benefit.color }} className="relative z-10" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Job Openings Section */}
        <div className="mb-20">
          <h2 
            className="text-5xl font-bold text-center mb-4"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #FFE66D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Open Positions
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Find your next career opportunity and make an impact
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobOpenings.map((job) => {
              const isHovered = hoveredItem === job.id;
              const isSelected = selectedJob === job.id;
              
              return (
                <div
                  key={job.id}
                  onMouseEnter={() => setHoveredItem(job.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => setSelectedJob(isSelected ? null : job.id)}
                  className="p-8 rounded-3xl cursor-pointer transition-all duration-500"
                  style={{
                    background: isHovered || isSelected ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)',
                    backdropFilter: 'blur(15px)',
                    border: `2px solid ${isHovered || isSelected ? job.color : 'rgba(255, 255, 255, 0.1)'}`,
                    boxShadow: isHovered || isSelected 
                      ? `0 30px 60px ${job.color}40, 0 0 80px ${job.color}20` 
                      : '0 8px 25px rgba(0,0,0,0.3)',
                    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                      <p className="text-gray-400">{job.department}</p>
                    </div>
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${job.color}20`,
                        border: `2px solid ${job.color}`,
                      }}
                    >
                      <Briefcase size={28} style={{ color: job.color }} />
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">{job.description}</p>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin size={16} style={{ color: job.color }} />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock size={16} style={{ color: job.color }} />
                      {job.type}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-6 pt-6 border-t border-gray-700">
                      <h4 className="text-lg font-semibold text-white mb-3">Requirements:</h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-300">
                            <div 
                              className="w-1.5 h-1.5 rounded-full mt-2"
                              style={{ background: job.color }}
                            />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Link to="/apply-job" className="w-full mt-6 py-4 px-6 rounded-xl font-semibold transition-all duration-500 flex items-center justify-center gap-2"
                  style={{
                    background: isHovered 
                      ? `linear-gradient(135deg, ${job.color}, ${job.color}dd)` 
                      : 'rgba(255, 255, 255, 0.1)',
                    color: isHovered ? '#fff' : job.color,
                    border: `2px solid ${job.color}`,
                    boxShadow: isHovered ? `0 15px 40px ${job.color}50` : 'none',
                    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                  }}>
                    Apply Now <ArrowRight size={20} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div 
          className="text-center p-16 rounded-3xl"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(102, 126, 234, 0.3)',
            boxShadow: '0 20px 60px rgba(102, 126, 234, 0.2)',
          }}
        >
          <h2 
            className="text-4xl font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #667EEA, #4ECDC4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Don't See the Right Role?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. Send us your resume and let's talk about future opportunities.
          </p>
          <button
          onClick={() => window.location.href= "mailto:connect@socialcraftscirde.com"}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 35px 80px rgba(102, 126, 234, 0.5), 0 0 100px rgba(78, 205, 196, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 25px 60px rgba(102, 126, 234, 0.4), 0 0 80px rgba(78, 205, 196, 0.3)';
            }}
            className="py-5 px-12 rounded-2xl text-white text-lg font-bold transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, #667EEA 0%, #4ECDC4 50%, #FFE66D 100%)',
              backgroundSize: '200% 200%',
              boxShadow: '0 25px 60px rgba(102, 126, 234, 0.4), 0 0 80px rgba(78, 205, 196, 0.3)',
              animation: 'gradientShift 4s ease infinite',
            }}
          >
            Send Your Resume
          </button>
        </div>
      </div>

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
          0%, 100% { box-shadow: 0 30px 80px rgba(102, 126, 234, 0.6), 0 0 100px rgba(78, 205, 196, 0.4); }
          50% { box-shadow: 0 35px 100px rgba(102, 126, 234, 0.8), 0 0 140px rgba(78, 205, 196, 0.6); }
        }

        @keyframes textGlow {
          0%, 100% { filter: drop-shadow(0 0 40px rgba(102, 126, 234, 0.6)); }
          50% { filter: drop-shadow(0 0 60px rgba(78, 205, 196, 0.8)); }
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