import React from "react";
import OurChefs from "./OurChefs";
import chefImg01 from '../../assests/img/team-1.jpg'
import chefImg02 from '../../assests/img/team-2.jpg'
import chefImg03 from '../../assests/img/team-3.jpg'
import chefImg04 from '../../assests/img/team-4.jpg'
import Fade from 'react-reveal/Fade';


const Chefs = () => {
    const imgArray = [chefImg01 , chefImg02 , chefImg03 , chefImg04]


  return (
    <>
      <section className='text-gray-600 body-font'>
        <div className='container lg:max-w-[1324px] px-5 py-16 mx-auto'>
        <div className='flex flex-col text-center w-full mb-20'>
            <p className='title-font text-orange-400 sec-heading font-medium text-3xl mb-2'>
            Team Members
            </p>
            <h1 className='font-nunito hero-text font-black text-black text-3xl lg:text-5xl'>
            Our Master Chefs
            </h1>
          </div>
          <Fade right>
        <div className="flex flex-wrap -m-4">
        
        {
            imgArray.map((img) =>  <OurChefs img={img} />)
        }
         
          </div>
          </Fade>
        </div>
      </section>
    </>
  );
};

export default Chefs;
