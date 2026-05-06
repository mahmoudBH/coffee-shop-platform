import React from "react";
import Services from "../Services/services";
import PagesBanner from "./PagesBanner";

const ServicesPage = () => {
  return <>
  <PagesBanner title={'Services'} />
    <Services />
  </>;
};

export default ServicesPage;
