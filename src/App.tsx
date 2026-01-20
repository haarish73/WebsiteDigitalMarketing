import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import Contact from './contact/contact';
import AboutPage from './About/about';
import Home from './Home/home';
import WordPressDevelopmentPage from './components/WordPress';
import EcommerceDevelopmentPage from './components/EcommerceDevelopmentPage';
import Shopify from './components/Shopify';
import Seo from './components/Seo';
import DigitalMarketing from './components/DigitalMarketing';
import Career from './components/Career';
import MarketingPr from './PublicRelations/MarketingPr';
// import PoliticalPr from './PublicRelations/PolitcalPr'; // This file is empty and causes the app to crash.

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0e27]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/wordpress" element={<WordPressDevelopmentPage />} />
          <Route path="/EcommerceDevelopmentPage" element={<EcommerceDevelopmentPage />} />
          <Route path="/services/shopify" element={<Shopify />} />
          <Route path="/services/seo" element={<Seo />} />
          <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/careers" element={<Career />} />
          <Route path="/services/marketing-pr" element={<MarketingPr />} />
          {/* <Route path="/services/political-pr" element={<PoliticalPr />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
