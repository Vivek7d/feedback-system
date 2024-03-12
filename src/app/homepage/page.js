"use client"

import React, { useEffect, useState } from 'react'
import StudentNavbar from "../../../components/StudentNavbar"
import StudentDashboard from "../../../components/StudentDashboard"
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useRouter } from 'next/navigation'
import { JellyTriangle } from '@uiball/loaders'

function page() {

    var userEmail = ''
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const [userObj, setUserObj] = useState([])
    const [fetch, setFetch] = useState(false)


    let isUser = '';

    useEffect(() => {
  
        isUser = localStorage.getItem("isUser") === "true" || '';
  
      if (!isUser) {
        router.push('login');
      } else {
        setLoading(false);
      }
    }, [])


    useEffect(() => {
        if (typeof window !== 'undefined') {
            isUser = localStorage.getItem("isUser") === "true" || '';
            userEmail = localStorage.getItem("email") || '';
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
                    querySnapshot.forEach((doc) => {
                        fetchUserDetails.push({
                            id: doc.id,
                            fullName: doc.data().fullName,
                            email: doc.data().email,
                            PRN: doc.data().PRN,
                            department: doc.data().department,
                            semester: doc.data().semester,
                            batch: doc.data().batch,
                            year: doc.data().year,
                            completed: doc.data().completed,
                            optionalSubject: doc.data().optionalSubject
                        });
    
                  
                    });
    
                    setUserObj(fetchUserDetails);
                    setFetch(true);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
    
        if (!fetch) {
            fetchUser();
        }
    }, [fetch, db, userEmail]);

    return (

        <div>

            {loading ?
                (
                    <div className="flex items-center justify-center w-screen h-screen">
                        <JellyTriangle color="black" size={100} />
                    </div>)
                :
                (<>

                    {fetch && <StudentNavbar userObj={userObj} />}
                    {fetch && <StudentDashboard userObj={userObj} />}
                    {
                        userObj.map((user) => (
                            <div>
                                <h1 className='text-2xl'>Welcome {user.fullName}</h1>
                            </div>
                        ))
                    }
                </>)

            }



        </div>
    )
}

export default page