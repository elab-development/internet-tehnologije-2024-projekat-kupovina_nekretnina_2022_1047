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

// Glavna komponenta aplikacije koja upravlja navigacijom i prikazom stranica
const AppContent = () => {
  // Stanje za praćenje učitavanja (loading)
  const [loading, setLoading] = useState(false);
  
  // useLocation prati promene rute kako bi se aktivirao loading efekat pri navigaciji
  const location = useLocation(); 

  // Efekat koji se pokreće pri promeni rute, simulirajući učitavanje
  useEffect(() => {
    setLoading(true); // Aktivira loading stanje
    const timer = setTimeout(() => {
      setLoading(false); // Isključuje loading nakon 3 sekunde
    }, 3000); 

    return () => clearTimeout(timer); // Čisti tajmer pri promeni rute kako bi se sprečili nepotrebni pozivi
  }, [location]);

  return (
    <div className="App">
      {/* Prikazuje ekran za učitavanje dok traje loading stanje */}
      {loading && <LoadingScreen />} 

      {/* Navigacioni meni */}
      <Navbar />

      {/* Konfiguracija ruta za navigaciju kroz aplikaciju */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/our-agents" element={<OurAgents />} />
        <Route path="/agents/:id" element={<AgentDetail />} />
        <Route path="/countries-we-are-in" element={<CountriesWeAreIn />} />
      </Routes>

      {/* Dugme za povratak na vrh stranice */}
      <BackToTop />

      {/* Footer sekcija */}
      <Footer />
    </div>
  );
};

// Glavna funkcija koja koristi BrowserRouter za omogućavanje navigacije kroz aplikaciju
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
