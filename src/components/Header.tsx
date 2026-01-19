import { useState } from 'react';
import { Menu, X, ChevronDown, Phone, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-800">thrive</div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center text-gray-700 hover:text-[#6B7C3E] font-medium">
                SERVICES <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>

            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-[#6B7C3E] font-medium">
                LOCAL <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>

            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-[#6B7C3E] font-medium">
                RESULTS <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>

            <Link to="/about" className="text-gray-700 hover:text-[#6B7C3E] font-medium">
              ABOUT
            </Link>

            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-[#6B7C3E] font-medium">
                LEARN <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>

            <Link to="/contact" className="text-gray-700 hover:text-[#6B7C3E] font-medium">
              CONTACT
            </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:866-908-4748" className="flex items-center text-[#6B7C3E] font-semibold">
              <Phone className="h-4 w-4 mr-2" />
              866-908-4748
            </a>
            <button className="bg-[#6B7C3E] text-white p-2 rounded-full hover:bg-[#5a6733] transition">
              <Search className="h-5 w-5" />
            </button>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="space-y-4">
              <a href="#services" className="block text-gray-700 font-medium">SERVICES</a>
              <a href="#local" className="block text-gray-700 font-medium">LOCAL</a>
              <a href="#results" className="block text-gray-700 font-medium">RESULTS</a>
              <Link to="/about" className="block text-gray-700 font-medium">ABOUT</Link>
              <a href="#learn" className="block text-gray-700 font-medium">LEARN</a>
              <Link to="/contact" className="block text-gray-700 font-medium">CONTACT</Link>
              <a href="tel:866-908-4748" className="flex items-center text-[#6B7C3E] font-semibold">
                <Phone className="h-4 w-4 mr-2" />
                866-908-4748
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
