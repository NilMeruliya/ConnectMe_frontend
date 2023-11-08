import React from 'react'
import EmojiPicker from "emoji-picker-react";
import { CloseIcon, EmojiIcon } from '../../../svg'

const Emoji = () => {
  return (
    <li className="w-full">
      <button
        className="btn"
        type="button"
        // onClick={() => {
        //   setShowAttachments(false);
        //   setShowPicker((prev) => !prev);
        // }}
      
      >


<EmojiIcon className="dark:fill-dark_svg1"/>

        {/* {showPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1" />
        )} */}
      </button>
      {/*Emoji picker*/}
      {/* {showPicker ? (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker theme="dark" onEmojiClick={handleEmoji} />
        </div>
      ) : null} */}

      {/* <EmojiPicker /> */}
    </li>
  )
}

export default Emoji
