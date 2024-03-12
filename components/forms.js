
import { collection, doc, getDocs, increment, query, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const Forms = ({ feedbackId, user }) => {
  const [fetch, setFetch] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [one, setOne] = useState(0);
  const [two, setTwo] = useState(0);
  const [three, setThree] = useState(0);
  const [four, setFour] = useState(0);
  const [five, setFive] = useState(0);
  const [totalSubjectCount, setTotalSubjectCount] = useState(0);
  const [submissionTrack, setSubmissionTrack] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState({});
  const [practicalSubmissionStatus, setPracticalSubmissionStatus] = useState({})
  const [optionalSubmissionStatus, setOptionalSubmissionStatus] = useState({})
  const [totalCount, setTotalCount] = useState(0)

  var subjectCount = 1;
  var isUser = ''
  var userEmail = ''
  const router = useRouter();


  const [optionalTeachersObj, setOptionalTeachersObj] = useState([])
  const [practicalTeachersObj, setPracticalTeachersObj] = useState([])
  const [theoryTeachersObj, setTheoryTeachersObj] = useState([])

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
    if (typeof window !== 'undefined') {
      const storedSubmissionStatus = JSON.parse(localStorage.getItem('ss')) || {};
      const storedPracticalSubmissionStatus = JSON.parse(localStorage.getItem('ps')) || {};
      const storedOptionalSubmissionStatus = JSON.parse(localStorage.getItem('os')) || {};
      const storedTotalCount = localStorage.getItem('c') || 0;

      setSubmissionStatus(storedSubmissionStatus);
      setPracticalSubmissionStatus(storedPracticalSubmissionStatus);
      setOptionalSubmissionStatus(storedOptionalSubmissionStatus);
      setTotalCount(storedTotalCount);
    }
  }, []);

  const updateSubmissionStatus = (subject) => {
    const updatedStatus = { ...submissionStatus, [subject]: true };
    setSubmissionStatus(updatedStatus);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ss', JSON.stringify(updatedStatus));
    }
  };

  const updatePracticalSubmissionStatus = (subject) => {
    const updatedPracticalStatus = { ...practicalSubmissionStatus, [subject]: true };
    setPracticalSubmissionStatus(updatedPracticalStatus);

    if (typeof window !== 'undefined') {
      localStorage.setItem('ps', JSON.stringify(updatedPracticalStatus));
    }
  };

  const updateOptionalSubmissionStatus = (subject) => {
    const updatedOptionalStatus = { ...optionalSubmissionStatus, [subject]: true };
    setOptionalSubmissionStatus(updatedOptionalStatus);
    if (typeof window !== 'undefined') {
      localStorage.setItem('os', JSON.stringify(updatedOptionalStatus));
    }
  };
  const updateTotalCount = (count) => {
    setTotalCount((prevCount) => prevCount + count);
    if (typeof window !== 'undefined') {
      localStorage.setItem('c', totalCount);
    }
  };

  const notifySuccess = () => toast.success('Submitted successfully', {
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


  const feedbackQuestions = [
    'How well did the teacher explain the concepts?',
    'Was the teacher well-prepared for the class?',
    'Did the teacher encourage questions and discussions?',
    'Rate the teacher\'s clarity in communication.',
    'Did the teacher provide useful feedback on assignments?',

  ];

  const TE_CE_5 = [
    "Data Warehousing and Mining",
    "Computer Network",
    "Software Engineering",
    "Theoretical Computer Science",
    "PCE",
  ]



  async function updateFeedback() {
    const docRef = doc(db, "feedbacks", feedbackId);
    const docRef2 = doc(db, "users", user.id);


    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('os');
        localStorage.removeItem('ss');
        localStorage.removeItem('ps');
        localStorage.removeItem('c');
      }
      const updateUser = async () => {
        const docRef = doc(db, "users", user.id);
        await updateDoc(docRef, {
          completed: "true",
          count: totalCount
        });
      };


    } catch (error) {
      alert(error);
    }
    try {
      await updateDoc(docRef, {
        completed: increment(1),
      });

    } catch (error) {
      console.log(error);
    }

    try {
      await updateDoc(docRef2, {
        completed: "true",
      });

      alert('Submitted Feedback successfully');
      router.push('/homepage');
    } catch (error) {
      console.log(error);
    }
  }


  function handleRadio(index, option) {

    if (option === 1) {
      setOne((num) => num + 1);
    }
    if (option === 2) {
      setTwo((num) => num + 1);
    }
    if (option === 3) {
      setThree((num) => num + 1);
    }
    if (option === 4) {
      setFour((num) => num + 1);
    }
    if (option === 5) {
      setFive((num) => num + 1);
    }
  }

  async function updateTheorySubject(one, two, three, four, five, subject) {


    if (one + two + three + four + five === 5) {
      const q = query(
        collection(db, "details"),
        where("subject", "==", subject),
        where("department", "==", user.department),
        where("mode", "==", "Theory")
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        notifyError();
      } else {
        const docRef = doc(db, "details", querySnapshot.docs[0].id);
        // const docRef2 = doc(db, "users", user.id);

        await updateDoc(docRef, {
          one: increment(one),
          two: increment(two),
          three: increment(three),
          four: increment(four),
          five: increment(five),
        });
        // await updateDoc(docRef2, {
        //   count: totalCount
        // });

        setOne(0);
        setTwo(0);
        setThree(0);
        setFour(0);
        setFive(0);

        setSubmissionTrack((count) => count + 1);
        updateSubmissionStatus(subject);
        updateTotalCount(1);
        notifySuccess();
        console.log(one, two, three, four, five, subject)
      }
    } else {
      alert("Please provide ratings for all questions.");
      console.log("Not done", one, two, three, four, five, subject);
    }
  }


  async function updatePracticalSubject(one, two, three, four, five, subject) {

    if (one + two + three + four + five === 5) {

      const q = query(
        collection(db, "details"),
        where("subject", "==", subject),
        where("department", "==", user.department),
        where("mode", "==", "Practical")
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        notifyError();
      } else {
        const docRef = doc(db, "details", querySnapshot.docs[0].id);

        await updateDoc(docRef, {
          one: increment(one),
          two: increment(two),
          three: increment(three),
          four: increment(four),
          five: increment(five),
        });

        setOne(0);
        setTwo(0);
        setThree(0);
        setFour(0);
        setFive(0);
        setSubmissionTrack((count) => count + 1)
        updatePracticalSubmissionStatus(subject);
        updateTotalCount(1);
        notifySuccess();
        console.log(one, two, three, four, five, subject);

      }
    } else {
      console.log("Not done", one, two, three, four, five, subject);
      alert("Please provide ratings for all questions.");
    }
  }
  async function updateOptionalSubject(one, two, three, four, five, subject) {

    if (one + two + three + four + five === 5) {

      const q = query(
        collection(db, "optionalSubjects"),
        where("subject", "==", subject),
        where("department", "==", user.department),
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        notifyError();
      } else {
        const docRef = doc(db, "optionalSubjects", querySnapshot.docs[0].id);

        await updateDoc(docRef, {
          one: increment(one),
          two: increment(two),
          three: increment(three),
          four: increment(four),
          five: increment(five),
        });

        setOne(0);
        setTwo(0);
        setThree(0);
        setFour(0);
        setFive(0);
        setSubmissionTrack((count) => count + 1)
        updateOptionalSubmissionStatus(subject);
        updateTotalCount(1);
        notifySuccess();
        console.log(one, two, three, four, five, subject);

      }
    }
    else {
      console.log("Not done", one, two, three, four, five, subject);
      alert("Please provide ratings for all questions.");
    }

  }

  useEffect(() => {
    const fetchPracticalTeachers = async () => {
      const q = query(
        collection(db, "details"),
        where("department", "==", user.department),
        where("batch", "==", user.batch),
        where("semester", "==", user.semester),
        where("division", "==", user.division),
        where("mode", "==", "Practical"),
      );

      try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          alert("Not Found");
        } else {
          var practicalTeacherDetails = [];
          querySnapshot.forEach((doc) => (
            practicalTeacherDetails.push({
              id: doc.id,
              teacher: doc.data().teacher,
              subject: doc.data().subject
            })
          ));

          setPracticalTeachersObj(practicalTeacherDetails);
          setFetch(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!fetch) {
      fetchPracticalTeachers();
    }
  }, [fetch, db]);


  useEffect(() => {
    const fetchOptionalTeachers = async () => {
      const q = query(
        collection(db, "optionalSubjects"),
        where("department", "==", user.department),
        where("semester", "==", user.semester),
        where("subject", "==", user.optionalSubject),
      );

      try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          alert("Not Found");
        } else {
          var optionalTeacherDetails = [];
          querySnapshot.forEach((doc) => (
            optionalTeacherDetails.push({
              id: doc.id,
              teacher: doc.data().teacher,
              subject: doc.data().subject
            })
          ));

          setOptionalTeachersObj(optionalTeacherDetails);
          setFetch(true);
        }
      } catch (error) {
        alert(error);
      }
    };

    if (!fetch) {
      fetchOptionalTeachers();
    }
  }, [fetch, db]);


  useEffect(() => {
    const fetchTheoryTeachers = async () => {
      const q = query(
        collection(db, "details"),
        where("department", "==", user.department),
        where("semester", "==", user.semester),
        where("division", "==", user.division),
        where("mode", "==", "Theory"),
      );

      try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          alert("Not Found");
        } else {
          var theoryTeacherDetails = [];
          querySnapshot.forEach((doc) => (
            theoryTeacherDetails.push({
              id: doc.id,
              teacher: doc.data().teacher,
              subject: doc.data().subject
            })
          ));

          setTheoryTeachersObj(theoryTeacherDetails);
          setTotalSubjectCount((count) => theoryTeacherDetails.length + count)
          setFetch(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!fetch) {
      fetchTheoryTeachers();
    }
  }, [fetch, db]);


  useEffect(() => {
    const subjectMapping = async () => {
      try {
        if (user.department === "Computer Engineering" && user.semester === "Semester 5" && user.batch === "D3" && user.division === "D") {
          setSubjects(TE_CE_5)
        }
        else {
          setSubjects([])
        }
        setFetch(true)

      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (!fetch) {
      subjectMapping();
    }
  }, [fetch]);



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

      <div className={`${manrope.className} flex items-center justify-center min-h-screen bg-[#F8F7F2] py-20`}>
        <div className="bg-[#F8F7F2] p-8 rounded-lg border shadow-lg w-full max-w-4xl">
          <div className="text-center mb-8">
            <img
              src="https://siesgst.edu.in/images/sies_gst_logo.jpg"
              alt="Logo"
              className="mx-auto max-h-20"
            />
            <h2 className="text-3xl font-bold mt-4">Theory Subjects</h2>
          </div>
          {
            theoryTeachersObj.map((teacher, index) => (
              (
                <>
                  <h1 className='font-semibold flex'><h1 className='mr-3'>{subjectCount++}.</h1>{teacher.subject}</h1>
                  <h1 className='font-semibold'>Teacher: {teacher.teacher}</h1>
                  <table className="w-full mt-4">
                    <tbody>
                      {feedbackQuestions.map((question, index) => (
                        <tr key={index}>
                          <td className="py-2">
                            <label className="block text-sm font-medium text-gray-600">{question}</label>
                          </td>
                          <td className="py-2">
                            <div className="flex items-center space-x-8">
                              {[1, 2, 3, 4, 5].map(option => (
                                <React.Fragment key={option}>
                                  <input type="radio" value={option} onChange={() => handleRadio(index, option)} className='w-5 h-5' name={index} />
                                  <label className="text-center">{option}</label>
                                </React.Fragment>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-center my-6">
                    <button
                      id={teacher.subject}
                      disabled={submissionStatus[teacher.subject]}
                      onClick={() => updateTheorySubject(one, two, three, four, five, teacher.subject)}
                      className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </>
              ))


            )
          }

          <h2 className="text-3xl font-bold my-10 text-center">Practical Subjects</h2>
          {
            practicalTeachersObj.map((teacher, index) => (
              (
                <>
                  <h1 className='font-semibold flex'><h1 className='mr-3'>{subjectCount++}.</h1>{teacher.subject}</h1>
                  <h1 className='font-semibold'>Teacher: {teacher.teacher}</h1>
                  <table className="w-full mt-4">
                    <tbody>
                      {feedbackQuestions.map((question, index) => (
                        <tr key={index}>
                          <td className="py-2">
                            <label className="block text-sm font-medium text-gray-600">{question}</label>
                          </td>
                          <td className="py-2">
                            <div className="flex items-center space-x-8">
                              {[1, 2, 3, 4, 5].map(option => (
                                <React.Fragment key={option}>
                                  <input type="radio" value={option} onChange={() => handleRadio(index, option)} className='w-5 h-5' name={index} />
                                  <label className="text-center">{option}</label>
                                </React.Fragment>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-center my-6">
                    <button
                      id={teacher.subject}
                      disabled={practicalSubmissionStatus[teacher.subject]}
                      onClick={() => updatePracticalSubject(one, two, three, four, five, teacher.subject)}
                      className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </>
              )))
          }
          <h2 className="text-3xl font-bold my-10 text-center">Optional Subjects</h2>
          {
            optionalTeachersObj.map((teacher, index) => (
              (
                <>
                  <h1 className='font-semibold flex'><h1 className='mr-3'>{subjectCount++}.</h1>{teacher.subject}</h1>
                  <h1 className='font-semibold'>Teacher: {teacher.teacher}</h1>
                  <table className="w-full mt-4">
                    <tbody>
                      {feedbackQuestions.map((question, index) => (
                        <tr key={index}>
                          <td className="py-2">
                            <label className="block text-sm font-medium text-gray-600">{question}</label>
                          </td>
                          <td className="py-2">
                            <div className="flex items-center space-x-8">
                              {[1, 2, 3, 4, 5].map(option => (
                                <React.Fragment key={option}>
                                  <input type="radio" value={option} onChange={() => handleRadio(index, option)} className='w-5 h-5' name={index} />
                                  <label className="text-center">{option}</label>
                                </React.Fragment>
                              ))}
                            </div>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-center my-6">
                    <button
                      id={teacher.subject}
                      disabled={submissionStatus[teacher.subject]}
                      onClick={() => updateOptionalSubject(one, two, three, four, five, teacher.subject)}
                      className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </>
              )))
          }

          {
            totalCount == 10 && (
              <div className='flex justify-center items-center'>
                <div
                  onClick={updateFeedback}
                  type="submit" class="my-20 cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
                  <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                  <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>
                  <span class="relative">Done</span>
                </div>
              </div>
            )
          }


        </div>

      </div>
    </>

  );
};

export default Forms;
