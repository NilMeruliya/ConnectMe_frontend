import React, { useState } from 'react'
import Emoji from './Emoji'
import Attachment from './attachments/Attachment'
import Input from './Input'
import { SendIcon } from '../../../svg'
import { useDispatch, useSelector } from 'react-redux'
import { sendUserMessage } from '../../../itemSlices/chatSlice.js'

const ChatAction = () => {
    const dispatch = useDispatch();
 
    const { activeConversation, status } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.user);
    const { token } = user;
    const [inputMessage, setInputMessage] = useState("");
    const values = {
        inputMessage,
        chatId: activeConversation._id,
        files: [],
        token,
      };
      console.log("values at chat action", values);
      console.log(values);
   
   

    const SendMessageHandler = async (e) => {
        e.preventDefault();
         await dispatch(sendUserMessage(values));
         setInputMessage("")
      };

      console.log("status of input message");
      console.log(status);
  return (
    <form
      onSubmit={(e) => SendMessageHandler(e)}
      className="dark:bg-dark_bg2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      {/*Container*/}
      <div className="w-full flex items-center gap-x-2">
        {/*Emojis and attachments*/}
        <ul className="flex gap-x-2">
          <Emoji
            // textRef={textRef}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            // showPicker={showPicker}
            // setShowPicker={setShowPicker}
            // setShowAttachments={setShowAttachments}
          />
          <Attachment
            // showAttachments={showAttachments}
            // setShowAttachments={setShowAttachments}
            // setShowPicker={setShowPicker}
          />
        </ul>
        {/*Input*/}
        <Input 
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        //   textRef={textRef} 

         />
        {/*Send button*/}
        <button type="submit" className="btn">
          {/* {status === "loading" && loading ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )} */}

          <SendIcon className="dark:fill-dark_svg1"/>
        </button>
      </div>
    </form>
  )
}

export default ChatAction
