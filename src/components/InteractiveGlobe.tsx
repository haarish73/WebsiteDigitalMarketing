import React, { useEffect, useRef } from 'react';

/**
 * SOCIAL CRAFTS CIRCLE - Premium Hero Branding
 * Rewritten in TypeScript/React with full responsiveness.
 * Features:
 * - Three.js Interactive Dotted Globe
 * - Fluid Typography with clamp()
 * - Device-aware rendering for performance
 * - Luxury Gradient Animations
 */

const InteractiveGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse/touch position for parallax
  const coords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // --- THREE.JS SETUP ---
    const THREE = (window as any).THREE;
    if (!THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    let globe: any;

    const createGlobe = () => {
      if (globe) scene.remove(globe);

      const isMobile = window.innerWidth < 768;
      const radius = isMobile ? 1.8 : 2.5;
      const segments = isMobile ? 60 : 90;
      const rings = isMobile ? 60 : 90;
      
      const geometry = new THREE.BufferGeometry();
      const positions: number[] = [];
      const colors: number[] = [];

      for (let i = 0; i <= rings; i++) {
        const phi = (i / rings) * Math.PI;
        for (let j = 0; j <= segments; j++) {
          const theta = (j / segments) * 2 * Math.PI;
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);
          positions.push(x, y, z);
          
          const color = new THREE.Color();
          if (Math.random() > 0.85) {
            color.setHex(0xD4AF37); // Luxury Gold
          } else {
            color.setHSL(0.5, 0.9, 0.6); // Cyan
          }
          colors.push(color.r, color.g, color.b);
        }
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: isMobile ? 0.012 : 0.018,
        vertexColors: true,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });

      globe = new THREE.Points(geometry, material);
      scene.add(globe);
    };

    createGlobe();

    // Event Handlers
    const handleMouseMove = (e: MouseEvent) => {
      coords.current.x = (e.clientX / window.innerWidth) - 0.5;
      coords.current.y = (e.clientY / window.innerHeight) - 0.5;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        coords.current.x = (e.touches[0].clientX / window.innerWidth) - 0.5;
        coords.current.y = (e.touches[0].clientY / window.innerHeight) - 0.5;
      }
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      createGlobe();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (globe) {
        globe.rotation.y += 0.0006;
        globe.position.x += (coords.current.x * 0.4 - globe.position.x) * 0.05;
        globe.position.y += (-coords.current.y * 0.4 - globe.position.y) * 0.05;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black select-none">
      {/* Three.js Background Layer */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0 pointer-events-none w-full h-full" 
        style={{
          background: 'radial-gradient(circle at center, #050505 0%, #000000 100%)'
        }}
      />

      {/* Hero Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen px-4 text-center pointer-events-none">
        <div className="p-6 transition-all duration-700 rounded-full brand-container" 
             style={{ background: 'radial-gradient(circle at center, rgba(0, 242, 255, 0.03) 0%, transparent 70%)' }}>
          
          <h1 className="m-0 font-serif font-semibold leading-tight uppercase animate-shine animate-breath brand-title"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.2rem, 8vw, 6rem)',
                background: 'linear-gradient(45deg, #00f2ff 0%, #ffffff 25%, #D4AF37 50%, #a78bfa 75%, #00f2ff 100%)',
                backgroundSize: '300% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                filter: 'drop-shadow(0 0 15px rgba(0, 242, 255, 0.2))'
              }}>
            Social Crafts Circle
          </h1>

          <p className="mt-4 font-sans tracking-[0.4em] uppercase text-white/60 opacity-0 animate-fadeIn"
             style={{
               fontSize: 'clamp(0.55rem, 1.5vw, 0.85rem)',
               animationDelay: '0.5s',
               animationFillMode: 'forwards'
             }}>
            Crafting Brands • Creating Impacts
          </p>

          <div className="flex justify-center mt-4">
            <div className="h-[1px] opacity-20 bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent" 
                 style={{ width: 'clamp(60px, 15vw, 120px)' }} />
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=Plus+Jakarta+Sans:wght@200;400;600;800&display=swap');

        @keyframes shine {
          0% { background-position: 0% center; }
          100% { background-position: 300% center; }
        }

        @keyframes breath {
          0%, 100% { letter-spacing: 0.02em; transform: scale(1); }
          50% { letter-spacing: 0.04em; transform: scale(1.02); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 0.8; transform: translateY(0); }
        }

        .animate-shine {
          animation: shine 6s linear infinite;
        }

        .animate-breath {
          animation: breath 4s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 1.5s ease-out forwards;
        }

        body {
          margin: 0;
          background-color: black;
        }
      `}</style>
    </div>
  );
};

export default InteractiveGlobe;
