import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook za dobijanje informacija o izabranim zemljama
const useCountries = (selectedCountries) => {
  // Stanja za skladištenje podataka o zemljama, status učitavanja i greške
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect se pokreće svaki put kada se promeni lista izabranih zemalja
  useEffect(() => {
    // HTTP GET zahtev za preuzimanje podataka o svim zemljama
    axios
      .get("https://restcountries.com/v3.1/all") 
      .then((response) => {
        // Filtriranje podataka tako da sadrže samo izabrane zemlje
        const filteredCountries = response.data
          .filter((country) => selectedCountries.includes(country.name.common))
          .map((country) => ({
            name: country.name.common, // Naziv zemlje
            flag: country.flags.png, // URL slike zastave
            region: country.region // Region u kojem se nalazi zemlja
          }));

        // Postavljanje filtriranih podataka u stanje
        setCountries(filteredCountries);
        setLoading(false); // Isključivanje učitavanja nakon uspešnog preuzimanja podataka
      })
      .catch((error) => {
        // Obrada greške u slučaju neuspelog HTTP zahteva
        console.error("Error fetching country data:", error);
        setError("Failed to load country data."); // Postavljanje poruke greške
        setLoading(false); // Isključivanje učitavanja u slučaju greške
      });
  }, [selectedCountries]); // Zavisi od liste izabranih zemalja

  // Vraćanje podataka, statusa učitavanja i greške
  return { countries, loading, error };
};

export default useCountries;
