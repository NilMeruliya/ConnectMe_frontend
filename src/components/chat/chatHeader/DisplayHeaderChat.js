import React from 'react'
import { CallIcon, DotsIcon, SearchLargeIcon, VideoCallIcon } from '../../../svg'
import { useSelector } from 'react-redux';
import { capitalizeName } from '../../../utils/capitalizeNameUtil';
import { getUserConversationName, getUserConversationPicture } from '../../../utils/chatUtil';

const DisplayHeaderChat = ({online, callUser}) => {
  const { user } = useSelector((state) => state.user);
    const { activeConversation } = useSelector((state) => state.chat);
  return (
    <div className="h-[59px] dark:bg-dark_bg2 flex items-center p16 select-none">
    {/*Container*/}
    <div className="w-full flex items-center justify-between">
      {/*left*/}
      <div className="flex items-center gap-x-4">
        {/*Conversation image*/}
        <button className="btn">
          <img
          // src={getUserConversationPicture(user, activeConversation.users)}
            src={
              activeConversation.isGroup
                ? activeConversation.picture
                : getUserConversationPicture(user, activeConversation.users)
            }
            alt={activeConversation.name}
            className="w-full h-full rounded-full object-cover"
          />
        </button>
        {/*Conversation name and online status*/}
        <div className="flex flex-col">
          <h1 className="dark:text-white text-md font-bold">
            {activeConversation.isGroup
              ? activeConversation.name
              : capitalizeName(
                  getUserConversationName(user, activeConversation.users)
                )}
                {/* {capitalizeName(getUserConversationName(user, activeConversation.users))} */}
          </h1>
          <span className="text-xs dark:text-dark_svg2">
            {online ? "online" : ""}
          </span>
        </div>
      </div>
      {/*Right*/}
      <ul className="flex items-center gap-x-2.5">
        {1 == 1 ? (
          <li onClick={() => callUser()}>
            <button className="btn">
              <VideoCallIcon />
            </button>
          </li>
        ) : null}
        {/* {1 == 1 ? (
          <li>
            <button className="btn">
              <CallIcon />
            </button>
          </li>
        ) : null} */}


        {/* <li>
          <button className="btn">
            <SearchLargeIcon className="dark:fill-dark_svg1" />
          </button>
        </li>
        <li>
          <button className="btn">
            <DotsIcon className="dark:fill-dark_svg1" />
          </button>
        </li> */}
      </ul>
    </div>
  </div>
  )
}

export default DisplayHeaderChat
