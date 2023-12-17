"use client"

import React, { useEffect, useState } from 'react'
import { Button, Header } from '@/components'
import { Close } from '@mui/icons-material'
import Image from 'next/image'
import projects from '@/content/projects'
import { VIEW_PROJECT_API } from '@/apiConfig'

const Project = ({isVisible, onClose, projectName}) => {

    const [projectData, setProjectData] = useState([])

    useEffect(() => {
        // Fetch data from the API here
        const fetchData = async () => {
          try {
            const response = await fetch(VIEW_PROJECT_API);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const selectedProject = data.filter((project) => project.project_name === `${projectName}`)
            setProjectData(selectedProject[0])
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData(); // Call the fetch function when the component mounts
      }, [projectName]);



    if(!isVisible) return null;

    const handleClose = (e) => {
        if(e.target.id === "closer") onClose()
    }

    const imageCarousel = projectData && projectData.section? projectData.section.map(items => (
            <Image src={items.sectionImage} alt="section image" width={400} height={300} />
    )):null

    const sectionContent = projectData && projectData.section? projectData.section.map(items => (
        <div className='w-full flex flex-col gap-2'>
            <h4>{items.section_title}</h4>
            <p>{items.sectionDesc}</p>
        </div>
    )):null


  return (
    <div id='closer' onClick={handleClose} className='fixed flex w-screen h-screen inset-0 bg-black150 bg-opacity-20 backdrop-blur-sm justify-center items-center'>
        <div className='flex flex-col w-5/6 h-4/5 p-6 bg-white50 gap-8 rounded-sm shadow-lg'>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-2'>
                    <h3 className='text-primary'> {projectData && projectData.project_name} </h3>
                    <p className='text-sm'>Assigned to: {projectData && projectData.current_members? projectData.current_members.map(items => (<span>{items.name} | </span>)):null}</p>
                </div>
                <div onClick={() => onClose()}><Close className='text-3xl rounded-sm hover:scale-105 border bg-red cursor-pointer text-white50'/></div>
            </div>
            <div className='flex justify-between w-full'>
                <span><p className='font-bold text-primary'>Start Date: </p><p>{projectData && projectData.start_date}</p></span>
                <span><p className='font-bold text-primary'>End Date: </p><p>{projectData && projectData.start_date}</p></span>
            </div>
            <div className='flex gap-2 bg-white0/10'>{imageCarousel}</div>
            <div className='flex gap-2'>{sectionContent}</div>
        </div>
    </div>
  )
}

export default Project