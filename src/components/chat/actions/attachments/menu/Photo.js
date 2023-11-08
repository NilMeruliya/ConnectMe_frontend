import React from 'react'
import { PhotoIcon } from '../../../../../svg'

const Photo = () => {
  return (
    <li>
    <button
      type="button"
      className="bg-[#BF59CF] rounded-full"
    //   onClick={() => inputRef.current.click()}
    >
      <PhotoIcon />
    </button>
    <input
      type="file"
      hidden
      multiple
    //   ref={inputRef}
      accept="image/png,image/jpeg,image/gif,image/webp,video/mp4,video/mpeg"
    //   onChange={imageHandler}
    />
  </li>
  )
}

export default Photo
