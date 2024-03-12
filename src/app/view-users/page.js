"use client"

import React, { useEffect, useContext, useState } from 'react';
import Left from '../../../components/Left';
import Middle from '../../../components/Middle';
import { AuthContext } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { JellyTriangle } from '@uiball/loaders'
import Users from "../../../components/Users"


function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  let isAdmin = '';

  useEffect(() => {

    isAdmin = localStorage.getItem("isAdmin") === "true" || '';

    if (!isAdmin) {
      router.push('login');
    } else {
      setLoading(false);
    }
  }, [])


  return (
    <div className="flex bg-gray-100">
      {loading ? (
        <div className="flex items-center justify-center w-screen h-screen">
          <JellyTriangle color="black" size={100} />
        </div>)
        : (
          <>
            <Left className="flex-none" />
            <div className="ml-10 w-[1px] h-screen bg-gray-200 drop-shadow-sm" />
            <Users className="flex-auto" />
          </>

        )
      }


    </div>
  );
}

export default Page;
