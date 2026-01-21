import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';
import companylogo from "../image/CompanyLogo.webp"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [webOpen, setWebOpen] = useState(false);
  const [publicRelationsOpen, setPublicRelationsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileWebOpen, setMobileWebOpen] = useState(false);
  const [mobilePublicRelationsOpen, setMobilePublicRelationsOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const publicRelationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
        setWebOpen(false);
      }
      if (publicRelationsRef.current && !publicRelationsRef.current.contains(event.target as Node)) {
        setPublicRelationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500
            ${scrolled
              ? 'bg-[#0a0e27]/90 backdrop-blur-md shadow-lg'
              : 'bg-[#0a0e27]/90 backdrop-blur-md shadow-lg'}      `}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link to="/">
            <img src={companylogo} alt="Company Logo" className="h-16 w-auto" loading="lazy" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center space-x-10 relative">

            {/* SERVICES */}
            <div
              className="relative"
              ref={servicesRef}
            >
              <button 
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1 text-white/80 hover:text-[#4ECDC4] font-medium"
              >
                Services <ChevronDown size={16} />
              </button>

              {servicesOpen && (
                <div 
                  className="absolute left-0 mt-6 w-80 rounded-3xl bg-[#0a0e27]/95 backdrop-blur-xl p-6 shadow-2xl space-y-4 border border-white/10"
                  onClick={(e) => e.stopPropagation()}
                >

                  {/* DIGITAL MARKETING */}
                  <Link
                    to="/services/digital-marketing"
                    className="block font-semibold text-white hover:text-[#4ECDC4] hover:underline transition-colors"
                  >
                    Digital Marketing Services
                  </Link>

                  {/* SEO */}
                  <Link
                    to="/services/seo"
                    className="block font-semibold text-white hover:text-[#4ECDC4] hover:underline transition-colors"
                  >
                    SEO Services
                  </Link>

                  {/* WEBSITE DEVELOPMENT */}
                  <div>
                    <button
                      onClick={() => setWebOpen(!webOpen)}
                      className="w-full flex justify-between items-center font-semibold text-white hover:text-[#4ECDC4] transition-colors"
                    >
                      Website Development Services
                      <ChevronDown size={14} />
                    </button>

                    {webOpen && (
                      <div className="mt-3 ml-4 space-y-3">
                        <Link
                          to="/wordpress"
                          className="block font-medium text-white/80 hover:text-[#4ECDC4] hover:underline transition-colors"
                        >
                          WordPress Website Development
                        </Link>
                        <Link
                          to="/EcommerceDevelopmentPage"
                          className="block font-medium text-white/80 hover:text-[#4ECDC4] hover:underline transition-colors"
                        >
                          Ecommerce Website Development
                        </Link>
                        <Link
                          to="/services/shopify"
                          className="block font-medium text-white/80 hover:text-[#4ECDC4] hover:underline transition-colors"
                        >
                          Shopify Website Development
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* PUBLIC RELATIONS */}
            <div
              className="relative"
              ref={publicRelationsRef}
            >
              <button 
                onClick={() => setPublicRelationsOpen(!publicRelationsOpen)}
                className="flex items-center gap-1 text-white/80 hover:text-[#4ECDC4] font-medium"
              >
                Public Relations <ChevronDown size={16} />
              </button>

           {publicRelationsOpen && (
  <div 
    className="absolute left-0 mt-6 w-64 rounded-3xl bg-[#0a0e27]/95 backdrop-blur-xl p-6 shadow-2xl space-y-4 border border-white/10"
    onClick={(e) => e.stopPropagation()}
  >
   <Link
      to="/services/political-pr"
      className="block font-semibold text-white hover:text-[#4ECDC4] hover:underline transition-colors"
    >
      Political PR
    </Link>
    <Link
      to="/services/marketing-pr"
      className="block font-semibold text-white hover:text-[#4ECDC4] hover:underline transition-colors"
    >
      Marketing PR
    </Link>

   
  </div>
)}

            </div>

            {/* PRODUCTIONS */}
            <Link
              to="/productions"
              className="block text-white/80 hover:text-[#4ECDC4] font-medium"
            >
              Productions
            </Link>

            {/* CAREER */}
            <Link
              to="/careers"
              className="block text-white/80 hover:text-[#4ECDC4] font-medium"
            >
              Careers
            </Link>

            {/* OTHER LINKS */}
            <Link
              to="/about"
              className="text-white/80 hover:text-[#4ECDC4] font-medium"
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className="text-white/80 hover:text-[#4ECDC4] font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="fixed inset-0 lg:hidden bg-white/95 backdrop-blur-md z-40 flex flex-col items-center justify-center p-6">
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-6 text-black hover:text-gray-600 transition"
            >
              <X size={32} />
            </button>

            {/* Menu Items */}
            <nav className="flex flex-col items-center justify-center space-y-8 text-center">
              {/* HOME */}
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-5xl font-bold text-black hover:text-[#4ECDC4] transition duration-300"
              >
                HOME
              </Link>

              {/* SERVICES */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="text-5xl font-bold text-black hover:text-[#4ECDC4] transition duration-300 flex items-center gap-2"
                >
                  SERVICES
                  <ChevronDown
                    size={24}
                    className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="mt-6 space-y-4">
                    <Link
                      to="/services/digital-marketing"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg font-semibold text-gray-700 hover:text-[#4ECDC4] transition"
                    >
                      Digital Marketing
                    </Link>
                    <Link
                      to="/services/seo"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg font-semibold text-gray-700 hover:text-[#4ECDC4] transition"
                    >
                      SEO Services
                    </Link>
                    <div>
                      <button
                        onClick={() => setMobileWebOpen(!mobileWebOpen)}
                        className="text-lg font-semibold text-gray-700 hover:text-[#4ECDC4] transition flex items-center gap-2"
                      >
                        Website Development
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${mobileWebOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {mobileWebOpen && (
                        <div className="mt-3 ml-4 space-y-2">
                          <Link
                            to="/wordpress"
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-gray-600 hover:text-[#4ECDC4] transition"
                          >
                            WordPress
                          </Link>
                          <Link
                            to="/EcommerceDevelopmentPage"
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-gray-600 hover:text-[#4ECDC4] transition"
                          >
                            Ecommerce
                          </Link>
                          <Link
                            to="/services/shopify"
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-gray-600 hover:text-[#4ECDC4] transition"
                          >
                            Shopify
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* WORK */}
             

              {/* ABOUT */}
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-5xl font-bold text-black hover:text-[#4ECDC4] transition duration-300"
              >
                ABOUT
              </Link>

              {/* TEAM */}
              <Link
                to="/careers"
                onClick={() => setIsMenuOpen(false)}
                className="text-5xl font-bold text-black hover:text-[#4ECDC4] transition duration-300"
              >
                TEAM
              </Link>

              {/* PUBLIC RELATIONS */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setMobilePublicRelationsOpen(!mobilePublicRelationsOpen)}
                  className="text-5xl font-bold text-black hover:text-[#4ECDC4] transition duration-300 flex items-center gap-2"
                >
                  PR
                  <ChevronDown
                    size={24}
                    className={`transition-transform ${mobilePublicRelationsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobilePublicRelationsOpen && (
                  <div className="mt-4 space-y-3">
                    <Link
                      to="/services/marketing-pr"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg font-semibold text-gray-700 hover:text-[#4ECDC4] transition"
                    >
                      Marketing PR
                    </Link>
                    <Link
                      to="/services/political-pr"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg font-semibold text-gray-700 hover:text-[#4ECDC4] transition"
                    >
                      Political PR
                    </Link>
                  </div>
                )}
              </div>

              {/* CONTACT */}
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-5xl font-bold text-black hover:text-[#4ECDC4] transition duration-300"
              >
                CONTACT
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}