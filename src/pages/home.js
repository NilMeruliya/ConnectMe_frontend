import React from 'react'
import Sidebar from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserConversations } from '../itemSlices/chatSlice';


const Home = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);


  //get Conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getUserConversations(user.token));
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
    <div className="h-screen dark:bg-dark_bg1 flex items-center justify-center overflow-hidden">

      <div className="container h-screen flex py-[19px]">

        <Sidebar
        //  onlineUsers={onlineUsers}
        //   typing={typing}
           />
        {/* {activeConversation._id ? (
          <ChatContainer
            onlineUsers={onlineUsers}
            callUser={callUser}
            typing={typing}
          />
        ) : (
          <WhatsappHome />
        )} */}
      </div>
    </div>
    {/*Call*/}

    <div 
    // className={(show || call.signal) && !call.callEnded ? "" : "hidden"}
    >
      {/* <Call
        call={call}
        setCall={setCall}
        callAccepted={callAccepted}
        myVideo={myVideo}
        userVideo={userVideo}
        stream={stream}
        answerCall={answerCall}
        show={show}
        endCall={endCall}
        totalSecInCall={totalSecInCall}
        setTotalSecInCall={setTotalSecInCall}
      /> */}
    </div>
  </>
  )
}

export default Home
