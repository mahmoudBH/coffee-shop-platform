import React from "react";
import Header from "../Header/Header";

const PagesBanner = ({title}) => {
  return <>
 <div className=' hero-main  bg-cover h-content h-52 lg:h-96 mb-7 lg:mb-12 '>
 <Header />
 <h1 className="text-white text-4xl lg:text-6xl hero-text font-black font-nunito text-center lg:mt-14 tracking-wide">{title}</h1>
 </div>

  </>;
};

export default PagesBanner;
