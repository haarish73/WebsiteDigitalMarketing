import { Settings, CheckCircle, TrendingUp } from 'lucide-react';

export default function ValueProposition() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Thrive Internet Marketing Agency is an award-winning digital marketing company that offers a full
            spectrum of data-driven web marketing services. We develop growth-oriented online marketing
            campaigns that make a positive impact on businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-lg transition">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Settings className="w-12 h-12 text-[#6B7C3E]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">OPTIMIZE</h3>
            <p className="text-gray-600">Marketing Processes</p>
          </div>

          <div className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-lg transition">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-[#6B7C3E]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">GENERATE</h3>
            <p className="text-gray-600">Targeted Results</p>
          </div>

          <div className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-lg transition">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-12 h-12 text-[#6B7C3E]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">GROW</h3>
            <p className="text-gray-600">Your Brand Online</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="bg-[#D97706] text-white font-bold px-8 py-4 rounded-full hover:bg-[#B45309] transition duration-300 text-sm">
            STRATEGY-FIRST AGENCY
          </button>
          <button className="bg-white text-[#D97706] border-2 border-[#D97706] font-bold px-8 py-4 rounded-full hover:bg-[#D97706] hover:text-white transition duration-300 text-sm">
            GET MY FREE PROPOSAL
          </button>
        </div>
      </div>
    </section>
  );
}
