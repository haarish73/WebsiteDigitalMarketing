import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';

import SplashScreen from './components/Loading';
import Contact from './contact/contact';
import AboutPage from './About/about';
import Home from './Home/home';
import WordPressDevelopmentPage from './components/WordPress';
import EcommerceDevelopmentPage from './components/EcommerceDevelopmentPage';
import Shopify from './components/Shopify';
import Seo from './components/Seo';
import DigitalMarketing from './components/DigitalMarketing';
import Career from './components/Career';
import CareerOpening from './components/CareerOpening';
import ApplyJob from './components/ApplyJob';
import StartProject from './productions/components/StartProject';
import MarketingPr from './PublicRelations/MarketingPr';
import PoliticalPr from './PublicRelations/PolitcalPr';
import ProductionsPage from './productions/productions';
import StartCampaign from './components/StartCampaign';

function Layout() {
  const location = useLocation();
  const hideHeader = location.pathname === '/';

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/wordpress" element={<WordPressDevelopmentPage />} />
        <Route path="/EcommerceDevelopmentPage" element={<EcommerceDevelopmentPage />} />
        <Route path="/services/shopify" element={<Shopify />} />
        <Route path="/services/seo" element={<Seo />} />
        <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/productions" element={<ProductionsPage />} />
        <Route path="/start-project" element={<StartProject />} />
        <Route path="/start-campaign" element={<StartCampaign />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/career-openings" element={<CareerOpening />} />
        <Route path="/apply-job" element={<ApplyJob />} />
        <Route path="/services/marketing-pr" element={<MarketingPr />} />
        <Route path="/services/political-pr" element={<PoliticalPr />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0e27]">
        <Layout />
      </div>
    </Router>
  );
}

export default App;
