import React, { useState } from 'react'
import SidebarHeader from './sidebar/header';
// import Notification from './sidebar/notification/Notification';
import Search from './sidebar/search/Search';
import SearchResult from './sidebar/search/SearchResult';
import Chats from './sidebar/chats/Chats';

const Sidebar = () => {
  const [searchResult, setSearchResult] = useState([]);
  // console.log(searchResult);
  return (
    <div className="flex30 max-w-[25%] h-full select-none">

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
          <Chats />
        </>
      )}
    </div>
  )
}

export default Sidebar;
