import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import Typing from "./Typing";
import MessageFile from "./files/MessageFile";

const UserChatMessage = ({ typing }) => {
  const endReference = useRef();
  const { messages, activeConversation } = useSelector((state) => state.chat);

  // console.log("messages");
  // console.log(messages);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    endReference.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

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
            <>
             {/*Message files */}
             {messageElem.files.length > 0
                ? messageElem.files.map((file) => (
                    <MessageFile
                      FileMessage={file}
                      message={messageElem}
                      key={messageElem._id}
                      me={user._id === messageElem.sender._id}
                     
                    />
                  ))
                : null}

{/*Message text*/}
              {messageElem?.message?.length > 0 ? (
                <Message
                messageElem={messageElem}
                  message={messageElem.message}
                  messageTime={messageElem.createdAt}
                  key={messageElem._id}
                  me={user._id === messageElem.sender._id}
                />
              ) : null}
            </>
          ))}

        {typing === activeConversation._id ? <Typing /> : null}
        {/* {typing ? <Typing /> : ""} */}

        <div className="mt-2" ref={endReference}></div>
      </div>
    </div>
  );
};

export default UserChatMessage;


