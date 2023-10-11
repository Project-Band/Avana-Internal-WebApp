"use client";

import React, { useState, useEffect } from 'react'
import { Button, Mail, ProgProfile } from '@/components'
import Image from 'next/image'

const pp = () => {

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    // Fetch data from the API here
    const fetchData = async () => {
      try {
        const response = await fetch('localhost:8000/profile');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfile(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetch function when the component mounts
  }, []);

    const [popup, setPopup] = useState(false)
    const [popupMail, setPopupMail] = useState(false)

    const handlePopup = (e) =>{
      if(e.target.id === "popupOpener") setPopup(true)
    }

  const programmers = profile? profile.map(items => (
    <div id="popupOpener" onClick={handlePopup} className="cursor-pointer w-full px-8 py-4 border bg-white0 border-grey50 rounded-sm justify-start items-center gap-6 inline-flex hover:shadow-sm hover:scale-[1.01] hover:bg-white100">
    <p id="popupOpener" className="text-sm">{items.id}</p>
    <div id="popupOpener" className="grow shrink basis-0 justify-between items-center flex">
        <div id="popupOpener" className='flex gap-4 items-center'>
            <Image id="popupOpener" src={`../${items.src}`} width={50} height={50} layout="fixed" className='border-2 h-[50px] object-cover object-top overflow-hidden rounded-full border-secondary'/>
            <div id="popupOpener" className='flex flex-col'>
                <p id="popupOpener" className='text-primary'>{items.name}</p>
                <p id="popupOpener" className='text-sm'>{items.title}</p>
            </div>
        </div>
        <div onClick={()=> setPopupMail(true)}><Button label="none" type='mail'/></div>
    </div>
    </div>
  )):null

  return (
    <div className='adminContent relative flex flex-col gap-6'>
      <h2 className='px-2'>Programmers Profile</h2>
      <div className='flex flex-col gap-2 overflow-y-scroll overflow-x-auto px-2 pr-4'>
        {programmers}
      </div> 
      <ProgProfile isVisible={popup} onClose={() => setPopup(false)}/>
      <Mail isVisible={popupMail} onClose={() => setPopupMail(false)}/>
    </div>
  )
}

export default pp