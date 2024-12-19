import React, { useState, useEffect } from "react";

const PageHero = () => {
  const [bannerHeight, setBannerHeight] = useState("7rem");

  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setBannerHeight("0rem"); // Small devices
      } else if (width <= 1023) {
        setBannerHeight("0rem"); // Medium devices
      } else {
        setBannerHeight("7rem"); // Large devices
      }
    };

    // Initial height calculation
    updateHeight();

    // Add resize event listener
    window.addEventListener("resize", updateHeight);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <>
      <header id="top" className="d-flex flex-column">
        {/* Desktop Menu */}
        <nav className="starta-nav">
        
        </nav>
      </header>
    </>
  );
};

export default PageHero;
