import React from 'react'

const GroupInput = ({name, setName}) => {
  return (
    <div className="mt-4">
    <input
      type="text"
      placeholder="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full bg-transparent border-b border-blue1 dark:text-dark_text1 outline-none pl-1"
    />
  </div>
  )
}

export default GroupInput
