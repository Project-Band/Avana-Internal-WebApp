"use client"

import { Close } from '@mui/icons-material';
import React, { useState } from 'react'
import Image from 'next/image';
import {Button, Topbar } from '@/components'
import { MAIL_PP_API } from '@/apiConfig';
import toast from 'react-hot-toast';

const Mail = ({isVisible, onClose, username}) => {

    const [mail, setMail] = useState({
        username: username,
        subject:'',
        content:''
    })

    const handleChange = (e) =>{
        setMail(prevMail => ({
            ...prevMail,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(MAIL_PP_API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(mail),
          })
         
          if (response.ok) {
            toast.success('Mail sent successfully');
            onClose()
          } else {
              toast.error('Couldn\'t send the mail.');
            }
        } catch (error) {
          toast.error('Error sending mail. Please check your internet connection.');
        }
      };

    if(!isVisible) return null;

    const handleClose = (e) => {
        if(e.target.id === "closer") onClose()
    }
  
  return (
    <div id='closer' onClick={handleClose} className='fixed flex w-screen h-screen inset-0 bg-black150 bg-opacity-20 backdrop-blur-sm justify-center items-center'>
        <div className='flex flex-col w-5/6 h-4/5 p-6 bg-white50 gap-8 rounded-sm shadow-lg'>
            <div className='flex justify-between items-center'>
                <h4>Mail to {username}</h4>
                <div onClick={() => onClose()}><Close className='text-3xl hover:scale-105 border bg-red cursor-pointer rounded-sm text-white50'/></div>
            </div>
            <form className='flex flex-col h-full' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Subject'
                    name='subject'
                    onChange={handleChange}
                    className='appearance-none bg-white50 border-t border-b border-grey50 focus:outline-none w-full p-3'
                />
                <textarea
                    type='text'
                    name='content'
                    placeholder='Enter your mail here'
                    onChange={handleChange}
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