"use client";

import { Button } from '@/components'
import React, {useState, useEffect} from 'react'
import tacContent from '@/content/tac';

const tac = () => {
  //   const [tacContent, setTacContent] = useState([]);

  // useEffect(() => {
  //   // Fetch data from the API here
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('localhost:8000/tacContent');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setTacContent(data); // Update state with fetched data
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData(); // Call the fetch function when the component mounts
  // }, []);

    const [editableText, setEditableText] = useState();

    const handleTextChange = (event) => {
        setEditableText(event.target.value);
    };

    const tacList = tacContent? tacContent.map(items => (
        <div className='flex flex-col gap-2'>
            <h4>{items.title}</h4>
            <textarea
                className="overflow-y-scroll w-full overflow-hidden h-[200px] appearance-none overflow-x-auto border-none rounded-sm py-4 px-4 focus:outline-none"
                value={items.desc}
                onChange={handleTextChange}
            />
        </div>
    )):null

  return (
    <div className='adminContent flex flex-col gap-6'>
        <div className='flex justify-between items-center'>
            <h2 className='px-2'>Terms and Conditions</h2>
        </div>
        <div className='flex w-full flex-col gap-6 overflow-y-scroll'>
            {tacList}
        </div>
    </div>
  )
}

export default tac