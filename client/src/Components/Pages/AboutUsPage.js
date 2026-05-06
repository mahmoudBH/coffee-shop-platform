import React from "react";
import PagesBanner from "./PagesBanner";
import About from "../About Us/About";
import Chefs from "../Our Chefs/Chefs";
import MapPage from "../About Us/MapPage";  // Assurez-vous d'avoir le composant MapPage

const AboutUsPage = () => {
  return (
    <>
      {/* Banner de la page */}
      <PagesBanner title={"About Us"} />

      {/* Section À propos */}
      <About />

      {/* Section Carte géographique du restaurant */}
      <MapPage />

      {/* Section Chefs */}
      <Chefs />
    </>
  );
};

export default AboutUsPage;
