"use client"

import { Inter, Manrope, Raleway } from 'next/font/google';

import React, { useState } from 'react';
import Link from 'next/link';
import Login from '../../components/Login';
import Signup from '../../components/Signup';


const raleway = Raleway({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});
const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
});
const manrope = Manrope({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});


const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  
  return (
    <div>
      {/* <Login /> */}
      <Signup />
    
    </div>
  );
};

export default Dashboard;


// email mein .sies.edu.in ka verification on signup
// sem vise subjects

