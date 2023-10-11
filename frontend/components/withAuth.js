"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function withAuth(WrappedComponent) {
  return function Authenticated(props) {
    const router = useRouter();

    useEffect(() => {
      // You may need to implement your own authentication logic here
      // For example, check if the user has a valid JWT token and isAdmin flag
      const isVerified = localStorage.getItem('verified');

      if (!isVerified) {
        router.replace('/');
      }
    }, []);

    return isVerified? <WrappedComponent {...props} isAdmin ={localStorage.getItem('isAdmin')} /> :null
  };
}

