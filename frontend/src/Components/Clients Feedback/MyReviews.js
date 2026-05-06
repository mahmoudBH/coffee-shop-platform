import React from "react";
import { Link } from "react-router-dom";

const MyReviews = ({img}) => {


  return <>       
      <div className="lg:w-1/3 md:w-1/2 w-full mb-4 flex flex-col items-start   ">  
      <div className='shadow-lg group px-5 lg:mx-3 border  py-5 bg-white  duration-1000 hover:bg-orange-400 '>
      <div className='w-10 h-10 inline-flex  group-hover:text-white text-orange-400 text-5xl items-center justify-center rounded-full mb-4'>
           <i className="fa-sharp fa-solid fa-quote-left"></i>
        </div>     
        <p className="leading-relaxed mb-8 group-hover:text-white">Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
       
        <Link className="inline-flex items-center">
          <img alt="blog" src={img} className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"/>
          <span className="flex-grow flex flex-col pl-4 ">
            <span className="title-font font-medium text-gray-900  group-hover:text-white">Holden Caulfield</span>
            <span className="text-gray-400 text-xs tracking-widest   group-hover:text-white mt-0.5">UI DEVELOPER</span>
          </span>
        </Link>
        </div>
        </div>      


     
 

  </>;
};

export default MyReviews;
