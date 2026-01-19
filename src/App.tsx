import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import Contact from './contact/contact';
import AboutPage from './About/about';
import Home from './Home/home';

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
