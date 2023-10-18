"use client"

import { Close } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import {Button, Topbar } from '@/components'
import { ACCEPT_APPLICATION_API, APPLICATIONS_API, REJECT_APPLICATION_API } from '@/apiConfig';
import toast from 'react-hot-toast';

const NewApplications = ({isVisible, username, onClose}) => {

    const [applicant, setApplicant] = useState([]);

  useEffect(() => {
    // Fetch data from the API here
    const fetchData = async () => {
      try {
        const response = await fetch(APPLICATIONS_API);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const userData = data.filter((user) => user.username === `${username}`);
        setApplicant(userData); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetch function when the component mounts
  }, [username]);

  const handleAccept = async (username) => {

    const requestData = {
      username: username
    }

    try {
      const response = await fetch(ACCEPT_APPLICATION_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
     
      if (response.ok) {
       toast.success('Succesfully Accepted');
      } else {
          toast.error('Couldn\'t Accept the application');
        }
    } catch (error) {
      toast.error('Error requesting');

    }
  };

  const handleReject = async (username) => {

    const requestData = {
      username: username
    }


    try {
      const response = await fetch(REJECT_APPLICATION_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
     
      if (response.ok) {
       toast.success('Succesfully Rejected');
      } else {
          toast.error('Couldn\'t Reject the application');
        }
    } catch (error) {
      toast.error('Error requesting');

    }
  };

    const applicationList = applicant? applicant.map(items =>(
        <div className='flex gap-10 w-full'>
            <div className='flex flex-col gap-6 w-full'>
                <div className='flex gap-2 w-full items-center'>
                    <p className='text-primary w-2/5'>Name:</p>
                    <p className='p-3 w-full bg-white0 rounded-sm hover:bg-white50'>{items.first_name} {items.last_name}</p>
                </div>
                <div className='flex gap-2 w-full items-center'>
                    <p className='text-primary w-2/5'>Email Address:</p>
                    <p className='p-3 w-full bg-white0 rounded-sm hover:bg-white50'>{items.email}</p>
                </div>
                <div className='flex gap-2 w-full items-center'>
                    <p className='text-primary w-2/5'>Home Address:</p>
                    <p className='p-3 w-full bg-white0 rounded-sm hover:bg-white50'>{items.home_address}</p>
                </div>
            </div>
            <div className='flex flex-col gap-6 w-full'>
                <div className='flex gap-2 w-full items-center'>
                    <p className='text-primary w-2/5'>Username:</p>
                    <p className='p-3 w-full bg-white0 rounded-sm hover:bg-white50'>{items.username}</p>
                </div>
                <div className='flex gap-2 w-full items-center'>
                    <p className='text-primary w-2/5'>Phone:</p>
                    <p className='p-3 w-full bg-white0 rounded-sm hover:bg-white50'>{items.phone}</p>
                </div>
                <div className='flex gap-2 w-full items-center'>
                    <p className='text-primary w-2/5'>Gender:</p>
                    <p className='p-3 w-full bg-white0 rounded-sm hover:bg-white50'>{items.gender}</p>
                </div>
            </div>
        </div>
    )):null

    if(!isVisible) return null;

    const handleClose = (e) => {
        if(e.target.id === "closer") onClose()
    }
  
  return (
    <div id='closer' onClick={handleClose} className='fixed flex w-screen h-screen inset-0 bg-black150 bg-opacity-20 backdrop-blur-sm justify-center items-center'>
        <div className='flex flex-col w-4/5 h-max p-6 bg-white50 gap-8 rounded-sm shadow-lg'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-40 items-center'>
                    <div className='flex gap-4 items-center'>
                        <Image src="/demo.png" width={60} height={60} layout="fixed" className='border-2 h-[60px] object-cover object-top overflow-hidden rounded-full border-secondary'/>
                        <h3 className='text-primary'>{username}</h3>
                    </div>
                    <div className='flex gap-4'>
                        <div onClick={() => handleAccept(username)}><Button label="Accept" type="accept" /></div>
                        <div onClick={() => handleReject(username)}><Button label="Decline" type="decline" /></div>
                    </div>
                </div>
                <div onClick={() => onClose()}><Close className='text-3xl hover:scale-105 border bg-red cursor-pointer rounded-sm text-white50'/></div>
            </div>
            <div className='bg-white50 h-4/5 w-full rounded-sm relative'>
                {applicationList}
            </div>
        </div>
    </div>
  )
}

export default NewApplications