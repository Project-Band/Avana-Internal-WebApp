"use client";

import React, {useState} from 'react'
import projects from '@/content/projects'
import { Button, Topbar, EnrollProgrammers } from '@/components'
import { EightMpRounded } from '@mui/icons-material';

const vp = () => {

  const [popup, setPopup] = useState(false)

    const projectList = projects.map(items => (
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
    ))

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