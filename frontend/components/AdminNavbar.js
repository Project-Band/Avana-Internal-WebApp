"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const AdminNavbar = () => {

  const [toggle, setToggle] = useState(0)

  function handleClick(prop){
    setToggle(prevToggle => prevToggle=prop)
  }

  return (
    <div className='flex flex-col bg-white50 shadow-lg w-[25%] h-max pt-6 rounded-sm overflow-hidden gap-10'>
        <div className='flex flex-col gap-4 items-center'>
            <Image src="../demo.png" width={80} height={80} layout="fixed" className='border-2 h-[80px] object-cover object-top overflow-hidden rounded-full border-secondary'/>
            <div className='flex flex-col items-center text-center'>
                <h3 className='text-primary'>Half Guy</h3>
                <p>Admin</p>
            </div>
        </div>
        <div>
            <Link href="/admin/na" className={`block w-full text-base ${toggle==1? `bg-primary text-white50` : `hover:bg-white100 text-black150`}  px-3 py-4 border-t border-b border-grey50 justify-start`} onClick={() => handleClick(1)}>New Applications</Link>
            <Link href="/admin/tac" className={`block w-full text-base ${toggle==2? `bg-primary text-white50` : `hover:bg-white100 text-black150`} px-3 py-4 border-t border-b border-grey50 justify-start`} onClick={() => handleClick(2)}>Terms and Conditions</Link>
            <Link href="/admin/pp" className={`block w-full text-base ${toggle==3? `bg-primary text-white50` : `hover:bg-white100 text-black150`} px-3 py-4 border-t border-b border-grey50 justify-start`} onClick={() => handleClick(3)}>Programmers Profile</Link>
            <Link href="/admin/cp" className={`block w-full text-base ${toggle==4? `bg-primary text-white50` : `hover:bg-white100 text-black150`} px-3 py-4 border-t border-b border-grey50 justify-start`} onClick={() => handleClick(4)}>Create Project</Link>
            <Link href="/admin/vp" className={`block w-full text-base ${toggle==5? `bg-primary text-white50` : `hover:bg-white100 text-black150`} px-3 py-4 border-t border-b border-grey50 justify-start`} onClick={() => handleClick(5)}>View Project</Link>
            <Link href="/admin/er" className={`block w-full text-base ${toggle==6? `bg-primary text-white50` : `hover:bg-white100 text-black150`} px-3 py-4 border-t border-b border-grey50 justify-start`} onClick={() => handleClick(6)}>Enrollment Requests</Link>
        </div>
    </div>
  )
}

export default AdminNavbar