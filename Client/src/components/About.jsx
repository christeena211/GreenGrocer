import React from "react";

const About = () => (
  <section className="py-20 bg-white min-h-screen">
    <div className="max-w-3xl mx-auto px-6">
      <div className="flex flex-col items-center mb-10">
        <div className="bg-green-200 rounded-full p-6 mb-4 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v7m-7-7h14"
            />
          </svg>
        </div>
        <h2 className="text-4xl font-extrabold text-green-800 mb-2">
          About GreenGrocery
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl text-center">
          GreenGrocery is your trusted online store for fresh, high-quality
          vegetables delivered straight to your door. We partner with local
          farmers to ensure you get the best produce at the best prices, every
          day.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border border-green-100 hover:shadow-2xl transition">
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
                d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v7m-7-7h14"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
          <p className="text-gray-600 text-center">
            To make healthy eating easy and affordable for everyone.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border border-green-100 hover:shadow-2xl transition">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Why Choose Us?</h3>
          <p className="text-gray-600 text-center">
            Fast delivery, top-notch quality, and friendly support.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border border-green-100 hover:shadow-2xl transition">
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
                d="M9 12l2 2 4-4"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Thank You</h3>
          <p className="text-gray-600 text-center">
            Thank you for choosing GreenGrocery for your daily needs!
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
