"use client";

import React, { useState, useEffect } from 'react'
import { ArchProfile, Button, Mail, ProgProfile, Topbar } from '@/components'
import Image from 'next/image'
import { HOME_API } from '@/apiConfig';

const pp = () => {

  const [profile, setProfile] = useState([]);
  const [toggle, setToggle] = useState(1)

  const handleFilter = (status) => {
    setToggle(status)
  }

  useEffect(() => {
    // Fetch data from the API here
    const fetchData = async () => {
      try {
        const response = await fetch(HOME_API);
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

    const [popupProg, setPopupProg] = useState(false)
    const [popupArch, setPopupArch] = useState(false)
    const [popupMail, setPopupMail] = useState(false)
    const [programmer, setProgrammer] = useState("")
    const [architect, setArchitect] = useState("")

    const handlePopup = (e, name) =>{
      if(e.target.id === "popupOpenerP") {
        setPopupProg(true)
        setProgrammer(name)
      }
      if(e.target.id === "popupOpenerA") {
        setPopupArch(true)
        setArchitect(name)
      }
    }

  const programmers = profile.programmers? profile.programmers.map(items => (
    <div id="popupOpenerP" onClick={(e) => handlePopup(e, items.username)} className="cursor-pointer w-full px-8 py-4 border bg-white0 border-grey50 rounded-sm justify-start items-center gap-6 inline-flex hover:shadow-sm hover:scale-[1.01] hover:bg-white100">
    <div id="popupOpenerP" className="grow shrink basis-0 justify-between items-center flex">
        <div id="popupOpenerP" className='flex gap-4 items-center'>
            <Image id="popupOpenerP" src="/demo.png" width={50} height={50} layout="fixed" className='border-2 h-[50px] object-cover object-top overflow-hidden rounded-full border-secondary'/>
            <div id="popupOpenerP" className='flex flex-col'>
                <p id="popupOpenerP" className='text-primary'>{items.name}</p>
                <p id="popupOpenerP" className='text-sm'>Programmer</p>
            </div>
        </div>
        <div onClick={() => {setPopupMail(true); setProgrammer(items.username)}}><Button label="none" type='mail'/></div>
    </div>
    </div>
  )):null

  const architects = profile.architects? profile.architects.map(items => (
    <div id="popupOpenerA" onClick={(e) => handlePopup(e, items.username)} className="cursor-pointer w-full px-8 py-4 border bg-white0 border-grey50 rounded-sm justify-start items-center gap-6 inline-flex hover:shadow-sm hover:scale-[1.01] hover:bg-white100">
    <div id="popupOpenerA" className="grow shrink basis-0 justify-between items-center flex">
        <div id="popupOpenerA" className='flex gap-4 items-center'>
            <Image id="popupOpenerA" src="/demo.png" width={50} height={50} layout="fixed" className='border-2 h-[50px] object-cover object-top overflow-hidden rounded-full border-secondary'/>
            <div id="popupOpenerA" className='flex flex-col'>
                <p id="popupOpenerA" className='text-primary'>{items.name}</p>
                <p id="popupOpenerA" className='text-sm'>Architect</p>
            </div>
        </div>
        <div onClick={() => {setPopupMail(true); setArchitect(items.username)}}><Button label="none" type='mail'/></div>
    </div>
    </div>
  )):null

  return (
    <div className='adminContent relative flex flex-col gap-6'>
      <h2 className='px-2'>Programmers Profile</h2>
      <Topbar label1="Programmers" label2="Architects" onToggle={handleFilter} />
      <div className='flex flex-col gap-2 overflow-y-scroll overflow-x-auto px-2 pr-4'>
        {toggle ===1 && programmers}
        {toggle ===2 && architects}
      </div> 
      <ArchProfile username={architect} isVisible={popupArch} onClose={() => setPopupArch(false)}/>
      <ProgProfile username={programmer} isVisible={popupProg} onClose={() => setPopupProg(false)}/>
      <Mail isVisible={popupMail} onClose={() => setPopupMail(false)} username={programmer}/>
    </div>
  )
}

export default pp