import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./OurAgents.css";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

const OurAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  
  const agentsPerPage = 6; // Number of agents per page

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/agents")
      .then((response) => {
        setAgents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching agents:", error);
        setError("Failed to load agents.");
        setLoading(false);
      });
  }, []);

  // Sort Agents Alphabetically
  const sortedAgents = [...agents].sort((a, b) => {
    return sortOrder === "asc"
      ? a.imePrezime.localeCompare(b.imePrezime)
      : b.imePrezime.localeCompare(a.imePrezime);
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedAgents.length / agentsPerPage);
  const paginatedAgents = sortedAgents.slice(
    (currentPage - 1) * agentsPerPage,
    currentPage * agentsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Track used image numbers for men and women to avoid repetition
const usedMenImages = new Set();
const usedWomenImages = new Set();

const getUniqueImageNumber = (gender) => {
  let randomNum;

  // Select appropriate set based on gender
  const usedImages = gender === "male" ? usedMenImages : usedWomenImages;

  do {
    randomNum = Math.floor(Math.random() * 100); // Generates 0-99
  } while (usedImages.has(randomNum)); // Ensure it's not already used

  usedImages.add(randomNum); // Store used number
  return randomNum;
};

  const getGenderBasedAvatar = (name) => {
    if (!name) return "https://randomuser.me/api/portraits/men/1.jpg"; // Default
  
    const firstName = name.split(" ")[0].toLowerCase(); // Extract first name
  
    // List of common female first names (expandable)
    const femaleNames = [
      "ana", "sofia", "maria", "elena", "julia", "laura", "nina", "olga", "iva", "eva", "katarina",
      "milica", "jelena", "sandra", "daniela", "tamara", "bojana", "destiny", "miss", "mrs.", "ms."
    ];
  
     // If name is in the female list OR ends with vowels commonly found in female names
    if (femaleNames.includes(firstName) || /^[aei]$/i.test(firstName.slice(-1))) {
      return `https://randomuser.me/api/portraits/women/${getUniqueImageNumber("female")}.jpg`;
    }

    // Otherwise, assume male
    return `https://randomuser.me/api/portraits/men/${getUniqueImageNumber("male")}.jpg`;
  };

  return (
    <div className="agents-container">
      <h1 className="agents-title">Meet Our Expert Agents</h1>

      {loading && <p className="loading">Loading agents...</p>}
      {error && <p className="error">{error}</p>}

      {/* Sort Dropdown */}
      <div className="sorting-controls">
        <label htmlFor="sort">Sort by Name:</label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
      </div>

      {/* Agent List */}
      <div className="agents-list">
        {paginatedAgents.map((agent) => (
          <div key={agent.id} className="agent-card">
            <div className="agent-image" style={{ marginLeft: '70px'}}>
              <img
                src={getGenderBasedAvatar(agent.imePrezime)}
                alt={agent.imePrezime}
                onError={(e) => { e.target.src = "/default-agent.jpg"; }}
              />
            </div>
            <div className="agent-info">
              <h2 className="agent-name" style={{color:'white'}}>{agent.imePrezime}</h2>
              <p className="agent-city"> <FaLocationDot style={{color:'white'}}/> {agent.grad}</p>
              <p className="agent-email"><MdEmail style={{color:'white'}}/> {agent.email}</p>
              <p className="agent-phone"><FaPhone style={{color:'white'}}/> {agent.telefon}</p>
              <Link to={`/agents/${agent.id}`} className="view-more">
                View More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{fontSize:"25px", textShadow: "3px 3px 10px rgba(0, 0, 0, 0.7)"}}
        >
          Prev
        </button>
        <span  style={{fontSize:"35px", textShadow: "3px 3px 10px rgba(0, 0, 0, 0.7)"}}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{fontSize:"25px", textShadow: "3px 3px 10px rgba(0, 0, 0, 0.7)"}}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OurAgents;
