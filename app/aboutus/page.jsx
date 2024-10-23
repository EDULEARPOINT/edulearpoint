import React from 'react';
import JoiningPlatform from '../_components/JoiningPlatform';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">About Us</h1>
      
      <section class="bg-white 0">
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-2xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div class="font-light text-gray-500 sm:text-lg ">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">Know More about EDULEARPOINT</h2>
            <p class="mb-4">EDULEARPOINT is a Earning & Learning Platform. The program offers Unlimited Earning Potential and robust customer support.We are trying to bring learning to people instead of people to learning. Hence, we are trying to modify their entrepreneurship nature.Here we are with a lot of courses designed in a way that will help people to learn a lot of things and take things to a new level.</p>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-8">
            <img class="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1"/>
            <img class="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2"/>
        </div>
    </div>
</section>
      
      <section className="mt-12">
        <JoiningPlatform />
      </section>
    </div>
  );
};

export default Page;
