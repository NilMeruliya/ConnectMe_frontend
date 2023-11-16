import React, { useRef, useState } from 'react'
import Emoji from './Emoji'
import Attachment from './attachments/Attachment'
import Input from './Input'
import { SendIcon } from '../../../svg'
import { useDispatch, useSelector } from 'react-redux'
import { sendUserMessage } from '../../../itemSlices/chatSlice.js'
import { ClipLoader } from 'react-spinners'
import SocketContext from '../../../context/SocketContext'

const ChatAction = ({socket}) => {
    const dispatch = useDispatch();
      
    const { activeConversation, status } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.user);
    const { token } = user;
    const [inputMessage, setInputMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [showAttachments, setShowAttachments] = useState(false);

    const textReference = useRef();

    const values = {
        inputMessage,
        chatId: activeConversation._id,
        files: [],
        token,
      };
      // console.log("values at chat action", values);
      // console.log(values);
   
   

    const SendMessageHandler = async (e) => {
        e.preventDefault();
        setLoading(true); 
        let newMessage = await dispatch(sendUserMessage(values));
        // console.log("new message:", newMessage);
        socket.emit("send message", newMessage.payload);
        setInputMessage("")
        setLoading(false);
      };

      // console.log("status of input message");
      // console.log(status);
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
            textReference={textReference}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            setShowAttachments={setShowAttachments}
          />
          {/* <Attachment
            showAttachments={showAttachments}
            setShowAttachments={setShowAttachments}
            setShowPicker={setShowPicker}
          /> */}
        </ul>

        {/*Input*/}
        <Input 
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        textReference={textReference} 
         />

        {/*Send button*/}
        <button type="submit" className="btn">
          {status === "loading" && loading ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg1" />
          )}
        </button>
      </div>
    </form>
  )
}

const ChatActionWithSocket = (props) => (
    <SocketContext.Consumer>
      {(socket) => <ChatAction {...props} socket ={socket} />}
    </SocketContext.Consumer>
  );
  export default ChatActionWithSocket;
  
