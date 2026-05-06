import React from "react";
import AboutGallary from "./AboutGallary";
import AboutStats from "./AboutStats";

const MyAbout = () => {



  return (
    <>
      <section className='text-gray-600 body-font'>
        <div className='container lg:max-w-[1324px] px-5 lg:py-16 mx-auto flex flex-wrap items-center'>
          <AboutGallary />

          <div className='flex flex-wrap mt-10 mb-auto lg:w-1/2 sm:w-full lg:pl-5 content-start sm:pr-10'>
            <AboutStats />
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAbout;
