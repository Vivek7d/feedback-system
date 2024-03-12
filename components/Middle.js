"use client"

import React, { useState, useContext, useEffect } from 'react';
import { motion } from "framer-motion"
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


function Middle() {
  const router = useRouter();

  var isAdmin = ''
  useEffect(() => {
    if (typeof window !== 'undefined') {
      isAdmin = localStorage.getItem("isAdmin") === "true" || '';
    }
    if (!isAdmin) {
      router.push('login');
    }
  }, [])


  return (
    <div className='flex-col items-center justify-center mt-10 ml-20 mr-20 '>

      {/* Welcome user */}
      <div className='mt-5'>
        <h1 className={`${raleway.className} text-4xl font-medium`}>Admin Dashboard</h1>
        <h3 className={`${raleway.className}  text-lg mt-6 mb-6 text-gray-500`}>Welcome Back!</h3>
      </div>


      {/* First Box */}
      <div className=' bg-yellow-200 rounded-lg mt-5 w-[950px] h-[300px] flex justify-evenly items-center space-x-12 shadow-2xl hover:scale-105 transition hover:delay-400 cursor-pointer hover:ease-in-out hover:duration-200'>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex justify-center items-center w-16 h-16 bg-yellow-300 rounded-full'>
            <img src="./performance.png" alt="performance" className='w-7 h-7 object-contain' />
          </div>
          <h1 className={`${manrope.className} text-xl font-light mt-6 tracking-normal text-gray-700`}>Total students appearing exam</h1>
          <h3 className={`${raleway.className} text-5xl font-semibold tracking-normal mt-10 text-center`}>2k</h3>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <div className='flex justify-center items-center w-16 h-16 bg-yellow-300 rounded-full'>
            <img src="./kt-image.png" alt="kt" className='w-7 h-7 object-contain' />
          </div>
          <h1 className={`${manrope.className} text-xl font-light mt-6 tracking-normal text-gray-700`}>No. of KT students</h1>
          <h3 className={`${raleway.className} text-5xl font-semibold tracking-normal mt-10 text-center`}>200</h3>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <div className='flex justify-center items-center w-16 h-16 bg-yellow-300 rounded-full'>
            <img src="./cleared-image.png" alt="cleared" className='w-7 h-7 object-contain' />
          </div>
          <h1 className={`${manrope.className} text-xl font-light mt-6 tracking-normal text-gray-700`}>No. of students clearing the exam</h1>
          <h3 className={`${raleway.className} text-5xl font-semibold tracking-normal mt-10 text-center`}>5k</h3>
        </div>
      </div>

      {/* Second Box */}
      <div className='grid grid-cols-3 gap-4 mt-20'>
        <div className='min-h-[200px] rounded-2xl shadow-lg  bg-pink-200 flex flex-col justify-center items-center hover:scale-110 transition cursor-pointer hover:ease-in-out '>
          <h1 className={`${raleway.className} text-4xl`}>Total Passouts</h1>
          <h1 className={`${raleway.className} text-5xl font-bold mt-5`}>20k</h1>
        </div>
        <div className='min-h-[200px] rounded-2xl shadow-lg  bg-blue-200 flex flex-col justify-center items-center hover:scale-110 transition cursor-pointer hover:ease-in-out '>
          <h1 className={`${raleway.className}  text-4xl `}>Avg Grade</h1>
          <h1 className={`${raleway.className} text-5xl font-bold mt-5`}>A</h1>
        </div>
        <div className='min-h-[200px] rounded-2xl shadow-lg  bg-purple-200 flex flex-col justify-center items-center hover:scale-110 transition cursor-pointer hover:ease-in-out '>
          <h1 className={`${raleway.className} text-4xl `}>Passing Rate</h1>
          <h1 className={`${raleway.className} text-5xl font-bold mt-5`}>88%</h1>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-3 mt-20 rounded-2xl p-10'>


      </div>




    </div >
  )
}

export default Middle