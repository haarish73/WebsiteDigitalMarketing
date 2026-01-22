import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const SocialCraftsLoader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Start fade out after reaching 100%
          setTimeout(() => {
            setFadeOut(true);
            // Redirect to home page after fade out animation
            setTimeout(() => {
              window.location.href = '/home';
            }, 1000);
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Complete in ~3 seconds

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);
    scene.fog = new THREE.Fog(0x0a0a1a, 10, 50);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create network sphere
    const nodeCount = 80;
    const radius = 6;
    const nodes: THREE.Vector3[] = [];
    const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.9
    });

    // Generate nodes in a sphere pattern
    const nodeGroup = new THREE.Group();
    
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      node.position.set(x, y, z);
      nodes.push(new THREE.Vector3(x, y, z));
      nodeGroup.add(node);
      
      // Add point light to each node for glow
      const pointLight = new THREE.PointLight(0xffd700, 0.3, 2);
      pointLight.position.copy(node.position);
      nodeGroup.add(pointLight);
    }

    // Create connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });

    const lineGroup = new THREE.Group();
    const maxDistance = radius * 0.6;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].distanceTo(nodes[j]);
        
        if (distance < maxDistance) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i],
            nodes[j]
          ]);
          const line = new THREE.Line(geometry, lineMaterial.clone());
          lineGroup.add(line);
        }
      }
    }

    scene.add(nodeGroup);
    scene.add(lineGroup);

    // Ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffd700, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;

      // Rotate network sphere
      nodeGroup.rotation.y += 0.002;
      lineGroup.rotation.y += 0.002;

      // Gentle floating motion for nodes
      nodeGroup.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          child.position.y += Math.sin(time + index * 0.1) * 0.002;
          
          // Pulse opacity
          const material = child.material as THREE.MeshBasicMaterial;
          material.opacity = 0.7 + Math.sin(time * 2 + index * 0.5) * 0.2;
        }
      });

      // Animate line opacity
      lineGroup.children.forEach((child, index) => {
        if (child instanceof THREE.Line) {
          const material = child.material as THREE.LineBasicMaterial;
          material.opacity = 0.15 + Math.sin(time * 1.5 + index * 0.05) * 0.1;
        }
      });

      // Camera zoom effect
      camera.position.z = 15 + Math.sin(time * 0.3) * 0.5;

      // Mouse interaction
      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100vh', 
        overflow: 'hidden',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 1s ease-out'
      }}
    >
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      
      {/* Text Overlay */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        <h1
          style={{
            fontFamily: '"Playfair Display", "Cormorant Garamond", "Libre Baskerville", Georgia, serif',
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            fontWeight: 600,
            color: '#ffffff',
            margin: 0,
            letterSpacing: '0.02em',
            textShadow: '0 0 40px rgba(255, 215, 0, 0.4), 0 0 80px rgba(255, 215, 0, 0.2)',
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}
        >
          Social Crafts Circle
        </h1>
        <p
          style={{
            fontFamily: '"Montserrat", "Raleway", "Inter", system-ui, sans-serif',
            fontSize: 'clamp(0.75rem, 1.8vw, 1.2rem)',
            fontWeight: 400,
            color: '#d4af37',
            margin: 0,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            opacity: 0.9,
            textShadow: '0 0 25px rgba(212, 175, 55, 0.3)'
          }}
        >
          Crafting Brands Creating Impacts
        </p>

        {/* Loading Progress Bar */}
        <div
          style={{
            marginTop: '3rem',
            width: '300px',
            maxWidth: '80vw',
            height: '2px',
            background: 'rgba(255, 215, 0, 0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
            margin: '3rem auto 0'
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #d4af37, #ffd700, #d4af37)',
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
              transition: 'width 0.3s ease-out'
            }}
          />
        </div>

        {/* Loading Percentage */}
        <div
          style={{
            fontFamily: '"Montserrat", "Raleway", system-ui, sans-serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            fontWeight: 300,
            color: '#ffd700',
            marginTop: '1rem',
            letterSpacing: '0.1em',
            opacity: 0.8
          }}
        >
          {progress}%
        </div>
      </div>

      {/* Vignette Effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          background: 'radial-gradient(circle at center, transparent 0%, rgba(10, 10, 26, 0.4) 100%)',
          zIndex: 5
        }}
      />

      {/* Google Fonts Import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default SocialCraftsLoader;