"use client"

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Feedback from "../../../../components/Feedback"
import Forms from '../../../../components/forms'
import Forms2 from '../../../../components/forms2'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../firebase'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function page({ params }) {

    const searchParams = useSearchParams()

    const feedbackName = searchParams.get('feedback')
    const fullName = searchParams.get('fullName')
    const PRN = searchParams.get('PRN')
    const feedbackId = searchParams.get('feedbackId')
    const department = searchParams.get('department')
    const [email, setEmail] = useState("")
    var isUser = ''
    var userEmail = ''


    const router = useRouter();

    const [userObj, setUserObj] = useState([])
    const [fetch, setFetch] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            isUser = localStorage.getItem("isUser") === "true" || '';
            userEmail = localStorage.getItem("email") || '';
        }
        if (!isUser) {
            router.push('login');
        }
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            const q = query(
                collection(db, "users"),
                where("email", "==", userEmail),
            );

            try {
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    alert("Not Found");
                } else {
                    var fetchUserDetails = [];
                    querySnapshot.forEach((doc) => (
                        fetchUserDetails.push({
                            id: doc.id,
                            fullName: doc.data().fullName,
                            email: doc.data().email,
                            PRN: doc.data().PRN,
                            department: doc.data().department,
                            semester: doc.data().semester,
                            batch: doc.data().batch,
                            year: doc.data().year,
                            division: doc.data().division,
                            completed: doc.data().completed,
                            optionalSubject: doc.data().optionalSubject
                        })
                    ));

                    setUserObj(fetchUserDetails);
                    setFetch(true);
                }
            } catch (error) {
                alert(error);
            }
        };

        if (!fetch) {
            fetchUser();
        }
    }, [fetch, db]);

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
            <Feedback feedbackName={feedbackName} fullName={fullName} PRN={PRN} feedbackId={feedbackId} department={department} />
            {userObj.map((user) => (
                user.completed === "false" && <Forms user={user} feedbackId={feedbackId} />
                // user.completed === "false" && <Forms2 user={user} feedbackId={feedbackId} />
                // <Forms user={user} feedbackId={feedbackId} />
            ))}

        </>

    )
}

export default page