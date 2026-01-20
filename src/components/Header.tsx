import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Circle } from 'lucide-react';
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
          : 'bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold text-white tracking-wide">
            Smart Crafts Circle
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

                  {/* SEO */}
                  <Link
                    to="/services/seo"
                    className="block font-semibold text-white hover:text-[#4ECDC4] hover:underline transition-colors"
                  >
                    SEO Services
                  </Link>

                  {/* DIGITAL MARKETING */}
                  <Link
                    to="/services/digital-marketing"
                    className="block font-semibold text-white hover:text-[#4ECDC4] hover:underline transition-colors"
                  >
                    Digital Marketing Services
                  </Link>
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
      to="/services/marketing-pr"
      className="block font-semibold text-white hover:text-[#4ECDC4] hover:underline transition-colors"
    >
      Marketing PR
    </Link>

    <Link
      to="/services/political-pr"
      className="block font-semibold text-white hover:text-[#4ECDC4] hover:underline transition-colors"
    >
      Political PR
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
          <div className="lg:hidden bg-[#0a0e27]/95 backdrop-blur-md rounded-xl p-6 mt-2 space-y-4">
            {/* Services in mobile */}
            <div>
              <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="w-full flex justify-between items-center text-white/80">
                Services <ChevronDown size={16} />
              </button>
              {mobileServicesOpen && (
                <div className="mt-2 ml-4 space-y-2">
                  <div>
                    <button onClick={() => setMobileWebOpen(!mobileWebOpen)} className="w-full flex justify-between items-center text-white/80">
                      Website Development <ChevronDown size={14} />
                    </button>
                    {mobileWebOpen && (
                      <div className="mt-2 ml-4 space-y-2">
                        <Link to="/wordpress" className="block text-white/80">WordPress</Link>
                        <Link to="/EcommerceDevelopmentPage" className="block text-white/80">Ecommerce</Link>
                        <Link to="/services/shopify" className="block text-white/80">Shopify</Link>
                      </div>
                    )}
                  </div>
                  <Link to="/services/seo" className="block text-white/80">SEO Services</Link>
                  <Link to="/services/digital-marketing" className="block text-white/80">Digital Marketing</Link>
                </div>
              )}
            </div>

            {/* Public Relations in mobile */}
            <div>
              <button onClick={() => setMobilePublicRelationsOpen(!mobilePublicRelationsOpen)} className="w-full flex justify-between items-center text-white/80">
                Public Relations <ChevronDown size={16} />
              </button>
              {mobilePublicRelationsOpen && (
                <div className="mt-2 ml-4 space-y-2">
                  <Link to="/services/marketing-pr" className="block text-white/80">Marketing PR</Link>
                  <Link to="/services/political-pr" className="block text-white/80">Political PR</Link>
                </div>
              )}
            </div>
            
            <Link to="/productions" className="block text-white/80">
              Productions
            </Link>
            <Link to="/careers" className="block text-white/80">
              Careers
            </Link>
            <Link to="/about" className="block text-white/80">
              About Us
            </Link>
            <Link to="/contact" className="block text-white/80">
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
