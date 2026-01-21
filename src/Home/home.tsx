import React, { useState, useEffect, useRef } from 'react';
import { Zap, Target, TrendingUp, Users, BarChart3, Rocket, Building, Heart, Home, GraduationCap, ShoppingCart, Plane, Code, Landmark } from 'lucide-react';
import ConsultationForm from '../components/Consulation';
// @ts-ignore
import * as THREE from "three";
import "../css/Home.css"
type Planet = {
  group: THREE.Group;
  mesh: THREE.Mesh;
  dist: number;
  speed: number;
  angle: number;
};

const GalaxyBackground = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      if (!containerRef.current) return;
  
      let scene: THREE.Scene;
      let camera: THREE.PerspectiveCamera;
      let renderer: THREE.WebGLRenderer;
      let starField: THREE.Points;
      const planets: Planet[] = [];
      const ripples: any[] = [];
  
      const clock = new THREE.Clock();
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
  
      const planetData = [
        { dist: 3, size: 0.1, speed: 1.5, color: 0xa5a5a5 },
        { dist: 4.5, size: 0.18, speed: 1.1, color: 0xe3bb76 },
        { dist: 6.5, size: 0.2, speed: 0.9, color: 0x2271b3 },
        { dist: 8.5, size: 0.15, speed: 0.7, color: 0xe27b58 },
        { dist: 12, size: 0.5, speed: 0.4, color: 0xd39c7e },
        { dist: 15, size: 0.42, speed: 0.3, color: 0xc5ab6e },
        { dist: 18, size: 0.28, speed: 0.2, color: 0xbbe1e4 },
        { dist: 21, size: 0.27, speed: 0.15, color: 0x6081ff }
      ];
  
      // INIT
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      camera.position.set(0, 15, 30);
  
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);
  
      // STARS
      const starGeom = new THREE.BufferGeometry();
      const starPos: number[] = [];
      for (let i = 0; i < 10000; i++) {
        starPos.push(
          (Math.random() - 0.5) * 1500,
          (Math.random() - 0.5) * 1500,
          (Math.random() - 0.5) * 1500
        );
      }
      starGeom.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(starPos, 3)
      );
      starField = new THREE.Points(
        starGeom,
        new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, opacity: 0.8 })
      );
      scene.add(starField);
  
      // PLANETS
      planetData.forEach((p) => {
        const group = new THREE.Group();
  
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(p.size, 24, 24),
          new THREE.MeshStandardMaterial({
            color: p.color,
            emissive: p.color,
            emissiveIntensity: 0.2
          })
        );
  
        mesh.position.x = p.dist;
        group.add(mesh);
        scene.add(group);
  
        planets.push({
          group,
          mesh,
          dist: p.dist,
          speed: p.speed * 0.5,
          angle: Math.random() * Math.PI * 2
        });
      });
  
      scene.add(new THREE.PointLight(0xffffff, 2, 50));
      scene.add(new THREE.AmbientLight(0x222222));
  
      // INTERACTION
      const onClick = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
  
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        const point = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, point);
  
        const ripple = new THREE.Mesh(
          new THREE.RingGeometry(0.1, 0.5, 64),
          new THREE.MeshBasicMaterial({
            color: 0xd4af37,
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide
          })
        );
  
        ripple.position.copy(point);
        ripple.rotation.x = Math.PI / 2;
        scene.add(ripple);
        ripples.push({ mesh: ripple, life: 1, radius: 0.1 });
      };
  
      window.addEventListener("mousedown", onClick);
  
      // ANIMATE
      const animate = () => {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();
  
        starField.rotation.y += 0.0001;
  
        planets.forEach((p) => {
          p.angle += p.speed * delta;
          p.group.rotation.y = p.angle;
          p.mesh.rotation.y += 0.01;
        });

        // Camera movement
        camera.position.x = Math.sin(elapsedTime * 0.1) * 5;
        camera.position.z = Math.cos(elapsedTime * 0.1) * 30;
        camera.lookAt(scene.position);
  
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.life -= delta * 0.7;
          r.radius += delta * 15;
          r.mesh.scale.setScalar(r.radius);
          r.mesh.material.opacity = r.life;
          if (r.life <= 0) {
            scene.remove(r.mesh);
            ripples.splice(i, 1);
          }
        }
  
        renderer.render(scene, camera);
      };
  
      animate();
  
      // Handle resize
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
  
      window.addEventListener("resize", onResize);
  
      return () => {
        window.removeEventListener("mousedown", onClick);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
      };
    }, []);

    return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full z-10" />;
};


