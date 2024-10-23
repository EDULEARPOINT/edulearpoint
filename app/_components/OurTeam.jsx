"use client";
import React from "react";
import mem1 from "@/public/images/team1.jpg";
import mem2 from "@/public/images/team2.jpg";
import Image from "next/image";

const teamMembers = [
  {
    name: "Kashish Gangwani",
    title: "Marketing Expert",
    image: mem1,
  },
  {
    name: "Gopal Kumar",
    title: "Business head",
    image: mem2,
  },
];

const TeamCard = ({ member }) => {
  return (
    <div className="flex flex-col items-center bg-gray-100  p-4 rounded-lg shadow-lg mx-2">
      <Image
        className="w-full h-[400px] mb-4 object-fill"
        src={member.image}
        alt={member.name}
      />
      <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
      <p className="text-gray-700">{member.title}</p>
    </div>
  );
};

const OurTeam = () => {
  return (
    <section className="bg-white z-[100]">
      <div className="relative w-full max-w-[80vw] mx-auto mb-10">
        <div className="text-center flex flex-col gap-3 items-center pb-6">
          <h1 className="md:text-4xl text-2xl uppercase font-bold text-gray-900">
            Our Team
          </h1>
          <h5 className="text-gray-500 md:text-xl text-lg font-normal max-w-4xl text-center">
            Accelerate your digital journey with our featured online course,
            designed to empower you with the latest tools and strategies for
            sustainable growth.
          </h5>
        </div>
        <div className="flex lg:flex-row flex-col  justify-center gap-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="lg:w-1/3 w-full flex-shrink-0">
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
