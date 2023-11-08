import React from 'react'
import { CameraIcon, ContactIcon, PollIcon, StickerIcon } from '../../../../../svg'
import Document from './Document.js'
import Photo from './Photo.js'

const Menu = () => {
  return (
    <ul className="absolute bottom-14 openEmojiAnimation">
    <li>
      <button type="button" className="rounded-full">
        <PollIcon />
      </button>
    </li>
    <li>
      <button type="button" className="bg-[#0EABF4] rounded-full">
        <ContactIcon />
      </button>
    </li>
    <Document />
    <li>
      <button type="button" className="bg-[#D3396D] rounded-full">
        <CameraIcon />
      </button>
    </li>
    <li>
      <button type="button" className="rounded-full">
        <StickerIcon />
      </button>
    </li>
    <Photo />
  </ul>
  )
}

export default Menu
