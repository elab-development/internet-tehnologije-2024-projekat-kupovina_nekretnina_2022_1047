import React, { useState, useEffect } from "react";
import axios from "axios";
import WorldMap from "../world-map/WorldMap"
import "./CountriesWeAreIn.css";

const CountriesWeAreIn = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selected countries (from Europe, America, and Asia)
  const selectedCountries = [
    "Germany", "France", "Italy", // Europe
    "USA", "Canada", "Brazil", // America
    "Japan", "South Korea", "India", "China" // Asia
  ];

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all") // Public API
      .then((response) => {
        // Filter the selected countries
        const filteredCountries = response.data
          .filter((country) => selectedCountries.includes(country.name.common))
          .map((country) => ({
            name: country.name.common,
            flag: country.flags.png,
            region: country.region
          }));

        setCountries(filteredCountries);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
        setError("Failed to load country data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading countries...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="countries-container">
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
