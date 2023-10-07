import { Close } from '@mui/icons-material';
import React from 'react'
import Image from 'next/image';
import {Button, Topbar } from '@/components'
import registerInfo from '@/content/registerInfo';

const NewApplications = ({isVisible, onClose}) => {

    const applicationList = registerInfo.map(items =>(
        <div className='flex gap-10 w-full'>
            <div className='flex flex-col gap-6 w-full'>
                <div className='flex gap-2 w-full items-center'>
                    <p className='text-primary w-2/5'>Name:</p>
                    <p className='p-3 w-full bg-white0 rounded-sm hover:bg-white50'>{items.firstName} {items.lastName}</p>
                </div>
                <div className='flex gap-2 w-full items-center'>
                    <p className='text-primary w-2/5'>Email Address:</p>
                    <p className='p-3 w-full bg-white0 rounded-sm hover:bg-white50'>{items.emailAddress}</p>
                </div>
                <div className='flex gap-2 w-full items-center'>
                    <p className='text-primary w-2/5'>Home Address:</p>
                    <p className='p-3 w-full bg-white0 rounded-sm hover:bg-white50'>{items.homeAddress}</p>
                </div>
            </div>
            <div className='flex flex-col gap-6 w-full'>
                <div className='flex gap-2 w-full items-center'>
                    <p className='text-primary w-2/5'>Username:</p>
                    <p className='p-3 w-full bg-white0 rounded-sm hover:bg-white50'>{items.username}</p>
                </div>
                <div className='flex gap-2 w-full items-center'>
                    <p className='text-primary w-2/5'>Phone:</p>
                    <p className='p-3 w-full bg-white0 rounded-sm hover:bg-white50'>{items.phone}</p>
                </div>
                <div className='flex gap-2 w-full items-center'>
                    <p className='text-primary w-2/5'>Gender:</p>
                    <p className='p-3 w-full bg-white0 rounded-sm hover:bg-white50'>{items.gender}</p>
                </div>
            </div>
        </div>
    ))

    if(!isVisible) return null;

    const handleClose = (e) => {
        if(e.target.id === "closer") onClose()
    }
  
  return (
    <div id='closer' onClick={handleClose} className='fixed flex w-screen h-screen inset-0 bg-black150 bg-opacity-20 backdrop-blur-sm justify-center items-center'>
        <div className='flex flex-col w-4/5 h-max p-6 bg-white50 gap-8 rounded-sm shadow-lg'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-40 items-center'>
                    <div className='flex gap-4 items-center'>
                        <Image src="/demo.png" width={60} height={60} layout="fixed" className='border-2 h-[60px] object-cover object-top overflow-hidden rounded-full border-secondary'/>
                        <h3 className='text-primary'>Half Guy</h3>
                    </div>
                    <div className='flex gap-4'>
                        <Button label="Accept" type="accept" />
                        <Button label="Decline" type="decline" />
                    </div>
                </div>
                <div onClick={() => onClose()}><Close className='text-3xl hover:scale-105 border bg-red cursor-pointer rounded-sm text-white50'/></div>
            </div>
            <div className='bg-white50 h-4/5 w-full rounded-sm relative'>
                {applicationList}
            </div>
        </div>
    </div>
  )
}

export default NewApplications