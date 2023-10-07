import { Close } from '@mui/icons-material';
import React from 'react'
import Image from 'next/image';
import {Button, Topbar } from '@/components'

const Mail = ({isVisible, onClose}) => {

    if(!isVisible) return null;

    const handleClose = (e) => {
        if(e.target.id === "closer") onClose()
    }
  
  return (
    <div id='closer' onClick={handleClose} className='fixed flex w-screen h-screen inset-0 bg-black150 bg-opacity-20 backdrop-blur-sm justify-center items-center'>
        <div className='flex flex-col w-5/6 h-4/5 p-6 bg-white50 gap-8 rounded-sm shadow-lg'>
            <div className='flex justify-between items-center'>
                <h4>Mail to Half Guy</h4>
                <div onClick={() => onClose()}><Close className='text-3xl hover:scale-105 border bg-red cursor-pointer rounded-sm text-white50'/></div>
            </div>
            <form className='flex flex-col h-full'>
                <input
                    type='text'
                    placeholder='Subject'
                    className='appearance-none bg-white50 border-t border-b border-grey50 focus:outline-none w-full p-3'
                />
                <textarea
                    type='text'
                    placeholder='Enter your mail here'
                    className='appearance-none bg-white50 h-5/6 border-b border-grey50 focus:outline-none w-full p-3'
                />
                <input
                    type='submit'
                    value='Send Mail'
                    className='w-full mt-6 flex h-max border text-white50 justify-center border-secondary gap-2 bg-primary py-2 px-4 rounded-full items-center cursor-pointer'
                />
            </form>
        </div>
    </div>
  )
}

export default Mail