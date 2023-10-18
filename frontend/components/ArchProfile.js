"use client"

import { Close } from '@mui/icons-material';
import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import {Button, Topbar } from '@/components'
import { DELETE_PP_API, UPGRADE_PP_API, USER_API } from '@/apiConfig';
import toast from 'react-hot-toast';

const ArchProfile = ({isVisible, onClose, username}) => {

    const [userData, setUserData] = useState([]);

    const [projectStatus, setProjectStatus] = useState(1)

    const handleDowngrade = async (username) => {

      const requestData = {
        username: username
      }
  
      try {
        const response = await fetch(UPGRADE_PP_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        })
       
        if (response.ok) {
         toast.success('Succesfully Dpgraded to Programmer');
        } else {
            toast.error('Couldn\'t Downgrade to programmer');
          }
      } catch (error) {
        toast.error('Error requesting');
  
      }
    };
  
    const handleDelete = async (username) => {
  
      const requestData = {
        username: username
      }
  
      try {
        const response = await fetch(DELETE_PP_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        })
       
        if (response.ok) {
         toast.success('Succesfully Deleted');
        } else {
            toast.error('Couldn\'t delete the architect');
          }
      } catch (error) {
        toast.error('Error requesting');
  
      }
    };

  const handleFilter = (status) => {
    setProjectStatus(status)
  }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(USER_API(username));
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUserData(data); // Update state with fetched data
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData(); // Call the fetch function when the component mounts
    }, [username]);

    
    const enrolledProjects = userData.enrolled_projects? userData.enrolled_projects
    .filter((items) => items.project_status === `${projectStatus === 1? "A": projectStatus === 2? "C" : projectStatus === 3? "S" : ""}`)
    .map(items => (
        <div className="w-full px-8 py-4 border-t border-b border-zinc-400 justify-start items-center gap-6 inline-flex hover:shadow-sm hover:scale-[1.01] hover:bg-white100">
        <div className="grow shrink basis-0 justify-between items-center flex">
            <div className="flex-col justify-start items-start gap-1 inline-flex">
                <p>{items.project_name}</p>
                <p className='text-sm overflow-hidden'>{items.project_description}</p>
            </div>
        </div>
        </div>
    )):null

    if(!isVisible) return null;

    const handleClose = (e) => {
        if(e.target.id === "closer") onClose()
    }
  
  return (
    <div id='closer' onClick={handleClose} className='fixed flex w-screen h-screen inset-0 bg-black150 bg-opacity-20 backdrop-blur-sm justify-center items-center'>
        <div className='flex flex-col w-5/6 h-4/5 p-6 bg-white50 gap-8 rounded-sm shadow-lg'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-40 items-center'>
                    <div className='flex gap-4 items-center'>
                        <Image src="/demo.png" width={60} height={60} layout="fixed" className='border-2 h-[60px] object-cover object-top overflow-hidden rounded-full border-secondary'/>
                        <div className='flex flex-col'>
                            <h3 className='text-primary'>{userData && userData.firstName} {userData && userData.lastName}</h3>
                            <p>{userData && userData.title}</p>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div
                          onClick={() => {
                            toast(
                              (t) => (
                                <div className='flex flex-col gap-4 items-center'>
                                  <p className='text-left'>Downgrade {userData && userData.firstName} {userData && userData.lastName} to architect?</p>
                                  <div className='flex w-full justify-between gap-2'>
                                    <button onClick={() => {handleDowngrade(userData.username); toast.dismiss(t.id)}} className='bg-green border p-2 text-white0'>Downgrade</button>
                                    <button onClick={() => toast.dismiss(t.id)} className='bg-white100 border p-2'>Cancel</button>
                                  </div>
                                </div>
                              ), {
                                position: "top-center"
                              }
                            );
                          }}
                        ><Button label="Downgrade to programmer" type="decline" /></div>
                        <div
                          onClick={() => {
                            toast(
                              (t) => (
                                <div className='flex flex-col gap-4 items-center'>
                                  <p className='text-left'>Delete {userData && userData.firstName} {userData && userData.lastName} ?</p>
                                  <div className='flex w-full justify-between gap-2'>
                                    <button onClick={() => {handleDelete(userData.username); toast.dismiss(t.id)}} className='bg-green border p-2 text-white0'>Delete</button>
                                    <button onClick={() => toast.dismiss(t.id)} className='bg-white100 border p-2'>Cancel</button>
                                  </div>
                                </div>
                              ), {
                                position: "top-center"
                              }
                            );
                          }}
                        ><Button label="Delete" type="decline" /></div>
                    </div>
                </div>
                <div onClick={() => onClose()}><Close className='text-3xl hover:scale-105 border bg-red cursor-pointer rounded-sm text-white50'/></div>
            </div>
            <div className='bg-white50 h-4/5 w-full rounded-sm relative'>
                <Topbar label1="Current" label2="Completed" label3="Cancelled" onToggle={handleFilter}/>
                <div className='flex flex-col mt-4 h-5/6 w-full overflow-y-scroll overflow-x-hidden'>
                {enrolledProjects && enrolledProjects.length > 0 ? enrolledProjects : <p className='w-full px-8 pb-4 text-grey50'>No Projects to display.</p>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ArchProfile