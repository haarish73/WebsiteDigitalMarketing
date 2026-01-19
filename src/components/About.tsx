export default function About() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="bg-[#6B7C3E] text-white p-12 rounded-lg">
            <h2 className="text-4xl font-bold mb-4">Who We Are</h2>
            <p className="text-xl text-white/90">Your Trusted Digital Marketing Partner</p>
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden aspect-video">
            <img
              src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Team Photo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div
            className="bg-gray-100 rounded-lg overflow-hidden aspect-square transition-all duration-500 cursor-pointer"
            style={{
              transform: 'perspective(1000px) rotateX(0deg)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-10px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 25px 60px rgba(107, 123, 62, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            }}
          >
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Team collaboration"
              className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
            />
          </div>
          <div
            className="bg-gray-100 rounded-lg overflow-hidden aspect-square transition-all duration-500 cursor-pointer"
            style={{
              transform: 'perspective(1000px) rotateX(0deg)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-10px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 25px 60px rgba(107, 123, 62, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            }}
          >
            <img
              src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Presentation"
              className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
            />
          </div>
          <div
            className="bg-gray-100 rounded-lg overflow-hidden aspect-square transition-all duration-500 cursor-pointer"
            style={{
              transform: 'perspective(1000px) rotateX(0deg)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-10px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 25px 60px rgba(107, 123, 62, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            }}
          >
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Team meeting"
              className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
            />
          </div>
          <div
            className="bg-gray-100 rounded-lg overflow-hidden aspect-square transition-all duration-500 cursor-pointer"
            style={{
              transform: 'perspective(1000px) rotateX(0deg)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-10px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 25px 60px rgba(107, 123, 62, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            }}
          >
            <img
              src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Team discussion"
              className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 lg:p-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Relationships and Results</h3>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Established in 2005, Thrive is committed to helping <span className="text-[#6B7C3E] font-semibold">businesses across industries</span> augment their marketing efforts and gain a competitive edge through comprehensive digital marketing solutions.
              </p>
              <p>
                What started as a one-man shop has blossomed into a full-service digital marketing agency that serves thousands of companies worldwide. Today, we have <span className="font-semibold">thousands of active clients</span> from the United States, Canada and the U.K., among others, who have entrusted their digital success to our team. We work with businesses of all sizes – from startups to large franchises – in most industries and niches.
              </p>
              <p>
                As we grow, we continue to improve our processes and invest in state-of-the-art tools and resources to provide our digital marketing partners with top-notch services.
              </p>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-[#6B7C3E] border-b-8 border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[#6B7C3E] text-white">
                <span className="text-sm font-semibold">FEATURED</span>
                <p className="text-2xl font-bold">Inc. 5000</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="bg-[#D97706] text-white font-bold px-8 py-4 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #D97706 0%, #B45309 50%, #92400E 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 4s ease infinite',
                boxShadow: '0 15px 40px rgba(217, 119, 6, 0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 25px 60px rgba(217, 119, 6, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(217, 119, 6, 0.4)';
              }}
            >
              OUR PORTFOLIO
            </button>
            <button
              className="bg-white text-[#D97706] border-2 border-[#D97706] font-bold px-8 py-4 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-lg"
              style={{
                boxShadow: '0 8px 25px rgba(217, 119, 6, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(217, 119, 6, 0.4)';
                e.currentTarget.style.background = '#D97706';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(217, 119, 6, 0.2)';
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#D97706';
              }}
            >
              CLIENT SUCCESS STORIES
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
