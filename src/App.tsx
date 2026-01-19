import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import SocialProof from './components/SocialProof';
import About from './components/About';
import Services from './components/Services';
import Experts from './components/Experts';
import Footer from './components/Footer';
import Contact from './contact/contact';
import AboutPage from './About/about';

function Home() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <SocialProof />
      <About />
      <Services />
      <Experts />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
