import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./OurAgents.css";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import Button from "../button/Button"; // Import the reusable button

const OurAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search input

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

  // Filter Agents by Search Query
  const filteredAgents = sortedAgents.filter((agent) =>
    agent.imePrezime.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredAgents.length / agentsPerPage);
  const paginatedAgents = filteredAgents.slice(
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
    const usedImages = gender === "male" ? usedMenImages : usedWomenImages;

    do {
      randomNum = Math.floor(Math.random() * 100);
    } while (usedImages.has(randomNum));

    usedImages.add(randomNum);
    return randomNum;
  };

  const getGenderBasedAvatar = (name) => {
    if (!name) return "https://randomuser.me/api/portraits/men/1.jpg";

    const firstName = name.split(" ")[0].toLowerCase();
    const femaleNames = [
      "ana", "sofia", "maria", "elena", "julia", "laura", "nina", "olga", "iva", "eva",
      "katarina", "milica", "jelena", "sandra", "daniela", "tamara", "bojana", "destiny",
      "miss", "mrs.", "ms."
    ];

    if (femaleNames.includes(firstName) || /^[aei]$/i.test(firstName.slice(-1))) {
      return `https://randomuser.me/api/portraits/women/${getUniqueImageNumber("female")}.jpg`;
    }

    return `https://randomuser.me/api/portraits/men/${getUniqueImageNumber("male")}.jpg`;
  };

  return (
    <div className="agents-container">
      <h1 className="agents-title">Meet Our Expert Agents</h1>

      {loading && <p className="loading">Loading agents...</p>}
      {error && <p className="error">{error}</p>}

      {/* Search Bar */}
      <div className="search-bar" style={{width:"500px", fontSize:"30px"}}>
        <input
          className="btn-9 search-input"
          style={{ fontSize:"25px"}}
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Sort Dropdown */}
      <div className="sorting-controls">
        <label htmlFor="sort">Sort by Name:</label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{width:"100px", justifyContent:"center"}}
        >
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
      </div>

      {/* Agent List */}
      <div className="agents-list">
        {paginatedAgents.map((agent) => (
          <div key={agent.id} className="agent-card">
            <div className="agent-image" style={{ marginLeft: "70px" }}>
              <img
                src={getGenderBasedAvatar(agent.imePrezime)}
                alt={agent.imePrezime}
                onError={(e) => {
                  e.target.src = "/default-agent.jpg";
                }}
              />
            </div>
            <div className="agent-info">
              <h2 className="agent-name" style={{ color: "white" }}>{agent.imePrezime}</h2>
              <p className="agent-city" style={{ color: "white" }}><FaLocationDot /> {agent.grad}</p>
              <p className="agent-email" style={{ color: "white" }}><MdEmail /> {agent.email}</p>
              <p className="agent-phone" style={{ color: "white" }}><FaPhone /> {agent.telefon}</p>

              {/* View More Button */}
              <Link to={`/agents/${agent.id}`}>
                <Button className="btn-45">View More</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <Button
          className="btn-45"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <span style={{ marginTop:"15px", color:"white", fontSize: "35px", textShadow: "3px 3px 10px rgba(0, 0, 0, 0.7)" }}>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          className="btn-45"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default OurAgents;
