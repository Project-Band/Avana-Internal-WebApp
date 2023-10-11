"use client"

import React, {useState, useEffect} from 'react'
import { Button } from '@/components'

const er = () => {

  const [enrollReqs, setEnrollReqs] = useState([]);

  useEffect(() => {
    // Fetch data from the API here
    const fetchData = async () => {
      try {
        const response = await fetch('localhost:8000/enrollReqs');
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
    <p className="text-sm">{items.id}</p>
    <div className="grow shrink basis-0 justify-between items-center flex">
        <div className="flex-col justify-start items-start gap-1 inline-flex">
            <p>{items.name}</p>
            <p className='text-sm'>Request By: {items.request}</p>
        </div>
        <div className='flex gap-2'>
            <Button label="none" type="accept"/>
            <Button label="none" type="decline"/>
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