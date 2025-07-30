import React from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import StatsSection from "./StatsSection";
import { homeFeatures, homeStats } from "../data/products";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection onNavigate={handleNavigation} />
      <FeaturesSection features={homeFeatures} />
      <StatsSection stats={homeStats} />
    </div>
  );
};

export default Home;
