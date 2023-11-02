import React from 'react'
import { dateHandler } from '../../../utils/dateUtil'
// import moment from 'moment'


const Chat = ({chatElement}) => {
    // console.log(moment(chatElement?.latestMessage?.createdAt).fromNow(true));
  return (
    <li className='list-none h-[72px] w-full dark:bg-dark_bg1 hover:dark:bg-dark_bg2  cursor-pointer dark:text-dark_text1 px-[10px]'>
    
    <div className='relative w-full flex items-center justify-between py-[10px]'>

    {/* left side */}
        <div className='flex items-center gap-x-3'>

        {/* opposition picture */}
            <div className='relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden'>
                <img src={chatElement.picture} alt={chatElement.name} className='w-full h-full object-cover ' />
            </div>

             {/* opposition name and messages */}
             <div className="w-full flex flex-col">

            {/* name*/}
            <h1 className="font-bold flex items-center gap-x-2">
             {chatElement.name}
            </h1>

            {/* message */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text2">
                 {chatElement?.latestMessage?.message}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text2">
            {dateHandler(chatElement?.latestMessage?.createdAt)}
          </span>
        </div>
    </div>

    {/*Border*/}
    <div className="ml-16 border-b dark:border-b-dark_border1"></div>
    </li>
  )
}

export default Chat
