// components/StudentNavbar.js
"use client";
import React, { useEffect, useState } from 'react';
import { Manrope, Raleway } from 'next/font/google';
import { useRouter } from 'next/navigation';

const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ['latin'],
});
const manrope = Manrope({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const StudentNavbar = ({ userObj }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const router = useRouter();
  let isUser = '';

  useEffect(() => {

    isUser = localStorage.getItem("isUser") === "true" || '';

    if (!isUser) {
      router.push('login');
    }
  }, [])


  return (
    <nav className={`${manrope.className} flex justify-between items-center bg-white text-gray-700 p-4`}>
      <div className="flex items-center">
        <img src="/SIES_logo.png" alt="Logo" className="logo w-30 h-20 mr-4" />
        <span>Feedback System</span>
      </div>
      <button onClick={() => {

        if (typeof window !== 'undefined') {
          localStorage.setItem("isUser", "false") || ''
          localStorage.removeItem("email") 
        }

        router.push('login');

      }} className="sign-out-button bg-red-500 text-white px-4 py-2 rounded mt-2">
        Sign Out
      </button>
    </nav>
  );
};

export default StudentNavbar;
