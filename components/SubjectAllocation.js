import React, { useEffect, useState } from "react";
import { Manrope, Raleway } from "next/font/google";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const raleway = Raleway({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const manrope = Manrope({
  weight: ["400", "700"],
  subsets: ["latin"],
});
function SubjectAllocation({ theoryObj, practicalObj, optionalObj }) {
  const [optionalDetailsModal, setOptionalDetailsModal] = useState(null);
  let detailsCount = 1;
  const [practicalDetailsModal, setPracticalDetailsModal] = useState(null);
  const [theoryDetailsModal, setTheoryDetailsModal] = useState(null);
  const [modeOption, setModeOption] = useState("Theory");
  const [editDepartment, setEditDepartment] = useState();
  const [editSemester, setEditSemester] = useState();
  const [editDivision, setEditDivision] = useState();
  const [editSubject, setEditSubject] = useState();
  const [editTeacher, setEditTeacher] = useState();
  const [editBatch, setEditBatch] = useState();

  const notifySuccess = () =>
    toast.success("Updated Details Successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyError = () =>
    toast.error("Unable to Update", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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
  ];
  const semList = [
    "semester 1",
    "semester 2",
    "semester 3",
    "semester 4",
    "semester 5",
    "semester 6",
    "semester 7",
    "semester 8",
  ];
  const subjectList = [
    "Data Warehousing and Mining",
    "Computer Network",
    "Software Engineering",
    "Theoretical Computer Science",
    "Internet Programming",
    "Probablistic Graphical Models",
    "Professional Communication Ethics",
  ];
  const divisionList = ["C", "D"];
  const batchList = ["D1", "D2", "D3"];
  const modeList = ["Theory", "Practical"];
  const teacherList = [
    "Sunil Punjabi",
    "Masooda Modak",
    "Namrata Patel",
    "Urvashi Patkar",
    "Anindita Mam",
    "Ram Bhise Sir",
  ];

  const handleDepartmentDropdown = (event) => {
    setEditDepartment(event.target.value);
  };
  const handleSemesterDropdown = (event) => {
    setEditSemester(event.target.value);
  };
  const handleDivisionDropdown = (event) => {
    setEditDivision(event.target.value);
  };
  const handleSubjectDropdown = (event) => {
    setEditSubject(event.target.value);
  };
  const handleTeacherDropdown = (event) => {
    setEditTeacher(event.target.value);
  };
  const handleBatchDropdown = (event) => {
    setEditBatch(event.target.value);
  };

  async function deleteDetails(details) {
    var answer = window.confirm("Delete Details?");
    if (answer) {
      await deleteDoc(doc(db, "details", details.id));
      window.location.reload();
    } else {
      return;
    }
  }

  async function deleteOptionalDetails(details) {
    var answer = window.confirm("Delete Details?");
    if (answer) {
      await deleteDoc(doc(db, "optionalSubjects", details.id));
      window.location.reload();
    } else {
      return;
    }
  }

  async function editTheoryDetails(theoryDetailsModal) {
    const docRef = doc(db, "details", theoryDetailsModal.id);

    try {
      await updateDoc(docRef, {
        department: editDepartment
          ? editDepartment
          : theoryDetailsModal.department,
        semester: editSemester ? editSemester : theoryDetailsModal.semester,
        division: editDivision ? editDivision : theoryDetailsModal.division,
        subject: editSubject ? editSubject : theoryDetailsModal.subject,
        teacher: editTeacher ? editTeacher : theoryDetailsModal.teacher,
      });

      notifySuccess("Updated the Teacher Name successfully");
      window.location.reload();
    } catch (error) {
      notifyError("Unable to update");
    }
  }
  async function editPracticalDetails(practicalDetailsModal) {
    const docRef = doc(db, "details", practicalDetailsModal.id);

    try {
      await updateDoc(docRef, {
        department: editDepartment
          ? editDepartment
          : practicalDetailsModal.department,
        semester: editSemester ? editSemester : practicalDetailsModal.semester,
        division: editDivision ? editDivision : practicalDetailsModal.division,
        subject: editSubject ? editSubject : practicalDetailsModal.subject,
        teacher: editTeacher ? editTeacher : practicalDetailsModal.teacher,
        batch: editBatch ? editBatch : practicalDetailsModal.batch,
      });

      notifySuccess("Updated the Teacher Name successfully");
      window.location.reload();
    } catch (error) {
      notifyError("Unable to update");
    }
  }
  async function editOptionalDetails(optionalDetailsModal) {
    const docRef = doc(db, "optionalSubjects", optionalDetailsModal.id);

    try {
      await updateDoc(docRef, {
        department: editDepartment
          ? editDepartment
          : optionalDetailsModal.department,
        semester: editSemester ? editSemester : optionalDetailsModal.semester,
        subject: editSubject ? editSubject : optionalDetailsModal.subject,
        teacher: editTeacher ? editTeacher : optionalDetailsModal.teacher,
      });

      notifySuccess("Updated the Teacher Name successfully");
      window.location.reload();
    } catch (error) {
      notifyError("Unable to update");
    }
  }

  return (
    <>
      {theoryDetailsModal && (
        <div
          className={`${manrope.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}
        >
          <div className="w-full max-w-2xl bg-white rounded-lg  ">
            <div class="relative bg-white rounded-lg shadow ">
              <div class="flex items-start justify-between p-4 border-b  ">
                <h3 class="text-xl font-semibold text-black ">
                  Edit Theory Details
                </h3>
                <button
                  onClick={() => {
                    setEditDepartment("");
                    setEditSemester("");
                    setEditDivision("");
                    setEditSubject("");
                    setEditTeacher("");
                    setTheoryDetailsModal(null);
                  }}
                  type="button"
                  class=" bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
                  data-modal-hide="default-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div className="flex flex-col space-y-5 mb-20 text-black mx-12 my-5">
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Department
                </h1>

                <select
                  value={editDepartment}
                  onChange={handleDepartmentDropdown}
                  className="block w-[400px] bg-white border border-gray-800  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                >
                  {departmentList.map((editDepartment, index) => (
                    <option key={index} value={editDepartment}>
                      {editDepartment}
                    </option>
                  ))}
                </select>
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Semester
                </h1>

                <select
                  value={editSemester}
                  onChange={handleSemesterDropdown}
                  className="block w-[400px] bg-white border border-gray-800  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                >
                  {semList.map((editSemester, index) => (
                    <option key={index} value={editSemester}>
                      {editSemester}
                    </option>
                  ))}
                </select>
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Division
                </h1>

                <select
                  value={editDivision}
                  onChange={handleDivisionDropdown}
                  className="block w-[400px] bg-white border border-gray-800  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                >
                  {divisionList.map((editDivision, index) => (
                    <option key={index} value={editDivision}>
                      {editDivision}
                    </option>
                  ))}
                </select>
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Subject
                </h1>

                <select
                  value={editSubject}
                  onChange={handleSubjectDropdown}
                  className="block w-[400px] bg-white border border-gray-800  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                >
                  {subjectList.map((editSubject, index) => (
                    <option key={index} value={editSubject}>
                      {editSubject}
                    </option>
                  ))}
                </select>
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Teacher
                </h1>

                <select
                  value={editTeacher}
                  onChange={handleTeacherDropdown}
                  className="block w-[400px] bg-white border border-gray-800  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                >
                  {teacherList.map((editTeacher, index) => (
                    <option key={index} value={editTeacher}>
                      {editTeacher}
                    </option>
                  ))}
                </select>

                <div
                  type="submit"
                  onClick={() => editTheoryDetails(theoryDetailsModal)}
                  class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600"
                >
                  <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                  <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span class="relative">Submit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {practicalDetailsModal && (
        <div
          className={`${manrope.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}
        >
          <div className="w-full max-w-2xl bg-white rounded-lg  ">
            <div class="relative bg-white rounded-lg shadow ">
              <div class="flex items-start justify-between p-4 border-b  ">
                <h3 class="text-xl font-semibold text-black ">
                  Edit Practical Details
                </h3>
                <button
                  onClick={() => {
                    setEditDepartment("");
                    setEditSemester("");
                    setEditDivision("");
                    setEditSubject("");
                    setEditTeacher("");
                    setEditBatch("");
                    setTheoryDetailsModal(null);
                  }}
                  type="button"
                  class=" bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
                  data-modal-hide="default-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div className="flex flex-col space-y-5 mb-20 text-black mx-12 my-5">
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Department
                </h1>

                <select
                  value={editDepartment}
                  onChange={handleDepartmentDropdown}
                  className="block w-[400px] bg-white border border-gray-800  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                >
                  {departmentList.map((editDepartment, index) => (
                    <option key={index} value={editDepartment}>
                      {editDepartment}
                    </option>
                  ))}
                </select>
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Semester
                </h1>

                <select
                  value={editSemester}
                  onChange={handleSemesterDropdown}
                  className="block w-[400px] bg-white border border-gray-800  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                >
                  {semList.map((editSemester, index) => (
                    <option key={index} value={editSemester}>
                      {editSemester}
                    </option>
                  ))}
                </select>
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Division
                </h1>

                <select
                  value={editDivision}
                  onChange={handleDivisionDropdown}
                  className="block w-[400px] bg-white border border-gray-800  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                >
                  {divisionList.map((editDivision, index) => (
                    <option key={index} value={editDivision}>
                      {editDivision}
                    </option>
                  ))}
                </select>
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Subject
                </h1>

                <select
                  value={editSubject}
                  onChange={handleSubjectDropdown}
                  className="block w-[400px] bg-white border border-gray-800  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                >
                  {subjectList.map((editSubject, index) => (
                    <option key={index} value={editSubject}>
                      {editSubject}
                    </option>
                  ))}
                </select>
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Teacher
                </h1>

                <select
                  value={editTeacher}
                  onChange={handleTeacherDropdown}
                  className="block w-[400px] bg-white border border-gray-800  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                >
                  {teacherList.map((editTeacher, index) => (
                    <option key={index} value={editTeacher}>
                      {editTeacher}
                    </option>
                  ))}
                </select>
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Batch
                </h1>

                <select
                  value={editBatch}
                  onChange={handleBatchDropdown}
                  className="block w-[400px] bg-white border border-gray-800  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                >
                  {batchList.map((editBatch, index) => (
                    <option key={index} value={editBatch}>
                      {editBatch}
                    </option>
                  ))}
                </select>

                <div
                  type="submit"
                  onClick={() => editTheoryDetails(practicalDetailsModal)}
                  class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600"
                >
                  <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                  <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span class="relative">Submit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {optionalDetailsModal && (
        <div
          className={`${manrope.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}
        >
          <div className="w-full max-w-2xl bg-white rounded-lg  ">
            <div class="relative bg-white rounded-lg shadow ">
              <div class="flex items-start justify-between p-4 border-b  ">
                <h3 class="text-xl font-semibold text-black ">
                  Edit Optional Subject Details
                </h3>
                <button
                  onClick={() => {
                    setEditDepartment("");
                    setEditSemester("");
                    setEditSubject("");
                    setEditTeacher("");
                    setOptionalDetailsModal(null);
                  }}
                  type="button"
                  class=" bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
                  data-modal-hide="default-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div className="flex flex-col space-y-5 mb-20 text-black mx-12 my-5">
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Department
                </h1>

                <select
                  value={editDepartment}
                  onChange={handleDepartmentDropdown}
                  className="block w-[400px] bg-white border border-gray-800  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                >
                  {departmentList.map((editDepartment, index) => (
                    <option key={index} value={editDepartment}>
                      {editDepartment}
                    </option>
                  ))}
                </select>
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Semester
                </h1>

                <select
                  value={editSemester}
                  onChange={handleSemesterDropdown}
                  className="block w-[400px] bg-white border border-gray-800  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                >
                  {semList.map((editSemester, index) => (
                    <option key={index} value={editSemester}>
                      {editSemester}
                    </option>
                  ))}
                </select>

                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Subject
                </h1>

                <select
                  value={editSubject}
                  onChange={handleSubjectDropdown}
                  className="block w-[400px] bg-white border border-gray-800  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                >
                  {subjectList.map((editSubject, index) => (
                    <option key={index} value={editSubject}>
                      {editSubject}
                    </option>
                  ))}
                </select>
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Teacher
                </h1>

                <select
                  value={editTeacher}
                  onChange={handleTeacherDropdown}
                  className="block w-[400px] bg-white border border-gray-800  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                >
                  {teacherList.map((editTeacher, index) => (
                    <option key={index} value={editTeacher}>
                      {editTeacher}
                    </option>
                  ))}
                </select>

                <div
                  type="submit"
                  onClick={() => editOptionalDetails(optionalDetailsModal)}
                  class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600"
                >
                  <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                  <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span class="relative">Submit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <motion.div className="flex  justify-center items-center cursor-pointer border border-gray-300 rounded-2xl w-[1200px]">
        <motion.div
          className={`${
            modeOption === "Theory"
              ? "bg-blue-600 border-blue-600 text-white"
              : "bg-none"
          } flex justify-center items-center  px-20 py-2 rounded-2xl w-full`}
          onClick={() => setModeOption("Theory")}
          whileHover={{ scale: 1.1 }} // Add animation on hover
          transition={{ type: "linear", stiffness: 300 }}
        >
          <h1 className={`${manrope.className} text-xl`}>Theory</h1>
        </motion.div>
        <motion.div
          className={`${
            modeOption === "Practical"
              ? "bg-blue-600 border-blue-600 text-white"
              : "bg-none"
          } flex justify-center items-center px-20 py-2 rounded-2xl w-full`}
          onClick={() => setModeOption("Practical")}
          whileHover={{ scale: 1.1 }} // Add animation on hover
          transition={{ type: "linear", stiffness: 300 }}
        >
          <h1 className={`${manrope.className} text-xl`}>Practical</h1>
        </motion.div>
        <motion.div
          className={`${
            modeOption === "optionalSubject"
              ? "bg-blue-600 border-blue-600 text-white"
              : "bg-none"
          } flex justify-center items-center px-20 py-2 rounded-2xl w-full`}
          onClick={() => setModeOption("optionalSubject")}
          whileHover={{ scale: 1.1 }} // Add animation on hover
          transition={{ type: "linear", stiffness: 300 }}
        >
          <h1 className={`${manrope.className} text-xl`}>Optional Subject</h1>
        </motion.div>
      </motion.div>
      {modeOption === "Theory" && (
        <>
          <div className="w-auto mt-20">
            <h1 className={`${raleway.className} text-4xl font-bold`}>
              Theory Subjects
            </h1>
          </div>
          <div class={`${manrope.className} relative overflow-x-auto mt-10`}>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-md text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Sr. No.
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Department
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Semester
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Division
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Subject
                  </th>

                  <th scope="col" class="px-6 py-3">
                    Teacher
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Options
                  </th>
                </tr>
              </thead>
              {theoryObj.map(
                (details) =>
                  details.mode === "Theory" && (
                    <tbody>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          class="w-24 px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <h1>{detailsCount++}</h1>
                        </th>
                        <td class="px-6 py-4">
                          <h1 className="truncate w-auto">
                            {details.department}
                          </h1>
                        </td>
                        <td class="px-6 py-4">
                          <h1 className="truncate w-auto">
                            {details.semester}
                          </h1>
                        </td>
                        <td class="px-6 py-4">
                          <h1 className="truncate w-auto">
                            {details.division}
                          </h1>
                        </td>
                        <td class="px-6 py-4">
                          <h1 className="truncate w-auto">{details.subject}</h1>
                        </td>
                        <td class="px-6 py-4">
                          <h1 className="truncate w-auto">{details.teacher}</h1>
                        </td>
                        <td class="px-6 py-4">
                          <div className="flex justify-around items-center w-[250px] space-x-4">
                            <div
                              className=" w-32 flex justify-around items-center cursor-pointer"
                              onClick={() => deleteDetails(details)}
                            >
                              <img
                                src="./delete.png"
                                alt="remove"
                                className="w-5 h-5 "
                              />
                              <h1>Delete Link</h1>
                            </div>
                            <div
                              className=" w-28 flex justify-around items-center cursor-pointer"
                              onClick={() => setTheoryDetailsModal(details)}
                            >
                              <img
                                src="./edit.png"
                                alt="edit"
                                className="w-5 h-5"
                              />
                              <h1>Edit Details</h1>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  )
              )}
            </table>
          </div>
        </>
      )}
      {modeOption === "optionalSubject" && (
        <>
          <div className="w-auto mt-20">
            <h1 className={`${raleway.className} text-4xl font-bold`}>
              Optional Subjects
            </h1>
          </div>
          <div class={`${manrope.className} relative overflow-x-auto mt-10`}>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-md text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Sr. No.
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Department
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Semester
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Division
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Subject
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Teacher
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Options
                  </th>
                </tr>
              </thead>
              {optionalObj.map((details) => (
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="w-24 px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <h1>{detailsCount++}</h1>
                    </th>
                    <td class="px-6 py-4">
                      <h1 className="truncate w-auto">{details.department}</h1>
                    </td>
                    <td class="px-6 py-4">
                      <h1 className="truncate w-auto">{details.semester}</h1>
                    </td>
                    <td class="px-6 py-4">
                      <h1 className="truncate w-auto">{details.division}</h1>
                    </td>
                    <td class="px-6 py-4">
                      <h1 className="truncate w-auto">{details.subject}</h1>
                    </td>
                    <td class="px-6 py-4">
                      <h1 className="truncate w-auto">{details.teacher}</h1>
                    </td>
                    <td class="px-6 py-4">
                      <div className="flex justify-around items-center w-[250px] space-x-4">
                        <div
                          className=" w-32 flex justify-around items-center cursor-pointer"
                          onClick={() => deleteOptionalDetails(details)}
                        >
                          <img
                            src="./delete.png"
                            alt="remove"
                            className="w-5 h-5 "
                          />
                          <h1>Delete Link</h1>
                        </div>
                        <div
                          className=" w-28 flex justify-around items-center cursor-pointer"
                          onClick={() => setOptionalDetailsModal(details)}
                        >
                          <img
                            src="./edit.png"
                            alt="edit"
                            className="w-5 h-5"
                          />
                          <h1>Edit Details</h1>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </>
      )}
      {modeOption === "Practical" && (
        <>
          <div className="w-auto mt-20">
            <h1 className={`${raleway.className} text-4xl font-bold`}>
              Practical Subjects
            </h1>
          </div>
          <div class={`${manrope.className} relative overflow-x-auto mt-10`}>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-md text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Sr. No.
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Department
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Semester
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Division
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Subject
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Batch
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Teacher
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Options
                  </th>
                </tr>
              </thead>

              {practicalObj.map(
                (details) =>
                  details.mode === "Practical" && (
                    <tbody>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          class="w-24 px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <h1>{detailsCount++}</h1>
                        </th>
                        <td class="px-6 py-4">
                          <h1 className="truncate w-auto">
                            {details.department}
                          </h1>
                        </td>
                        <td class="px-6 py-4">
                          <h1 className="truncate w-auto">
                            {details.semester}
                          </h1>
                        </td>
                        <td class="px-6 py-4">
                          <h1 className="truncate w-auto">
                            {details.division}
                          </h1>
                        </td>
                        <td class="px-6 py-4">
                          <h1 className="truncate w-auto">{details.subject}</h1>
                        </td>
                        <td class="px-6 py-4">
                          <h1 className="truncate w-auto">{details.batch}</h1>
                        </td>
                        <td class="px-6 py-4">
                          <h1 className="truncate w-auto">{details.teacher}</h1>
                        </td>

                        <td class="px-6 py-4">
                          <div className="flex justify-around items-center w-[250px] space-x-4">
                            <div
                              className=" w-32 flex justify-around items-center cursor-pointer"
                              onClick={() => deleteDetails(details)}
                            >
                              <img
                                src="./delete.png"
                                alt="remove"
                                className="w-5 h-5 "
                              />
                              <h1>Delete Link</h1>
                            </div>
                            <div
                              className=" w-28 flex justify-around items-center cursor-pointer"
                              onClick={() => setPracticalDetailsModal(details)}
                            >
                              <img
                                src="./edit.png"
                                alt="edit"
                                className="w-5 h-5"
                              />
                              <h1>Edit Details</h1>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  )
              )}
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default SubjectAllocation;
