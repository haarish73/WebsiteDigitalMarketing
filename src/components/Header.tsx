import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Circle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [webOpen, setWebOpen] = useState(false);
  const [publicRelationsOpen, setPublicRelationsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileWebOpen, setMobileWebOpen] = useState(false);
  const [mobilePublicRelationsOpen, setMobilePublicRelationsOpen] = useState(false);
  const servicesRef = useRef(null);
  const publicRelationsRef = useRef(null);

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
    <>
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1a1a1a]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Home className="w-6 h-6 text-[#4ECDC4]" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* SERVICES */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1 text-white/80 hover:text-[#4ECDC4] font-medium"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-full mt-2 left-0 bg-[#1a1a1a] rounded-lg shadow-2xl p-4 min-w-[280px] space-y-3"
                >
                  {/* WEBSITE DEVELOPMENT */}
                  <div>
                    <button
                      onClick={() => setWebOpen(!webOpen)}
                      className="w-full flex justify-between items-center font-semibold text-white hover:text-[#4ECDC4] transition-colors"
                    >
                      Website Development Services
                      <ChevronDown className={`w-4 h-4 transition-transform ${webOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {webOpen && (
                      <div className="pl-4 mt-2 space-y-2 border-l-2 border-[#4ECDC4]/30">
                        <Link to="/wordpress" className="flex items-center gap-2 text-sm text-white/70 hover:text-[#4ECDC4] transition">
                          <Circle className="w-2 h-2 fill-current" />
                          WordPress Website Development
                        </Link>
                        <Link to="/EcommerceDevelopmentPage" className="flex items-center gap-2 text-sm text-white/70 hover:text-[#4ECDC4] transition">
                          <Circle className="w-2 h-2 fill-current" />
                          Ecommerce Website Development
                        </Link>
                        <Link to="/services/shopify" className="flex items-center gap-2 text-sm text-white/70 hover:text-[#4ECDC4] transition">
                          <Circle className="w-2 h-2 fill-current" />
                          Shopify Website Development
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* SEO */}
                  <Link to="/services/seo" className="block font-semibold text-white hover:text-[#4ECDC4] transition-colors">
                    SEO Services
                  </Link>

                  {/* DIGITAL MARKETING */}
                  <Link to="/services/digital-marketing" className="block font-semibold text-white hover:text-[#4ECDC4] transition-colors">
                    Digital Marketing Services
                  </Link>
                </div>
              )}
            </div>

            {/* PUBLIC RELATIONS */}
            <div ref={publicRelationsRef} className="relative">
              <button
                onClick={() => setPublicRelationsOpen(!publicRelationsOpen)}
                className="flex items-center gap-1 text-white/80 hover:text-[#4ECDC4] font-medium"
              >
                Public Relations
                <ChevronDown className={`w-4 h-4 transition-transform ${publicRelationsOpen ? 'rotate-180' : ''}`} />
              </button>
              {publicRelationsOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-full mt-2 left-0 bg-[#1a1a1a] rounded-lg shadow-2xl p-4 min-w-[200px] space-y-3"
                >
                  <Link to="/services/marketing-pr" className="block font-semibold text-white hover:text-[#4ECDC4] transition-colors">
                    Business PR
                  </Link>
                  <Link to="/services/political-pr" className="block font-semibold text-white hover:text-[#4ECDC4] transition-colors">
                    Political PR
                  </Link>
                </div>
              )}
            </div>

            {/* PRODUCTIONS */}
            <Link to="/productions" className="text-white/80 hover:text-[#4ECDC4] font-medium">
              Productions
            </Link>

            {/* CAREER */}
            <Link to="/careers" className="text-white/80 hover:text-[#4ECDC4] font-medium">
              Careers
            </Link>

            {/* OTHER LINKS */}
            <Link to="/about" className="text-white/80 hover:text-[#4ECDC4] font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-white/80 hover:text-[#4ECDC4] font-medium">
              Contact
            </Link>
          </nav>

          {/* MOBILE BUTTON */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white hover:text-[#4ECDC4] transition">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* MOBILE MENU */}
      <div className={`fixed top-0 right-0 h-screen w-full bg-white z-50 transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full overflow-y-auto p-8 pt-24 font-sans">
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-black hover:text-[#4ECDC4] transition-colors duration-300"
          >
            <X className="w-10 h-10" />
          </button>

          {/* Menu Items */}
          <div className="flex flex-col space-y-6">
            {/* HOME */}
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-3xl md:text-4xl font-bold text-black hover:text-[#4ECDC4] transition-colors duration-300 tracking-tight"
            >
              HOME
            </Link>

            {/* SERVICES */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="text-3xl md:text-4xl font-bold text-black hover:text-[#4ECDC4] transition-colors duration-300 flex items-center gap-3 tracking-tight"
              >
                SERVICES
                <ChevronDown className={`w-7 h-7 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="ml-6 mt-4 space-y-4">
                  <div>
                    <button
                      onClick={() => setMobileWebOpen(!mobileWebOpen)}
                      className="text-lg font-semibold text-gray-700 hover:text-[#4ECDC4] transition-colors duration-300 flex items-center gap-2"
                    >
                      Website Development
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileWebOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileWebOpen && (
                      <div className="ml-4 mt-3 space-y-2">
                        <Link
                          to="/wordpress"
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-base text-gray-600 hover:text-[#4ECDC4] transition-colors duration-300"
                        >
                          WordPress
                        </Link>
                        <Link
                          to="/EcommerceDevelopmentPage"
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-base text-gray-600 hover:text-[#4ECDC4] transition-colors duration-300"
                        >
                          Ecommerce
                        </Link>
                        <Link
                          to="/services/shopify"
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-base text-gray-600 hover:text-[#4ECDC4] transition-colors duration-300"
                        >
                          Shopify
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    to="/services/seo"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-semibold text-gray-700 hover:text-[#4ECDC4] transition-colors duration-300"
                  >
                    SEO Services
                  </Link>

                  <Link
                    to="/services/digital-marketing"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-semibold text-gray-700 hover:text-[#4ECDC4] transition-colors duration-300"
                  >
                    Digital Marketing
                  </Link>
                </div>
              )}
            </div>

            {/* PRODUCTIONS */}
            <Link
              to="/productions"
              onClick={() => setIsMenuOpen(false)}
              className="block text-3xl md:text-4xl font-bold text-black hover:text-[#4ECDC4] transition-colors duration-300 tracking-tight"
            >
              PRODUCTIONS
            </Link>

            {/* ABOUT */}
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block text-3xl md:text-4xl font-bold text-black hover:text-[#4ECDC4] transition-colors duration-300 tracking-tight"
            >
              ABOUT
            </Link>

            {/* CAREERS */}
            <Link
              to="/careers"
              onClick={() => setIsMenuOpen(false)}
              className="block text-3xl md:text-4xl font-bold text-black hover:text-[#4ECDC4] transition-colors duration-300 tracking-tight"
            >
              CAREERS
            </Link>

            {/* PUBLIC RELATIONS */}
            <div>
              <button
                onClick={() => setMobilePublicRelationsOpen(!mobilePublicRelationsOpen)}
                className="text-3xl md:text-4xl font-bold text-black hover:text-[#4ECDC4] transition-colors duration-300 flex items-center gap-3 tracking-tight"
              >
                PR
                <ChevronDown className={`w-7 h-7 transition-transform duration-300 ${mobilePublicRelationsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobilePublicRelationsOpen && (
                <div className="ml-6 mt-4 space-y-4">
                  <Link
                    to="/services/political-pr"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-semibold text-gray-700 hover:text-[#4ECDC4] transition-colors duration-300"
                  >
                    Political PR
                  </Link>
                  <Link
                    to="/services/marketing-pr"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-semibold text-gray-700 hover:text-[#4ECDC4] transition-colors duration-300"
                  >
                    Business PR
                  </Link>
                </div>
              )}
            </div>

            {/* CONTACT */}
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block text-3xl md:text-4xl font-bold text-black hover:text-[#4ECDC4] transition-colors duration-300 tracking-tight"
            >
              CONTACT
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}