import React from 'react'
import { useSelector } from 'react-redux';
import Chat from './Chat';
import { getUserConversationId } from '../../../utils/chatUtil';

const Chats = ({onlineUsers}) => {

    const { conversations,  activeConversation} = useSelector((state) => state.chat);
    // console.log(conversations);

    const { user } = useSelector((state) => state.user);

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
            ).map((chatElement) => {
              let check = onlineUsers.find((u) => u.userId === getUserConversationId(user, chatElement.users))
               return ( 
        <Chat chatElement={chatElement}
         key={chatElement._id}
         online={check ? true : false}
         />
        )
      }
         )
      }
      </ul>
    </div>
  )
}

export default Chats
