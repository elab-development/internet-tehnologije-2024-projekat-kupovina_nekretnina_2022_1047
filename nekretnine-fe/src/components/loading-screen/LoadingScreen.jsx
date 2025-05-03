import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/loading-animation.json"; 
import logo from "../../assets/logo.png";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="loading-logo" />
          <h1 className="loading-text">PROPERTIA</h1>
        </div>

        <div className="loading-animation">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
