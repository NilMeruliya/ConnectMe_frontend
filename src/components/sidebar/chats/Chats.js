import React from 'react'
import { useSelector } from 'react-redux';
import Chat from './Chat';

const Chats = () => {

    const { conversations,  activeConversation} = useSelector((state) => state.chat);
    // console.log(conversations);

  return (
    <div className='chats scrollbar'>
    <ul>
      {
        conversations && conversations.filter(
              (c) =>
                c.latestMessage // it only shows the chats that has the latest message
                       || 
                c._id === activeConversation._id //  if chat doesn't have the latest message, but the chat is still active, then it shows that chat as well.
                       ||
                c.isGroup === true
            ).map((chatElement) => ( 
        <Chat chatElement={chatElement} key={chatElement._id}/>
        )
       
         )
      }
      </ul>
    </div>
  )
}

export default Chats
