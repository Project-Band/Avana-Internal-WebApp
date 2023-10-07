"use client";

import React, { useState } from "react"

const Topbar = (props) => {

  const [toggle, setToggle] = useState(1)

  function handleClick(prop){
    setToggle(prevToggle => prevToggle=prop)
  }

  return (
    <div className="w-[360px] h-[42px] justify-start items-start inline-flex">
        <div className={`text-base cursor-pointer w-[160px] text-black150 px-3 py-2 rounded-br-sm rounded-bl-sm shadow-md text-center ${toggle==1? `text-white50 bg-primary shadow-none` : `hover:bg-white100 bg-white50 border-b border-l border-r border-grey50`}`} onClick={() => handleClick(1)}>{props.label1}</div>
        <div className={`text-base cursor-pointer w-[160px] text-black150 px-3 py-2 rounded-br-sm rounded-bl-sm shadow-md text-center ${toggle==2? `text-white50 bg-primary shadow-none` : `hover:bg-white100 bg-white50 border-b border-l border-r border-grey50`}`} onClick={() => handleClick(2)}>{props.label2}</div>
        <div className={`text-base cursor-pointer w-[160px] text-black150 px-3 py-2 rounded-br-sm rounded-bl-sm shadow-md text-center ${toggle==3? `text-white50 bg-primary shadow-none` : `hover:bg-white100 bg-white50 border-b border-l border-r border-grey50`}`} onClick={() => handleClick(3)}>{props.label3}</div>
    </div>
  )
}

export default Topbar