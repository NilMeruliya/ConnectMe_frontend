import React from 'react'
import moment from "moment";
import { TraingleIcon } from '../../../svg';
const Message = ({message, me, messageTime}) => {
  return (
   <div  className={`w-full flex mt-2 space-x-3 max-w-xs ${
    me ? "ml-auto justify-end " : ""
  }`}>

<div className={`relative h-full dark:text-dark_text1 p-2 rounded-lg
        ${me ? "bg-green3" : "dark:bg-dark_bg2"}
        `}
        >
          {/*Message*/}
          <p className="float-left h-full text-sm pb-4 ">
            {message}
          </p>

           {/*Message Date*/}
           <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text5 leading-none">
            {moment(messageTime).format("HH:mm")}
          </span>
        {/*Traingle*/}
        {!me ? (
            <span>
              <TraingleIcon className="dark:fill-dark_bg2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
            </span>
          ) : null}
        </div>
  </div>


  )
}

export default Message
