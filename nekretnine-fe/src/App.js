// src/App.js
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
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Properties from "./components/properties/Properties";
import MyPurchases from "./components/my-bookings/MyPurchases";
import AdminDashboard from './components/admin-dashboard/AdminDashboard';
import AdminProperties from './components/admin-properties/AdminProperties';
import React, { useState, useEffect } from "react";

// Glavna komponenta aplikacije koja upravlja navigacijom i prikazom stranica
const AppContent = () => {
  // Stanje za praćenje učitavanja (loading)
  const [loading, setLoading] = useState(false);
  // Stanje za proveru da li je korisnik autentifikovan
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("auth_token"));

  const location = useLocation();

  // Loading efekat pri promeni rute
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [location]);

  // Svake sekunde proveravamo auth_token u sessionStorage
  useEffect(() => {
    const interval = setInterval(() => {
      const tokenExists = !!sessionStorage.getItem("auth_token");
      setIsAuthenticated(tokenExists);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      {/* Loading ekran */}
      {loading && <LoadingScreen />}

      {/* Navbar se prikazuje samo ako je autentifikovan */}
      {isAuthenticated && <Navbar />}

      {/* Rute */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/our-agents" element={<OurAgents />} />
        <Route path="/agents/:id" element={<AgentDetail />} />
        <Route path="/countries-we-are-in" element={<CountriesWeAreIn />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/my-purchases" element={<MyPurchases />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-properties" element={<AdminProperties />} />
      </Routes>

      {/* Dugme za skrolovanje na vrh */}
      <BackToTop />

      {/* Footer se prikazuje samo ako je autentifikovan */}
      {isAuthenticated && <Footer />}
    </div>
  );
};

// Glavna funkcija koja koristi BrowserRouter za navigaciju
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
