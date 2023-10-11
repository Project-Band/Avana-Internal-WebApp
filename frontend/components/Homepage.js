"use client";

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {Button, Login, Register, ToC} from '@/components'

const Homepage = () => {

  const [popupReg, setPopupReg] = useState(false);
  const [popupToC, setPopupToC] = useState(false);

  return (
    <div className='relative h-screen w-screen'>
      <Image 
            src='./avana_logo.svg'
            width={1000}
            height={600}
            alt='Avana Logo'
            className='absolute inset-0 m-auto -z-10 opacity-30'
          />
      <Register isVisible={popupReg} onClose={() => setPopupReg(false)}/>
      <ToC isVisible={popupToC} onClose={()=>setPopupToC(false)}/>
      <div className='main h-screen relative py-6 flex flex-col gap-16 items-center justify-center'>
          <div className='flex justify-between items-center w-2/5 h-max bg-white50 rounded-sm py-4 px-4'>
            <Image 
              src='./avana_logo.svg'
              width={160}
              height={160}
              alt='Avana Logo'
            />
            <div className='h-full border-l-grey50 border-l-2 shadow-md'></div>
            <div className='flex flex-col'>
                  <h3 className='text-primary'>Welcome to Avana</h3>
                  <p>Register or Login to proceed.</p>
            </div>
        </div>
        <div className='flex flex-col p-5 w-2/5 bg-white50 rounded-sm shadow-lg gap-6'>
          <Login TocPopup={()=>setPopupToC(true)}/>
          <div onClick={() => setPopupReg(true)}><Button type="register" /></div>
        </div>
      </div>
    </div>
  )
}

export default Homepage