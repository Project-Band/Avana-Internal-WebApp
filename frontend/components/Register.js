"use client";

import { Close } from '@mui/icons-material'
import React, { Fragment, useState } from 'react'
import Link from 'next/link';
import registerInfo from '@/content/registerInfo';

const Register = ({isVisible, onClose}) => {

    const [popup, setPopup] = useState("none")

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        homeAddress: '',
        emailAddress: '',
        password:'',
        confPassword:'',
        phone: '',
        username: '',
        gender: ''
    })

    const handleChange = (e) =>{
        setForm(prevForm => ({
            ...form,
            [e.target.name] : e.target.value
        }))
        if (form.username=="halfguy") {
            setPopup("username")
        }
        if(form.emailAddress=="nothalfguy@gmail.com"){
            setPopup("emailAddress")
        }
        if(form.emailAddress=="nothalfguy@gmail.com" && form.username=="halfguy"){
            setPopup("userAddress")
        }
    }

    if(!isVisible) return null;

    const handleClose = (e) => {
        if(e.target.id==="closer") return onClose()
    }

  return (
    <div id="closer" onClick={handleClose} className='bg-black100 bg-opacity-25 fixed w-screen h-screen z-10 flex items-center justify-center backdrop-blur-sm'>
        <div className='main relative flex flex-col mx-80 h-4/5 p-6 bg-white50 rounded-sm gap-8 shadow-lg'>
            <div className='flex justify-between items-center'>
                <h3 className='text-primary'> Register </h3>
                <div onClick={() => onClose()}><Close className='text-3xl rounded-sm hover:scale-105 border bg-red cursor-pointer text-white50'/></div>
            </div>
            <form className='flex flex-col gap-8 pr-4 overflow-y-scroll'>
                <div className='flex gap-6'>
                    <div className='w-full'>
                        <label
                            htmlFor="firstName"
                            className='formLabel'
                        >
                            First Name*
                        </label>
                        <input
                            type='text'
                            id='firstName'
                            name='firstName'
                            onChange={handleChange}
                            placeholder='Enter your First Name'
                            className='formInput'
                            required
                        />
                    </div>
                    <div className='w-full'>
                        <label
                            htmlFor="lastName"
                            className='formLabel'
                        >
                            Last Name*
                        </label>
                        <input
                            type='text'
                            id='lastName'
                            name='lasName'
                            onChange={handleChange}
                            placeholder='Enter your Last Name'
                            className='formInput'
                            required
                        />
                    </div>
                </div>
                <div className='w-full'>
                    <label
                        htmlFor="homeAddress"
                        className='formLabel'
                    >
                        Home Address*
                    </label>
                    <input
                        type='text'
                        id='homeAddress'
                        name='homeAddress'
                        onChange={handleChange}
                        placeholder='Enter your Home Address'
                        className='formInput'
                        required
                    />
                </div>
                <div className='w-full'>
                    <label
                        htmlFor="emailAddress"
                        className='formLabel'
                    >
                        Personal Email Address*
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
                        Enter Password*
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
                <div className='w-full'>
                    <label
                        htmlFor="confPassword"
                        className='formLabel'
                    >
                        Confirm Password*
                    </label>
                    <input
                        type='password'
                        id='confPassword'
                        name='confPassword'
                        onChange={handleChange}
                        placeholder='Confirm your password'
                        className='formInput'
                        required
                    />
                </div>
                <div className='flex gap-6'>
                    <div className='flex w-full flex-col gap-8'>
                        <div className='w-full'>
                            <label
                                htmlFor="phone"
                                className='formLabel'
                            >
                                Phone Numnber*
                            </label>
                            <input
                                type='number'
                                id='phone'
                                name='phone'
                                onChange={handleChange}
                                placeholder='Enter your Phone Number'
                                className='formInput appearance-none'
                                required
                            />
                        </div>
                        <div className='w-full'>
                            <label
                                htmlFor="username"
                                className='formLabel'
                            >
                                Username*
                            </label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                onChange={handleChange}
                                placeholder='Enter your Username'
                                className='formInput appearance-none'
                                required
                            />
                        </div>
                        <div className='w-full'>
                            <label
                                className='formLabel mb-2'
                            >
                                Gender*
                            </label>
                            
                            <div className='flex w-full justify-between'>
                                <label><input id='gender' type="radio" name="gender" value="male" onChange={handleChange} className='m-0' required/> Male</label>
                                <label><input id='gender' type="radio" name="gender" value="female" onChange={handleChange} className='m-0' required/> Female</label>
                                <label><input id='gender' type="radio" name="gender" value="other" onChange={handleChange} className='m-0' required/> Other</label>
                            </div>
                            
                        </div>
                    </div>
                    <div className='flex flex-col w-full items-center justify-center gap-2'>
                        <input type='file' file className='appearance-none rounded-full border-2 border-secondary top-1/2 bg-white100 w-[150px] h-[150px] file:bg-white100 file:w-full file:h-full file:cursor-pointer  file:m-0 file:mt-1 file:text-black150 file:px-3 file:border-none'/>
                        <h4 className='text-primary text-center'>Profile Image</h4>
                    </div>
                </div>
                <Link href="/logged"><input
                    type='submit'
                    value="Register"
                    className='w-full flex h-max border text-white50 justify-center border-secondary gap-2 bg-primary py-2 px-4 rounded-full items-center cursor-pointer'
                /></Link>
            </form>
            <div className={`${popup=="username"? 'fixed': 'hidden'} absolute flex self-center w-full h-max bottom-0 items-center justify-center`}>
                <div className='flex text-center w-full flex-col p-3 bg-white50 rounded-sm gap-8 shadow-lg'>
                    <p className='text-red'>The Username already exists</p>
                </div>
            </div>
            <div className={`${popup=="emailAddress"? 'fixed': 'hidden'} absolute flex self-center w-full h-max bottom-0 items-center justify-center`}>
                <div className='flex text-center w-full flex-col p-3 bg-white50 rounded-sm gap-8 shadow-lg'>
                    <p className='text-red'>The Email already exists</p>
                </div>
            </div>
            <div className={`${popup=="userAddress"? 'fixed': 'hidden'} absolute flex self-center w-full h-max bottom-0 items-center justify-center`}>
                <div className='flex text-center w-full flex-col p-3 bg-white50 rounded-sm gap-8 shadow-lg'>
                    <p className='text-red'>The Email and Username already exists</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register