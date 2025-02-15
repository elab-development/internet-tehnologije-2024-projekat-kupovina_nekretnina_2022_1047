import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/loading-animation.json"; // Correct path
import logo from "../../assets/logo.png"; // Ensure this is the correct logo path
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        {/* Logo and text aligned */}
        <div className="logo-container">
          <img src={logo} alt="Logo" className="loading-logo" />
          <h1 className="loading-text">PROPERTIA</h1>
        </div>

        {/* Animated Dots */}
        <div className="loading-animation">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
