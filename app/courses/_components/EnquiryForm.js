// In _components/EnquiryForm.js
import React, { useState } from 'react';

const EnquiryForm = ({ courseName, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsappNo: '',
    course: courseName, // Pre-filled with the selected course
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all fields are filled
    if (Object.values(formData).every(field => field.trim() !== '')) {
      onSubmit(formData);
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <section className=' flex flex-col items-center justify-center  '>

      <form onSubmit={handleSubmit} className="space-y-4 ">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="whatsappNo"
          placeholder="WhatsApp Number"
          value={formData.whatsappNo}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="course"
          value={formData.course}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
        <div className="flex justify-between mt-3">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Proceed to Buy
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default EnquiryForm;