import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedPageTemplate() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    linkedIn: '',
    portfolio: '',
    experience: '',
    message: '',
    noticePeriod: '',
    salary: '',
    resume: ''
  });
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
    }));

    let time = 0;
    let frame: number;

    const animate = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, '#0a0e27');
      bg.addColorStop(0.5, '#1a1f4d');
      bg.addColorStop(1, '#0f1729');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(102,126,234,0.6)';
        ctx.fill();
      });

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult('Sending....');

    const submitFormData = new FormData();
    submitFormData.append('fullName', formData.fullName);
    submitFormData.append('email', formData.email);
    submitFormData.append('phone', formData.phone);
    submitFormData.append('city', formData.city);
    submitFormData.append('linkedIn', formData.linkedIn);
    submitFormData.append('portfolio', formData.portfolio);
    submitFormData.append('experience', formData.experience);
    submitFormData.append('message', formData.message);
    submitFormData.append('noticePeriod', formData.noticePeriod);
    submitFormData.append('salary', formData.salary);
    submitFormData.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submitFormData
      });

      const data = await response.json();

      if (data.success) {
        setResult('Application Submitted Successfully! We\'ll review your profile and get back to you soon.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          city: '',
          linkedIn: '',
          portfolio: '',
          experience: '',
          message: '',
          noticePeriod: '',
          salary: '',
          resume: ''
        });
        setTimeout(() => setResult(''), 4000);
      } else {
        console.log('Error', data);
        setResult(data.message || 'Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Mouse Glow */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(102,126,234,0.25), transparent 60%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(40px)',
        }}
      />

      {/* CONTENT */}
      <div className="relative z-20 container mx-auto px-4 py-16">
        <h1
          className="text-6xl font-bold text-center mb-16"
          style={{
            background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4,#FFE66D)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(255,107,107,0.5))',
          }}
        >
          Careers
        </h1>

        {/* APPLY NOW FORM */}
        <div
          className="max-w-4xl mx-auto p-10 rounded-3xl"
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(15px)',
            border: '2px solid rgba(255,255,255,0.15)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          }}
        >
          <h2
            className="text-4xl font-bold text-center mb-10"
            style={{
              background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4,#FFE66D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Apply Now
          </h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <input 
              required 
              name="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              placeholder="Full Name *" 
              style={inputStyle} 
            />
            <input 
              required 
              type="email" 
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Email Address *" 
              style={inputStyle} 
            />
            <input 
              required 
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="Phone Number *" 
              style={inputStyle} 
            />
            <input 
              name="city"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              placeholder="Current City / Location" 
              style={inputStyle} 
            />
            <input 
              name="linkedIn"
              value={formData.linkedIn}
              onChange={(e) => setFormData({...formData, linkedIn: e.target.value})}
              placeholder="LinkedIn Profile URL" 
              style={inputStyle} 
            />
            <input 
              name="portfolio"
              value={formData.portfolio}
              onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
              placeholder="Portfolio / Website URL" 
              style={inputStyle} 
            />

            <select 
              required 
              name="experience"
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              style={inputStyle}
            >
              <option value="">Total Experience</option>
              <option>Fresher</option>
              <option>0–1 Years</option>
              <option>1–3 Years</option>
              <option>3+ Years</option>
            </select>

            <select 
              name="noticePeriod"
              value={formData.noticePeriod}
              onChange={(e) => setFormData({...formData, noticePeriod: e.target.value})}
              style={inputStyle}
            >
              <option value="">Notice Period</option>
              <option>Immediate</option>
              <option>15 Days</option>
              <option>30 Days</option>
              <option>60 Days</option>
            </select>

            <input 
              name="salary"
              value={formData.salary}
              onChange={(e) => setFormData({...formData, salary: e.target.value})}
              placeholder="Expected Salary" 
              style={inputStyle} 
            />

            <textarea
              required
              name="message"
              minLength={300}
              maxLength={500}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Why should we hire you? (300–500 characters)"
              rows={5}
              className="md:col-span-2"
              style={inputStyle}
            />

            <label className="md:col-span-2 text-gray-200 flex gap-3">
              <input type="checkbox" required />
              I confirm that the information provided is accurate.
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2 py-5 rounded-xl text-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg,#FF6B6B,#4ECDC4,#FFE66D)',
                backgroundSize: '200% 200%',
                boxShadow: '0 25px 60px rgba(255,107,107,0.6)',
                animation: 'gradientShift 4s ease infinite',
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>

            {result && (
              <div className={`md:col-span-2 mt-4 p-4 rounded-lg text-center font-semibold ${
                result.includes('Successfully') 
                  ? 'bg-green-500/20 text-green-300' 
                  : 'bg-red-500/20 text-red-300'
              }`}>
                {result}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '14px 18px',
  borderRadius: '14px',
  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(12px)',
  border: '2px solid rgba(255,255,255,0.15)',
  color: 'white',
  outline: 'none',
};
