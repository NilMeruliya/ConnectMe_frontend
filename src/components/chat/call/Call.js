import React from 'react'
import Header from './Header'

const Call = () => {
  return (
    <div
    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] z-10 rounded-2xl overflow-hidden callbg"
  >
    <div>
      <div>
        <Header />
        {/* <CallArea name="Nil Meruliya" /> */}
      </div>
    </div>
  </div>
  )
}

export default Call
