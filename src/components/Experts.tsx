export default function Experts() {
  return (
    <section className="py-16 bg-[#6B7C3E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Team of experts"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">We Are Digital Marketing Experts</h2>
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
          </div>
        </div>
      </div>
    </section>
  );
}
