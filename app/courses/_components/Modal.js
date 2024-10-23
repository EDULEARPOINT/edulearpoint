import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      // Add classes to body when modal is open
      document.body.classList.add('overflow-hidden', 'pointer-events-none');
    } else {
      // Remove classes from body when modal is closed
      document.body.classList.remove('overflow-hidden', 'pointer-events-none');
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('overflow-hidden', 'pointer-events-none');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center pointer-events-auto">
      <div className="bg-white p-6 lg:p-16 rounded-lg max-w-md w-full">
        <p className='md:text-4xl text-2xl  font-bold my-4'>Student Enquiry Form</p>
        <button onClick={onClose} className="float-right ml-2 mt-0 text-4xl">&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;