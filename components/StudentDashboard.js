import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Manrope, Raleway } from 'next/font/google';

const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ['latin'],
});
const manrope = Manrope({
  weight: ['400', '700'],
  subsets: ['latin'],
});
function StudentDashboard({ userObj }) {
  const [feedbackObj, setFeedbackObj] = useState([])
  const [fetch, setFetch] = useState(false)

  var userEmail = ''
  let isUser = '';

  useEffect(() => {

    isUser = localStorage.getItem("isUser") === "true" || '';

    if (!isUser) {
      router.push('login');
    }
  }, [])


  useEffect(() => {
    if (typeof window !== 'undefined') {
      isUser = localStorage.getItem("isUser") === "true" || '';
      userEmail = localStorage.getItem("email") || '';
    }

  }, []);


  useEffect(() => {
    if (!fetch) {
      const fetchFeedbacks = async () => {
        const querySnapshot = await getDocs(collection(db, "feedbacks"));
        const fetchFeedbackArray = [];

        querySnapshot.forEach((doc) => {
          fetchFeedbackArray.push({ id: doc.id, name: doc.data().name, completed: doc.data().completed });
        });
        setFeedbackObj(fetchFeedbackArray);
        setFetch(true);
      }

      fetchFeedbacks();
    }
  }, [fetch]);

  //   async function registerUser() {
  //     try {
  //         const updateUser = userObj.map(async (user) => {
  //             const docRef = doc(db, "users", user.id);
  //             await updateDoc(docRef, {
  //                 completed: "true",
  //             });
  //         });

  //         await Promise.all(updateUser);

  //     } catch (error) {
  //         alert(error);
  //     }
  // }


  return (
    <div className={`${manrope.className} `}>

      <header className="bg-gray-800 p-4 text-white text-center">
        {
          userObj.map((user) => (
            <h1 className='text-2xl'>Welcome, {user.fullName} !</h1>
          ))
        }
      </header>

      <div className="flex flex-col items-center justify-center min-h-screen pb-40">
        <section className="flex justify-around w-full">
          {
            feedbackObj.map((feedback) => (
              userObj.map((user) => (
                user.completed === "false" ? (<div className="card total-feedback bg-gray-800 text-white border border-gray-300 p-12 text-center rounded">
                  <Link
                    key={feedback}
                    href={{
                      pathname: `/homepage/${feedback.name}`,
                      query: { feedbackId: feedback.id, feedback: feedback.name, fullName: user.fullName, PRN: user.PRN, department: user.department },
                    }}>{feedback.name}</Link>
                  <h1>Completed: {feedback.completed}</h1>
                </div>)
                  :
                  (
                    <div>
                      <h1 className='text-3xl font-bold '>You have submitted your feedback!</h1>
                    </div>
                  )
              ))
            ))
          }

        </section>
      </div>
    </div>
  )
}

export default StudentDashboard