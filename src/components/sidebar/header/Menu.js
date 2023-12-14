import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../../itemSlices/userSlice.js';

const Menu = ({setShowCreateGroup}) => {
    // const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  return (
    <>
    <div className="absolute right-1 z-50 dark:bg-dark_bg2 dark:text-dark_text1 shadow-md w-52">
        <ul>
        <li
            className="py-3 pl-5 cursor-pointer hover:bg-dark_bg3"
            onClick={() => navigate('/donate')}
          >
            <span>Donate</span>
          </li>
         
          <li
            className="py-3 pl-5 cursor-pointer hover:bg-dark_bg3"
            onClick={() => setShowCreateGroup(true)}
          >
            <span>New group</span>
          </li>
         
          <li
            className="py-3 pl-5 cursor-pointer hover:bg-dark_bg3"
            onClick={() => dispatch(logout())}
          >
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Menu
