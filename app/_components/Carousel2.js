"use client";

import Image from "next/image";
import ParticlesComponent from "./VantaBackground";
import img1 from "@/public/images/c2.png";
import { FaGlobe, FaPhone } from "react-icons/fa";
import { useEffect } from "react";

const Carousel1 = () => {
  useEffect(() => {
    // Any additional initialization if needed
  }, []);
  return (
    <div className="relative h-screen">
      {/* <ParticlesComponent /> */}

      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-normal lg:gap-28 h-full w-full bg-pink- text-white p-4 relative ">
        <div className="">
          <Image
            src={img1}
            width={900}
            height={900}
            alt="img"
            className="lg:w-[300px] md:w-[250px] w-[100px] "
          />
        </div>
        <div className="flex justify-center items-center flex-col">
          <h1 className="lg:text-6xl uppercase lg:w-[80%] w-[90%] text-5xl  font-bold mb-4 text-  center text-white lg:leading-relaxed leading-none">
            Welcome to
            <span className="text-orange-400"> edulear </span> point
          </h1>
          <p className="lg:text-4xl uppercase text-xl mb-8 text-center text-white">
            enroll today for more benefits
          </p>
          <div className="flex flex-col md:flex-row gap-5 justify-center items-center space-y-2 md:space-y-0 md:space-x-6">
            <span className="text-xl text-white flex flow-row items-center gap-2">
              <FaPhone className="rotate-90 " /> +91 6203249955
            </span>
            <span className="text-xl text-white flex flow-row items-center gap-2">
              <FaGlobe className="" /> www.edulearpoint.in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel1;
