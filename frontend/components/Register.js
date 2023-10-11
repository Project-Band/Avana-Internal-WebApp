"use client";

import { Close } from '@mui/icons-material'
import React, { Fragment, useState } from 'react'
import Link from 'next/link';
import Button from './Button';

const Register = ({isVisible, onClose}) => {

    const [popup, setPopup] = useState("none")
    const [selectedImage, setSelectedImage] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        homeAddress: '',
        emailAddress: '',
        pass:'',
        confPass:'',
        phone: '',
        username: '',
        gender: ''
    })

    const handleChange = (e) =>{
        setForm(prevForm => ({
            ...form,
            [e.target.name] : e.target.value
        }))
        if (e.target.name === 'confPass') {
            setPasswordMatchError(form.pass !== e.target.value);
          }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const checkResponse = await fetch('localhost:8000/registerinfo', {
              method: 'GET', // Use GET to retrieve data without modifying it
            });
        
            if (checkResponse.ok) {
              const existingData = await checkResponse.json();
              const isUsernameExists = existingData.some(item => item.username === form.username);
              const isEmailExists = existingData.some(item => item.email === form.email);
        
              if (isUsernameExists) {
                window.alert('Username already exists. Please choose a different one.');
                return;
              }
        
              if (isEmailExists) {
                window.alert('Email already exists. Please use a different email.');
                return;
              }
            } else {
              window.alert('Failed to check existing data. Please try again later.');
              return;
            }
          } catch (error) {
            window.alert('Error checking data. Please check your internet connection.');
            return;
          }
    
        try {
          const response = await fetch('localhost:8000/registerinfo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
          })
         
          if (response.ok) {
            // Successful registration
            window.alert('You have successfully registered. Check your email.');
          } else {
              window.alert('Registration failed. Please try again later.');
            }
        } catch (error) {
          // Handle network-related errors
          console.error('Error registering:', error);
          window.alert('Error registering. Please check your internet connection.');
        }
      };

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
            <form className='flex flex-col gap-8 pr-4 overflow-y-scroll' onSubmit={handleSubmit}>
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
                            name='lastName'
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
                        name='pass'
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
                        name='confPass'
                        onChange={handleChange}
                        placeholder='Confirm your password'
                        className='formInput'
                        required
                    />
                    {passwordMatchError && (
                        <p className="text-sm text-red">Passwords do not match.</p>
                    )}
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
                    <label className="w-full h-max mx-24 mt-8 space-y-4">
                        <input
                        type="file"
                        hidden
                        onChange={({ target }) => {
                            if (target.files) {
                            const file = target.files[0];
                            setSelectedImage(URL.createObjectURL(file));
                                }
                        }}
                        />
                        <div className="w-full h-[100px] aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                        {selectedImage ? (
                            <img src={selectedImage} alt="" className='h-[100px] object-cover'/>
                        ) : (
                            <span>Select Image</span>
                        )}
                        </div>
                        <Button type="add" label="Upload Image" />
                    </label>
                </div>
                <input
                    type='submit'
                    value="Register"
                    className='w-full flex h-max border text-white50 justify-center border-secondary gap-2 bg-primary py-2 px-4 rounded-full items-center cursor-pointer'
                />
            </form>
        </div>
    </div>
  )
}

export default Register