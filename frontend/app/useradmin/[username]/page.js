"use client"

import { withAuth } from '@/components'
import React from 'react'

const admin = ({isAdmin}) => {

  return (
    <div>
      {isAdmin? (<div>Admin page</div>)
        :
    (   <div>No access</div>)
      }
  </div>
      )
}

export default withAuth(admin)