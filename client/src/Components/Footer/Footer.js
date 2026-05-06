import React from "react";
import { Link } from "react-router-dom";





const Footer = () => {




  return <>
    <footer class="text-gray-600 bg-black">
  <div class="container lg:max-w-[1324px] px-5 pt-20 pb-10 mt-9 mx-auto">
    <div class="flex flex-wrap md:text-left text-center order-first">
      <div class="lg:w-1/4 md:w-1/2 w-full px-4">
      <p class='title-font text-orange-400 sec-heading font-medium text-xl mb-2'>Company</p>
        <nav class="list-none mb-6 text-white cursor-pointer  ">
          <li class=" hover:translate-x-2 duration-1000" >
            <Link ><i className="fa fa-arrow-right mb-2 "></i> About us</Link>
          </li>
          <li  class=" hover:translate-x-2 duration-1000">
            <Link ><i className="fa fa-arrow-right mb-2"></i> Contact us</Link>
          </li>
          <li  class=" hover:translate-x-2 duration-1000">
            <Link ><i className="fa fa-arrow-right mb-2"></i> Reservation</Link>
          </li>
          <li  class=" hover:translate-x-2 duration-1000">
            <Link ><i className="fa fa-arrow-right mb-2"></i> Privacy policy</Link>
          </li>
          <li  class=" hover:translate-x-2 duration-1000">
            <Link ><i className="fa fa-arrow-right mb-2"></i> Terms & conditions</Link>
          </li>
        </nav>
      </div>
      <div class="lg:w-1/4 md:w-1/2 w-full px-4">
      <p class='title-font text-orange-400 sec-heading font-medium text-xl mb-2'>Contact</p>
        <nav class="list-none mb-6 text-white">
          <li>
            <Link ><i className="fa fa-location-dot mr-2 mb-3"></i>123 Street, New York, USA</Link>
          </li>
          <li>
            <Link ><i className="fa fa-phone mr-2 mb-3"></i>+012 345 67890</Link>
          </li>
          <li>
            <Link ><i className="fa fa-envelope mr-2 mb-3"></i>info@example.com</Link>
          </li>
          <span className="inline-flex text-2xl text-white ">           
          <i className="fa-brands mr-2 fa-github w-10 border py-2 px-2 duration-500 h-10 rounded-full hover:text-orange-400  hover:bg-white"></i>
          <i className="fa-brands mr-2 fa-instagram w-10 border py-2 px-2 duration-500 h-10 rounded-full hover:text-orange-400  hover:bg-white"></i>
          <i className="fa-brands mr-2 fa-linkedin w-10 border py-2 px-2 duration-500 h-10 rounded-full hover:text-orange-400  hover:bg-white"></i>
          <i className="fa-brands fa-twitter w-10 border py-2 px-2 duration-500 h-10 rounded-full hover:text-orange-400  hover:bg-white"></i>
          </span>
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
      <p className='title-font text-orange-400 sec-heading font-medium text-xl mb-2'>Opening</p>
        <nav className="list-none mb-10 text-white">
          <li className="font-bold mt-2">
            Monday - Saturday
           <br />
          <small className="font-normal">09AM - 09PM</small> 
          </li>
          <li className="mt-2 font-bold">
            Monday - Saturday
           <br />
          <small  className="font-normal">09AM - 09PM</small> 
          </li>         
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
      <p className='title-font text-orange-400 sec-heading font-medium text-xl mb-2'>Newsletter</p>
      <p className="mb-5 text-white">Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
        <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap  mb-5 flex-wrap justify-center items-end md:justify-start">        
          <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">            
            <input type="text" placeholder="Your Email... " className="w-full bg-white  rounded border border-orange-400 text-base outline-none py-1 px-3 leading-8 "/>
          </div>
          <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-orange-400 border-0 py-2 px-6 focus:outline-orange-400 hover:bg-orange-400">Button</button>
        </div>
        {/* <p class="text-gray-500 text-sm mt-2 md:text-left text-center">Bitters chicharrones fanny pack
          <br class="lg:block hidden">waistcoat green juice />
        </p> */}       
      </div>
    </div> 
    <hr className="w-full"/>
    <p className="text-lg text-white text-center pt-7  sm:ml-6 sm:mt-0 ">© Restoran, All Right Reserved. Developed By <span className="text-orange-400"> Mahmoud Bousbih</span> with
   <i className="fa fa-heart ms-2 text-red-500"></i></p>  
  </div>
  
 
</footer>
  </>;
};

export default Footer;
