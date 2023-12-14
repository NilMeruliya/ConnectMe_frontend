import React, { useState } from 'react'
import SidebarHeader from './sidebar/header';
// import Notification from './sidebar/notification/Notification';
import Search from './sidebar/search/Search';
import SearchResult from './sidebar/search/SearchResult';
import Chats from './sidebar/chats/Chats';

const Sidebar = ({onlineUsers, typing}) => {
  const [searchResult, setSearchResult] = useState([]);
  // console.log(searchResult);
  return (
    <div className="flex30 w-[40%] sm:w-[40%] md:max-w-[30%] h-full select-none">

      <SidebarHeader />

      {/* <Notification /> */}

      <Search
        searchLength={searchResult.length}
        setSearchResult={setSearchResult}
      />

      {searchResult.length > 0 ? (
        <>
          <SearchResult
            searchResult={searchResult}
            setSearchResult={setSearchResult}
          />
        </>
      ) : (
        <>
          <Chats onlineUsers={onlineUsers} typing={typing} />
        </>
      )}
    </div>
  )
}

export default Sidebar;
