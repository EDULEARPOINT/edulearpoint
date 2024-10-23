'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { courseData } from '@/app/data/CourseData';
import Image from 'next/image';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { db, Auth } from '@/utils/firebase_config';
import EnquiryForm from '../../_components/EnquiryForm';
import Modal from '../../_components/Modal';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function CoursePage() {
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);
    const [user] = useAuthState(Auth); // Get the authenticated user
    const params = useParams();
    const { category, course } = params;

    const decodedCategory = decodeURIComponent(category).replace(/-/g, ' ').toLowerCase();
    const decodedCourse = decodeURIComponent(course).replace(/-/g, ' ').toLowerCase();

    const courses = courseData[decodedCategory] || [];
    const courseDetails = courses.find(c => c.title.toLowerCase() === decodedCourse);

    if (!courseDetails) {
        return <div>Course not found</div>;
    }

    const renderListItem = (item, index) => <li key={index}>{item}</li>;

    const renderSection = (title, content, isList = false) => {
        if (!content) return null;
        return (
            <div className="mb-4">
                <strong>{title}:</strong>
                {isList ? (
                    <ul className="list-disc pl-5 mt-2">
                        {content.map(renderListItem)}
                    </ul>
                ) : (
                    <span className="ml-2">{content}</span>
                )}
            </div>
        );
    };

    const handleEnrollClick = () => {
        setShowEnquiryModal(true);
    };

    const handleEnquirySubmit = async (formData) => {
        if (!user) {
            alert('You must be logged in to submit an enquiry.');
            return;
        }

        try {
            const userDocRef = doc(db, 'users', user.uid);

            await setDoc(userDocRef, {
                email: formData.email,
                studentEnquiryDetails: arrayUnion(formData)
            }, { merge: true });

            alert('Enquiry submitted successfully! Proceeding to purchase...');
            setShowEnquiryModal(false);
            // Here, implement your logic to proceed to the payment gateway
            // For example: router.push('/payment');
        } catch (error) {
            console.error('Error submitting enquiry:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">{courseDetails.title}</h1>
            {courseDetails.image && (
                <Image
                    src={courseDetails.image}
                    alt={courseDetails.title}
                    width={900}
                    height={900}
                    className="w-full h-64 object-cover mb-6 rounded-lg"
                />
            )}
            {renderSection("Price", `₹${courseDetails.price}`)}
            {renderSection("Duration", courseDetails.duration)}
            {renderSection("Description", courseDetails.description)}
            {renderSection("Certificate", courseDetails.certificate)}
            {renderSection("LOR", courseDetails.lor)}
            {renderSection("Internship", courseDetails.internship)}
            {renderSection("Stipend", courseDetails.stipend)}
            {renderSection("Benefits", courseDetails.benefits, true)}
            {renderSection("Additional Benefits", courseDetails.additionalBenefits, true)}
            {renderSection("Enrollment Steps", courseDetails.enrollmentSteps, true)}
            {renderSection("Enrollment Process", courseDetails.enrollmentProcess, true)}
            {renderSection("Ideal For", courseDetails.idealFor)}

            <button
                onClick={handleEnrollClick}
                className="mt-6 bg-blue-600 text-white px-10 py-3 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Enroll Now
            </button>

            <Modal isOpen={showEnquiryModal} onClose={() => setShowEnquiryModal(false)}>
                <div className="pointer-events-auto">
                    <EnquiryForm
                        courseName={courseDetails.title}
                        onSubmit={handleEnquirySubmit}
                        onCancel={() => setShowEnquiryModal(false)}
                    />
                </div>
            </Modal>
        </div>
    );
}
