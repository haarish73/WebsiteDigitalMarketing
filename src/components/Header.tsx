import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Search, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [webOpen, setWebOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

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
            thrive
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
                          to="/services/wordpress"
                          className="block font-medium text-white/80 hover:text-[#4ECDC4] hover:underline transition-colors"
                        >
                          WordPress Website Development
                        </Link>
                        <Link
                          to="/services/ecommerce"
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

            {/* OTHER LINKS */}
            <a
              href="/#work"
              className="text-white/80 hover:text-[#4ECDC4] font-medium"
            >
              Work
            </a>

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

          {/* RIGHT ACTIONS */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href="tel:866-908-4748"
              className="flex items-center text-[#A8E6CF] font-semibold"
            >
              <Phone className="h-4 w-4 mr-2" />
              866-908-4748
            </a>

            <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition">
              <Search className="h-5 w-5" />
            </button>
          </div>

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
            <Link to="/services" className="block text-white/80">
              Services
            </Link>
            <a href="/#work" className="block text-white/80">
              Work
            </a>
            <Link to="/about" className="block text-white/80">
              About Us
            </Link>
            <Link to="/contact" className="block text-white/80">
              Contact
            </Link>

            <a
              href="tel:866-908-4748"
              className="flex items-center text-[#A8E6CF] font-semibold pt-4"
            >
              <Phone className="h-4 w-4 mr-2" />
              866-908-4748
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
