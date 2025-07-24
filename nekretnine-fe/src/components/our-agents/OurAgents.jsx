import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import Button from "../button/Button";
import useAgents from "../../hooks/useAgents"; 
import "./OurAgents.css";

const OurAgents = () => {
  const { agents, loading, error } = useAgents(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const agentsPerPage = 6; 


  const sortedAgents = [...agents].sort((a, b) => {
    return sortOrder === "asc"
      ? a.imePrezime.localeCompare(b.imePrezime)
      : b.imePrezime.localeCompare(a.imePrezime);
  });


  const filteredAgents = sortedAgents.filter((agent) =>
    agent.imePrezime.toLowerCase().includes(searchQuery.toLowerCase())
  );


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

  if (loading) return <div className="loading">Loading agents...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="agents-container">
      <nav className="breadcrumbs">
        <Link to="/home">Home</Link> / <span>Our Agents</span>
      </nav>

      <h1 className="agents-title">Meet Our Expert Agents</h1>

      <div className="search-bar" style={{ width: "500px", fontSize: "30px" }}>
        <input
          className="btn-9 search-input"
          style={{ fontSize: "25px" }}
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="sorting-controls">
        <label
          htmlFor="sort"
          style={{
            fontFamily: "'Space Grotesk'",
            fontSize: "25px",
            fontWeight: "bold",
            textShadow: "3px 3px 10px rgba(0, 0, 0, 0.7)",
            marginRight: "10px",
            color: "white",
          }}
        >
          Sort by Name:
        </label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            fontSize: "25px",
            padding: "5px",
            background: "#ffffff",
            color: "black",
            border: "none",
            fontFamily: "'Space Grotesk'",
            boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.7)",
            fontWeight: "bold",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100px",
            justifyContent: "center",
          }}
        >
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
      </div>

      <div className="agents-list">
        {paginatedAgents.map((agent) => (
          <div key={agent.id} className="agent-card">
            <div className="agent-image" style={{ marginLeft: "70px", border:"none" }}>
              <img
                src={`https://randomuser.me/api/portraits/${
                  agent.gender === "female" ? "women" : "men"
                }/${agent.id % 100}.jpg`}
                alt={agent.imePrezime}
                onError={(e) => {
                  e.target.src = "/default-agent.jpg";
                }}
              />
            </div>
            <div className="agent-info">
              <h2
                className="agent-name"
                style={{
                  color: "white",
                  textShadow: "3px 3px 10px rgba(0, 0, 0, 0.7)",
                }}
              >
                {agent.imePrezime}
              </h2>
              <p
                className="agent-city"
                style={{
                  color: "white",
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <FaLocationDot /> {agent.grad}
              </p>
              <p
                className="agent-email"
                style={{
                  color: "white",
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <MdEmail /> {agent.email}
              </p>
              <p
                className="agent-phone"
                style={{
                  color: "white",
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <FaPhone /> {agent.telefon}
              </p>

              <Link to={`/agents/${agent.id}`}>
                <Button className="btn-45">View More</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div
        className="pagination"
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <Button
          className="btn-45"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <span
          style={{
            marginTop: "15px",
            color: "white",
            fontSize: "35px",
            textShadow: "3px 3px 10px rgba(0, 0, 0, 0.7)",
          }}
        >
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
