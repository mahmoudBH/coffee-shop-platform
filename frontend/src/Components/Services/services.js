import React, {useState} from "react";
import MyServices from "./MyServices";
import {ServicesData} from "./ServicesData";

const Services = () => {
  const [serviceDetails, setserviceDetails] = useState(ServicesData);

  return (
    <>
      <section className='text-gray-600 body-font'>
        <div className='container lg:max-w-[1324px] px-5 py-12 mx-auto'>
          <div className='flex flex-wrap -m-4'>
            {serviceDetails.map((item) => {
              return <MyServices key={item.id} description={item.desc} title={item.title} icon={item.icon} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
