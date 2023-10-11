"use client";

import React, {useState, useEffect} from 'react'
import { Button } from '@/components';

const cp = () => {

  const [form, setForm] = useState({
    projectTitle: '',
    startDate: '',
    endDate: '',
    sectionTitle:'',
    sectionImage: '',
    sectionDesc:''
    
})

const handleChange = (e) =>{
    setForm(prevForm => ({
        ...form,
        [e.target.name] : e.target.value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    setForm((prevForm) => ({
      ...prevForm,
      sectionImage: file // Store the file object in the form state
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('localhost:8000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Assuming the server responds with a success message
      const data = await response.json();
      window.alert('Project created successfully:', data);
  
 
    } catch (error) {
      window.alert('Error creating project:', error);
      // Handle errors, display error messages, etc.
    }
  };

  return (
    <div className='adminContent flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
            <h2 className='px-2'>Create Project</h2>
            <Button type="add" label="Create Project"/>
        </div>
      <div className='flex flex-col gap-10 overflow-y-scroll overflow-x-auto px-2 pr-4'>
        <div className='flex flex-col gap-2 h-max'>
            <h4 className='text-primary'>Project Title</h4>
            <input type="text" placeholder='Enter Project Title' className='formInput' name='projectTitle' onChange={handleChange}/>
        </div>
        <div className='flex flex-col gap-2 h-max'>
            <h4 className='text-primary'>Project Deadline</h4>
            <div className='flex gap-8 w-full'>
              <label className='flex w-full whitespace-nowrap items-center gap-4 text-black150'>Start Date: <input type="date" placeholder='Start Date' className='text-base bg-white100 text-black150 rounded-sm focus:outline-none p-2 px-4 w-max' name='startDate' onChange={handleChange}/></label>
              <label className='flex w-full whitespace-nowrap items-center gap-4 text-black150'>End Date: <input type="date" placeholder='End Date' className='text-base bg-white100 text-black150 rounded-sm focus:outline-none p-2 px-4 w-max' name='endDate' onChange={handleChange}/></label>
            </div>
        </div>
        <div className='bg-primary py-1 w-full'></div>
        <h4 className='text-primary text-center'>Project Sections</h4>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2 h-max'>
              <input type="text" placeholder='Section title (Optional)' className='formInput' name='sectionTitle' onChange={handleChange}/>
          </div>
          <div className='flex flex-col gap-2 h-max'>
              <h4 className='text-primary'>Upload Section Image</h4>
              <input type="file" accept="image/*" name='sectionImage' onChange={handleFileChange} placeholder='Upload Project Image' className='text-base h-[80px] text-black150 border-none file:w-full file:h-full file:cursor-pointer file:bg-white100  file:m-0 file:mt-1 file:text-black150 file:px-3 file:border-none'/>
          </div>
          <div className='flex flex-col gap-2 h-max w-max'>
              <h4 className='text-primary'>Section Description</h4>
              <textarea
                  name='sectionDesc' 
                  onChange={handleChange}
                  className="h-[200px] rounded-sm p-3 w-full focus:outline-none"
                  placeholder='Add Description of Project'
                  rows={10}
                  cols={80}
              />
          </div>
          <hr className='w-full border-primary border-dashed' />
        </div>
        <div className='text-center mx-5' onClick={handleSubmit}><Button type="add" label="Add Sections" /></div>
      </div> 
    </div>
  )
}

export default cp