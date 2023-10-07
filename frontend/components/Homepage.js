"use client";

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import homecontent from '@/content/homeContent'
import {Button, Login, Register} from '@/components'

const Homepage = () => {

  const [popupReg, setPopupReg] = useState(false);
  const [popupLog, setPopupLog] = useState(false);

  const scrollContainer1 = useRef(null);
  const scrollContainer2 = useRef(null); // Create a ref for the scrollable container

  // Add an event listener when the component mounts
  useEffect(() => {
    const container1 = scrollContainer1.current;
    const container2 = scrollContainer2.current;

    if (container1) {
      container1.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        container1.scrollLeft += evt.deltaY; // Scroll horizontally based on vertical scroll
      });
    }

    if (container2) {
        container2.addEventListener('wheel', (evt) => {
          evt.preventDefault();
          container2.scrollLeft += evt.deltaY; // Scroll horizontally based on vertical scroll
        });
      }

    return () => {
      if (container1) {
        container1.removeEventListener('wheel', (evt) => {
          evt.preventDefault();
          container1.scrollLeft += evt.deltaY;
        });
      }
      if (container2) {
        container2.removeEventListener('wheel', (evt) => {
          evt.preventDefault();
          container2.scrollLeft += evt.deltaY;
        });
      }
    };

  }, []);

  const programmers = homecontent.programmers.map(items => (
    <div className='flex flex-col items-center gap-4'>
      <div className='relative w-24 h-24'><Image src={`/images/home/${items.img}`} fill={true} objectFit='cover' className='border-2 object-top overflow-hidden rounded-full border-secondary object-cover'/></div>
      <p>{items.name}</p>
    </div>
  ))
    
  const architects = homecontent.architects.map(items =>(
    <div className='flex flex-col items-center gap-4'>
      <div className='relative w-24 h-24'><Image src={`/images/home/${items.img}`} fill={true} objectFit='cover' className='border-2 object-top overflow-hidden rounded-full border-secondary object-cover'/></div>
      <p>{items.name}</p>
    </div>
  ))

  return (
    <div className='h-screen w-screen'>
      <Register isVisible={popupReg} onClose={() => setPopupReg(false)}/>
      <Login isVisible={popupLog} onClose={() => setPopupLog(false)}/>
      <div className='main h-screen relative py-2 flex flex-col justify-between gap-5'>
        <div className='flex justify-between w-full gap-10'>
          <Image 
            src='avana_logo.svg'
            width={160}
            height={160}
            alt='Avana Logo'
            className='bg-white50 p-2 px-6 rounded-sm box-content'
          />
          <div className='flex justify-between bg-white50 rounded-sm grow py-4 px-4'>
              <div className='flex flex-col'>
                    <h3 className='text-primary'>Welcome to Avana</h3>
                    <p>Register or Login to proceed.</p>
              </div>
              <div className='flex gap-4'>
                <div onClick={() => setPopupLog(true)}><Button type="login" /></div>
                <div onClick={() => setPopupReg(true)}><Button type="register" /></div>
              </div>
          </div>
        </div>
        <div className='main flex flex-col gap-4 px-6 py-4 bg-white50 rounded-sm'>
          <h3 className='text-primary'>Architects</h3>
          <div ref={scrollContainer1} className='flex gap-10 overflow-clip overflow-x-scroll scroll-smooth'>
            {architects}
          </div>
        </div>
        <div className='main flex flex-col gap-4 px-6 py-4 bg-white50 rounded-sm'>
          <h3 className='text-primary'>Programmers</h3>
          <div ref={scrollContainer2} className='flex gap-10 overflow-clip overflow-x-scroll scroll-smooth'>
            {programmers}
          </div>
        </div>
        <p className='relative text-center bottom-0'>Copyright @ Avana Game Studio LLC</p>
      </div>
    </div>
  )
}

export default Homepage