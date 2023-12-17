"use client";

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';


const AdminNavbar = (props) => {
  const currentPath = usePathname()
  const [toggle, setToggle] = useState(0)

  const updateSelectedSection = () => {
    if (currentPath === `/useradmin/${props.username}/na`) {
      setToggle(1);
    } else if (currentPath === `/useradmin/${props.username}/tac`) {
      setToggle(2);
    } else if (currentPath === `/useradmin/${props.username}/pp`) {
      setToggle(3);
    } else if (currentPath === `/useradmin/${props.username}/cp`) {
      setToggle(4);
    } else if (currentPath === `/useradmin/${props.username}/vp`) {
      setToggle(5);
    } else if (currentPath === `/useradmin/${props.username}/er`) {
      setToggle(6);
    }
  };
  const [userData, setUserData] = useState([]);

  const initialData = useRef(userData);
  
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(USER_API(props.username));
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
  
        // Check if the data has changed significantly before updating state.
        if (JSON.stringify(data) !== JSON.stringify(initialData.current)) {
          setUserData(data);
          initialData.current = data;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    console.log(userData);
    fetchData(); // Call the fetch function when the component mounts
  }, []);


  // Use useEffect to update the selected section when the route changes
  useEffect(() => {
    updateSelectedSection();
  }, []);

  function handleClick(prop){
    setToggle(prevToggle => prevToggle=prop)
  }

  return (
    <div className='flex flex-col bg-white50 shadow-lg w-[25%] min-w-[230px] h-full pt-6 rounded-sm overflow-hidden gap-10'>
        <div className='flex flex-col gap-4 items-center'>
            {/* <Image src={userData && userData.image} width={80} height={80} layout="fixed" className='border-2 h-[80px] object-cover object-top overflow-hidden rounded-full border-secondary'/> */}
            <div className='flex flex-col items-center text-center'>
                <h3 className='text-primary capitalize'>{props.username}</h3>
                <p>Admin</p>
            </div>
        </div>
        <div className='overflow-auto'>
            <Link href={`/useradmin/[username]/na`} as={`/useradmin/${props.username}/na`} className={`block w-full text-base ${toggle==1? `bg-primary text-white50` : `hover:bg-white100 text-black150`}  px-3 py-4 border-t border-b border-grey50 justify-start`} onClick={() => handleClick(1)}>New Applications</Link>
            <Link href={`/useradmin/[username]/tac`} as={`/useradmin/${props.username}/tac`} className={`block w-full text-base ${toggle==2? `bg-primary text-white50` : `hover:bg-white100 text-black150`} px-3 py-4 border-t border-b border-grey50 justify-start`} onClick={() => handleClick(2)}>Terms and Conditions</Link>
            <Link href={`/useradmin/[username]/pp`} as={`/useradmin/${props.username}/pp`} className={`block w-full text-base ${toggle==3? `bg-primary text-white50` : `hover:bg-white100 text-black150`} px-3 py-4 border-t border-b border-grey50 justify-start`} onClick={() => handleClick(3)}>Programmers Profile</Link>
            <Link href={`/useradmin/[username]/cp`} as={`/useradmin/${props.username}/cp`} className={`block w-full text-base ${toggle==4? `bg-primary text-white50` : `hover:bg-white100 text-black150`} px-3 py-4 border-t border-b border-grey50 justify-start`} onClick={() => handleClick(4)}>Create Project</Link>
            <Link href={`/useradmin/[username]/vp`} as={`/useradmin/${props.username}/vp`} className={`block w-full text-base ${toggle==5? `bg-primary text-white50` : `hover:bg-white100 text-black150`} px-3 py-4 border-t border-b border-grey50 justify-start`} onClick={() => handleClick(5)}>View Project</Link>
            <Link href={`/useradmin/[username]/er`} as={`/useradmin/${props.username}/er`} className={`block w-full text-base ${toggle==6? `bg-primary text-white50` : `hover:bg-white100 text-black150`} px-3 py-4 border-t border-b border-grey50 justify-start`} onClick={() => handleClick(6)}>Enrollment Requests</Link>
        </div>
    </div>
  )
}

export default AdminNavbar