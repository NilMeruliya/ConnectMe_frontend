import React from "react";
import { BrowserRouter, Routes, Route,
   Navigate
   } from "react-router-dom";
import { io } from "socket.io-client";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useDispatch, useSelector } from "react-redux";
import SocketContext from "./context/SocketContext";
import Donate from "./pages/Donate";
// import { logout } from "./itemSlices/userSlice";

// socket.io
const socket = io(process.env.REACT_APP_BACKEND_ENDPOINT.split("/api/v1")[0]);


const App = () => {
  // set redux data to redux toolkit
  // const dispatch = useDispatch();
 
  // fetch data from redux toolkit to frontend
  // const { user } = useSelector((state) => ({ ...state }));
  // console.log(user); // it returns user like below

  // error: ""
  // status: ""
  // user: email: ""
  //       id: ""
  //       name: ""
  //       picture: ""
  //       status: ""
  //       token: ""

  const { user } = useSelector((state) => state.user);
  const { token } = user;

  // console.log(user);
  // console.log(token);

  return (
    <>
      <div className="dark">
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
       
          <Routes>
            <Route
            exact path="/"
              // path="/"
              element={token ? <Home socket={socket}/> : <Navigate to={"/login"} /> 
              }
              // element={<Home socket={socket}/> }
            />
            <Route
            exact path="/login"
              // path="/login"
              element={!token ? <Login /> : <Navigate to={"/"} />}
              // element={<Login socket={socket}/> }
            />
            <Route
            exact path="/register"
              // path="/register"
              element={!token ? <Register /> : <Navigate to={"/"} />}
              // element={<Register socket={socket}/> }
            />
               <Route
            exact path="/donate"
              // path="/register"
              element={token ? <Donate /> : <Navigate to={"/"} />}
              // element={<Donate socket={socket}/> }
            />
          </Routes>
       
        </BrowserRouter>
        </SocketContext.Provider>
        {/* <button onClick={() => {
      dispatch(logout());
    }}>logout</button> */}
      </div>
    </>
  );
};

export default App;
