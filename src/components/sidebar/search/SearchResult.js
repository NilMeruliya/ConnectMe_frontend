import React from 'react'
import Contact from './Contact'

const SearchResult = ({searchResult, setSearchResult}) => {
  return (
    <div className="w-full chats scrollbar">
    <div>

      {/*Heading*/}
      <div className="flex flex-col px-8 pt-8">
        <h1 className="font-extralight text-md text-green2">Contacts</h1>
        <span className="w-full mt-4 ml-10 border-b dark:border-b-dark_border1"></span>
      </div>


      {/*Results*/}
      <ul>
        {searchResult &&
          searchResult.map((userElem) => (
            <Contact
              contact={userElem}
              key={userElem._id}
              setSearchResult={setSearchResult}
            />
          ))}
      </ul>
    </div>
  </div>
  )
}

export default SearchResult
