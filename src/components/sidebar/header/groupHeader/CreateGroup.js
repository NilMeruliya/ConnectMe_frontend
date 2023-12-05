import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { ReturnIcon, ValidIcon } from '../../../../svg'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import GroupInput from './GroupInput';
import MultipleSelect from './MultipleSelect';
import { createGroupConversation } from '../../../../itemSlices/chatSlice';

const CreateGroup = ({setShowCreateGroup}) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { status } = useSelector((state) => state.chat);
    const [name, setName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
console.log("searchResults", searchResults );
console.log("selectedUsers", selectedUsers );
    const handleSearch = async (e) => {
        
        if (e.target.value && e.key === "Enter") {
            setSearchResults([]);
          try {
            const { data } = await axios.get(
              `${process.env.REACT_APP_BACKEND_ENDPOINT}/user?search=${e.target.value}`,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );
  
             if (data.length > 0) {
          let temporaryArray = [];
          data.forEach((user) => {
            let temp = {
              value: user._id,
              label: user.name,
              picture: user.picture,
            };
            temporaryArray.push(temp);
          });
          setSearchResults(temporaryArray);
        } else {
          setSearchResults([]);
        }
          } catch (error) {
            console.log(error);
          }
        } else {
          setSearchResults([]);
        }
      }
    const createGroupHandler = async () => {
      if (status !== "loading") {
        let users = [];
        selectedUsers.forEach((user) => {
          users.push(user.value);
        });
        let values = {
          name,
          users,
          token: user.token,
        };

        console.log(values);
        let newConvo = await dispatch(createGroupConversation(values));
        setShowCreateGroup(false);
      }
    };

  return (
    <div className="createGroupAnimation relative flex0030 h-full z-40">
    {/*Container*/}
    <div className="mt-5">
      {/*Return/Close button*/}
      <button
        className="btn w-6 h-6 border"
        onClick={() => setShowCreateGroup(false)}
      >
        <ReturnIcon className="fill-white" />
      </button>
      {/*Group name input*/}
      <GroupInput name={name} setName={setName} />
      {/*Multiple select */}
      <MultipleSelect
        selectedUsers={selectedUsers}
        searchResults={searchResults}
        setSelectedUsers={setSelectedUsers}
        handleSearch={handleSearch}
      />
      {/*Create group button*/}
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2">
        <button
          className="btn bg-blue2 scale-150 hover:bg-blue1"
          onClick={() => createGroupHandler()}
        >
          {status === "loading" ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <ValidIcon className="fill-white mt-2 h-full" />
          )}
        </button>
      </div>
    </div>
  </div>
  )
}

export default CreateGroup
