import React from "react";

const OurChefs = ({ img, name, role }) => {
  return (
    <>
      <div className="p-3 lg:w-1/4 md:w-1/2 w-full">
        <div className="flex flex-col items-center text-center bg-white duration-1000 shadow-lg cursor-pointer group pt-4 lg:pt-9">
          <img
            alt="team"
            className="flex-shrink-0 rounded-full w-56 object-cover object-center mb-4 group-hover:scale-110 duration-500 overflow-hidden"
            src={img}
          />
          <div className="w-full">
            {/* Nom du chef sous l'image */}
            <h2 className="title-font font-medium hero-text text-2xl text-gray-900 mb-3">
              {name}
            </h2>
            <h3 className="text-gray-500 mb-3">{role}</h3>
            <span className="inline-flex text-2xl text-white opacity-0 group-hover:mt-5 group-hover:opacity-100 duration-1000">
              <i className="fa-brands mr-2 fa-facebook py-4 px-2 rounded-t-lg bg-orange-400"></i>
              <i className="fa-brands mr-2 fa-instagram py-4 px-2 rounded-t-lg bg-orange-400"></i>
              <i className="fa-brands fa-twitter py-4 px-2 rounded-t-lg bg-orange-400"></i>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurChefs;
