"use client"

import React, { useContext, useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import { Manrope, Raleway } from 'next/font/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from "../firebase"
import { useRouter } from 'next/navigation';

const raleway = Raleway({
    weight: ['400', '700'],
    subsets: ['latin'],
});
const manrope = Manrope({
    weight: ['400', '700'],
    subsets: ['latin'],
});

function GenerateFeedback() {
    const [fetch, setFetch] = useState(false)
    let detailsCount = 1;


    const [feedbackFormName, setFeedbackFormName] = useState()
    const [feedbackObj, setFeedbackObj] = useState([])
    const [detailsObj, setDetailsObj] = useState([])
    const [optionalSubjectDetailsModal, setOptionalSubjectDetailsModal] = useState([])
    const [modeOption, setModeOption] = useState("Theory")
    const router = useRouter();

    const [generateFeedbackModal, setGenerateFeedbackModal] = useState(false)


    var isAdmin = ''
    useEffect(() => {
        if (typeof window !== 'undefined') {
            isAdmin = localStorage.getItem("isAdmin") === "true" || '';
        }
        if (!isAdmin) {
            router.push('login');
        }
    }, [])



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



    useEffect(() => {
        if (!fetch) {
            const fetchFeedbacks = async () => {
                const querySnapshot = await getDocs(collection(db, "feedbacks"));
                const fetchFeedbackArray = [];

                querySnapshot.forEach((doc) => {
                    fetchFeedbackArray.push({ id: doc.id, name: doc.data().name });
                });
                setFeedbackObj(fetchFeedbackArray);
                setFetch(true);
            }

            fetchFeedbacks();
        }
    }, [fetch]);

    const addFeedback = async () => {
        try {
            await addDoc(collection(db, 'feedbacks'), {
                name: feedbackFormName,
                completed: 0
            });
            notifySuccess('Created feedback successfully');
            setFeedbackFormName('');
            setFetch(false); // Set fetch to false to trigger re-fetch of notifications
        } catch (error) {
            notifyError('Something went wrong');
        }
    }

    // Fetch all theory and practical teachers
    useEffect(() => {
        if (!fetch) {
            const fetchDetails = async () => {
                const querySnapshot = await getDocs(collection(db, "details"));
                const fetchedDetails = [];

                querySnapshot.forEach((doc) => {
                    fetchedDetails.push({
                        id: doc.id,
                        department: doc.data().department,
                        semester: doc.data().semester,
                        division: doc.data().division,
                        subject: doc.data().subject,
                        teacher: doc.data().teacher,
                        mode: doc.data().mode,
                        one: doc.data().one,
                        two: doc.data().two,
                        three: doc.data().three,
                        four: doc.data().four,
                        five: doc.data().five,
                        batch: doc.data().batch
                    });
                });

                setDetailsObj(fetchedDetails);
                setFetch(true);
            }

            fetchDetails();
        }
    }, [fetch]);

    // Fetch all optional subject teachers
    useEffect(() => {
        if (!fetch) {
            const fetchDetails = async () => {
                const querySnapshot = await getDocs(collection(db, "optionalSubjects"));
                const fetchedDetails = [];

                querySnapshot.forEach((doc) => {
                    fetchedDetails.push({
                        id: doc.id,
                        department: doc.data().department,
                        semester: doc.data().semester,
                        division: doc.data().division,
                        subject: doc.data().subject,
                        teacher: doc.data().teacher,
                        mode: doc.data().mode,
                        one: doc.data().one,
                        two: doc.data().two,
                        three: doc.data().three,
                        four: doc.data().four,
                        five: doc.data().five,
                        batch: doc.data().batch
                    });
                });

                setOptionalSubjectDetailsModal(fetchedDetails);
                setFetch(true);
            }

            fetchDetails();
        }
    }, [fetch]);

    async function deleteFeedback() {
        let userConfirmation = window.confirm("This operation will reset all values. Do you want to continue? ");

        if (userConfirmation) {

            // Update all of the Teachers Values should be back to 0 i.e one, two, three, four, five
            const querySnapshot = await getDocs(collection(db, "details"));

            // Use Promise.all to wait for all updates to complete
            await Promise.all(querySnapshot.docs.map(async (doc) => {
                try {
                    const docRef = doc.ref; // Get the reference to the document
                    await updateDoc(docRef, {
                        one: 0,
                        two: 0,
                        three: 0,
                        four: 0,
                        five: 0,
                    });

                } catch (error) {
                    alert(error);
                }
            }));

            // Update all of the Optional teachers collection as well
            const querySnapshot2 = await getDocs(collection(db, "optionalSubjects"));

            // Use Promise.all to wait for all updates to complete
            await Promise.all(querySnapshot2.docs.map(async (doc) => {
                try {
                    const docRef2 = doc.ref; // Get the reference to the document
                    await updateDoc(docRef2, {
                        one: 0,
                        two: 0,
                        three: 0,
                        four: 0,
                        five: 0,
                    });

                } catch (error) {
                    alert(error);
                }
            }));


            // Update all of the users with completed to false
            const querySnapshot3 = await getDocs(collection(db, "users"));

            // Use Promise.all to wait for all updates to complete
            await Promise.all(querySnapshot3.docs.map(async (doc) => {
                try {
                    const docRef3 = doc.ref; // Get the reference to the document
                    await updateDoc(docRef3, {
                        completed: "false"
                    });

                } catch (error) {
                    alert(error);
                }
            }));

            window.location.reload()
        }
    }






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

            {
                generateFeedbackModal && (
                    <div className={`${manrope.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}>
                        <div className="w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        Generate Feedback
                                    </h3>

                                    <button onClick={() => setGenerateFeedbackModal(null)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className='flex flex-col space-y-5 mb-20 text-white mx-12 my-5'>

                                    <h1 className={`${raleway.className} text-lg font-bold`}>Enter name for the feedback form</h1>

                                    <input
                                        onChange={(e) => setFeedbackFormName(e.target.value)}
                                        value={feedbackFormName}
                                        type="text"
                                        placeholder="End Semester Feedback Form '23"
                                        className="placeholder:text-gray-500  bg-gray-800 px-5 py-2 outline-none border border-gray-800 w-96"
                                    />
                                    <div type="submit" onClick={addFeedback} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
                                        <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                        <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </span>
                                        <span class="relative">Submit</span>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className='w-screen  flex mx-20 my-20'>
                <div className='flex flex-col'>


                    <div className='flex flex-col space-y-10 mb-20'>


                        <div className='flex flex-col space-y-5'>
                            <h1 className={`${raleway.className} text-4xl font-bold`}>Generate New Feedback Form</h1>
                            <div type="submit" onClick={() => setGenerateFeedbackModal(true)} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
                                <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span class="relative">Create Feedback</span>
                            </div>
                        </div>

                        <div className='flex flex-col space-y-5'>
                            <h1 className={`${raleway.className} text-4xl font-bold`}>Delete Existing Feedback</h1>
                            <div type="submit" onClick={deleteFeedback} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
                                <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span class="relative">Delete Feedback</span>
                            </div>
                        </div>

                    </div>


                    <div className='flex'>
                        {
                            feedbackObj.map((feedback) => (

                                <div className='flex'>
                                    <h1 className={`${raleway.className} text-2xl font-bold`}>{feedback.name}</h1>
                                </div>
                            ))
                        }
                    </div>
                    <motion.div className='flex  justify-center items-center cursor-pointer border border-gray-300 rounded-2xl w-[1000px] mt-5'>
                        <motion.div
                            className={`${modeOption === 'Theory'
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'bg-none'
                                } flex justify-center items-center  px-20 py-2 rounded-2xl w-full`}
                            onClick={() => setModeOption('Theory')}
                            whileHover={{ scale: 1.1 }} // Add animation on hover
                            transition={{ type: 'linear', stiffness: 300 }}
                        >
                            <h1 className={`${manrope.className} text-xl`}>Theory</h1>
                        </motion.div>
                        <motion.div
                            className={`${modeOption === 'Practical'
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'bg-none'
                                } flex justify-center items-center px-20 py-2 rounded-2xl w-full`}
                            onClick={() => setModeOption('Practical')}
                            whileHover={{ scale: 1.1 }} // Add animation on hover
                            transition={{ type: 'linear', stiffness: 300 }}
                        >
                            <h1 className={`${manrope.className} text-xl`}>Practical</h1>
                        </motion.div>
                        <motion.div
                            className={`${modeOption === 'OptionalSubject'
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'bg-none'
                                } flex justify-center items-center px-20 py-2 rounded-2xl w-full`}
                            onClick={() => setModeOption('OptionalSubject')}
                            whileHover={{ scale: 1.1 }} // Add animation on hover
                            transition={{ type: 'linear', stiffness: 300 }}
                        >
                            <h1 className={`${manrope.className} text-xl`}>Optional Subject</h1>
                        </motion.div>
                    </motion.div>
                    {
                        modeOption === "Theory" && (
                            <>
                                <div className='w-auto mt-20'>
                                    <h1 className={`${raleway.className} text-4xl font-bold`}>Theory Subjects</h1>
                                </div>
                                <div class={`${manrope.className} relative overflow-x-auto mt-10`}>
                                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead class="text-md text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="px-6 py-3">
                                                    Sr. No.
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Teacher
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    1
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    2
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    3
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    4
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    5
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Subject
                                                </th>

                                            </tr>
                                        </thead>
                                        {
                                            detailsObj.map((details) => (

                                                details.mode === "Theory" && (
                                                    <tbody>
                                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <th scope="row" class="w-24 px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                <h1>{detailsCount++}</h1>
                                                            </th>
                                                            <td class="px-6 py-4">
                                                                <h1 className='truncate w-auto'>{details.teacher}</h1>
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                <h1 className='truncate w-auto'>{details.one}</h1>
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                <h1 className='truncate w-auto'>{details.two}</h1>
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                <h1 className='truncate w-auto'>{details.three}</h1>
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                <h1 className='truncate w-auto'>{details.four}</h1>
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                <h1 className='truncate w-auto'>{details.five}</h1>
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                <h1 className='truncate w-auto'>{details.subject}</h1>
                                                            </td>

                                                        </tr>
                                                    </tbody>
                                                )
                                            ))
                                        }

                                    </table>
                                </div>
                            </>
                        )
                    }
                    {
                        modeOption === "Practical" && (
                            <>

                                <div className='w-auto mt-20'>
                                    <h1 className={`${raleway.className} text-4xl font-bold`}>Practical Subjects</h1>
                                </div>
                                <div class={`${manrope.className} relative overflow-x-auto mt-10`}>
                                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead class="text-md text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="px-6 py-3">
                                                    Sr. No.
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Teacher
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    1
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    2
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    3
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    4
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    5
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Subject
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Batch
                                                </th>

                                            </tr>
                                        </thead>

                                        {
                                            detailsObj.map((details) => (

                                                details.mode === "Practical" && (

                                                    <tbody>
                                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <th scope="row" class="w-24 px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                <h1>{detailsCount++}</h1>
                                                            </th>
                                                            <td class="px-6 py-4">
                                                                <h1 className='truncate w-auto'>{details.teacher}</h1>
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                <h1 className='truncate w-auto'>{details.one}</h1>
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                <h1 className='truncate w-auto'>{details.two}</h1>
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                <h1 className='truncate w-auto'>{details.three}</h1>
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                <h1 className='truncate w-auto'>{details.four}</h1>
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                <h1 className='truncate w-auto'>{details.five}</h1>
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                <h1 className='truncate w-auto'>{details.subject}</h1>
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                <h1 className='truncate w-auto'>{details.batch}</h1>
                                                            </td>


                                                        </tr>
                                                    </tbody>
                                                )
                                            ))
                                        }

                                    </table>
                                </div>
                            </>)
                    }
                    {
                        modeOption === "OptionalSubject" && (
                            <>

                                <div className='w-auto mt-20'>
                                    <h1 className={`${raleway.className} text-4xl font-bold`}>Optional Subjects</h1>
                                </div>
                                <div class={`${manrope.className} relative overflow-x-auto mt-10`}>
                                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead class="text-md text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="px-6 py-3">
                                                    Sr. No.
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Teacher
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    1
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    2
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    3
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    4
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    5
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Subject
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Division
                                                </th>

                                            </tr>
                                        </thead>

                                        {
                                            optionalSubjectDetailsModal.map((details) => (


                                                <tbody>
                                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row" class="w-24 px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            <h1>{detailsCount++}</h1>
                                                        </th>
                                                        <td class="px-6 py-4">
                                                            <h1 className='truncate w-auto'>{details.teacher}</h1>
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <h1 className='truncate w-auto'>{details.one}</h1>
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <h1 className='truncate w-auto'>{details.two}</h1>
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <h1 className='truncate w-auto'>{details.three}</h1>
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <h1 className='truncate w-auto'>{details.four}</h1>
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <h1 className='truncate w-auto'>{details.five}</h1>
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <h1 className='truncate w-auto'>{details.subject}</h1>
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <h1 className='truncate w-auto'>{details.division}</h1>
                                                        </td>


                                                    </tr>
                                                </tbody>
                                            ))
                                        }

                                    </table>
                                </div>
                            </>)
                    }


                </div>

            </div>


        </>

    )
}


export default GenerateFeedback

