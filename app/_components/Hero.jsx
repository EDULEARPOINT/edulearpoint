"use client";
import React from 'react';
import { Carousel } from "flowbite-react";
import Carousel1 from './Carousel1';
import Carousel2 from './Carousel2';
import Carousel3 from './Carousel3';
import ParticlesComponent from './VantaBackground';

const Hero = () => {
  return (
    <div className="w-[100vw] lg:h-[120vh] h-[110vh]  ">
      <ParticlesComponent/>
      <Carousel slideInterval={5000} >
        <div>
          <Carousel2 />
        </div>
        <div>
          <Carousel1 />
        </div>
        <div>
          <Carousel3 />
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
