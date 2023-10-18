"use client"

import React, {useState, useEffect} from 'react'
import { Button } from '@/components'
import toast from 'react-hot-toast'
import { ACCEPT_ENROLLMENT_API, GET_ENROLL_REQUESTS_API, REJECT_ENROLLMENT_API } from '@/apiConfig'

const er = () => {

  const [enrollReqs, setEnrollReqs] = useState([]);

  const handleAccept = async (project, username) => {

    const requestData = {
      project: project, 
      username: username
    }

    try {
      const response = await fetch(ACCEPT_ENROLLMENT_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
     
      if (response.ok) {
       toast.success('Succesfully Accepted the request');
      } else {
          toast.error('Couldn\'t Accept the request');
        }
    } catch (error) {
      toast.error('Couldn\'t Accept the request');

    }
  };

  const handleReject = async (project, username) => {

    const requestData = {
      project: project, 
      username: username
    }

    try {
      const response = await fetch(REJECT_ENROLLMENT_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
     
      if (response.ok) {
       toast.success('Succesfully Rejected the request');
      } else {
          toast.error('Couldn\'t Reject the request');
        }
    } catch (error) {
      toast.error('Couldn\'t Reject the request');

    }
  };

  useEffect(() => {
    // Fetch data from the API here
    const fetchData = async () => {
      try {
        const response = await fetch(GET_ENROLL_REQUESTS_API);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEnrollReqs(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetch function when the component mounts
  }, []);

  const requestList = enrollReqs? enrollReqs.map(items => (
    <div className="cursor-pointer w-full px-8 py-4 border bg-white0 border-grey50 rounded-sm justify-start items-center gap-6 inline-flex hover:bg-white50">
    <div className="grow shrink basis-0 justify-between items-center flex">
        <div className="flex-col justify-start items-start gap-1 inline-flex">
            <p>{items.project}</p>
            <p className='text-sm'>Request By: {items.employee}</p>
        </div>
        <div className='flex gap-2'>
            <div onClick={() => handleAccept(items.project, items.username)}><Button label="none" type="accept"/></div>
            <div onClick={() => handleReject(items.project, items.username)}><Button label="none" type="decline"/></div>
        </div>
    </div>
    </div>
  )):null

  return (
    <div className='adminContent flex flex-col gap-6'>
      <h2 className='px-2'>Enrollment Requests</h2>
      <div className='flex flex-col gap-2 overflow-y-scroll overflow-x-auto px-2 pr-4'>
        {requestList}
      </div> 
    </div>
  )
}

export default er