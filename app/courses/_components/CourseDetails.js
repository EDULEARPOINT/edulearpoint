'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/utils/firebase_config';
import Modal from './Modal';
import EnquiryForm from './EnquiryForm';

const CourseDetails = ({ category, courses }) => {
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleEnrollClick = (course) => {
        setSelectedCourse(course);
        setShowEnquiryModal(true);
    };

    const handleEnquirySubmit = async (formData) => {
        try {
            const userDocRef = doc(db, 'users', formData.email);
            
            await setDoc(userDocRef, {
                email: formData.email,
                studentEnquiryDetails: arrayUnion(formData)
            }, { merge: true });

            alert('Enquiry submitted successfully! We will contact you soon.');
            setShowEnquiryModal(false);
            // Here you can add logic to proceed to payment or next steps
        } catch (error) {
            console.error('Error submitting enquiry:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className='max-w-[80vw] mx-auto flex flex-col gap-8 mb-10'>
            <h1 className="text-3xl font-bold mb-6 capitalize">{category?.replace(/-/g, ' ')}</h1>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
                {courses.map((course, index) => (
                    <div key={index} className="relative h-[250px] text-white hover:scale-105 transition-all rounded-lg shadow-lg overflow-hidden">
                        <Image
                            width={900}
                            height={900}
                            src={course.image}
                            alt={course.title}
                            className="absolute inset-0 w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-zinc-700 bg-opacity-80 flex flex-col items-center justify-center text-center p-4">
                            <h2 className="text-2xl font-semibold text-white ">{course.title}</h2>
                            <p className="mt-2 text-white">Price: ₹{course.price}</p>
                            <div className='flex flex-row gap-7 items-center justify-center'>
                                <button 
                                    onClick={() => handleEnrollClick(course)}
                                    className="mt-4 text-sm bg-blue-600 text-white px-5 py-2 rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    Enroll Now
                                </button>
                                <Link href={`/courses/${category}/${encodeURIComponent(course.title.toLowerCase().replace(/ /g, '-'))}`}>
                                    <button className="mt-4">
                                        More Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={showEnquiryModal} onClose={() => setShowEnquiryModal(false)}>
                <div className="pointer-events-auto">
                    <EnquiryForm
                        courseName={selectedCourse?.title}
                        onSubmit={handleEnquirySubmit}
                        onCancel={() => setShowEnquiryModal(false)}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default CourseDetails;