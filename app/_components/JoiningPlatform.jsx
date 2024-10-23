import React from "react";

const JoiningPlatform = () => {
  return (
    <section className="bg-white z-[100] py-20">
      <div className="relative bg-gradient-to-r from-blue-50 to-gray-100 p-8 rounded-lg shadow-lg max-w-[80vw] mx-auto mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Edulearpoint provides many courses in affordable and cheapest price.
        </h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li className="text-gray-800 text-lg">
            Free live trannigs for affiliate marketing and freelancing.
          </li>
          <li className="text-gray-800 text-lg">
            {" "}
            Personal mentorship from the founder and co-founder and from
            experienced teachers.
          </li>
          {/* <li className="text-gray-800 text-lg">AI, AI Software Engineer, Machine Learning</li>
        <li className="text-gray-800 text-lg">Digital Marketing Course</li>
        <li className="text-gray-800 text-lg">Interior Design &amp; Exterior Design</li>
        <li className="text-gray-800 text-lg">And Many More Courses</li> */}
        </ul>
        {/* <p className="text-gray-700 mb-4 text-center">
          For You Only On 1499 Rupee. After Completing The Course, We Will Give
          You a Letter Of Recommendation.
        </p> */}
        <p className="text-gray-700 mb-4 text-center">
          We will provide you all the services and materials of affiliate
          marketing and also we will provide leads for your affiliate business
          which will will help you to grow your business with our
          platfrom EDULARPOINT.
        </p>
        {/* <p className="text-gray-700 mb-8 text-center">
          This Is The Right Place For You To Learn Various Courses At An
          Affordable Price And Become An Entrepreneur.
        </p> */}
        <div className="text-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300">
            Join The Platform
          </button>
        </div>
        {/* Gradient Circles */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-pink-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-r from-green-400 to-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
      </div>
    </section>
  );
};

export default JoiningPlatform;
