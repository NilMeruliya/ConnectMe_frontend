import React from 'react'
import { AttachmentIcon } from '../../../../svg'
import Menu from './menu/Menu'

const Attachment = () => {
  return (
    <li className="relative">
    <button
    //   onClick={() => {
    //     setShowPicker(false);
    //     setShowAttachments((prev) => !prev);
    //   }}
      type="button"
      className="btn"
    >
      <AttachmentIcon className="dark:fill-dark_svg1" />
    </button>
    {/*Menu*/}
    {/* {showAttachments ? <Menu /> : null} */}

    {/* <Menu /> */}
  </li>
  )
}

export default Attachment
