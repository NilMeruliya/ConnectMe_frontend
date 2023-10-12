import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './itemSlices/userSlice'

const App = () => {

  // set redux data to redux toolkit
  const dispatch = useDispatch();

  // fetch data from redux toolkit to frontend 
  const {user} = useSelector((state) => ({...state}));
  console.log(user); // it returns user like below

// error: ""
// status: ""
// user: email: ""
//       id: ""
//       name: ""
//       picture: ""
//       status: ""
//       token: ""
  
  return (
    <>
    <div className="dark">
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='register/' element={<Register/>}/>
      </Routes>
    </BrowserRouter>

    <button onClick={() => {
      dispatch(logout());
    }}>logout</button>
    </div>
    </>
  )
}

export default App
