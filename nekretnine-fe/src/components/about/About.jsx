import React from "react";
import "./About.css";
import ceoImage from "../../assets/ceo.jpg"; 
import ctoImage from "../../assets/cto.jpg";
import cfoImage from "../../assets/cfo.jpg";
import cmoImage from "../../assets/cmo.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-container">
      {/* Section 1: Who Are We? */}
      <section className="about-section who-we-are">
            <nav className="breadcrumbs">
              <Link to="/">Home</Link> / <span>About Us</span>
            </nav>
        <div className="about-content">
          <h1>Who Are We?</h1>
          <p>
            Propertia was founded with a vision to redefine luxury real estate.
            With cutting-edge technology and a passion for modern architecture,
            we have connected thousands of investors to futuristic properties
            that elevate their lifestyle.
          </p>
        </div>
      </section>

      {/* Section 2: Our Goal */}
      <section className="about-section our-goal">
        <div className="about-content">
          <h1>Our Goal</h1>
          <p>
            Our mission is to bring the most exclusive, high-tech, and modern
            real estate options to our clients. We focus on sustainability,
            architectural brilliance, and seamless transactions to make property
            ownership effortless and rewarding.
          </p>
        </div>
      </section>

      {/* Section 3: Our Team with Circular Images */}
      <section className="about-section our-team">
        <div className="about-content">
          <h1>Meet Our Leadership Team</h1>
          <p>
            Behind Propertia’s success is a team of industry-leading experts in
            luxury real estate and technology-driven solutions.
          </p>
          <div className="team-grid">
          <div className="team-member">
            <div className="team-image">
              <img src={ceoImage} alt="CEO" />
            </div>
            <p className="team-name" style={{fontSize:'19px'}}>James Anderson</p>
            <p className="team-role" style={{fontSize:'15px'}}>Chief Executive Officer</p>
          </div>
          <div className="team-member">
            <div className="team-image">
              <img src={ctoImage} alt="CTO" />
            </div>
            <p className="team-name" style={{fontSize:'19px'}}>Sophia Martinez</p>
            <p className="team-role" style={{fontSize:'15px'}}>Chief Technology Officer</p>
          </div>
          <div className="team-member">
            <div className="team-image">
              <img src={cfoImage} alt="CFO"/>
            </div>
            <p className="team-name" style={{fontSize:'19px'}}>Michael Thompson</p>
            <p className="team-role" style={{fontSize:'15px'}}>Chief Financial Officer</p>
          </div>
          <div className="team-member">
            <div className="team-image">
             <img src={cmoImage} alt="CMO"/>
            </div>
            <p className="team-name" style={{fontSize:'19px'}}>Emily Carter</p>
            <p className="team-role" style={{fontSize:'15px'}}>Chief Marketing Officer</p>
          </div>
        </div>
        </div>
      </section>

      {/* Section 4: Our Achievements */}
      <section className="about-section our-results">
        <div className="about-content">
          <h1>Our Achievements</h1>
          <p>
            With over 10,000 luxury properties sold and a growing global
            network, Propertia has made its mark as the leading real estate
            platform for premium properties. We continue to innovate and bring
            the future of living to our clients.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
