import React, { useEffect } from "react";
import DisplayHeaderChat from "./chatHeader/DisplayHeaderChat";
import UserChatMessage from "./message/UserChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { getUserConversationMessages } from "../../itemSlices/chatSlice";
import ChatAction from "./actions/ChatAction";
import { checkOnlineStatus } from "../../utils/chatUtil";
import PreviewFile from "../../components/chat/preview/PreviewFile.js";

const DisplayChat = ({ onlineUsers, typing, callUser }) => {
  const dispatch = useDispatch();
  const { activeConversation, files } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const { token } = user;
  const values = {
    token,
    chatId: activeConversation?._id,
  };

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getUserConversationMessages(values));
    }
    // eslint-disable-next-line
  }, [activeConversation]);
  //   console.log("messages");
  // console.log(messages);
  // console.log(status);

  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border2 select-none overflow-hidden ">
      {/*Container*/}
      <div>
        {/*Chat header*/}
        <DisplayHeaderChat
            online={
              activeConversation.isGroup
                ? false
                : checkOnlineStatus(onlineUsers, user, activeConversation.users)
            }

          // online={checkOnlineStatus(
          //   onlineUsers,
          //   user,
          //   activeConversation.users
          // )}
          callUser={callUser}
        />

        {files.length > 0 ? (
          <PreviewFile />
        ) : (
          <>
            <UserChatMessage typing={typing} />

            <ChatAction />
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayChat;
