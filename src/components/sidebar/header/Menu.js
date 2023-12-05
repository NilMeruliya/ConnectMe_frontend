import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../../itemSlices/userSlice.js';

const Menu = ({setShowCreateGroup}) => {
    // const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
  return (
    <>
    <div className="absolute right-1 z-50 dark:bg-dark_bg2 dark:text-dark_text1 shadow-md w-52">
        <ul>
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
