import React from 'react';

export default function AboutSection() {
  return (
  <section className="relative w-full pb-28 px-6 md:px-16 bg-transparent">

  <div className="max-w-6xl mx-auto">
<br/>
<br/>
    {/* Main Text */}
    <p className="text-[1.65rem] md:text-[2.75rem] font-normal leading-[1.25] text-white/90">
      We are{" "}
      <span className="text-cyan-400 font-semibold">
        Smart Crafts Circle
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