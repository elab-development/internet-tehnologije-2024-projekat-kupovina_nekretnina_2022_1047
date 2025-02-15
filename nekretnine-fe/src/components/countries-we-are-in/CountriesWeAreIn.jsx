import React from "react";
import WorldMap from "../world-map/WorldMap";
import useCountries from "../../hooks/useCountries"; // Import the custom hook
import "./CountriesWeAreIn.css";

const CountriesWeAreIn = () => {
  // Define selected countries (from Europe, America, and Asia)
  const selectedCountries = [
    "Germany", "France", "Italy", // Europe
    "USA", "Canada", "Brazil", // America
    "Japan", "South Korea", "India", "China" // Asia
  ];

  // Use custom hook
  const { countries, loading, error } = useCountries(selectedCountries);

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
