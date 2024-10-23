"use client"
import React from 'react'
import { useAppContext } from "@/utils/GlobalContext"
import Image from 'next/image';

const UserCard = () => {
    const { UserDetails } = useAppContext();

    return (
        <div className=" flex flex-col justify-center items-center w-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-400 p-6 shadow-lg rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 group">
            
            {UserDetails ? (
                <div className="relative z-10 flex flex-row gap-4 items-center">
                    <div className="relative ">
                        <Image
                            src={UserDetails.profilePictureUrl || "/default-avatar.jpg"}
                            alt="Profile"
                            width={900} height={900}
                            className="rounded-full w-[150px] lg:w-[200px] object-cover shadow-md"
                        />
                    </div>
                    <div className='text-center'>
                        <h2 className="text-2xl font-bold text-white mb-2">{UserDetails?.name}</h2>
                        <p className="text-gray-200 mb-4">{UserDetails?.email}</p>
                        <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2 inline-block">
                            <p className="text-lg font-semibold text-white uppercase">
                                Package: <span className="ml-2">{UserDetails.package || 'Not Selected'}</span>
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative z-10 flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
                </div>
            )}
           
        </div>
    )
}

export default UserCard