import React from "react";
import { TypeAnimation } from "react-type-animation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './VideoSection.css';

const VideoSection = () => {
  return (
    <>
      <div className="home-1_hero-section d-flex justify-content-center container" id="hero">
        <div className="video-wrapper">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/iazaDOuHO7w?si=UFMKDTafmxc8Sx5a" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
    </>
  );
};

export default VideoSection;
