import React from 'react'
import Contact from './contact';

export default function SearchResults({ searchResults }: any) {
  return (
    <div className="w-full conversation scrollbar">
      <div>
        <div className="flex flex-col px-8 pt-8">
          <h1 className="font-extralight text-md text-green_2">Contacts</h1>
          <span className="w-full mt-4 border-b dark:border-b-dark_border_1"></span>
          <ul>{searchResults && searchResults.map((user: any) => (
            <Contact contact={user} key={user._id}/>
          ))}</ul>
        </div>
      </div>
    </div>
  );
}
