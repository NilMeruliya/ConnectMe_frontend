import React from 'react'
import { useSelector } from 'react-redux';
import Chat from './Chat';

const Chats = () => {

    const { conversations } = useSelector((state) => state.chat);
    // console.log(conversations);

  return (
    <div className='chats scrollbar'>
    <ul>
      {
        conversations && conversations.map((chatElement) => ( 
        <Chat chatElement={chatElement} key={chatElement._id}/>
        )
       
         )
      }
      </ul>
    </div>
  )
}

export default Chats
