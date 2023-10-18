"use client";

import React,{useState, useEffect} from 'react'
import { Button, NewApplications } from '@/components'
import { ACCEPT_APPLICATION_API, APPLICATIONS_API, REGISTER_INFO_API, REJECT_APPLICATION_API } from '@/apiConfig';
import toast from 'react-hot-toast';

const na = () => {

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

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch data from the API here
    const fetchData = async () => {
      try {
        const response = await fetch(APPLICATIONS_API);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApplications(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

 
  const [popup, setPopup] = useState(false)
  const [applicant, setApplicant] = useState("")

  const handlePopup = (e, username) => {
    if (e.target.id === "popupOpener") {
      setApplicant(username);
      setPopup(true);
    }
  };

  const applicationList = applications? applications.map(items => (
    <div id='popupOpener' onClick={(e) => handlePopup(e, items.username)} className="cursor-pointer w-full px-8 py-4 border bg-white0 border-grey50 rounded-sm justify-start items-center gap-6 inline-flex hover:shadow-sm hover:bg-white50">
    <p id='popupOpener' className="text-sm">{items.id}</p>
    <div id='popupOpener' className="grow shrink basis-0 justify-between items-center flex">
        <div id='popupOpener' className="flex-col justify-start items-start gap-1 inline-flex">
            <p id='popupOpener'>Request By: {items.first_name} {items.last_name}</p>
        </div>
        <div className='flex gap-2'>
            <div onClick={() => handleAccept(items.username)}><Button label="none" type="accept"/></div>
            <div onClick={() => handleReject(items.username)}><Button label="none" type="decline"/></div>
        </div>
    </div>
    </div>
  )):null

  return (
    <div className='adminContent flex flex-col gap-6'>
      <h2 className='px-2'>New Application</h2>
      <div className='flex flex-col gap-2 overflow-y-scroll overflow-x-auto px-2 pr-4'>
        {applicationList}
      </div>
      <NewApplications isVisible={popup} onClose={()=>setPopup(false)} username={applicant}/>
    </div>
  )
}

export default na