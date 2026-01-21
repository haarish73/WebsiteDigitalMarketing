import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import companylogo from "../image/CompanyLogo.webp";

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

  /* Scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  
  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  /* Close desktop dropdowns on outside click */
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
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0e27]/90 backdrop-blur-md shadow-lg'
          : 'bg-[#0a0e27]/90 backdrop-blur-md'
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link to="/">
            <img
              src={companylogo}
              alt="Company Logo"
              className="h-12 sm:h-14 lg:h-16 w-auto"
              loading="lazy"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center space-x-10 relative">

            {/* SERVICES */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1 text-white/80 hover:text-[#4ECDC4] font-medium"
              >
                Services <ChevronDown size={16} />
              </button>

              {servicesOpen && (
                <div className="absolute left-0 mt-6 w-80 rounded-3xl bg-[#0a0e27] p-6 shadow-2xl space-y-4 border border-white/10">
                  <button
                    onClick={() => setWebOpen(!webOpen)}
                    className="w-full flex justify-between items-center font-semibold text-white hover:text-[#4ECDC4]"
                  >
                    Website Development
                    <ChevronDown size={14} />
                  </button>

                  {webOpen && (
                    <div className="ml-4 space-y-3">
                      <Link to="/wordpress" className="block text-white/80 hover:text-[#4ECDC4]">
                        WordPress
                      </Link>
                      <Link to="/EcommerceDevelopmentPage" className="block text-white/80 hover:text-[#4ECDC4]">
                        Ecommerce
                      </Link>
                      <Link to="/services/shopify" className="block text-white/80 hover:text-[#4ECDC4]">
                        Shopify
                      </Link>
                    </div>
                  )}

                  <Link to="/services/seo" className="block font-semibold text-white hover:text-[#4ECDC4]">
                    SEO Services
                  </Link>
                  <Link to="/services/digital-marketing" className="block font-semibold text-white hover:text-[#4ECDC4]">
                    Digital Marketing
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
                Public Relations <ChevronDown size={16} />
              </button>

              {publicRelationsOpen && (
                <div className="absolute left-0 mt-6 w-64 rounded-3xl bg-[#0a0e27] p-6 shadow-2xl space-y-4 border border-white/10">
                  <Link to="/services/marketing-pr" className="block text-white hover:text-[#4ECDC4]">
                    Marketing PR
                  </Link>
                  <Link to="/services/political-pr" className="block text-white hover:text-[#4ECDC4]">
                    Political PR
                  </Link>
                </div>
              )}
            </div>

            <Link to="/productions" className="text-white/80 hover:text-[#4ECDC4]">Productions</Link>
            <Link to="/careers" className="text-white/80 hover:text-[#4ECDC4]">Careers</Link>
            <Link to="/about" className="text-white/80 hover:text-[#4ECDC4]">About</Link>
            <Link to="/contact" className="text-white/80 hover:text-[#4ECDC4]">Contact</Link>
          </nav>

          {/* MOBILE BUTTON */}
          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu />
          </button>
        </div>
      </div>

   {/* MOBILE MENU */}
{isMenuOpen && (
  <div className="fixed inset-0 z-[999] bg-[#0a0e27] lg:hidden flex flex-col items-center">

    {/* Close Button */}
    <button
      onClick={() => setIsMenuOpen(false)}
      className="absolute top-8 right-6 text-white hover:text-[#4ECDC4]"
    >
      <X size={32} />
    </button>

    <nav className="mt-28 flex flex-col items-center space-y-8 text-center w-full px-6">

      {/* HOME */}
      <Link
        to="/"
        onClick={() => setIsMenuOpen(false)}
        className="text-3xl font-bold text-white"
      >
        HOME
      </Link>

      {/* SERVICES */}
      <div className="w-full text-center">
        <button
          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
          className="text-3xl font-bold text-white flex items-center justify-center gap-2 w-full"
        >
          SERVICES
          <ChevronDown
            size={24}
            className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {mobileServicesOpen && (
          <div className="mt-6 space-y-5">

            {/* WEBSITE DEVELOPMENT */}
            <div>
              <button
                onClick={() => setMobileWebOpen(!mobileWebOpen)}
                className="text-xl font-semibold text-white/90 flex items-center justify-center gap-2 w-full"
              >
                Website Development
                <ChevronDown
                  size={18}
                  className={`transition-transform ${mobileWebOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {mobileWebOpen && (
                <div className="mt-4 space-y-3">
                  <Link to="/wordpress" onClick={() => setIsMenuOpen(false)} className="block text-white/70">
                    WordPress Website Development
                  </Link>
                  <Link to="/EcommerceDevelopmentPage" onClick={() => setIsMenuOpen(false)} className="block text-white/70">
                    Ecommerce Website Development
                  </Link>
                  <Link to="/services/shopify" onClick={() => setIsMenuOpen(false)} className="block text-white/70">
                    Shopify Website Development
                  </Link>
                </div>
              )}
            </div>

            {/* SEO */}
            <Link
              to="/services/seo"
              onClick={() => setIsMenuOpen(false)}
              className="block text-xl font-semibold text-white/90"
            >
              SEO Services
            </Link>

            {/* DIGITAL MARKETING */}
            <Link
              to="/services/digital-marketing"
              onClick={() => setIsMenuOpen(false)}
              className="block text-xl font-semibold text-white/90"
            >
              Digital Marketing Services
            </Link>
          </div>
        )}
      </div>

      {/* PUBLIC RELATIONS */}
      <div className="w-full text-center">
        <button
          onClick={() => setMobilePublicRelationsOpen(!mobilePublicRelationsOpen)}
          className="text-3xl font-bold text-white flex items-center justify-center gap-2 w-full"
        >
          PUBLIC RELATIONS
          <ChevronDown
            size={24}
            className={`transition-transform ${mobilePublicRelationsOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {mobilePublicRelationsOpen && (
          <div className="mt-5 space-y-3">
            <Link
              to="/services/marketing-pr"
              onClick={() => setIsMenuOpen(false)}
              className="block text-xl font-semibold text-white/80"
            >
              Marketing PR
            </Link>
            <Link
              to="/services/political-pr"
              onClick={() => setIsMenuOpen(false)}
              className="block text-xl font-semibold text-white/80"
            >
              Political PR
            </Link>
          </div>
        )}
      </div>

      {/* PRODUCTIONS */}
      <Link
        to="/productions"
        onClick={() => setIsMenuOpen(false)}
        className="text-3xl font-bold text-white"
      >
        PRODUCTIONS
      </Link>

      {/* CAREERS */}
      <Link
        to="/careers"
        onClick={() => setIsMenuOpen(false)}
        className="text-3xl font-bold text-white"
      >
        CAREERS
      </Link>

      {/* ABOUT */}
      <Link
        to="/about"
        onClick={() => setIsMenuOpen(false)}
        className="text-3xl font-bold text-white"
      >
        ABOUT
      </Link>

      {/* CONTACT */}
      <Link
        to="/contact"
        onClick={() => setIsMenuOpen(false)}
        className="text-3xl font-bold text-white"
      >
        CONTACT
      </Link>
    </nav>
  </div>
)}

    </header>
  );
}
