"use client";

import React, {useState,useEffect} from 'react'
import { Button, Topbar, EnrollProgrammers, Project } from '@/components'
import { EightMpRounded } from '@mui/icons-material';
import { VIEW_PROJECT_API } from '@/apiConfig';
import projects from '@/content/projects';

const vp = () => {

  const [projects, setProjects] = useState([]);
  const [projectStatus, setProjectStatus] = useState(1)
  const [selectedProject, setSelectedProject] = useState("")

  const handleFilter = (status) => {
    setProjectStatus(status)
  }

  useEffect(() => {
    // Fetch data from the API here
    const fetchData = async () => {
      try {
        const response = await fetch(VIEW_PROJECT_API);
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

  const handlePopup = (e, project_name) => {
    if(e.target.id === "popupOpener"){
    setPopup(true)
    setSelectedProject(project_name)
    }
  }

  

    const projectList = projects? projects
    // .filter((items) => items.project_status === `${projectStatus === 1? "C": projectStatus === 2? "X" : projectStatus === 3? "Y" : ""}`)
    .map(items => (
        <div id='popupOpener' onClick={(e) => handlePopup(e, items.project_name)} className="w-full cursor-pointer bg-white0 px-8 py-4 border border-grey50 rounded-sm justify-start items-center gap-6 inline-flex hover:shadow-sm hover:scale-[1.01] hover:bg-white100">
        <div id='popupOpener' className="grow cursor-pointer shrink basis-0 justify-between items-center flex">
            <div id='popupOpener' className="flex-col cursor-pointer justify-start items-start gap-1 inline-flex">
                <p className='cursor-pointer font-bold'>{items.project_name}</p>
                <p className='cursor-pointer text-sm'>Assigned to: {items.current_members? items.current_members.map(items? items => (<span>{items.name} | </span>) : <p>Unassigned</p>):null}</p>
            </div>
            {/* <div onClick={() => setPopup(true)}><Button label={`${items.assgn=="Unassigned"? `Enroll Programmers` : `Edit Programmers`}`} type= {`${items.assgn=="Unassigned"? `add` : `edit`}`} /></div> */}
        </div>
        </div>
    )):null

  return (
    <div className='adminContent flex flex-col gap-6'>
      <h2 className='px-2'>View Projects</h2>
      {/* <Topbar label1="All" label2="Unassigned" label3="Assigned" onToggle-={handleFilter}/> */}
      <div className='flex flex-col gap-2 overflow-y-scroll overflow-x-auto px-2 pr-4'>
        {projectList}
      </div> 
      <Project isVisible={popup} onClose={()=>setPopup(false)} projectName={selectedProject}/>
    </div>
  )
}

export default vp