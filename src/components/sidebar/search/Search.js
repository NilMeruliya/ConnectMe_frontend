import React, { useState } from 'react'
import { FilterIcon, ReturnIcon, SearchIcon } from "../../../svg";
import axios from 'axios';
import { useSelector } from 'react-redux';

const Search = ({searchLength, setSearchResult}) => {

  const { user } = useSelector((state) => state.user);
  // console.log(user.token);   

    const [show, setShow] = useState(false);

    const handleSearch = async (e) => {
      console.log(e.target.value);
      
      if (e.target.value && e.key === "Enter") {
        
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_ENDPOINT}/user?search=${e.target.value}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          // console.log(data);
          setSearchResult(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        setSearchResult([]);
      }
    }
    
  return (
    <div className="h-[49px] py-1.5">
   
    <div className="px-[10px]">
   
      <div className="flex items-center gap-x-2">
        <div className="w-full flex dark:bg-dark_bg2 rounded-lg pl-2">
          {show || searchLength > 0 ? (
            <span
              className="w-8 flex items-center justify-center rotateAnimation cursor-pointer"
              onClick={() => setSearchResult([])}
            >
              <ReturnIcon className="fill-green1 w-5" />
            </span>
          ) : (
            <span className="w-8 flex items-center justify-center ">
              <SearchIcon className="dark:fill-dark_svg2 w-5" />
            </span>
          )}
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="input"
            onFocus={() => setShow(true)} // when we click on the input
            onBlur={() => searchLength === 0 && setShow(false)} // when we click away from the input, if the length is 0, we hide the search bar.
            onKeyDown={(e) => handleSearch(e)} // when we press the enter key, we call the handleSearch function.
          />
        </div>
        {/* <button className="btn">
          <FilterIcon className="dark:fill-dark_svg2" />
        </button> */}
      </div>
    </div>
  </div>
  )
}

export default Search
