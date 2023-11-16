import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import Message from './Message';

const UserChatMessage = () => {
  const endReference = useRef();

  const { messages } = useSelector((state) => state.chat);
  // console.log("messages");
  // console.log(messages);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
      endReference.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
    className="mb-[60px] bg-[url('https://res.cloudinary.com/db6vq9hjg/image/upload/v1699512004/swglnascuweftkzfadmg.png')]
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
       ref={endReference}
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