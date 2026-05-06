import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import AboutUsPage from "./Components/Pages/AboutUsPage";
import ContactUsPage from "./Components/Pages/ContactUsPage";
import MenuPage from "./Components/Pages/MenuPage";
import ServicesPage from "./Components/Pages/ServicesPage";
import Footer from "./Components/Footer/Footer";
import AuthPage from "./Components/AuthPage/AuthPage";
import Profile from "./Components/Pages/ProfilePage"; // Importer la page Profile
import Orders from "./Components/Pages/Orders"; // Importer la page Orders

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<Profile />} /> {/* Ajouter la route pour la page Profile */}
          <Route path="/orders" element={<Orders />} /> {/* Ajouter la route pour la page Orders */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
