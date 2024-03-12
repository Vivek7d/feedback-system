"use client";

import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { Manrope, Raleway } from "next/font/google";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

const raleway = Raleway({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const manrope = Manrope({
  weight: ["400", "700"],
  subsets: ["latin"],
});
function Left() {
  const router = useRouter();

  var isAdmin = "";
  useEffect(() => {
    if (typeof window !== "undefined") {
      isAdmin = localStorage.getItem("isAdmin") === "true" || "";
    }
    if (!isAdmin) {
      router.push("login");
    }
  }, []);

  return (
    <div
      className={`${raleway.className} flex items-center flex-col mt-28  min-w-[230px]`}
    >
      <div className="flex justify-center items-center ml-6 mb-72">
        <div className="flex flex-col justify-center items-center space-y-8">
          <div
            className="mt-2 mr-4 hover:cursor-pointer"
            onClick={() => router.push("/adminpage")}
          >
            <img
              src="../home.png"
              alt="home"
              className="w-6 h-6 object-contain"
            />
          </div>
          <div
            className="mt-2 mr-4 hover:cursor-pointer"
            onClick={() => router.push("/allocate-teachers")}
          >
            <img
              src="../teacher.png"
              alt="teachers"
              className="w-6 h-6 object-contain"
            />
          </div>
          <div
            className="mt-2 mr-4 hover:cursor-pointer"
            onClick={() => router.push("/generate-feedback")}
          >
            <img
              src="../feedback.png"
              alt="feedback"
              className="w-6 h-6 object-contain"
            />
          </div>
          <div
            className="mt-2 mr-4 hover:cursor-pointer"
            onClick={() => router.push("/generate-feedback")}
          >
            <img
              src="../user.png"
              alt="user"
              className="w-6 h-6 object-contain"
            />
          </div>
          <div className="mt-2 mr-4 hover:cursor-pointer">
            <img
              src="../settings.png"
              alt="Settings"
              className="w-6 h-6 object-contain"
            />
          </div>
          <div className="mt-2 mr-4 hover:cursor-pointer">
            <img
              src="../logout.png"
              alt="logout"
              className="w-6 h-6 object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-8 mt-2">
          <Link href="/adminpage">
            <div className="hover:cursor-pointer">
              <h1>Home</h1>
            </div>
          </Link>
          <div className="hover:cursor-pointer">
            <Link href="/allocate-teachers" className="nav-link">
              <h1>Allocate Teachers</h1>
            </Link>
          </div>
          <Link href="/generate-feedback">
            <div className="hover:cursor-pointer">
              <h1>Generate Feedback</h1>
            </div>
          </Link>
          <Link href="/view-users">
            <div className="hover:cursor-pointer">
              <h1>View Users</h1>
            </div>
          </Link>
          <Link href="/admin-settings">
            <div className="hover:cursor-pointer">
              <h1>Settings</h1>
            </div>
          </Link>
          <div
            onClick={() => {
              router.push("login");

              if (typeof window !== "undefined") {
                localStorage.setItem("isAdmin", "false") || "";
              }
            }}
          >
            <div className="hover:cursor-pointer">
              <h1>Logout</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Left;
