import React from 'react'

const PreviewInput = ({message, setMessage}) => {
  return (
    <div className="w-full max-w-[60%] dark:bg-dark_hover1 rounded-lg">

    <input
      type="text"
      placeholder="Type a message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="w-full bg-transparent h-11 pl-2 focus:outline-none border-none dark:text-dark_text1"
    />
  </div>
  )
}

export default PreviewInput
