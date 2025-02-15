import { useState, useEffect } from "react";
import axios from "axios";

const useCountries = (selectedCountries) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, [selectedCountries]); // Run effect only when the selectedCountries array changes

  return { countries, loading, error };
};

export default useCountries;
