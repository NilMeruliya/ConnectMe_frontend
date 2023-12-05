import React, { useRef, useState } from "react";
import Sidebar from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Peer from "simple-peer";
import {
  getUserConversations,
  updateMessagesAndChats,
} from "../itemSlices/chatSlice";
import WelcomePage from "../components/chat";
import DisplayChat from "../components/chat/DisplayChat";
import SocketContext from "../context/SocketContext";
import Call from "../components/chat/videocall/Call";
import {
  getUserConversationId,
  getUserConversationName,
  getUserConversationPicture,
} from "../utils/chatUtil";

const callData = {
  socketId: "",
  receiveingCall: false,
  callEnded: false,
  name: "",
  picture: "",
  signal: "",
};

const Home = ({ socket }) => {
  // console.log(socket);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // console.log(user);

  const { activeConversation } = useSelector((state) => state.chat);
  // console.log("activeConversation");
  // console.log(activeConversation);
  const [onlineUsers, setOnlineUsers] = useState([]);

  //typing
  const [typing, setTyping] = useState(false);

  //call
  const [call, setCall] = useState(callData);
  const [show, setShow] = useState(false);
  const [stream, setStream] = useState();
  const { receiveingCall, callEnded, socketId } = call;
  const [callAccepted, setCallAccepted] = useState(false);
  const [totalSecInCall, setTotalSecInCall] = useState(0);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

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



  //call
  useEffect(() => {
    setupMedia();
    socket.on("setup socket", (id) => {
      setCall({ ...call, socketId: id });
    });

    socket.on("call user", (data) => {
      setCall({
        ...call,
        socketId: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receiveingCall: true,
      });
    });
    socket.on("end call", () => {
      setShow(false);
      setCall({ ...call, callEnded: true, receiveingCall: false });
      myVideo.current.srcObject = null;
      if (callAccepted) {
        connectionRef?.current?.destroy();
      }
    });
    // eslint-disable-next-line
  }, []);
  // console.log("socket id", socketId);

  //--call user funcion
  const callUser = () => {
    enableMedia();
    setCall({
      ...call,
      name: getUserConversationName(user, activeConversation.users),
      picture: getUserConversationPicture(user, activeConversation.users),
    });
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("call user", {
        userToCall: getUserConversationId(user, activeConversation.users),
        signal: data,
        from: socketId,
        name: user.name,
        picture: user.picture,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("call accepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  //--answer call  funcion
  const answerCall = () => {
    enableMedia();
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answer call", { signal: data, to: call.socketId });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  //--end call  funcion
  const endCall = () => {
    setShow(false);
    setCall({ ...call, callEnded: true, receiveingCall: false });
    myVideo.current.srcObject = null;
    socket.emit("end call", call.socketId);
    connectionRef?.current?.destroy();
  };

  
  const setupMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        // myVideo.current.srcObject = stream;
        // userVideo.current.srcObject = stream;
      });
  };

  const enableMedia = () => {
    myVideo.current.srcObject = stream;
    setShow(true);
  };

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

    //listening when a user is typing
    socket.on("typing", (chat) => setTyping(chat));
    socket.on("stop typing", () => setTyping(false));

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="h-screen dark:bg-dark_bg1 flex items-center justify-center overflow-hidden">
        <div className="container h-screen flex py-[19px]">
          <Sidebar onlineUsers={onlineUsers} typing={typing} />

          {activeConversation._id ? (
            <DisplayChat
              onlineUsers={onlineUsers}
              callUser={callUser}
              typing={typing}
            />
          ) : (
            <WelcomePage />
          )}
        </div>
      </div>
      {/*Call*/}

      <div className={(show || call.signal) && !call.callEnded ? "" : "hidden"}>
        {/* className={(show || call.signal) && !call.callEnded ? "" : "hidden"} */}

        <Call
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
        />
      </div>
    </>
  );
};

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
