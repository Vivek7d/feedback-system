"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Manrope, Raleway } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Image from "next/image";

const raleway = Raleway({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const manrope = Manrope({
  weight: ["400", "700"],
  subsets: ["latin"],
});

function Users() {
  const router = useRouter();
  const [fetch, setFetch] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);

  const departmentList = [
    "CE",
    "IT",
    "ECS",
    "EXTC",
    "AIDS",
    "AIML",
    "MECH",
    "IOT",
  ];

  const [tabsObj, setTabsObj] = useState([]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="mx-10 lg:mx-28 mt-20 mb-20"
      >
        <div className={`${manrope.className} text-center `}>
          <h1 className="text-2xl lg:text-4xl font-semibold tracking-wide">
            View Users
          </h1>
        </div>
        {/* List of dept */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {departmentList.map((department) => (
            <Link
              key={department}
              href={{
                pathname: `/view-users/${department}`,
                query: { dept: department },
              }}
              className="px-12 py-4 lg:px-0 lg:py-0 flex justify-center items-center lg:w-[200px] lg:h-[200px] shadow-2xl rounded-xl bg-[#60a5fa] hover:cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
            >
              <h1
                className={`${manrope.className} text-center lg:text-3xl text-2xl `}
              >
                {department}
              </h1>
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default Users;
