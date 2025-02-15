import React, { useState, useEffect } from "react";
import { FaChevronCircleUp } from "react-icons/fa";
import "./BackToTop.css";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`back-to-top ${visible ? "show" : ""}`} onClick={scrollToTop}>
      <FaChevronCircleUp className="icon" />
    </div>
  );
};

export default BackToTop;
