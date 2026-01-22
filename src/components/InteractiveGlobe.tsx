import React, { useEffect, useRef } from 'react';
import "../css/interactive.css"

/**
 * SOCIAL CRAFTS CIRCLE - Premium Hero Branding
 * Fully fixed for mobile + desktop
 * - Three.js Interactive Dotted Globe
 * - Mobile-safe viewport height
 * - Correct z-index & GPU compositing
 * - No hero visibility issues
 */

const InteractiveGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const coords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const THREE = (window as any).THREE;
    if (!THREE) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      55,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });

    const isMobile = window.innerWidth < 768;

    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    let globe: any = null;

    const createGlobe = () => {
      if (globe) scene.remove(globe);

      const radius = isMobile ? 1.8 : 2.5;
      const segments = isMobile ? 60 : 90;
      const rings = isMobile ? 60 : 90;

      const geometry = new THREE.BufferGeometry();
      const positions: number[] = [];
      const colors: number[] = [];

      for (let i = 0; i <= rings; i++) {
        const phi = (i / rings) * Math.PI;
        for (let j = 0; j <= segments; j++) {
          const theta = (j / segments) * Math.PI * 2;

          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);

          positions.push(x, y, z);

          const color = new THREE.Color();
          if (Math.random() > 0.85) {
            color.setHex(0xD4AF37); // Gold
          } else {
            color.setHSL(0.5, 0.9, 0.6); // Cyan
          }

          colors.push(color.r, color.g, color.b);
        }
      }

      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geometry.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(colors, 3)
      );

      const material = new THREE.PointsMaterial({
        size: isMobile ? 0.012 : 0.018,
        vertexColors: true,
        transparent: true,
        opacity: isMobile ? 0.35 : 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      globe = new THREE.Points(geometry, material);
      scene.add(globe);
    };

    createGlobe();

    // Mouse & touch movement
    const handleMouseMove = (e: MouseEvent) => {
      coords.current.x = e.clientX / window.innerWidth - 0.5;
      coords.current.y = e.clientY / window.innerHeight - 0.5;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length) {
        coords.current.x = e.touches[0].clientX / window.innerWidth - 0.5;
        coords.current.y = e.touches[0].clientY / window.innerHeight - 0.5;
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
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize);

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (globe) {
        globe.rotation.y += 0.0006;
        globe.position.x +=
          (coords.current.x * 0.4 - globe.position.x) * 0.05;
        globe.position.y +=
          (-coords.current.y * 0.4 - globe.position.y) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full bg-black select-none" style={{ minHeight: '100svh' }}>
      {/* Three.js Background */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at center, #050505 0%, #000000 100%)',
        }}
      />

      {/* Hero Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center"
        style={{
          minHeight: '100svh',
          isolation: 'isolate',
          transform: 'translateZ(0)',
        }}
      >
        <div
          className="p-6 rounded-full transition-all duration-700"
          style={{
            background:
              'radial-gradient(circle at center, rgba(0,242,255,0.04) 0%, transparent 70%)',
          }}
        >
          <h1
            className="m-0 uppercase font-semibold animate-shine animate-breath"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 8vw, 6rem)',
              lineHeight: 1.1,
              background:
                'linear-gradient(45deg, #00f2ff 0%, #ffffff 25%, #D4AF37 50%, #a78bfa 75%, #00f2ff 100%)',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              filter: 'drop-shadow(0 0 15px rgba(0,242,255,0.25))',
            }}
          >
            Social Crafts Circle
          </h1>

          <p
            className="mt-4 uppercase text-white/60 animate-fadeIn"
            style={{
              fontSize: 'clamp(0.55rem, 1.5vw, 0.85rem)',
              letterSpacing: '0.4em',
            }}
          >
            Crafting Brands • Creating Impacts
          </p>

          <div className="flex justify-center mt-4">
            <div
              className="h-px opacity-30 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{ width: 'clamp(60px, 15vw, 120px)' }}
            />
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;600&family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

        @keyframes shine {
          from { background-position: 0% center; }
          to { background-position: 300% center; }
        }

        @keyframes breath {
          0%,100% { transform: scale(1); letter-spacing: 0.02em; }
          50% { transform: scale(1.02); letter-spacing: 0.04em; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 0.85; transform: translateY(0); }
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
          background: black;
        }
      `}</style>
    </div>
  );
};

export default InteractiveGlobe;
