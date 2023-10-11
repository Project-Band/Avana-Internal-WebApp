"use client"

import { Close } from '@mui/icons-material';
import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import {Button, Topbar } from '@/components'

const ProgProfile = ({isVisible, onClose}) => {

    const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch data from the API here
    const fetchData = async () => {
      try {
        const response = await fetch('localhost:8000/projects');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetch function when the component mounts
  }, []);

    
    const enrolledProjects = projects? projects.map(items => (
        <div className="w-full px-8 py-4 border-t border-b border-zinc-400 justify-start items-center gap-6 inline-flex hover:shadow-sm hover:scale-[1.01] hover:bg-white100">
            <p className="text-sm">{items.id}</p>
            <div className="grow shrink basis-0 justify-between items-center flex">
                <div className="flex-col justify-start items-start gap-1 inline-flex">
                    <p>{items.name}</p>
                    <p className='text-sm'>{items.desc}</p>
                </div>
                <Button label="Learn more" type= "text" />
            </div>
        </div>
    )):null

    if(!isVisible) return null;

    const handleClose = (e) => {
        if(e.target.id === "closer") onClose()
    }
  
  return (
    <div id='closer' onClick={handleClose} className='fixed flex w-screen h-screen inset-0 bg-black150 bg-opacity-20 backdrop-blur-sm justify-center items-center'>
        <div className='flex flex-col w-5/6 h-4/5 p-6 bg-white50 gap-8 rounded-sm shadow-lg'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-40 items-center'>
                    <div className='flex gap-4 items-center'>
                        <Image src="../demo.png" width={60} height={60} layout="fixed" className='border-2 h-[60px] object-cover object-top overflow-hidden rounded-full border-secondary'/>
                        <div className='flex flex-col'>
                            <h3 className='text-primary'>Half Guy</h3>
                            <p>Programmer</p>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <Button label="Upgrade to architect" type="accept" />
                        <Button label="Deactivate" type="decline" />
                    </div>
                </div>
                <div onClick={() => onClose()}><Close className='text-3xl hover:scale-105 border bg-red cursor-pointer rounded-sm text-white50'/></div>
            </div>
            <div className='bg-white50 h-4/5 w-full rounded-sm relative'>
                <Topbar label1="Current" label2="Completed" label3="Cancelled" />
                <div className='flex flex-col mt-4 h-5/6 w-full overflow-y-scroll overflow-x-hidden'>
                    {enrolledProjects}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProgProfile