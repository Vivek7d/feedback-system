import { FieldValue, collection, doc, getDocs, increment, query, updateDoc, where } from 'firebase/firestore';
import React from 'react'
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Manrope, Raleway } from 'next/font/google';
import { useRouter } from 'next/navigation';
import Forms from "../components/forms"

const raleway = Raleway({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const manrope = Manrope({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
});

function Feedback({ fullName, feedbackName, PRN, feedbackId }) {
    const router = useRouter();

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
    const updateUser = async (e) => {
        e.preventDefault();

        if (email && password) {
            const q = query(
                collection(db, "users"),
                where("PRN", "==", PRN),
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                notifyError();
            } else {
                notifySuccess();
            }
        }
        else if (!username && password) {
            notifyMissingUsername()
        }
        else if (username && !password) {
            notifyMissingPassword()
        }
        else {
            notifyMissingCredentials()
        }
    };



    async function updateFeedback() {
        const docRef = doc(db, "feedbacks", feedbackId);

        try {
            await updateDoc(docRef, {
                completed: increment(1),
            });

            notifySuccess('Submitted Feedback successfully');
            router.push('/homepage');
        } catch (error) {
            alert(error);
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
            <div>
                <header className={`${manrope.className} bg-gray-900 p-4 text-white text-center py-10 space-y-10`}>
                    <h1 className='text-4xl font-bold'>{feedbackName}</h1>
                    <h1 className='text-xl'>Welcome, {fullName} !</h1>
                    <h1 className='text-xl'>PRN: {PRN} </h1>
                </header>
            </div>

        </>

    )
}

export default Feedback