"use client";

import React,{useState} from 'react'
import applications from '@/content/applications'
import { Button, NewApplications } from '@/components'

const na = () => {

  const [popup, setPopup] = useState(false)

  const handlePopup = (e) =>{
    if(e.target.id === "popupOpener") setPopup(true)
  }

  const applicationList = applications.map(items => (
    <div id='popupOpener' onClick={handlePopup} className="cursor-pointer w-full px-8 py-4 border bg-white0 border-grey50 rounded-sm justify-start items-center gap-6 inline-flex hover:shadow-sm hover:bg-white50">
    <p id='popupOpener' className="text-sm">{items.id}</p>
    <div id='popupOpener' className="grow shrink basis-0 justify-between items-center flex">
        <div id='popupOpener' className="flex-col justify-start items-start gap-1 inline-flex">
            <p id='popupOpener'>{items.name}</p>
            <p id='popupOpener' className='text-sm'>Request By: {items.request}</p>
        </div>
        <div className='flex gap-2'>
            <Button label="none" type="accept"/>
            <Button label="none" type="decline"/>
        </div>
    </div>
    </div>
  ))

  return (
    <div className='adminContent flex flex-col gap-6'>
      <h2 className='px-2'>New Application</h2>
      <div className='flex flex-col gap-2 overflow-y-scroll overflow-x-auto px-2 pr-4'>
        {applicationList}
      </div>
      <NewApplications isVisible={popup} onClose={()=>setPopup(false)} />
    </div>
  )
}

export default na