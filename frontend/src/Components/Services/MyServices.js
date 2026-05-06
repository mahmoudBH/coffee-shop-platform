import React from "react";

const MyServices = ({description,title,icon}) => {


    
  return (
    <>
      <div className='xl:w-1/4 md:w-1/2 p-4'>
        <div className='shadow-lg px-6 group bg-white py-12 duration-1000 hover:bg-orange-400 rounded-lg'>
          <div className='w-10 h-10 inline-flex  group-hover:text-white text-orange-400 text-5xl items-center justify-center rounded-full mb-4'>
           <i className={icon}></i>
          </div>
          <h2 className='text-lg font-bold  group-hover:text-white text-black  title-font mb-2'>
            {title}
          </h2>
          <p className='leading-relaxed  group-hover:text-white text-gray-500 text-base'>
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default MyServices;
