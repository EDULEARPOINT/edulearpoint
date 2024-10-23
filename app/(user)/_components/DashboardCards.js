import React from 'react';
import { FaRupeeSign, FaEllipsisH } from 'react-icons/fa';

const EarningsCard = ({ amount, description, bgColor, bgDark }) => {
  return (
    <div className={`md:px-4 md:py-7 p-3 flex flex-col gap-3 items-center justify-center shadow-md rounded-md ${bgColor}`}>
      <div className="flex justify-between w-full items-center mb-2">
        <div className={`${bgDark} p-1 w-full items-center justify-center`}>
        <FaRupeeSign className="text-white  rounded-md text-lg" />
        </div>
       
      </div>
      <div className="text-gray-900 md:text-2xl text-xl font-bold">{`₹ ${amount}`}</div>
      <div className="text-gray-500 text-sm md:text-base">{description}</div>
    </div>
  );
};

export default EarningsCard;
