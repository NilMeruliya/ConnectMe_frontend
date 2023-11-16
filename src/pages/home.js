import React, { useState } from 'react'
import Sidebar from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserConversations, updateMessagesAndChats } from '../itemSlices/chatSlice';
import WelcomePage from '../components/chat';
import DisplayChat from '../components/chat/DisplayChat';
import SocketContext from '../context/SocketContext';



const Home = ({socket}) => {
// console.log(socket);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // console.log(user);

  const { activeConversation } = useSelector((state) => state.chat);
  // console.log("activeConversation");
  // console.log(activeConversation);
  const [onlineUsers, setOnlineUsers] = useState([]);

  //join user into the socket io
  useEffect(() => {
    socket.emit("join", user._id);
    // get online users
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
      console.log("online users: ", users);
    });
    // eslint-disable-next-line
  }, [user]);

  //get Conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getUserConversations(user.token));
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => { 
    //lsitening to receiving a message
    socket.on("receive message", (message) => {
      console.log("received message", message);
      dispatch(updateMessagesAndChats(message));
    });

    // //listening when a user is typing
    // socket.on("typing", (conversation) => setTyping(conversation));
    // socket.on("stop typing", () => setTyping(false));

    // eslint-disable-next-line
  }, []);

  return (
    <>
    <div className="h-screen dark:bg-dark_bg1 flex items-center justify-center overflow-hidden">

      <div className="container h-screen flex py-[19px]">

        <Sidebar
         onlineUsers={onlineUsers}
        //   typing={typing}
           />


      
        {activeConversation._id ? (
          <DisplayChat
            onlineUsers={onlineUsers}
            // callUser={callUser}
            // typing={typing}
          />
        ) : (
          <WelcomePage />
        )}
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


const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
