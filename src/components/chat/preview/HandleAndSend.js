import React, { useState } from 'react'
import SocketContext from '../../../context/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFiles } from '../../../utils/uploadUtil';
import { removeFileFromFiles, sendUserMessage } from '../../../itemSlices/chatSlice';
import VideoThumbnail from "react-video-thumbnail";
import { CloseIcon, SendIcon } from '../../../svg';
import ClipLoader from "react-spinners/ClipLoader";
import AddNewFile from './AddNewFile';

const HandleAndSend = ({ activeIndex, setActiveIndex, message, socket }) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { files, activeConversation } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.user);
    const { token } = user;
    //send message handler
    const sendMessageHandler = async (e) => {
      // console.log(files, message);
      e.preventDefault();
      setLoading(true);

      //uplaod files first
      const uploadedFiles = await uploadFiles(files);
      //send the message
      const values = {
        token,
        message,
        chatId: activeConversation._id,
        files: uploadedFiles.length > 0 ? uploadedFiles : [],
      };
      let newMessage = await dispatch(sendUserMessage(values));
      socket.emit("send message", newMessage.payload);
      setLoading(false);
    };
    //Handle remove file
    const handleRemoveFile = (index) => {
      dispatch(removeFileFromFiles(index));
    };

  return (
<div className="w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border2">
      {/*Empty tag to make below tag center*/}
      <span></span>
      {/*List files*/}
      <div className="flex items-center gap-x-2">
        {files.map((file, index) => (
          <div
            key={index}
            className={`fileThumbnail relative w-14 h-14 border dark:border-white mt-2 rounded-md overflow-hidden cursor-pointer
            ${activeIndex === index ? "border-[3px] !border-blue1" : ""}
            `}
            onClick={() => setActiveIndex(index)}
          >
            {file.type === "IMAGE" ? (
              <img
                src={file.fileData}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : file.type === "VIDEO" ? (
              <VideoThumbnail videoUrl={file.fileData} />
            ) : (
              <img
                src={`../../../../file/${file.type}.png`}
                alt=""
                className="w-8 h-10 mt-1.5 ml-2.5"
              />
            )}
            {/*Remove file icon*/}
            <div
              className="removeFileIcon hidden"
              onClick={() => handleRemoveFile(index)}
            >
              <CloseIcon className="dark:fill-white absolute right-0 top-0 w-4 h-4" />
            </div>
          </div>
        ))}

        {/* Add another file */}
        <AddNewFile setActiveIndex={setActiveIndex} />
      </div>

      {/*Send button*/}
      <div
        className="bg-blue1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer"
        onClick={(e) => sendMessageHandler(e)}
      >
        {loading ? (
          <ClipLoader color="#E9EDEF" size={25} />
        ) : (
          <SendIcon className="fill-white" />
        )}
      </div>
    </div>
  )
}

const HandleAndSendWithContext = (props) => (
    <SocketContext.Consumer>
      {(socket) => <HandleAndSend {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
  export default HandleAndSendWithContext;
