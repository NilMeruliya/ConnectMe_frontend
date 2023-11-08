import React from 'react'
import { useSelector } from 'react-redux';
import Message from './Message';

const UserChatMessage = () => {
  const { messages } = useSelector((state) => state.chat);
  console.log("messages");
  console.log(messages);
  const { user } = useSelector((state) => state.user);
  return (
    <div
    className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]
  bg-cover bg-no-repeat
  "
  >
    {/*Container*/}
    <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">

    {messages &&
          messages.map((messageElem) => (
            
            <Message
                  message = {messageElem.message}
                  messageTime = {messageElem.createdAt}
                  key = {messageElem._id}
                  me = {user._id === messageElem.sender._id}
                />
          ))}
      <div className="mt-2"
    //    ref={endRef}
       ></div>
    </div>
  </div>


  )
}

export default UserChatMessage



 {/* {message.files.length > 0
                ? message.files.map((file) => (
                    <FileMessage
                      FileMessage={file}
                      message={message}
                      key={message._id}
                      me={user._id === message.sender._id}
                    />
                  ))
                : null} */}

            
            
              {/* {message.message.length > 0 ? (
                <Message
                  message={message}
                  key={message._id}
                  me={user._id === message.sender._id}
                />
              ) : null} */}