import { TrendingUp, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-[#6B7C3E] text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Experience Real Results
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Partner with Thrive Internet Marketing Agency and scale your business.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">RecNation</span>
                  <span className="text-2xl font-bold text-[#FFD700]">+500%</span>
                </div>
                <p className="text-sm text-white/80">Impressions</p>
              </div>

              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Social Media Growth</span>
                  <span className="text-2xl font-bold text-[#FFD700]">+60%</span>
                </div>
                <p className="text-sm text-white/80">New Followers</p>
              </div>

              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Engagement</span>
                  <span className="text-2xl font-bold text-[#FFD700]">+190%</span>
                </div>
                <p className="text-sm text-white/80">Engagement Rate</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Get Your Free Proposal
            </h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Enter Your Website Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B7C3E] focus:border-transparent outline-none text-gray-800"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B7C3E] focus:border-transparent outline-none text-gray-800"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B7C3E] focus:border-transparent outline-none text-gray-800"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B7C3E] focus:border-transparent outline-none text-gray-800"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#D97706] text-white font-bold py-4 rounded-lg hover:bg-[#B45309] transition duration-300"
              >
                SEND MY FREE PROPOSAL
              </button>
              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our Terms and Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
