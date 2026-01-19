import { Star } from 'lucide-react';

export default function SocialProof() {
  return (
    <section className="bg-[#6B7C3E] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 text-center text-white">
          <div>
            <h3 className="text-4xl font-bold mb-4">Google</h3>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[#FFD700] text-[#FFD700]" />
              ))}
            </div>
            <p className="text-[#FFD700] text-xl font-semibold">150+ Reviews</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold mb-4">Clutch</h3>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[#FFD700] text-[#FFD700]" />
              ))}
            </div>
            <p className="text-[#FFD700] text-xl font-semibold">50+ Reviews</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold mb-4">Upwork</h3>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[#FFD700] text-[#FFD700]" />
              ))}
            </div>
            <p className="text-[#FFD700] text-xl font-semibold">50+ Reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}
