import React from 'react'
import CallTimes from './CallTimes'
import { capitalizeName } from '../../../utils/capitalizeNameUtil'

const CallArea = ({name, callAccepted,  totalSecInCall,
  setTotalSecInCall,}) => {
  return (
    <div className="absolute top-12 z-40 w-full p-1">
    {/*Container*/}
    <div className="flex flex-col items-center">
      {/*Call infos*/}
      <div className="flex flex-col items-center gap-y-1">
        <h1 className="text-white text-lg">
          <b>{name ? capitalizeName(name) : ""}</b>
        </h1>
        {totalSecInCall === 0 ? (
          <span className="text-dark_text1">Ringing...</span>
        ) : null}
      
        <CallTimes
          totalSecInCall={totalSecInCall}
          setTotalSecInCall={setTotalSecInCall}
          callAccepted={callAccepted}
        />
      </div>
    </div>
  </div>
  )
}

export default CallArea
