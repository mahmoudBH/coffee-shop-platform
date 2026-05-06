import React from "react";
import OurChefs from "./OurChefs"; // Importation du composant

const ChefsList = () => {
  const chefs = [
    {
      name: "Ahmed Nasri",
      role: "UI Developer",
      img: "chef1.jpg", // Remplacez par l'URL de l'image
    },
    {
      name: "Syrine Guettat",
      role: "Backend Developer",
      img: "chef2.jpg", // Remplacez par l'URL de l'image
    },
    {
      name: "Slim Douiri",
      role: "Fullstack Developer",
      img: "chef3.jpg", // Remplacez par l'URL de l'image
    },
    {
      name: "Chamesseddine Ben Nasr",
      role: "Designer",
      img: "chef4.jpg", // Remplacez par l'URL de l'image
    },
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {chefs.map((chef, index) => (
        <OurChefs key={index} img={chef.img} name={chef.name} role={chef.role} />
      ))}
    </div>
  );
};

export default ChefsList;
