"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function withAuth(WrappedComponent) {
  return function Authenticated(props) {
    const router = useRouter();

    //   const isVerified = localStorage.getItem('verified');
    // useEffect(() => {
    //   // You may need to implement your own authentication logic here
    //   // For example, check if the user has a valid JWT token and isAdmin flag
    

    //   if (!isVerified) {
    //     router.replace('/');
    //   }
    // }, []);

    return <WrappedComponent {...props} />

    // return isVerified? <WrappedComponent {...props} isAdmin ={localStorage.getItem('isAdmin')} /> :null
  };
}

