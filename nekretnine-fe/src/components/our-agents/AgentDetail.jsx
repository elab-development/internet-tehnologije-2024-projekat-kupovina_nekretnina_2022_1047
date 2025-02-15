import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail, MdMapsHomeWork } from "react-icons/md";
import { BsFillInfoSquareFill } from "react-icons/bs";
import Button from "../button/Button"; // Import Button component
import useAgentDetails from "../../hooks/useAgentDetails"; // Import custom hook
import "./AgentDetail.css";

const AgentDetail = () => {
  const { id } = useParams();
  const { agent, loading, error } = useAgentDetails(id);

  if (loading) return <div className="loading">Loading agent details...</div>;
  if (error) return <div className="error">{error}</div>;

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

  const getAgentDescription = (name) => {
    const randomPropertiesManaged = Math.floor(Math.random() * 30) + 30;
    return `${name} is one of our top agents, managing ${randomPropertiesManaged} properties and delivering exceptional service to clients.`;
  };

  return (
    <div className="agent-detail-container">
      <div className="agent-profile">
        <img
          src={getGenderBasedAvatar(agent.imePrezime)}
          alt={agent.imePrezime}
          className="agent-image"
          onError={(e) => { e.target.src = "/default-agent.jpg"; }}
        />
        <div className="agent-info">
          <h1 className="agent-name1" style={{ color: "white" }}>{agent.imePrezime}</h1>
          <p className="agent-city1" style={{ color: "white" }}> <FaLocationDot /> {agent.grad}</p>
          <p className="agent-address1" style={{ color: "white" }}> <MdMapsHomeWork /> {agent.adresa}</p>
          <p className="agent-email1" style={{ color: "white" }}> <MdEmail /> {agent.email}</p>
          <p className="agent-phone1" style={{ color: "white" }}> <FaPhone /> {agent.telefon}</p>

          <p className="agent-description" 
             style={{ color: "white", fontFamily: 'Space Grotesk', textShadow: '3px 3px 10px rgba(0, 0, 0, 0.7)' }}> 
            <BsFillInfoSquareFill /> {getAgentDescription(agent.imePrezime)}
          </p>
        </div>
      </div>

      {/* Back Button using reusable Button component */}
      <div className="back-to-list">
        <Link to="/our-agents" style={{fontSize:"20px"}}>
          <Button>Back to Agents</Button>
        </Link>
      </div>
    </div>
  );
};

export default AgentDetail;
