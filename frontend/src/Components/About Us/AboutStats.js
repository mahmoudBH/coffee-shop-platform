import React from "react";
import CountUp from 'react-countup';



const AboutStats = () => {




  return (
    <>
      <div className='w-full lg:mt-16  '>
        <p className='title-font text-orange-400 sec-heading font-medium text-3xl mb-2'>
          About us
        </p>
        <h1 className='font-nunito hero-text font-black text-black text-2xl lg:text-5xl'>          
          Welcome <i className='fa fa-utensils text-orange-400'></i> coffe shop
        </h1>

        <div className='leading-relaxed mt-5'>
        Welcome to our website, where you can enjoy high-quality coffee, fresh juices, and homemade pastries. Thanks to our talented chefs, each product is prepared with care and expertise.        </div>
        <div className='leading-relaxed mt-5'>
        Explore our menu and treat yourself to our lovingly crafted delights!
</div>
      </div>

      {/* Stats section */}
      <div className='p-4 sm:w-1/2 lg:w-1/2 w-full lg:my-4 overflow-hidden '>
        <div className='border-l-4 border-orange-400 flex '>
        <h2 className='title-font font-medium text-3xl ps-4 text-gray-900 hero-text'>
              <CountUp start={10} end={28} duration={3}   /> 
                </h2>
          <p className='leading-relaxed text-gray-500 font-semibold ps-4'>
            Years of
            <h1 className='font-black hero-text uppercase text-black text-lg lg:text-2xl'>
              Experience
            </h1>
          </p>
        </div>
      </div>
      <div className='p-4 sm:w-1/2 lg:w-1/2 w-full lg:my-4 overflow-hidden '>
        <div className='border-l-4 border-orange-400 flex '>
          <h2 className='title-font font-medium text-3xl ps-4 text-gray-900 hero-text'>
          <CountUp start={90} end={300} duration={5}   /> 
          </h2>
          <p className='leading-relaxed ps-4  text-gray-500 font-semibold'>
            Popular
            <h1 className='font-black hero-text uppercase text-black text-lg lg:text-2xl'>
               Chefs
            </h1>
          </p>
        </div>
      </div>

      <button className='inline-flex ml-8 text-white mt-4  capitalize font-bold shadow-lg bg-orange-400 px-16 py-3 hover:bg-opacity-4 border-0  focus:outline-nonerounded text-lg'>
        Read more
      </button>
    </>
  );
};

export default AboutStats;
