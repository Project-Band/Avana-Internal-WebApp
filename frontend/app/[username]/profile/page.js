"use client";

import { Header, Topbar, Button } from '@/components'
import React,{useState, useEffect, useRef} from 'react'
import Image from 'next/image'
import { LocationCity, Mail, Phone } from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import projects from '@/content/projects';
import toast from 'react-hot-toast';
import { USER_API } from '@/apiConfig';


const profile = () => {
  const pathname = usePathname()
  const username = pathname.split('/')[1];

  const [userData, setUserData] = useState([]);
  const [projectStatus, setProjectStatus] = useState(1)

  const handleFilter = (status) => {
    setProjectStatus(status)
  }

  
  const handleRequest = async (project_name) => {

    const requestData = {
      project_name: project_name,
      username: username
    }

    try {
      const response = await fetch(ENROLL_REQUESTS_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
     
      if (response.ok) {
       toast.success('Succesfully Requested Enrollment');
      } else {
          toast.error('Enrollment Request Failed');
        }
    } catch (error) {
      toast.error('Error requesting');

    }
  };

  const initialData = useRef(userData);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(USER_API(username));
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
  
        // Check if the data has changed significantly before updating state.
        if (JSON.stringify(data) !== JSON.stringify(initialData.current)) {
          setUserData(data);
          initialData.current = data;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); // Call the fetch function when the component mounts
  }, [handleRequest]);


    const enrolledProjects = userData.enrolled_projects? userData.enrolled_projects
    .filter((items) => items.project_status === `${projectStatus === 1? "A": projectStatus === 2? "C" : projectStatus === 3? "S" : projectStatus === 4? "R": ""}`)
    .map(items => (
        <div className="w-full px-8 py-4 border-t border-b border-zinc-400 justify-start items-center gap-6 inline-flex hover:shadow-sm hover:scale-[1.01] hover:bg-white100">
        <div className="grow shrink basis-0 justify-between items-center flex">
            <div className="flex-col justify-start items-start gap-1 inline-flex">
                <p>{items.project_name}</p>
                <p className='text-sm overflow-hidden'>{items.project_description}</p>
            </div>
            <Button label="Learn more" type= "text" />
        </div>
        </div>
    )):<p className='w-full px-8 pb-4 text-grey50'> No Projects to show </p>

    const availableProjects = userData.not_enrolled_projects? userData.not_enrolled_projects.map(items => (
        <div className="w-full px-8 py-4 border-t border-b border-zinc-400 justify-start items-center gap-6 inline-flex hover:shadow-sm hover:bg-white100">
        <div className="grow shrink basis-0 justify-between items-center flex">
            <div className="flex-col justify-start items-start gap-1 inline-flex">
                <p>{items.project_name}</p>
                <p className='text-sm overflow-hidden'>{items.project_description}</p>
            </div>
            <div
              onClick={() => {
                toast(
                  (t) => (
                    <div className='flex flex-col gap-4 items-center'>
                      <p className='text-left'>Request {items.project_name} ?</p>
                      <div className='flex w-full justify-between gap-2'>
                        <button onClick={() => {handleRequest(items.project_name); toast.dismiss(t.id)}} className='bg-green border p-2 text-white0'>Request</button>
                        <button onClick={() => toast.dismiss(t.id)} className='bg-white100 border p-2'>Dismiss</button>
                      </div>
                    </div>
                  ), {
                    position: "top-center"
                  }
                );
              }}
            ><Button label="Request Enrollment" type= "add" className='text-sm'/></div>
        </div>
        </div>
    )):<p className='w-full px-8 pb-4 text-grey50'> No projects available at the moment. </p>

    const requestedProjects = userData.requested_projects? userData.requested_projects
    .map(items => (
        <div className="w-full px-8 py-4 border-t border-b border-zinc-400 justify-start items-center gap-6 inline-flex hover:shadow-sm hover:scale-[1.01] hover:bg-white100">
        <div className="grow shrink basis-0 justify-between items-center flex">
            <div className="flex-col justify-start items-start gap-1 inline-flex">
                <p>{items.project_name}</p>
                <p className='text-sm overflow-hidden'>{items.project_description}</p>
            </div>
            <p> Pending... </p>
        </div>
        </div>
    )):<p className='w-full px-8 pb-4 text-grey50'> No Requests </p>

    return (
        <div className='main flex flex-col py-4 gap-10 w-screen h-screen'>
            <Header username={userData && userData.username}/>
            <div className='flex items-center justify-between'>
                <div className='flex gap-4 items-center'>
                    <Image src="http://35.232.216.253/uploads/original/f8/88/6bee943c18b8ba921f7eed571af2.jpg" width={80} height={80} layout="fixed" className='border-2 h-[80px] object-cover object-top overflow-hidden rounded-full border-secondary'/>
                    <div className='flex flex-col'>
                        <h3 className='text-primary'>{userData && userData.firstName} {userData && userData.lastName}</h3>
                        <p>{userData && userData.title}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                   <div className='flex gap-4'><Mail className='text-xl text-primary'/><p>{userData && userData.email}</p></div>
                   <div className='flex gap-4'><LocationCity className='text-xl text-primary' /><p>{userData && userData.homeAddress}</p></div>
                   <div className='flex gap-4'><Phone className='text-xl text-primary' /><p>{userData && userData.phone}</p></div>
                </div>
            </div>
            <div className='flex h-full gap-6 w-full'>
                <div className='bg-white50 shadow-lg h-full w-full rounded-sm relative'>
                    <div className='flex justify-between w-full'>
                      <p className='text-primary text-lg px-6 py-2 font-bold'>Enrolled Projects</p>
                      <Topbar label1="Current" label2="Completed" label3="Cancelled" onToggle={handleFilter}/>
                    </div>
                    <div className='flex flex-col mt-4 h-5/6 w-full overflow-y-auto overflow-x-hidden'>
                      {enrolledProjects && enrolledProjects.length > 0 ? enrolledProjects : <p className='w-full px-8 pb-4 text-grey50'>No Projects to display.</p>}
                    </div>
                </div>
                <div className='flex flex-col gap-6 w-full'>
                  <div className='bg-white50 shadow-lg h-max w-full rounded-sm relative'>
                        <p className='text-primary text-lg px-6 py-2 font-bold'>Requested Projects</p>
                      <div className='flex flex-col mt-4 h-5/6 w-full overflow-y-auto overflow-x-hidden'>
                          {requestedProjects && requestedProjects.length>0? requestedProjects : <p className='w-full px-8 pb-4 text-grey50'>No Projects requested.</p>}
                      </div>
                  </div>
                  <div className='bg-white50 shadow-lg h-full w-full rounded-sm'>
                  <p className='text-green text-lg px-6 py-2 font-bold'>Available Projects</p>
                      <div className='flex flex-col mt-4 h-5/6 w-full overflow-y-auto overflow-x-hidden'>
                          {availableProjects && availableProjects.length>0? availableProjects : <p className='w-full px-8 pb-4 text-grey50'>No available projects.</p>}
                      </div>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default profile