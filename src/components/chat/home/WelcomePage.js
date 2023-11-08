import React from 'react'
import Logo from '../../../logo/Connectme.ico'

const WelcomePage = () => {
  return (
    <div className="h-full w-full dark:bg-dark_bg4 select-none border-l dark:border-l-dark_border2 border-b-[6px] border-b-green2">
 
    <div className="-mt-1.5 w-full h-full flex flex-col gap-y-8 items-center justify-center">
      <span>
        <img src={Logo} alt="logo" />
      </span>
    
      <div className="mt-1 text-center space-y-[12px]">
        <h1 className="text-[32px] dark:text-dark_text4 font-extralight">
          Connect Me
        </h1>
        <p className="text-sm dark:text-dark_text3">
        "In a world of connections, we're here to Connect You."
          <br />
          "Every chat brings us closer - ConnectMe, where connections thrive."
        </p>
      </div>
    </div>
  </div>
  )
}

export default WelcomePage
