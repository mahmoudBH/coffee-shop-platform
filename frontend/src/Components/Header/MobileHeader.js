import React from "react";
import { NavLink } from "react-router-dom";

const MobileHeader = ({toggleOpen}) => {
  return <>
    <div className= ' navbar-menu relative z-50 ' >
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-black overflow-y-auto">
          <div className="flex items-center mb-8">
          <NavLink className="flex mr-auto title-font cursor-pointer text-yellow-500 text-2xl lg:text-3xl font-nunito  font-black items-center mb-4 md:mb-0">
     <i className="fa fa-utensils me-2 "></i>
      <h1 >Coffe Shop</h1>
    </NavLink>
    
            <button className="navbar-close" onClick={toggleOpen}>
            <i class="fa-sharp fa-solid fa-xmark text-white -mt-3 text-2xl"></i>
            </button>
          </div>
          <div>
            <ul>
              <li className="mb-1 ">              
               <NavLink className="block p-2 py-4  text-white  " to={'/'}>Home</NavLink>               
              </li>
              <hr />
              <li className="mb-1">              
               <NavLink className="block p-2 py-4 text-white  " to={'/about-us'}>About</NavLink>               
              </li>            
              <hr /> 
              <li className="mb-1">              
               <NavLink className="block p-2 py-4 text-white " to={'/menu'}>Menu</NavLink>               
              </li>
              <hr />
              <li className="mb-1">              
               <NavLink className="block p-2 py-4 text-white" to={'/services'}>Services</NavLink>               
              </li>
              <hr />
              <li className="mb-1">              
               <NavLink className="block p-2 py-4 text-white" to={'/contact-us'}>Contact</NavLink>               
              </li>
            </ul>
          </div>
         
        </nav>
      </div>
  </>;
};

export default MobileHeader;
