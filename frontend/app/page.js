import {Homepage} from '@/components'
import Image from 'next/image'

export default function Home() {
  return (
      <main className="flex">
       {/* 
       const [popupReg, setPopupReg] = useState(false);
         const [popupLog, setPopupLog] = useState(false);
       
       <div className='h-screen w-screen'>
        <Register isVisible={popupReg} onClose={() => setPopupReg(false)}/>
        <Login isVisible={popupLog} onClose={() => setPopupLog(false)}/>
        <div className='main h-screen relative py-2 flex flex-col justify-between gap-5'>
          <div className='flex justify-between w-full gap-10'>
            <Image 
              src='./avana_logo.svg'
              width={160}
              height={160}
              alt='Avana Logo'
              className='bg-white50 p-2 px-6 rounded-sm box-content'
            />
            <div className='flex justify-between bg-white50 rounded-sm grow py-4 px-4'>
                <div className='flex flex-col'>
                      <h3 className='text-primary'>Welcome to Avana</h3>
                      <p>Register or Login to proceed.</p>
                </div>
                <div className='flex gap-4'>
                  <div onClick={() => setPopupLog(true)}><Button type="login" /></div>
                  <div onClick={() => setPopupReg(true)}><Button type="register" /></div>
                </div>
            </div>
          </div>
        </div>
        <Image 
              src='./avana_logo.svg'
              width={600}
              height={600}
              alt='Avana Logo'
              className='opacity-50'
            />
      </div> */}
      <Homepage />
    </main>
  )
}
