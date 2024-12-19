import React from "react";
import { TypeAnimation } from "react-type-animation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './VideoSection.css';

const GifAnimation = () => {
  return (
    <>
      <div className="home-1_hero-section d-flex justify-content-center gif container" id="hero">
        <div className="gif-animation container">
        <img src="https://i.postimg.cc/Vk6cKvHB/HuntCrow.gif" alt="Animation"></img>
        </div>
      </div>
    </>
  );
};

export default GifAnimation;
