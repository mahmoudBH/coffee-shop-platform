import React from "react";
import MyReviews from "./MyReviews";
import client01 from '../../assests/img/testimonial-1.jpg'
import client02 from '../../assests/img/testimonial-2.jpg'
import client03 from '../../assests/img/testimonial-3.jpg'
// import client04 from '../../assests/img/testimonial-4.jpg'

const Reviews = () => {
const clientIMgArray = [client01 , client02 , client03 ]





  return (
    <>
      <section className='text-gray-600 body-font overflow-hidden '>
        <div className='container lg:max-w-[1324px] flex-nowrap px-5 lg:py-6 mx-auto'>
        <div className='flex flex-col text-center w-full mb-20'>
            <p className='title-font text-orange-400 sec-heading font-medium text-3xl mb-2'>
            Testimonial
            </p>
            <h1 className='font-nunito hero-text font-black text-black text-3xl lg:text-5xl'>
            Our Clients Say!!!
            </h1>
          </div>
        <div className="flex flex-wrap  "> 
        {
            clientIMgArray.map((imges , ind) => <MyReviews key={ind} img={imges} /> )
        }
        </div> 
        </div>
      </section>
    </>
  );
};

export default Reviews;
