import React from "react";
import aboutimg01 from '../../assests/img/about-1.jpg'
import aboutimg02 from '../../assests/img/about-2.jpg'
import aboutimg03 from '../../assests/img/about-3.jpg'
import aboutimg04 from '../../assests/img/about-4.jpg'
import Zoom from 'react-reveal/Zoom';

const AboutGallary = () => {
  return <>

<div className="lg:w-1/2  w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
      <div className="grid grid-cols-2 gap-3">

        <div className="aspect-w-1 aspect-h-5">
        <Zoom>
          <img className="object-cover object-center w-full h-full" src={aboutimg01} alt="gallery-image"/>
          </Zoom>
        </div>
        <div className="aspect-w-1 aspect-h-1">
        <Zoom>
          <img className="object-cover object-center about-img-02  w-3/4 h-3/4" src={aboutimg02} alt="gallery-image"/>
          </Zoom>
        </div>
        <div className="aspect-w-1 aspect-h-1">
        <Zoom>
          <img className="object-cover object-center about-img-03 w-3/4 h-3/4l" src={aboutimg03} alt="gallery-image"/>
          </Zoom>
        </div>
        <div className="aspect-w-1 aspect-h-1">
        <Zoom>
          <img className="object-cover object-center w-full h-full" src={aboutimg04} alt="gallery-image"/>
          </Zoom>
        </div>
      </div>
    </div>
  </>;
};

export default AboutGallary;
