import React from "react";
import heroimg from "../../assests/img/caffe.png";


const Hero = () => {

    
  return (
    <>
      <section >
        <div className='container  mx-auto flex px-5 py-10 lg:py-24 lg:pt-30 md:flex-row flex-col xl:max-w-[1324px]  items-center'>
          <div className='lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center'>
            <h1 className='title-font  sm:text-6xl mb-4 text-4xl hero-text  text-white font-nunito font-black max-w-[30rem] '>
            Enjoy our delicious meal.
            </h1>

            <p className='mb-8 max-w-[39rem] text-white leading-relaxed'>
            Discover our café, where the aroma of freshly brewed coffee meets the sweetness of carefully crafted pastries. Savor a rich espresso, a creamy cappuccino, or exquisite treats, in a warm space designed to create memorable moments.
            </p>
            
              <button className='inline-flex text-white capitalize font-bold shadow-lg bg-orange-400 px-16 py-3 hover:bg-opacity-4 border-0  focus:outline-nonerounded text-lg'>
                Book a table
              </button>             
            
          </div>
          <div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6'>
            <img
              className='object-cover hero-img object-center rounded'
              alt='hero'
              src={heroimg}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
