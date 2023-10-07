"use client";

import { Close } from '@mui/icons-material'
import React, { useState } from 'react'
import Link from 'next/link';

const Login = ({isVisible, onClose}) => {

    const [form, setForm] = useState({
        emailAddress: '',
        password: '',
    })

    const handleChange = (e) =>{
        setForm(prevForm => ({
            ...form,
            [e.target.name] : e.target.value
        }))
    }

    if(!isVisible) return null;

    const handleClose = (e) => {
        if(e.target.id==="closer") return onClose()
    }

  return (
    <div id="closer" onClick={handleClose} className='bg-black100 bg-opacity-25 fixed w-screen h-screen z-10 flex items-center justify-center backdrop-blur-sm'>
        <div className='main flex flex-col mx-80 p-6 bg-white50 rounded-sm gap-8 shadow-lg'>
            <div className='flex justify-between items-center'>
                <h3 className='text-primary'> Login </h3>
                <div onClick={() => onClose()}><Close className='text-3xl rounded-sm hover:scale-105 border bg-red cursor-pointer text-white50'/></div>
            </div>
            <form className='flex flex-col gap-8'>
                <div className='w-full'>
                    <label
                        htmlFor="emailAddress"
                        className='formLabel'
                    >
                        Email Address*
                    </label>
                    <input
                        type='email'
                        id='emailAddress'
                        name='emailAddress'
                        onChange={handleChange}
                        placeholder='Enter your Email Address'
                        className='formInput'
                        required
                    />
                </div>
                <div className='w-full'>
                    <label
                        htmlFor="password"
                        className='formLabel'
                    >
                        Password*
                    </label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        onChange={handleChange}
                        placeholder='Enter your password'
                        className='formInput'
                        required
                    />
                </div>
                <Link href="/admin/vp" className='w-full'><input
                    type='submit'
                    value="Login"
                    className='flex w-full h-max border text-white50 justify-center border-secondary gap-2 bg-primary py-2 px-4 rounded-full items-center cursor-pointer'
                /></Link>
            </form>
        </div>
    </div>
  )
}

export default Login