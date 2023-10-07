"use client";

import { Header, Topbar, Button } from '@/components'
import React from 'react'
import Image from 'next/image'
import projects from '@/content/projects';
import { LocationCity, Mail, Phone } from '@mui/icons-material';

const profile = () => {

    const enrolledProjects = projects.map(items => (
        <div className="w-full px-8 py-4 border-t border-b border-zinc-400 justify-start items-center gap-6 inline-flex hover:shadow-sm hover:scale-[1.01] hover:bg-white100">
        <p className="text-sm">{items.id}</p>
        <div className="grow shrink basis-0 justify-between items-center flex">
            <div className="flex-col justify-start items-start gap-1 inline-flex">
                <p>{items.name}</p>
                <p className='text-sm'>{items.desc}</p>
            </div>
            <Button label="Learn more" type= "text" />
        </div>
        </div>
    ))

    const availableProjects = projects.map(items => (
        <div className="w-full px-8 py-4 border-t border-b border-zinc-400 justify-start items-center gap-6 inline-flex hover:shadow-sm hover:bg-white100">
        <p className="text-sm">{items.id}</p>
        <div className="grow shrink basis-0 justify-between items-center flex">
            <div className="flex-col justify-start items-start gap-1 inline-flex">
                <p>{items.name}</p>
                <p className='text-sm'>{items.desc}</p>
            </div>
            <Button label="Request Enrollment" type= "add" className='text-sm'/>
        </div>
        </div>
    ))

    return (
        <div className='main flex flex-col py-4 gap-10'>
            <Header />
            <div className='flex items-center justify-between'>
                <div className='flex gap-4 items-center'>
                    <Image src="../demo.png" width={80} height={80} layout="fixed" className='border-2 h-[80px] object-cover object-top overflow-hidden rounded-full border-secondary'/>
                    <div className='flex flex-col'>
                        <h3 className='text-primary'>Half Guy</h3>
                        <p>Programmer</p>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                   <div className='flex gap-4'><Mail className='text-xl text-primary'/><p> halfguy@gmail.com</p></div>
                   <div className='flex gap-4'><LocationCity className='text-xl text-primary' /><p> Gongabu, Ktm</p></div>
                   <div className='flex gap-4'><Phone className='text-xl text-primary' /><p> +977 00000000</p></div>
                </div>
            </div>
            <div className='flex h-[400px] gap-6 w-full'>
                <div className='bg-white50 shadow-lg h-full w-full rounded-sm relative'>
                    <Topbar label1="Current" label2="Completed" label3="Cancelled" />
                    <div className='flex flex-col mt-4 h-5/6 w-full overflow-y-scroll overflow-x-hidden'>
                        {enrolledProjects}
                    </div>
                </div>
                <div className='bg-white50 shadow-lg h-full w-full rounded-sm'>
                    <h3 className='text-green px-6 py-2'>Available Projects</h3>
                    <div className='flex flex-col mt-4 h-5/6 w-full overflow-y-scroll overflow-x-hidden'>
                        {availableProjects}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default profile