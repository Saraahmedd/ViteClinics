import React from "react";
import Header from "@/components/Header";

const PolicySection = ({ title, description }) => (
  <div className="bg-gradient-to-r from-blue-900 to-blue-800 hover:to-blue-700 text-white p-8 rounded-xl mb-8 shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
    <h3 className="text-3xl font-bold mb-4">{title}</h3>
    <p className="text-lg leading-relaxed mb-4">{description}</p>
    <p className="text-lg leading-relaxed">
      Further details are available in our full policy documentation. Please
      contact our support team for more information or any queries.
    </p>
  </div>
);

const PolicyPage = () => {
  return (
    <>
      <header className="shadow-md py-4 px-4 sm:px-10 font-sans-serif min-h-70px">
        <div className="flex flex-wrap items-center justify-between gap-5 relative">
          {/* replace with clinic logo */}
          <a href="javascript:void(0)">
          <div className="flex">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
         <span className="ms-2 self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Vite Clinics
              </span>
              </div>
          </a>
        
          <div className="flex lg:order-1 max-sm:ml-auto">
            <button className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
              <a href="/guest/login">Login</a>
            </button>
            <button className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff] ml-3">
              <a href="/signup/patient">Sign Up</a>
            </button>
            <button className="lg:hidden ml-7">
              <svg
                className="w-7 h-7"
                fill="#000"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <ul className="flex lg:space-x-5 max-lg:space-y-2 max-lg:block max-lg:w-full">
            <li className="max-lg:border-b max-lg:bg-[#007bff] max-lg:py-2 px-3 max-lg:rounded">
              <a
                href="/"
                className="lg:hover:text-[#007bff] text-gray-500 max-lg:text-white block font-semibold text-15px"
              >
                Home
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
              <a
                href="/#about"
                className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-15px"
              >
                About
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
              <a
                href="/services"
                className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-15px"
              >
                Services
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
              <a
                href="/signup/doctor"
                className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-15px"
              >
                Careers
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
              <a
                href="/policy"
                className="lg:hover:text-[#007bff] text-[#007bff] block font-semibold text-15px"
              >
                Policy
              </a>
            </li>
          </ul>
        </div>
      </header>
      <style>
        {`
          @keyframes moveBackground {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animated-background {
            animation: moveBackground 20s linear infinite;
            background-size: 400% 400%;
            background-image: linear-gradient(45deg, #1a3b5d 25%, #162c47 25%, #162c47 50%, #1a3b5d 50%, #1a3b5d 75%, #162c47 75%, #162c47);
          }
        `}
      </style>
      <div className="min-h-screen bg-blue-950 text-gray-100 animated-background">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-16 text-center">
            <h1 className="text-6xl font-extrabold text-gray-100">
              Our Policies
            </h1>
            <p className="mt-4 text-xl text-blue-300">
              Dedicated to providing exceptional service with full transparency
              and integrity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <PolicySection
              title="Privacy Policy"
              description="We prioritize your privacy and protect your personal and health information with the highest level of security. Our comprehensive policy outlines the measures we take to safeguard your data, ensuring compliance with all legal standards."
            />

            <PolicySection
              title="Appointment Policy"
              description="Our appointment policy is designed with your health and convenience in mind. We adhere to strict guidelines to ensure every appointment is accurately scheduled. Our medical staff are always available to discuss your health concerns, providing expert advice and support."
            />

            <PolicySection
              title="Cancellation & Rescheduling Policy"
              description="We strive to make cancellations and rescheduling as straightforward as possible. Our policy outlines the procedures for cancelling or rescheduling appointments, including special considerations for emergency situations, to ensure a hassle-free experience for our patients."
            />

            <PolicySection
              title="Terms of Service"
              description="By utilizing our services, you agree to our terms of service. These terms are designed to create a clear understanding of our mutual rights and responsibilities, ensuring a smooth and positive experience for all our patients."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PolicyPage;
