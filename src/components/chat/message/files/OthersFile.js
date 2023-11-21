import React from 'react'
import { DownloadIcon } from '../../../../svg'

const OthersFile = ({ file, type, me }) => {
  return (
    <div className="bg-blue2 p-2 rounded-lg">
    
      <div className="flex justify-between gap-x-8">
 
        <div className="flex items-center gap-2">
          <img
            src={`../../../../file/${type}.png`}
            alt=""
            className="w-8 object-contain"
          />
          <div className="flex flex-col gap-2">
            <h1>
              {file.original_filename}.{file.public_id.split(".")[1]}
            </h1>
            <span className="text-sm">
              {type} . {file.bytes}B
            </span>
          </div>
        </div>
     
        {!me && (
          <a href={file.secure_url} rel="noreferrer" target="_blank" download>
            <DownloadIcon />
          </a>
        )}
      </div>
    </div>
  )
}

export default OthersFile
