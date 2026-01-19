import { Star } from 'lucide-react';

export default function SocialProof() {
  return (
    <section className="bg-[#6B7C3E] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 text-center text-white">
          <div
            className="p-8 rounded-2xl transition-all duration-500 cursor-pointer group"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              transform: 'perspective(1000px) rotateX(0deg)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-15px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 25px 60px rgba(255, 215, 0, 0.4)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <h3 className="text-4xl font-bold mb-4">Google</h3>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-[#FFD700] text-[#FFD700] transition-all duration-300"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                />
              ))}
            </div>
            <p className="text-[#FFD700] text-xl font-semibold">150+ Reviews</p>
          </div>

          <div
            className="p-8 rounded-2xl transition-all duration-500 cursor-pointer group"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              transform: 'perspective(1000px) rotateX(0deg)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-15px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 25px 60px rgba(255, 215, 0, 0.4)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <h3 className="text-4xl font-bold mb-4">Clutch</h3>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-[#FFD700] text-[#FFD700] transition-all duration-300"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                />
              ))}
            </div>
            <p className="text-[#FFD700] text-xl font-semibold">50+ Reviews</p>
          </div>

          <div
            className="p-8 rounded-2xl transition-all duration-500 cursor-pointer group"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              transform: 'perspective(1000px) rotateX(0deg)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-15px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 25px 60px rgba(255, 215, 0, 0.4)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <h3 className="text-4xl font-bold mb-4">Upwork</h3>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-[#FFD700] text-[#FFD700] transition-all duration-300"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                />
              ))}
            </div>
            <p className="text-[#FFD700] text-xl font-semibold">50+ Reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}
