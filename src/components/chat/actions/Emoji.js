import React, { useEffect, useState } from 'react'
import EmojiPicker from "emoji-picker-react";
import { CloseIcon, EmojiIcon } from '../../../svg'

const Emoji = ({message, setMessage, showPicker, setShowPicker, setShowAttachments, textReference}) => {

  const [cursorPosition, setCursorPosition] = useState();

  useEffect(() => {
    textReference.current.selectionEnd = cursorPosition;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorPosition]);

  const handleEmojis = (emojiData, e) => {
// console.log(emojiData); it gives all the imformation about the emoji, ex: name, emoji, url, etc
    const { emoji } = emojiData;
    const reference = textReference.current; // reference of the cursor
    reference.focus();
    const start = message.substring(0, reference.selectionStart);
    const end = message.substring(reference.selectionStart);
    const newTextInput = start + emoji + end;
    setMessage(newTextInput);
    setCursorPosition(start.length + emoji.length);
  };

  return (
    <li className="w-full">
      <button
        className="btn"
        type="button"
        onClick={() => {
          setShowAttachments(false);
          setShowPicker((prev) => !prev);
        }}
      >

        {showPicker ? (
          <CloseIcon className="dark:fill-dark_svg1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg1" />
        )}
      </button>
      
      {/*Emoji picker*/}
      {showPicker ? (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker theme="dark" 
          onEmojiClick={handleEmojis} 
          />
        </div>
      ) : null}
    
    </li>
  )
}

export default Emoji
