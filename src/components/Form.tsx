import React, { useState } from 'react';

export default function JoinTeamForm() {
  const [result, setResult] = React.useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending....");
    
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.currentTarget.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="w-full py-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT SIDE – BRAND / VISUAL */}
        <div className="relative flex justify-center">
          {/* Soft gradient background */}
          <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-br from-red-400 to-cyan-400 opacity-20 blur-2xl" />

          {/* Floating visual cards */}
          <div className="relative z-10 space-y-6">
            <div
              className="w-72 h-44 rounded-2xl flex items-center justify-center text-white p-6"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              Campaign Analytics
            </div>
            <div
              className="w-72 h-44 rounded-2xl flex items-center justify-center text-white p-6 ml-10"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              Creative Dashboard
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – FORM */}
        <div>
          <h2 className="text-5xl font-extrabold mb-6 text-white">
            Be a Part of Our Team
          </h2>

          <p className="text-gray-300 mb-10 max-w-md">
            Join a creative digital marketing team where your ideas turn into
            impactful campaigns.
          </p>

          <form onSubmit={onSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <input
              type="text"
              name="position"
              placeholder="Position / Subject"
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <textarea
              name="message"
              placeholder="Tell us about yourself"
              rows={4}
              required
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl text-black font-semibold text-lg bg-gradient-to-r from-red-400 to-cyan-400 hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message →'}
            </button>
            
            {result && (
              <div className="text-center text-white/80 mt-4">
                <span>{result}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
