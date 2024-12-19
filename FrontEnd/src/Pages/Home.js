import React from "react";
import Features from "../components/SeoHomePage/Features";
import About from "../components/SeoHomePage/About";
import Plans from "../components/SeoHomePage/Plans";
import BestOption from "../components/SeoHomePage/BestOption";
import VideoSection from "../components/SeoHomePage/VideoSection";
import Faqs from "../components/SeoHomePage/Faqs";
import Testionials from "../components/SeoHomePage/Testionials";
import HeroSection from "../components/SeoHomePage/HeroSection";
import SubmitForm from "../components/Shared/SubmitForm";

const Home = () => {
  return (
    <>

      <Features />
      <About />
      <BestOption />
      <VideoSection />
      <SubmitForm />
      <Faqs />
      <Testionials />


    </>
  );
};

export default Home;
