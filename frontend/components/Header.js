import React from 'react'
import Image from 'next/image'
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@/components'
import Link from 'next/link';

const Header = () => {
  return (
    <div className='flex justify-between items-center'>
        <Image 
          src='../avana_logo.svg'
          width={100}
          height={100}
          alt='Avana Logo'
        />
        <div className='flex gap-6 items-center'>
            <p>Half Guy</p>
            <Link href="/"><Button type="logout" /></Link>
        </div>
    </div>
  )
}

export default Header