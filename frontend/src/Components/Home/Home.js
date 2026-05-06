import React from "react";
import HeroMain from "./../Hero section main/HeroMain";
import Services from "../Services/services";
import About from "../About Us/About";
import Menu from "../Food Menu/Menu";
import Contact from "../Contact Us/Contact";
import Chefs from "../Our Chefs/Chefs";
import Reviews from "../Clients Feedback/Reviews";

const Home = () => {
  return <>
    <HeroMain />
    <Services />
    <About />
    <Menu />
    <Contact />
    <Chefs />
    <Reviews />
  </>;
};

export default Home;