"use client";

import React, {useState,useEffect} from 'react'
import { Button, Topbar, EnrollProgrammers } from '@/components'
import { EightMpRounded } from '@mui/icons-material';

const vp = () => {

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

  const [popup, setPopup] = useState(false)

    const projectList = projects? projects.map(items => (
        <div className="w-full bg-white0 px-8 py-4 border border-grey50 rounded-sm justify-start items-center gap-6 inline-flex hover:shadow-sm hover:bg-white50">
        <p className="text-sm">{items.id}</p>
        <div className="grow shrink basis-0 justify-between items-center flex">
            <div className="flex-col justify-start items-start gap-1 inline-flex">
                <p>{items.name}</p>
                <p className='text-sm'>{items.assgn}</p>
            </div>
            <div onClick={() => setPopup(true)}><Button label={`${items.assgn=="Unassigned"? `Enroll Programmers` : `Edit Programmers`}`} type= {`${items.assgn=="Unassigned"? `add` : `edit`}`} /></div>
        </div>
        </div>
    )):null

  return (
    <div className='adminContent flex flex-col gap-6'>
      <h2 className='px-2'>View Projects</h2>
      <Topbar label1="All" label2="Unassigned" label3="Assigned"/>
      <div className='flex flex-col gap-2 overflow-y-scroll overflow-x-auto px-2 pr-4'>
        {projectList}
      </div> 
      <EnrollProgrammers isVisible={popup} onClose={()=>setPopup(false)}/>
    </div>
  )
}

export default vp