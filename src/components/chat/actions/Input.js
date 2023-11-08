import React from 'react'

const Input = ({inputMessage, setInputMessage}) => {
  const onChangeHandler = (e) => {
    setInputMessage(e.target.value);
    console.log(e.target.value);
   
  };
  return (
    <div className="w-full">
      <input
        type="text"
        className="dark:bg-dark_hover1 dark:text-dark_text1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4"
        placeholder="Type a message"
        value={inputMessage}
        onChange={onChangeHandler}
        // ref={textRef}
      />
    </div>
  )
}

export default Input
