import React from "react";

const Contact = () => (
  <section className="py-20 bg-white min-h-screen">
    <div className="max-w-3xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Contact & Support
      </h2>
      <p className="text-gray-600 mb-12 text-center">
        For any questions, support, or feedback, reach out to us:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Phone Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-100 hover:shadow-2xl transition">
          <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm12-12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Phone</h3>
          <a
            href="tel:+919999999999"
            className="text-blue-600 hover:underline text-base"
          >
            +91 99999 99999
          </a>
        </div>
        {/* Email Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-100 hover:shadow-2xl transition">
          <div className="bg-green-100 text-green-600 rounded-full p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Email</h3>
          <a
            href="mailto:support@greengrocery.com"
            className="text-green-600 hover:underline text-base"
          >
            support@greengrocery.com
          </a>
        </div>
        {/* WhatsApp Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-100 hover:shadow-2xl transition">
          <div className="bg-green-100 text-green-600 rounded-full p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16.72 11.06a6 6 0 10-5.66 5.66l2.12.53a1 1 0 001.18-1.18l-.53-2.12a6.01 6.01 0 002.89-2.89z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline text-base"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
