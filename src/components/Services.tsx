import { Megaphone, Search, DollarSign, Globe, ThumbsUp, Star, ShoppingBag } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Megaphone className="w-10 h-10 text-[#6B7C3E]" />,
      title: 'Digital Marketing',
      description: 'Gain complete control of your digital real estate with holistic online marketing services tailored to your brand'
    },
    {
      icon: <Search className="w-10 h-10 text-[#6B7C3E]" />,
      title: 'Search Engine Optimization (SEO)',
      description: 'Get white-hat SEO solutions that improve your organic search rankings and increase brand recognition.'
    },
    {
      icon: <DollarSign className="w-10 h-10 text-[#6B7C3E]" />,
      title: 'Pay-Per-Click (PPC) Marketing',
      description: 'Position your brand in front of the right people at the right time and platform with a targeted paid ads campaign.'
    },
    {
      icon: <Globe className="w-10 h-10 text-[#6B7C3E]" />,
      title: 'Web Design and Development',
      description: 'Improve your website accessibility and attract lifetime clients to your business.'
    },
    {
      icon: <ThumbsUp className="w-10 h-10 text-[#6B7C3E]" />,
      title: 'Social Media Marketing',
      description: 'Bring your brand closer to your target audience and gain better customer engagement with social media marketing.'
    },
    {
      icon: <Star className="w-10 h-10 text-[#6B7C3E]" />,
      title: 'Online Reputation Management',
      description: 'What does your reputation say about your brand? Build and maintain your desired brand image to attract more business.'
    },
    {
      icon: <ShoppingBag className="w-10 h-10 text-[#6B7C3E]" />,
      title: 'eCommerce Marketing',
      description: 'Facilitate a smooth buying process for your customers and reduce operational costs with strategic eCommerce marketing solutions.'
    },
    {
      icon: <ShoppingBag className="w-10 h-10 text-[#6B7C3E]" />,
      title: 'Amazon Marketing',
      description: 'We help you optimize your Amazon product listings and improve your pricing strategy to increase your Amazon sales.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            We're a Results-Driven Digital Marketing Agency
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            At Thrive, we take a strategy-first approach to show you real results. Our digital marketing team goes above and beyond to ensure our web marketing campaigns do not just drum up new business for our clients but also support sustainable success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="text-center group p-6 rounded-xl bg-white shadow-lg transition-all duration-500 cursor-pointer"
              style={{
                transform: 'perspective(1000px) rotateX(0deg)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-10px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 25px 60px rgba(107, 123, 62, 0.3)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(107, 123, 62, 0.05), rgba(255, 255, 255, 0.9))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                e.currentTarget.style.background = 'white';
              }}
            >
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-[#6B7C3E] group-hover:text-white transition duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-[#6B7C3E] mb-3 group-hover:text-[#5a6733] transition">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
