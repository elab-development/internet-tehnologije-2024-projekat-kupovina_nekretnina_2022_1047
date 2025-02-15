import React from "react";
import WorldMap from "../world-map/WorldMap";
import useCountries from "../../hooks/useCountries"; 
import "./CountriesWeAreIn.css";
import { Link } from "react-router-dom";

const CountriesWeAreIn = () => {

  const selectedCountries = [
    "Germany", "France", "Italy", 
    "USA", "Canada", "Brazil", 
    "Japan", "South Korea", "India", "China" 
  ];

  const { countries, loading, error } = useCountries(selectedCountries);

  if (loading) return <div className="loading">Loading countries...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="countries-container">
        <nav className="breadcrumbs">
              <Link to="/">Home</Link> / <span>Our Locations</span>
        </nav>
      <h1 className="countries-title">Countries We Operate In</h1>
      <div className="countries-list">
        {countries.map((country, index) => (
          <div key={index} className="country-card">
            <img src={country.flag} alt={`${country.name} Flag`} className="country-flag" />
            <h2 className="country-name">{country.name}</h2>
            <p className="country-region">{country.region}</p>
          </div>
        ))}
      </div>
      <h1 className="countries-title">Map Overview</h1>
      <WorldMap />
    </div>
  );
};

export default CountriesWeAreIn;
