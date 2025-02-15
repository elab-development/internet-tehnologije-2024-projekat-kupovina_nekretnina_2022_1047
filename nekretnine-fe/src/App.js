import "./App.css";
import Footer from "./components/footer/Footer";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import AboutUs from "./components/about/About";
import OurAgents from "./components/our-agents/OurAgents";
import AgentDetail from "./components/our-agents/AgentDetail";
import CountriesWeAreIn from "./components/countries-we-are-in/CountriesWeAreIn";
import BackToTop from "./components/back-to-top/BackToTop";
import LoadingScreen from "./components/loading-screen/LoadingScreen";
import React, { useState, useEffect } from "react";

const AppContent = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Track Route Changes

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Loading animation time

    return () => clearTimeout(timer); // Cleanup timer
  }, [location]);

  return (
    <div className="App">
      {loading && <LoadingScreen />} {/* Show Loading on Route Change */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/our-agents" element={<OurAgents />} />
        <Route path="/agents/:id" element={<AgentDetail />} />
        <Route path="/countries-we-are-in" element={<CountriesWeAreIn />} />
      </Routes>
      <BackToTop />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
