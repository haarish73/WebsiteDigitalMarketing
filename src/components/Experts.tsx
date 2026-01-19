export default function Experts() {
  return (
    <section className="py-16 bg-[#6B7C3E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className="bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-500 cursor-pointer relative"
            style={{
              transform: 'perspective(1000px) rotateX(0deg)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(5deg) translateY(-15px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 35px 80px rgba(107, 123, 62, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)';
            }}
          >
            <img
              src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Team of experts"
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#6B7C3E]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8"
            >
              <div className="text-center">
                <h3 className="text-white text-2xl font-bold mb-2">Our Global Team</h3>
                <p className="text-white/90">160+ Experts Across 10 Countries</p>
              </div>
            </div>
          </div>

          <div className="text-white">
            <h2
              className="text-4xl font-bold mb-6"
              style={{
                animation: 'textGlow 3s ease-in-out infinite',
                filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))'
              }}
            >
              We Are Digital Marketing Experts
            </h2>
            <div className="space-y-4 text-white/90 leading-relaxed">
              <p>
                Thrive boasts a unique, close-knit team with experts in all facets of web marketing: strategic, creative and technical.
              </p>
              <p>
                As a recognized leader in digital marketing, Thrive has more than 160 employees across 34 states and located in 10 different countries. We work closely together to ensure smooth campaign development and execution for all of our clients.
              </p>
              <p>
                From the United States and South Africa to the Philippines and India, our digital marketing professionals from all over the world offer unique skill sets and years of industry expertise. In every project we handle, you can trust us to deliver custom web solutions that meet your long-term strategic goals.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:bg-white/30"
                style={{
                  animation: 'pulse 3s ease-in-out infinite',
                }}
              >
                160+ Experts
              </span>
              <span
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:bg-white/30"
                style={{
                  animation: 'pulse 3.5s ease-in-out infinite',
                }}
              >
                10 Countries
              </span>
              <span
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:bg-white/30"
                style={{
                  animation: 'pulse 4s ease-in-out infinite',
                }}
              >
                34 States
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
