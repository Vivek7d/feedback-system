"use client"

import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Raleway } from 'next/font/google';
import Image from 'next/image';
import { Manrope } from 'next/font/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const raleway = Raleway({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const manrope = Manrope({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
});
function Signup() {
    const [email, setEmail] = useState("")
    const [PRN, setPRN] = useState("")
    const [fullName, setFullName] = useState("")
    const [department, setDepartment] = useState("Electronics & Telecommunication")
    const [optionalSubject, setOptionalSubject] = useState("")
    const [semester, setSemester] = useState("Semester 1")
    const [division, setDivision] = useState("A")
    const [batch, setBatch] = useState("")
    const [password, setPassword] = useState("")
    const [year, setYear] = useState("FE")
    const router = useRouter();


    const FEDivisionList = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
    ]
    const departmentList = [
        "Electronics & Telecommunication",
        "Computer Engineering",
        "Information Technology",
        "Printing & Packaging Technology",
        "Mechanical Engineering",
        "Electronics & Computer Science",
        "IOT",
        "Artificial Intelligence and Data science",
        "Artificial Intelligence and Machine Learning",
    ]
    const optionalSubjectList = [
        "Internet of Things",
        "Digital Signal & Image Processing ",
        "Quantitative Analysis",
        "Probablistic Graphical Models",
        "Internet Programming"
    ]
    const semesterList = [
        "Semester 1",
        "Semester 2",
        "Semester 3",
        "Semester 4",
        "Semester 5",
        "Semester 6",
        "Semester 7",
        "Semester 8"
    ]
    const yearList = [
        "FE",
        "SE",
        "TE",
        "BE",
    ]
    const notifySuccess = () => toast.success('Created successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyError = () => toast.error('Something went wrong', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });


    async function CheckEmailExists(email) {
        const q = query(collection(db, 'users'), where('email', '==', email.toLowerCase().trim()));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            alert("Email already exists");
        } else {
            if (email && PRN && fullName && department && semester && division && batch && year && password) {
                await addDoc(collection(db, 'users'), {
                    fullName: fullName,
                    email: email.toLowerCase().trim(),
                    PRN: PRN.toUpperCase().trim(),
                    department: department,
                    semester: semester,
                    division: division.toUpperCase().trim(),
                    batch: batch.toUpperCase().trim(),
                    year: year,
                    password: password,
                    completed: "false",
                    optionalSubject: optionalSubject ? optionalSubject : ''
                });
                alert('Created User successfully');
                setFullName('');
                setPRN('');
                setEmail('');
                setDepartment('');
                setSemester('');
                setDivision('');
                setBatch('');
                setYear('');
                setPassword('');
                router.push("/login")
            }
            else {
                alert("Please enter all details")
            }
        }

    };

    const signup = async (e) => {
        e.preventDefault();

        if (email.toLowerCase().includes('@gst.sies.edu.in')) {
            CheckEmailExists(email.toLowerCase());

            // alert(email.toLowerCase())
        }
        else {
            alert("Enter college id only");
        }



    };
    const handleYearDropdown = (event) => {
        setYear(event.target.value);
    };
    const handleDepartmentDropdown = (event) => {
        setDepartment(event.target.value);
    };
    const handleSemesterDropdown = (event) => {
        setSemester(event.target.value);
    };
    const handleOptionalSubjectDropdown = (event) => {
        setOptionalSubject(event.target.value);
    };



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <Image
                src="/background.png"
                width={10000}
                height={10000}
                alt="background"
                className='absolute object-cover h-[1400px] w-screen z-10'
            />

            <motion.div
                initial={{ opacity: 0, y: -120 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeOut", duration: 1 }}
                className=' flex-col flex justify-center lg:justify-center items-center  lg:space-x-32   mx-10 my-44 z-20 absolute w-screen h-screen'>

                <div className='flex flex-col justify-center items-center mt-20 lg:w-auto mx-5 md:mx-0 space-y-10 lg:border lg:bg-gray-200  lg:p-10 lg:rounded-2xl lg:shadow-lg'>
                    <h1 className={`${manrope.className} text-4xl font-bold mb-10`}>Signup for Feedback System</h1>
                    {/* Personal Details */}
                    <div className='flex flex-col justify-center lg:items-start items-center space-y-5 '>
                        {/* <section className='flex lg:flex-row flex-col justify-evenly items-center lg:space-x-5 lg:space-y-0 space-y-5'> */}
                        <section className='grid grid-cols-2 gap-10'>
                            <div className='flex flex-col space-y-5'>
                                <h1 className={`${manrope.className} md:text-xl text-md `}>Enter Full Name</h1>
                                <input onChange={(e) => setFullName(e.target.value)} required type="text" placeholder="FIRSTNAME MIDDLENAME LASTNAME" className={`${manrope.className} placeholder:text-gray-500 px-5 w-72 py-2  outline-none border border-gray-800 lg:w-96`} />
                                <h1 className={`${manrope.className} md:text-md text-md text-red-600`}>Please enter in the above format</h1>
                            </div>
                            <div className='flex flex-col space-y-5'>
                                <h1 className={`${manrope.className} md:text-xl text-md `}>Enter PRN Number</h1>
                                <input onChange={(e) => setPRN(e.target.value)} required type="text" placeholder="121A1122" className={`${manrope.className} placeholder:text-gray-500 px-5 w-72 py-2  outline-none border border-gray-800 lg:w-96`} />
                            </div>
                            <div className='flex flex-col space-y-5'>
                                <h1 className={`${manrope.className} md:text-xl text-md `}>Enter College Email ID</h1>
                                <input onChange={(e) => setEmail(e.target.value)} required type="text" placeholder="abc@sies.edu.in" className={`${manrope.className} placeholder:text-gray-500 px-5 w-72 py-2  outline-none border border-gray-800 lg:w-96`} />
                            </div>


                            <div className='flex flex-col justify-start space-y-5 '>
                                <h1 className={`${manrope.className} md:text-xl text-md`}>Select Year</h1>
                                <div className='flex justify-center items-center '>
                                    <select
                                        value={year}
                                        onChange={handleYearDropdown}
                                        className="block w-52 lg:w-96 py-2 px-5 leading-tight border border-gray-700 focus:outline-none cursor-pointer"
                                    >
                                        {yearList.map((year, index) => (
                                            <option key={index} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col justify-start space-y-5 '>
                                <h1 className={`${manrope.className} md:text-xl text-md`}>Select your Department</h1>
                                <div className='flex justify-center items-center '>
                                    <select
                                        value={department}
                                        onChange={handleDepartmentDropdown}
                                        className="block w-52 lg:w-96 py-2 px-5 leading-tight border border-gray-700 focus:outline-none cursor-pointer"
                                    >
                                        {departmentList.map((dept, index) => (
                                            <option key={index} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col justify-start space-y-5 '>
                                <h1 className={`${manrope.className} md:text-xl text-md`}>Select your Semester</h1>
                                <div className='flex justify-center items-center '>
                                    <select
                                        value={semester}
                                        onChange={handleSemesterDropdown}
                                        className="block w-52 lg:w-96 py-2 px-5 leading-tight border border-gray-700 focus:outline-none cursor-pointer"
                                    >
                                        {semesterList.map((sem, index) => (
                                            <option key={index} value={sem}>
                                                {sem}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col space-y-5'>
                                <h1 className={`${manrope.className} md:text-xl text-md`}>Enter Division</h1>
                                <input onChange={(e) => setDivision(e.target.value)} required type="text" placeholder="C" className={`${manrope.className} placeholder:text-gray-500 px-5 w-72 py-2  outline-none border border-gray-800 lg:w-96`} />
                            </div>
                            <div className='flex flex-col space-y-5'>
                                <h1 className={`${manrope.className} md:text-xl text-md`}>Enter Batch</h1>
                                <input onChange={(e) => setBatch(e.target.value)} required type="text" placeholder="C1" className={`${manrope.className} placeholder:text-gray-500 px-5 w-72 py-2  outline-none border border-gray-800 lg:w-96`} />
                            </div>
                            <div className='flex flex-col space-y-5'>
                                <h1 className={`${manrope.className} md:text-xl text-md`}>Create a Password</h1>
                                <input onChange={(e) => setPassword(e.target.value)} required type="text" className={`${manrope.className} placeholder:text-gray-500 px-5 w-72 py-2  outline-none border border-gray-800 lg:w-96`} />
                            </div>
                            {
                                year == "TE" && (
                                    <div className='flex flex-col justify-start space-y-5 '>
                                        <h1 className={`${manrope.className} md:text-xl text-md`}>Select Optional Subject</h1>
                                        <div className='flex justify-center items-center '>
                                            <select
                                                value={optionalSubject}
                                                onChange={handleOptionalSubjectDropdown}
                                                className="block w-52 lg:w-96 py-2 px-5 leading-tight border border-gray-700 focus:outline-none cursor-pointer"
                                            >
                                                {optionalSubjectList.map((subject, index) => (
                                                    <option key={index} value={subject}>
                                                        {subject}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )
                            }

                        </section>


                    </div>


                    <div className='bg-gray-300 w-full h-[1px] my-10 shadow-md' />


                    <div
                        onClick={signup}
                        class="w-96 relative cursor-pointer inline-flex items-center justify-center px-12 py-3 overflow-hidden text-lg font-medium text-black-600 border-2 border-black rounded-full hover:text-white group hover:bg-gray-50">
                        <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                        <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span class="relative text-2xl">Signup</span>
                    </div>
                    <h1 className={`${manrope.className} text-lg hover:underline cursor-pointer hover:text-blue-600`} onClick={() => router.push('/login')}>Proceed to Login</h1>

                </div>

            </motion.div>

        </>
    )
}

export default Signup