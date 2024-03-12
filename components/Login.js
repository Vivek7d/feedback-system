"use client"

import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Raleway } from 'next/font/google';
import Image from 'next/image';
import { Manrope } from 'next/font/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'next/navigation';

const raleway = Raleway({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const manrope = Manrope({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
});
function Login() {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [view, setView] = useState(false)
    const [user, setUser] = useState("Student")
    const [userObj, setUserObj] = useState([])
    const router = useRouter();

    const userList = [
        "Student",
        "Faculty",
        "Admin",
    ];

    const handleDropdown = (event) => {
        setUser(event.target.value);
    };
    const notifySuccess = () => toast.success('Logged in successfully', {
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
    const notifyMissingCredentials = () => toast.error('Please Enter Credentials', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyMissingPassword = () => toast.error('Please Enter Password', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyMissingEmail = () => toast.error('Please Enter Email', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });


    const studentLogin = async (e) => {
        e.preventDefault();

        if (email && password) {
            const q = query(
                collection(db, "users"),
                where("email", "==", email.toLowerCase()),
                where("password", "==", password)
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                notifyError();
            } else {

                notifySuccess();
                if (typeof window !== 'undefined') {
                    localStorage.setItem("isUser", "true") || '';
                    localStorage.setItem("email", email) || '';
                }

                router.push("/homepage");
            }
        }
        else if (!email && password) {
            notifyMissingEmail()
        }
        else if (email && !password) {
            notifyMissingPassword()
        }
        else {
            notifyMissingCredentials()
        }
    };

    const adminLogin = async (e) => {
        e.preventDefault();

        if (email && password) {
            const q = query(
                collection(db, "admin"),
                where("email", "==", email),
                where("password", "==", password)
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                notifyError();
            } else {
                notifySuccess();
                if (typeof window !== 'undefined') {
                    localStorage.setItem("isAdmin", "true") || '';
                    localStorage.setItem("isUser", "false") || '';
                    localStorage.setItem("email", email) || '';
                }

                router.push("/adminpage");
            }
        }
        else if (!email && password) {
            notifyMissingEmail()
        }
        else if (username && !password) {
            notifyMissingPassword()
        }
        else {
            notifyMissingCredentials()
        }
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
                className='absolute object-cover h-screen w-screen z-10'
            />

            <div className='absolute  h-auto w-screen z-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900' />
            <motion.div
                initial={{ opacity: 0, y: -120 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeOut", duration: 1 }}
                className=' flex-col flex justify-center lg:justify-center items-center  lg:space-x-32   mx-10 z-20 absolute w-screen h-screen'>

                <div className='flex flex-col justify-center items-center mt-20 lg:w-auto mx-5 md:mx-0 space-y-10 lg:border lg:bg-gray-200  lg:p-10 lg:rounded-2xl lg:shadow-lg'>
                    <h1 className={`${manrope.className} text-4xl font-bold mb-10`}>Login for Feedback System</h1>
                    {/* Personal Details */}
                    <div className='flex flex-col justify-center lg:items-start items-center space-y-5 '>
                        <section className='flex lg:flex-row flex-col justify-evenly items-center lg:space-x-5 lg:space-y-0 space-y-5'>
                            <div className='flex flex-col space-y-5'>
                                <h1 className={`${manrope.className} md:text-xl text-md `}>Enter College Email ID</h1>
                                <input onChange={(e) => setEmail(e.target.value)} required type="text" placeholder="abc@sies.edu.in" className={`${manrope.className} placeholder:text-gray-500 px-5 w-72 py-2  outline-none border border-gray-800 lg:w-96`} />
                            </div>
                            <div className='flex flex-col space-y-5'>
                                <h1 className={`${manrope.className} md:text-xl text-md `}>Enter password</h1>
                                <input onChange={(e) => setPassword(e.target.value)} required type="password" className={`${manrope.className} placeholder:text-gray-500 px-5 w-72 py-2  outline-none border border-gray-800 lg:w-96`} />
                            </div>
                            {/* <div className='mt-10 flex justify-center items-center'>
                                {
                                    
                                    view ? <Image
                                    src="/view.png"
                                    width={100}
                                    height={100}
                                    alt="view"
                                    className=' w-7 object-contain cursor-pointer '
                                    onClick={()=> setView(false)}
                                />
                                :
                                <Image
                                    src="/hide.png"
                                    width={100}
                                    height={100}
                                    alt="hide"
                                    className=' w-7 object-contain cursor-pointer '
                                    onClick={()=> setView(true)}

                                />
                            
                            }
                            </div> */}
                        </section>
                    </div>
                    <div className='flex flex-col justify-start space-y-5 '>
                        <h1 className={`${manrope.className} md:text-xl text-md`}>Select your Role</h1>
                        <div className='flex justify-center items-center '>
                            <select
                                value={user}
                                onChange={handleDropdown}
                                className="block w-52 lg:w-96 py-2 px-5 leading-tight border border-gray-700 focus:outline-none cursor-pointer"
                            >
                                {userList.map((user, index) => (
                                    <option key={index} value={user}>
                                        {user}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className='bg-gray-300 w-full h-[1px] my-10 shadow-md' />


                    <div
                        onClick={user === "Student" ? studentLogin : '' || user === "Admin" ? adminLogin : ''}
                        class="w-96 relative cursor-pointer inline-flex items-center justify-center px-12 py-3 overflow-hidden text-lg font-medium text-black-600 border-2 border-black rounded-full hover:text-white group hover:bg-gray-50">
                        <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                        <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span class="relative text-2xl">Log In</span>
                    </div>
                    <h1 className={`${manrope.className} text-lg hover:underline cursor-pointer hover:text-blue-600`} onClick={() => router.push('/')}>Go back to Signup</h1>

                </div>

            </motion.div>

        </>
    )
}

export default Login