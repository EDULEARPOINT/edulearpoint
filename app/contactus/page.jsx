"use client"
import React, { useState } from 'react';
import { FaAddressBook, FaEnvelope, FaMailBulk, FaPhone } from 'react-icons/fa';

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
        name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: ''
    })
    console.log(formData);
    // You can send `formData` to your server here
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center py-[60px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">Contact Us</h2>
          <p className="mt-2 text-lg text-gray-600">
            We use an agile approach to test assumptions and connect with the needs of your audience early and often.
          </p>
        </div>
        <form className="mt-8 space-y-6 bg-white p-10 rounded-lg shadow-xl" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-lg font-medium text-gray-700">Phone Number</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-lg font-medium text-gray-700">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                >
                  <option value="" disabled>Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Support">Support</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full resize-none px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder="Your message"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Message
            </button>
          </div>
          <div className="mt-6 text-sm text-gray-600 text-center">
            By submitting this form you agree to our <a href="#" className="text-indigo-500 hover:underline">terms and conditions</a> and our <a href="#" className="text-indigo-500 hover:underline">privacy policy</a> which explains how we may collect, use and disclose your personal information including to third parties.
          </div>
        </form>
      </div>
      <div className="mt-12 flex flex-col lg:flex-row gap-10 justify-around w-full max-w-6xl text-gray-600">
        <div className="flex flex-col items-center">
          <FaEnvelope className='text-indigo-500 text-4xl lg:text-6xl mb-2'/>
          <p>Email us:</p>
          <p className="text-indigo-500">edulearpoint@gmail.com</p>
        </div>
        <div className="flex flex-col items-center">
          <FaPhone className='text-indigo-500 text-4xl lg:text-6xl rotate-90 mb-2' />
          <p>Customer Support:</p>
          <p className="text-indigo-500">+91 74810 88337</p>
        </div>
        <div className="flex flex-col items-center">
          <FaAddressBook className='text-indigo-500 text-4xl lg:text-6xl mb-2'/>
          <p>Company Office Address</p>
          <p className="text-indigo-500">Ranchi , Jharkhand</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
