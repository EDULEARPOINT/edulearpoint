'use client';

import React from 'react';
import Link from 'next/link';
import { courseCategories } from '../data/CourseData';
import Image from 'next/image';

const getRandomImage = () => {
  const images = [
    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];
  return images[Math.floor(Math.random() * images.length)];
};

const CoursePage = () => {
  return (
    <div className='max-w-[80vw] mx-auto flex flex-col gap-8 mb-10'>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
        {courseCategories.map((category, index) => (
          <div key={index} className="relative h-[400px] rounded-lg bg-gray-200 shadow-lg">
            <Image width={900} height={900}
              src={getRandomImage()}
              alt={category}
              className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-60"
            />
            <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
              <h2 className="text-2xl font-semibold text-white">{category}</h2>
              <Link href={`/courses/${encodeURIComponent(category.toLowerCase().replace(/ /g, '-'))}`}>
                <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Get More Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursePage;