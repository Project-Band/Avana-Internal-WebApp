"use client";

import { Button } from '@/components'
import React, {useState} from 'react'
import tacContent from '@/content/tac';

const tac = () => {

    const [editableText, setEditableText] = useState();

    const handleTextChange = (event) => {
        setEditableText(event.target.value);
    };

    const tacList = tacContent.map(items => (
        <div className='flex flex-col gap-2'>
            <h4>{items.title}</h4>
            <textarea
                className="overflow-y-scroll w-full overflow-hidden h-full appearance-none overflow-x-auto border-none rounded-sm py-4 px-4 focus:outline-none"
                value={items.desc}
                onChange={handleTextChange}
                rows={5}
                cols={80} 
            />
        </div>
    ))

  return (
    <div className='adminContent flex flex-col gap-6'>
        <div className='flex justify-between items-center'>
            <h2 className='px-2'>Terms and Conditions</h2>
            <Button type="primary" label="Send to all"/>
        </div>
        <div className='flex w-full flex-col gap-6 overflow-y-scroll'>
            {tacList}
        </div>
    </div>
  )
}

export default tac