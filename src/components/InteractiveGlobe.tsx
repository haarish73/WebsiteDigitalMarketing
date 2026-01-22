import React, { useEffect, useRef } from "react";

const InteractiveGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const coords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const THREE = (window as any).THREE;
    if (!THREE) {
      console.warn("Three.js not loaded");
      return;
    }

    const container = containerRef.current;

    /* Get actual viewport dimensions */
    const getViewportSize = () => {
      return {
        width: Math.max(window.innerWidth, 320),
        height: Math.max(window.innerHeight, 500)
      };
    };

    /* ---------------- SCENE SETUP ---------------- */
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.margin = "0";
    renderer.domElement.style.padding = "0";

    container.appendChild(renderer.domElement);

    /* ---------------- SIZE HANDLER ---------------- */
    const setSize = () => {
      const { width, height } = getViewportSize();

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    setSize();

    /* ---------------- GLOBE ---------------- */
    const isMobile = window.innerWidth < 768;
    const radius = isMobile ? 1.6 : 2.3;
    const segments = isMobile ? 36 : 64;

    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i <= segments; i++) {
      const phi = (i / segments) * Math.PI;
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        positions.push(x, y, z);

        const color = new THREE.Color();
        if (Math.random() > 0.86) {
          color.setHex(0xd4af37); // gold
        } else {
          color.setHSL(0.52, 0.9, 0.6); // cyan
        }
        colors.push(color.r, color.g, color.b);
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.012 : 0.018,
      vertexColors: true,
      transparent: true,
      opacity: isMobile ? 0.35 : 0.55,
      blending: THREE.AdditiveBlending,
    });

    const globe = new THREE.Points(geometry, material);
    scene.add(globe);

    /* ---------------- INTERACTION ---------------- */
    const onMouseMove = (e: MouseEvent) => {
      coords.current.x = e.clientX / window.innerWidth - 0.5;
      coords.current.y = e.clientY / window.innerHeight - 0.5;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches.length) return;
      coords.current.x = e.touches[0].clientX / window.innerWidth - 0.5;
      coords.current.y = e.touches[0].clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("resize", setSize);

    /* ---------------- ANIMATION ---------------- */
    let frameId = 0;
    let lastTime = 0;

    const animate = (time = 0) => {
      frameId = requestAnimationFrame(animate);

      // limit FPS on mobile
      if (isMobile && time - lastTime < 33) return;
      lastTime = time;

      globe.rotation.y += 0.0007;
      globe.position.x +=
        (coords.current.x * 0.4 - globe.position.x) * 0.05;
      globe.position.y +=
        (-coords.current.y * 0.4 - globe.position.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    /* ---------------- CLEANUP ---------------- */
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", setSize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  /* ---------------- JSX ---------------- */
  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ 
        height: "100vh", 
        minHeight: "100svh",
        maxHeight: "100vh",
        position: "relative"
      }}
    >
      {/* Globe Canvas Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, #050505 0%, #000000 100%)",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          display: "block"
        }}
      />

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center pointer-events-none">
        <h1
          className="uppercase font-semibold"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.8rem, 6vw, 5rem)",
            background:
              "linear-gradient(45deg, #00f2ff, #ffffff, #D4AF37, #a78bfa, #00f2ff)",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            animation: "shine 6s linear infinite",
            margin: 0,
            lineHeight: "1.1"
          }}
        >
          Social Crafts Circle
        </h1>

        <p 
          className="mt-4 text-white/60 tracking-[0.4em] uppercase text-xs"
          style={{
            animation: "fadeIn 1.5s ease-out 0.5s both"
          }}
        >
          Crafting Brands • Creating Impacts
        </p>
      </div>

      <style>{`
        @keyframes shine {
          0% { background-position: 0% center; }
          100% { background-position: 300% center; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 0.8; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default InteractiveGlobe;
