import React, { useState } from 'react'
import Header from './Header';
import FileViewer from './FileViewer';
import PreviewInput from './PreviewInput';
import HandleAndSend from './HandleAndSend';

const PreviewFile = () => {
    const [message, setMessage] = useState("");
    console.log(message);
    const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative py-2 w-full flex items-center justify-center">

    <div className="w-full flex flex-col items-center">
      {/*Header*/}
      <Header activeIndex={activeIndex} />

      {/*Viewing selected file*/}
      <FileViewer activeIndex={activeIndex} />
      <div className="w-full flex flex-col items-center">

        {/*Message Input*/}
        <PreviewInput message={message} setMessage={setMessage} />

        {/*Send and manipulate files*/}
        <HandleAndSend
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          message={message}
        />
      </div>
    </div>
  </div>
  )
}

export default PreviewFile
