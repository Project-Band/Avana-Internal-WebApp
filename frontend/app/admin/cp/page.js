"use client";

import React, {useState} from 'react'
import { Button } from '@/components';

const cp = () => {


  return (
    <div className='adminContent flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
            <h2 className='px-2'>Create Project</h2>
            <Button type="add" label="Create Project"/>
        </div>
      <div className='flex flex-col gap-10 overflow-y-scroll overflow-x-auto px-2 pr-4'>
        <div className='flex flex-col gap-2 h-max'>
            <h4 className='text-primary'>Project Title</h4>
            <input type="text" placeholder='Enter Project Title' className='text-base bg-white50 text-black150 focus:outline-none border-b p-2 w-full'/>
        </div>
        <div className='flex flex-col gap-2 h-max'>
            <h4 className='text-primary'>Upload Project Image</h4>
            <input type="file" accept="image/*" placeholder='Upload Project Image' className='text-base h-[100px] text-black150 border-none file:w-full file:h-full file:cursor-pointer file:bg-white100  file:m-0 file:mt-1 file:text-black150 file:px-3 file:border-none'/>
        </div>
        <div className='flex flex-col gap-2 h-max'>
            <h4 className='text-primary'>Project Description</h4>
            <textarea
                className="h-[200px] rounded-sm p-3 w-full focus:outline-none"
                placeholder='Add Description of Project'
                rows={20}
                cols={80} 
            />
        </div>
        <div className='flex flex-col gap-2 h-max'>
            <h4 className='text-primary'>Project Deadline</h4>
            <div className='flex gap-8 w-full'>
              <label className='flex w-full whitespace-nowrap items-center gap-4 text-primary'>Start Date: <input type="date" placeholder='Start Date' className='text-base bg-white100 text-black150 rounded-sm focus:outline-none p-2 px-4 w-max'/></label>
              <label className='flex w-full whitespace-nowrap items-center gap-4 text-primary'>End Date: <input type="date" placeholder='End Date' className='text-base bg-white100 text-black150 rounded-sm focus:outline-none p-2 px-4 w-max'/></label>
            </div>
        </div>
      </div> 
    </div>
  )
}

export default cp