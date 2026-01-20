import React from 'react';

export default function JoinTeamForm() {
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

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <input
              type="text"
              placeholder="Position / Subject"
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <textarea
              placeholder="Tell us about yourself"
              rows={4}
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
            />

            <button
              type="submit"
              className="w-full py-4 rounded-xl text-black font-semibold text-lg bg-gradient-to-r from-red-400 to-cyan-400 hover:scale-105 transition"
            >
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
