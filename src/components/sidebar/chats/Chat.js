import React from 'react'
import { dateHandler } from '../../../utils/dateUtil.js'
import { useDispatch, useSelector } from 'react-redux';
import { openOrCreateUserConversations } from '../../../itemSlices/chatSlice.js';
import { getUserConversationId, getUserConversationName, getUserConversationPicture } from '../../../utils/chatUtil.js';
import { capitalizeName } from '../../../utils/capitalizeNameUtil.js';
import SocketContext from '../../../context/SocketContext.js';



const Chat = ({chatElement, socket, online, typing}) => {
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
    let newChat =  await dispatch(openOrCreateUserConversations(values));
    console.log(newChat);
    socket.emit("join chat", newChat.payload._id);
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
            <div className={`relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden ${
              online ? "online" : ""
            }`}>
                <img 
                src={getUserConversationPicture(user, chatElement.users)}
                alt="userPicture"
                className='w-full h-full object-cover ' />
            </div>

             {/* opposition name and messages */}
             <div className="w-full flex flex-col">

            {/* name*/}
            <h1 className="font-bold flex items-center gap-x-2">
             {capitalizeName(getUserConversationName(user, chatElement.users))}
            </h1>

            {/* message */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text2">

                {typing === chatElement._id ? (
                    <p className="text-blue2">Typing...</p>
                  ) : (
                    <p>
                      {chatElement?.latestMessage?.message.length > 27 ? `${chatElement?.latestMessage?.message.substring(0, 27)}...` : chatElement?.latestMessage?.message}
                    </p>
                  )}

                 {/* {chatElement?.latestMessage?.message.length > 27 ? `${chatElement?.latestMessage?.message.substring(0, 27)}...` : chatElement?.latestMessage?.message} */}
{/* 
                 {
                  chatElement?.latestMessage?.message
                 } */}
                
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

const ChatWithContext = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Chat {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatWithContext;