export default function DigitalMarketingHomepage() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showConsultation, setShowConsultation] = useState(false);
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});
  const [quoteResult, setQuoteResult] = useState("");
  const [quoteData, setQuoteData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isQuoteSubmitting, setIsQuoteSubmitting] = useState(false);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setVisibleSections(prev => ({
              ...prev,
              [sectionId]: true
            }));
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-section]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Track mouse position for dynamic glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsQuoteSubmitting(true);
    setQuoteResult("Sending....");

    const formData = new FormData();
    formData.append('firstName', quoteData.firstName);
    formData.append('lastName', quoteData.lastName);
    formData.append('phone', quoteData.phone);
    formData.append('email', quoteData.email);
    formData.append('message', quoteData.message);
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setQuoteResult('Quote Request Submitted Successfully!');
        setQuoteData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          message: ''
        });
        setTimeout(() => setQuoteResult(''), 3000);
      } else {
        console.log('Error', data);
        setQuoteResult(data.message || 'Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
      setQuoteResult('Error submitting form. Please try again.');
    } finally {
      setIsQuoteSubmitting(false);
    }
  };



  const industries = [
    {name: "Social Crafts Circle", icon: Code },
    { name: "Political PR", icon: Landmark },
    { name: "Local Small Businesses", icon: Building },
    { name: "Healthcare & Medical", icon: Heart },
    { name: "Real Estate & Property", icon: Home },
    {name:"Digital Marketing", icon: Plane },
    { name: "Education & eLearning", icon: GraduationCap },
    { name: "Retail & E-Commerce", icon: ShoppingCart }
  
  ];

  const stats = [
    { value: '50+', label: 'Clients Served' },
    { value: '250%', label: 'Avg ROI Increase' },
    { value: '90K+', label: 'Leads Generated' },
    { value: '99.9%', label: 'Client Satisfaction' },
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
    <div className="min-h-screen w-full relative overflow-hidden bg-transparent">
        <GalaxyBackground />
      
      {/* Mouse glow effect */}
      <div 
        className="fixed pointer-events-none transition-all duration-700 z-20"
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
      <div className="relative z-30">

        <div className="relative z-20 flex items-center justify-center min-h-[100svh] text-center">
            <div>
             <h1 className="
  text-3xl 
  sm:text-4xl 
  md:text-6xl 
  lg:text-7xl 
  font-extrabold 
  uppercase
  bg-gradient-to-r 
  from-white 
  via-yellow-200 
  to-yellow-500 
  bg-clip-text 
  text-transparent
">
  Social Crafts Circle
</h1>
             
<p className="
  mt-4 
  text-[10px] 
  sm:text-xs 
  tracking-[0.25em] 
  sm:tracking-[0.5em] 
  text-yellow-300
">
  CRAFTING BRANDS CREATING IMPACTS
</p>
            </div>
        </div>

        {/* Industries Marquee */}
       <div className="py-4 overflow-hidden whitespace-nowrap flex items-center"
          data-section="marquee"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(15px)',
            borderTop: '2px solid rgba(255, 255, 255, 0.1)',
            borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
            animation: visibleSections['marquee'] ? 'slideInDown 0.8s ease-out' : 'none',
            opacity: visibleSections['marquee'] ? 1 : 0,
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

        <div data-section="about"
          style={{
            opacity: visibleSections['about'] ? 1 : 0,
            animation: visibleSections['about'] ? 'fadeIn 0.8s ease-out' : 'none',
            transition: 'all 0.8s ease-out',
          }}
        >
          <AboutSection />
        </div>

        {/* Stats Section */}
        <section className="container mx-auto px-6 py-16" data-section="stats">
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
                  opacity: visibleSections['stats'] ? 1 : 0,
                  animation: visibleSections['stats'] ? `slideInUp 0.6s ease-out ${i * 0.1}s both` : 'none',
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
        <section id="services" className="container mx-auto px-6 py-24" data-section="services">
          <div className="text-center mb-16"
            style={{
              opacity: visibleSections['services'] ? 1 : 0,
              transform: visibleSections['services'] ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s ease-out',
            }}
          >
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
                    opacity: visibleSections['services'] ? 1 : 0,
                    animation: visibleSections['services'] ? `slideInUp 0.6s ease-out ${i * 0.1}s both` : 'none',
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
        <section id="services" className="container mx-auto px-6 py-24" data-section="services2">
          {/* Header */}
          <div className="text-center mb-12"
            style={{
              opacity: visibleSections['services2'] ? 1 : 0,
              transform: visibleSections['services2'] ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s ease-out',
            }}
          >
            <p className="text-lime-400 font-semibold tracking-widest mb-2">
              * OUR SERVICES
            </p>
            <h2 className="text-5xl font-bold text-white leading-tight">
              <span className="text-lime-400">Digital Marketing</span> Services <br />
              We Offer
            </h2>
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
                img: new URL('../image/E-commerce website.png', import.meta.url).href,
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
                style={{
                  opacity: visibleSections['services2'] ? 1 : 0,
                  animation: visibleSections['services2'] ? `slideInUp 0.6s ease-out ${i * 0.1}s both` : 'none',
                }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    loading="lazy"
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
        <section className="container mx-auto px-6 py-24" data-section="quote">
          <h2 className="text-4xl font-light text-white mb-12 text-center"
            style={{
              opacity: visibleSections['quote'] ? 1 : 0,
              animation: visibleSections['quote'] ? 'slideInUp 0.8s ease-out' : 'none',
              transition: 'all 0.8s ease-out',
            }}
          >
            Get a <span className="text-lime-400 font-semibold">Free Quote</span> Today!
          </h2>

          <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
            style={{
              opacity: visibleSections['quote'] ? 1 : 0,
              animation: visibleSections['quote'] ? 'slideInUp 0.8s ease-out 0.2s both' : 'none',
            }}
          >
            <form onSubmit={handleQuoteSubmit}>
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={quoteData.firstName}
                  onChange={(e) => setQuoteData({...quoteData, firstName: e.target.value})}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-transparent border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-lime-400 transition font-bold"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={quoteData.lastName}
                  onChange={(e) => setQuoteData({...quoteData, lastName: e.target.value})}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-transparent border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-lime-400 transition font-bold"
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone No"
                  value={quoteData.phone}
                  onChange={(e) => setQuoteData({...quoteData, phone: e.target.value})}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-transparent border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-lime-400 transition font-bold"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={quoteData.email}
                  onChange={(e) => setQuoteData({...quoteData, email: e.target.value})}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-transparent border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-lime-400 transition font-bold"
                />
              </div>

              {/* Message */}
              <div className="mb-10">
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Message"
                  value={quoteData.message}
                  onChange={(e) => setQuoteData({...quoteData, message: e.target.value})}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-transparent border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-lime-400 transition resize-none font-bold"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isQuoteSubmitting}
                className="w-full py-4 rounded-xl bg-lime-400 text-black font-semibold tracking-wide hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isQuoteSubmitting ? 'Sending...' : 'Submit Message'}
              </button>
              
              {quoteResult && (
                <div className={`mt-4 p-4 rounded-lg text-center font-semibold ${
                  quoteResult.includes('Successfully') 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'bg-red-500/20 text-red-300'
                }`}>
                  {quoteResult}
                </div>
              )}

              {/* Small Dot Indicator */}
              <div className="flex justify-center mt-6">
                <span className="w-2 h-2 rounded-full bg-lime-400" />
              </div>
            </form>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-24" data-section="cta">
          <div 
            className="rounded-[40px] p-16 text-center relative overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(15px)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              opacity: visibleSections['cta'] ? 1 : 0,
              animation: visibleSections['cta'] ? 'slideInUp 0.8s ease-out' : 'none',
              transition: 'all 0.8s ease-out',
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
        <footer className="container mx-auto px-6 py-12 border-t border-white/10" data-section="footer"
          style={{
            opacity: visibleSections['footer'] ? 1 : 0,
            animation: visibleSections['footer'] ? 'slideInUp 0.8s ease-out' : 'none',
            transition: 'all 0.8s ease-out',
          }}
        >
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

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes rotateIn {
          from {
            opacity: 0;
            transform: rotate(-10deg) scale(0.9);
          }
          to {
            opacity: 1;
            transform: rotate(0) scale(1);
          }
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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
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

        @keyframes shine {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        /* Stagger animations for list items */
        @keyframes staggerSlide {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Pulse glow effect */
        @keyframes pulseGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(212, 175, 55, 0.6);
          }
        }

        /* Floating animation */
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Slide up on scroll */
        .scroll-animate {
          opacity: 0;
          animation: slideInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}


function AboutSection() {
  return (
  <section className="relative w-full pb-28 px-6 md:px-16 bg-transparent">

  <div className="max-w-6xl mx-auto">
<br/>
<br/>
    {/* Main Text */}
    <p className="text-[1.65rem] md:text-[2.75rem] font-normal leading-[1.25] text-white/90">
      We are{" "}
      <span className="text-cyan-400 font-semibold">
        Social Crafts Circle
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