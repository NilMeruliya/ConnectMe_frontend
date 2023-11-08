import React from 'react'
import { dateHandler } from '../../../utils/dateUtil.js'
import { useDispatch, useSelector } from 'react-redux';
import { openOrCreateUserConversations } from '../../../itemSlices/chatSlice.js';
import { getUserConversationId } from '../../../utils/chatUtil.js';
import { capitalizeName } from '../../../utils/capitalizeNameUtil.js';



const Chat = ({chatElement}) => {
// console.log(chatElement);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // const { token } = user;
  const { activeConversation } = useSelector((state) => state.chat);
  
  const values = {
    receiverId: getUserConversationId(user, chatElement.users),
   token: user.token,
  };

  const openConversation = async () => {
    dispatch(openOrCreateUserConversations(values));
   
  };

  return (
    <li
       onClick={() => openConversation()}
       className={`list-none h-[72px] w-full dark:bg-dark_bg1 hover:${
        chatElement._id !== activeConversation._id ? "dark:bg-dark_bg2" : ""
      } cursor-pointer dark:text-dark_text1 px-[10px] ${
        chatElement._id === activeConversation._id ? "dark:bg-dark_hover1" : ""
      }`}
     >
    
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
             {capitalizeName(chatElement.name)}
            </h1>

            {/* message */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text2">
                 {/* {chatElement?.latestMessage?.message.length > 27 ? `${chatElement?.latestMessage?.message.substring(0, 27)}...` : chatElement?.latestMessage?.message} */}

                 {
                  chatElement?.latestMessage?.message
                 }
                
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text2">
            {chatElement?.latestMessage?.createdAt ? dateHandler(chatElement?.latestMessage?.createdAt): ""}
          </span>
        </div>
    </div>

    {/*Border*/}
    <div className="ml-16 border-b dark:border-b-dark_border1"></div>
    </li>
  )
}

export default Chat
