"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Left from "../../../../components/Left";
import { JellyTriangle } from "@uiball/loaders";
import { Manrope, Raleway } from "next/font/google";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";

const raleway = Raleway({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const manrope = Manrope({
  weight: ["400", "700"],
  subsets: ["latin"],
});

function Page({ params }) {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [semester, setSemester] = useState("Semester 1");
  const [theoryDetailsModal, setTheoryDetailsModal] = useState(null);
  const [editFullName, setEditFullName] = useState("");
  const [editPrn, setEditPrn] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editBatch, setEditBatch] = useState("");
  const [editDepartment, setEditDepartment] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editDivision, setEditDivision] = useState("");

  const department = searchParams.get("dept");

  const departmentMapping = {
    CE: "Computer Engineering",
    EXTC: "Electronics & Telecommunication",
    IT: "Information Technology",
    ECS: "Electronics and Computer Science",
    AIDS: "Artificial Intelligence and Data Science",
    AIML: "Artificial Intelligence and Machine Learning",
    MECH: "Mechanical Engineering",
    IOT: "Internet of Things",
  };

  const dept = departmentMapping[department];

  const semesterList = [
    "Semester 1",
    "Semester 2",
    "Semester 3",
    "Semester 4",
    "Semester 5",
    "Semester 6",
    "Semester 7",
    "Semester 8",
  ];
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
  const divisionList = ["C", "D"];
  const batchList = ["C1", "C2", "C3", "D1", "D2", "D3"];
  const handleBatchDropdown = (event) => {
    setEditBatch(event.target.value);
  };
  const handleDivisionDropdown = (event) => {
    setEditDivision(event.target.value);
  };
  const handleDepartmentDropdown = (event) => {
    setEditDepartment(event.target.value);
  };

  const handleSemesterDropdown = (event) => {
    const selectedSemester = event.target.value;
    setSemester(selectedSemester);
  };
  // const editTheoryDetails = () => {
  //   console.log(
  //     editFullName,
  //     editPrn,
  //     editEmail,
  //     editDivision,
  //     editBatch,
  //     editDepartment,
  //     editPassword
  //   );
  // };
  const editTheoryDetails = async () => {
    const docRef = doc(db, "users", theoryDetailsModal.id);

    try {
      await updateDoc(docRef, {
        fullName: editFullName ? editFullName : theoryDetailsModal.fullName,
        PRN: editPrn ? editPrn : theoryDetailsModal.PRN,
        email: editEmail ? editEmail : theoryDetailsModal.email,
        division: editDivision ? editDivision : theoryDetailsModal.division,
        batch: editBatch ? editBatch : theoryDetailsModal.batch,
        department: editDepartment
          ? editDepartment
          : theoryDetailsModal.department,
        password: editPassword ? editPassword : theoryDetailsModal.password,
      });

      notifySuccess("Updated the User Name successfully");
      window.location.reload();
    } catch (error) {
      notifyError("Unable to update");
    }
  };
  const notifySuccess = (message) => {
    console.log("Success:", message);
  };

  const notifyError = (error) => {
    console.error("Error:", error);
  };
  
  const deleteOptionalDetails = async (user) => {
    var answer = window.confirm("Delete Details?");
    if (answer) {
      await deleteDoc(doc(db, "users", user.id));
      window.location.reload();
    } else {
      return;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("semester", "==", semester), // Filter users by selected semester
          where("department", "==", dept) // Filter users by selected semester
        );
        const querySnapshot = await getDocs(q);
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users: ", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [semester]); // Trigger useEffect when semester changes

  return (
    <div className="flex bg-gray-100">
      {loading ? (
        <div className="flex items-center justify-center w-screen h-screen">
          <JellyTriangle color="black" size={100} />
        </div>
      ) : (
        <>
          {console.log(department)}
          <Left className="flex-none" />
          <div className="ml-10 w-[1px] h-screen bg-gray-200 drop-shadow-sm" />
          <div className="w-auto mt-20">
            <h1 className={`${raleway.className} text-4xl ml-8 font-bold`}>
              Users Table
            </h1>
            <div className="flex flex-col justify-start ml-10 mt-10 space-y-4">
              <h1 className={`${manrope.className} md:text-xl text-md`}>
                Select your Semester
              </h1>
              <div className=" justify-center pr-32 pt-4 items-center">
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
                <div
                  className={`${manrope.className} relative overflow-x-auto ml-20 pt-10`}
                >
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-md text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Sr. No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          PRN
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Division
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Batch
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Department
                        </th>
                        {semester !== "Semester 1" &&
                          semester !== "Semester 2" &&
                          semester !== "Semester 3" &&
                          semester !== "Semester 4" && (
                            <th scope="col" className="px-6 py-3">
                              Optional Sub
                            </th>
                          )}
                        <th scope="col" className="px-6 py-3">
                          Password
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Options
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr
                          key={user.id}
                          className={
                            index % 2 === 0
                              ? "bg-gray-800 text-gray-300"
                              : "bg-gray-900 text-gray-300"
                          }
                        >
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4">{user.fullName}</td>
                          <td className="px-6 py-4">{user.PRN}</td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4">{user.division}</td>
                          <td className="px-6 py-4">{user.batch}</td>
                          <td className="px-6 py-4">{user.department}</td>
                          {semester !== "Semester 1" &&
                            semester !== "Semester 2" &&
                            semester !== "Semester 3" &&
                            semester !== "Semester 4" && (
                              <td className="px-6 py-4">
                                {user.optionalSubject}
                              </td>
                            )}
                          <td className="px-6 py-4">{user.password}</td>
                          <td class="px-6 py-4">
                            <div className="flex justify-around items-center w-[250px] space-x-4">
                              <div
                                className=" w-32 flex justify-around items-center cursor-pointer"
                                onClick={() => deleteOptionalDetails(user)}
                              >
                                <img
                                  src="../delete.png"
                                  alt="remove"
                                  className="w-5 h-5 "
                                />
                                <h1>Delete Link</h1>
                              </div>
                              <div
                                className=" w-28 flex justify-around items-center cursor-pointer"
                                onClick={() => setTheoryDetailsModal(user)}
                              >
                                <img
                                  src="../edit.png"
                                  alt="edit"
                                  className="w-5 h-5"
                                />
                                <h1>Edit Details</h1>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {theoryDetailsModal && (
        <div
          className={`${manrope.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}
        >
          <div className="w-full max-w-2xl bg-white rounded-lg  ">
            <div class="relative bg-white rounded-lg shadow ">
              <div class="flex items-start justify-between p-4 border-b  ">
                <h3 class="text-xl font-semibold text-black ">
                  Edit Users Detail
                </h3>
                <button
                  onClick={() => {
                    setEditDepartment("");
                    setEditFullName("");
                    setEditDivision("");
                    setEditPassword("");
                    setEditPrn("");
                    setEditEmail("");
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
                {/* Dropdowns and input fields for editing details */}
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Full Name
                </h1>
                <input
                  type="text"
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  className="block w-[400px] bg-white border border-gray-800 py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                  placeholder="Enter Full Name"
                />
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter PRN
                </h1>
                <input
                  type="text"
                  value={editPrn}
                  onChange={(e) => setEditPrn(e.target.value)}
                  className="block w-[400px] bg-white border border-gray-800 py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                  placeholder="Enter Full Name"
                />
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Email
                </h1>
                <input
                  type="text"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="block w-[400px] bg-white border border-gray-800 py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                  placeholder="Enter Full Name"
                />
                <h1 className={`${manrope.className} text-lg font-bold`}>
                  Enter Password
                </h1>
                <input
                  type="text"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="block w-[400px] bg-white border border-gray-800 py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                  placeholder="Enter Full Name"
                />
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
                  onClick={() => editTheoryDetails()}
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
    </div>
  );
}

export default Page;
