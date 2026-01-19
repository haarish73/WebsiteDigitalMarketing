import Header from './components/Header';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import SocialProof from './components/SocialProof';
import About from './components/About';
import Services from './components/Services';
import Experts from './components/Experts';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ValueProposition />
      <SocialProof />
      <About />
      <Services />
      <Experts />
      <Footer />
    </div>
  );
}

export default App;
