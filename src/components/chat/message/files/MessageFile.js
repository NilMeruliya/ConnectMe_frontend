import moment from 'moment';
import React from 'react'
import { TraingleIcon } from '../../../../svg';
import ImageAndVideoFile from './ImageAndVideoFile';
import OthersFile from './OthersFile';

const MessageFile = ({ FileMessage, message, me }) => {
    const { file, type } = FileMessage;
  return (
    <div
    className={`w-full flex mt-2 space-x-3 max-w-xs z-10 ${
      me ? "ml-auto justify-end " : ""
    }`}
  >
    {/*Message Container*/}
    {/* <div className="relative">
 
      {!me && message.conversation.isGroup && (
        <div className="absolute top-0.5 left-[-37px]">
          <img
            src={message.sender.picture}
            alt=""
            className="w-8 h-8 rounded-full"
          />
        </div>
      )} */}

      <div
        className={`relative h-full dark:text-dark_text1 rounded-lg
      ${me ? " border border-blue2" : "dark:bg-dark_bg2"}
      ${
        me && file.public_id.split(".")[1] === "png"
          ? "bg-white"
          : "bg-blue1 p-1"
      }
      `}
      >
        {/*Message*/}
        <p
          className={`h-full text-sm ${
            type !== "IMAGE" && type !== "VIDEO" ? "pb-5" : ""
          }`}
        >
          {type === "IMAGE" || type === "VIDEO" ? (
            <ImageAndVideoFile url={file.secure_url} type={type} />
          ) : (
            <OthersFile file={file} type={type} me={me} />
          )}
        </p>
        {/*Message Date*/}
        <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text5 leading-none">
          {moment(message.createdAt).format("HH:mm")}
        </span>
        {/*Traingle*/}
        {!me ? (
          <span>
            <TraingleIcon className="dark:fill-dark_bg2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
          </span>
        ) : null}
      </div>
    {/* </div> */}
  </div>
  )
}

export default MessageFile
