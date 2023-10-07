import { Close } from '@mui/icons-material';
import React from 'react'
import {Button} from '@/components'
import profile from '@/content/profile';
import Image from 'next/image';

const EnrollProgrammers = ({isVisible, onClose}) => {

    const profileList = profile.map(items => (
        <div className="w-full p-3 bg-white0 border-grey50 border-b justify-start items-center gap-6 inline-flex hover:shadow-sm hover:bg-white50">
        <p className="text-sm">{items.id}</p>
        <div className="grow shrink basis-0 justify-between items-center flex">
            <div className='flex gap-4 items-center'>
                <Image src={`../${items.src}`} width={40} height={40} layout="fixed" className='border-2 h-[40px] object-cover object-top overflow-hidden rounded-full border-secondary'/>
                <div className='flex flex-col'>
                    <p className='text-primary'>{items.name}</p>
                    <p className='text-sm'>{items.title}</p>
                </div>
            </div>
            <Button label="Remove" type='decline'/>
        </div>
        </div>
      ))

      const availableProfileList = profile.map(items => (
        <div className="w-full p-3 border-b bg-white0 border-grey50 justify-start items-center gap-6 inline-flex hover:shadow-sm hover:bg-white50">
        <p className="text-sm">{items.id}</p>
        <div className="grow shrink basis-0 justify-between items-center flex">
            <div className='flex gap-4 items-center'>
                <Image src={`../${items.src}`} width={40} height={40} layout="fixed" className='border-2 h-[40px] object-cover object-top overflow-hidden rounded-full border-secondary'/>
                <div className='flex flex-col'>
                    <p className='text-primary'>{items.name}</p>
                    <p className='text-sm'>{items.title}</p>
                </div>
            </div>
            <Button label="Enroll" type='accept'/>
        </div>
        </div>
      ))

    if(!isVisible) return null;

    const handleClose = (e) => {
        if(e.target.id === "closer") onClose()
    }
  
  return (
    <div id='closer' onClick={handleClose} className='fixed flex w-screen h-screen inset-0 bg-black150 bg-opacity-20 backdrop-blur-sm justify-center items-center'>
        <div className='flex flex-col w-5/6 h-4/5 p-6 bg-white50 gap-8 rounded-sm shadow-lg'>
            <div className='flex justify-between items-start'>
                <div className='flex flex-col gap-2'>
                    <h2>Project Name</h2>
                    <p>Description of Project</p>
                </div>
                <div onClick={() => onClose()}><Close className='text-3xl hover:scale-105 border bg-red cursor-pointer rounded-sm text-white50'/></div>
            </div>
            <div className='flex h-[400px] gap-6 w-full'>
                <div className='bg-white0 shadow-lg p-4 h-full w-full rounded-sm relative'>
                    <h4 className='text-primary px-3 py-2'>Enrolled Programmers</h4>
                    <div className='flex flex-col pr-4 mt-4 h-5/6 w-full overflow-y-scroll overflow-x-hidden'>
                        {profileList}
                    </div>
                </div>
                <div className='bg-white0 shadow-lg p-4 h-full w-full rounded-sm'>
                    <h4 className='text-green px- py-2'>Available Programmers</h4>
                    <div className='flex flex-col pr-4 mt-4 h-5/6 w-full overflow-y-scroll overflow-x-hidden'>
                        {availableProfileList}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EnrollProgrammers