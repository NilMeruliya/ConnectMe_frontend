import React from 'react'
import { DocumentIcon } from '../../../../../svg'

const Document = () => {
  return (
    <li>
    <button
      type="button"
      className="bg-[#5F66CD] rounded-full"
    //   onClick={() => inputRef.current.click()}
    >
      <DocumentIcon />
    </button>
    <input
      type="file"
      hidden
      multiple
    //   ref={inputRef}
      accept="application/*,text/plain"
    //   onChange={documentHandler}
    />
  </li>
  )
}

export default Document
