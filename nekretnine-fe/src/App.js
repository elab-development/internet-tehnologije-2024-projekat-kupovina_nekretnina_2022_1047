import './App.css';
import Footer from './components/footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import AboutUs from './components/about/About';
import OurAgents from './components/our-agents/OurAgents';
import AgentDetail from './components/our-agents/AgentDetail';
import CountriesWeAreIn from './components/countries-we-are-in/CountriesWeAreIn';
import BackToTop from './components/back-to-top/BackToTop';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/our-agents" element={<OurAgents />} />
          <Route path="/agents/:id" element={<AgentDetail />} />
          <Route path="/countries-we-are-in" element={<CountriesWeAreIn />} />
        </Routes>
        <BackToTop />
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
