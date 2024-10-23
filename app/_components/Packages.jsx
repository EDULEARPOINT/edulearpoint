import React from "react";
import Link from "next/link";
import { coursePackages } from "../data/packagesData";

const Packages = () => {
  return (
    <div className="flex bg-white z-[100] items-center justify-center flex-col gap-8 py-8 px-4">
      <div className="text-center flex flex-col gap-3">
        <h1 className="md:text-4xl text-2xl uppercase font-bold text-gray-900">
          Featured Packages
        </h1>
        <h5 className="text-gray-500 md:text-xl text-lg font-normal max-w-4xl">
          Accelerate your digital journey with our featured online course,
          designed to empower you with the latest tools and strategies for
          sustainable growth.
        </h5>
      </div>
      <div className="w-[80vw] mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center md:gap-8">
          {coursePackages.map((item) => (
            <div
              key={item.id}
              className="divide-y divide-gray-200 rounded-2xl border border-gray-400 shadow-lg"
            >
              <div className="p-6 sm:px-8">
                <h2 className="text-lg font-medium text-gray-900">
                  {item.name}
                  <span className="sr-only">Plan</span>
                </h2>

                {/* <p className="mt-2 text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}

                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    {" "}
                    Rs {item.price}{" "}
                  </strong>
                  <span className="text-sm font-medium text-gray-700"></span>
                </p>

                <Link
                  className="mt-4 block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                  href="#"
                >
                  Buy Now
                </Link>
              </div>

              <div className="p-6 sm:px-8">
                <p className="text-lg font-medium text-gray-900 sm:text-xl">
                  What&apos;s included:
                </p>

                <ul className="mt-2 space-y-2 sm:mt-4">
                  {item.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5 text-indigo-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>

                      <span className="text-gray-700"> {benefit} </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
