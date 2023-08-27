import React from 'react';
import Contact from './contact';
import { User } from '../../../types/user.type';

interface SearchResultsProps {
  searchResults: User[];
  setSearchResults: React.Dispatch<React.SetStateAction<User[]>>;
}

export default function SearchResults({
  searchResults,
  setSearchResults,
}: SearchResultsProps) {
  return (
    <div className="w-full conversation scrollbar">
      <div>
        <div className="flex flex-col px-8 pt-8 w-full">
          <h1 className="font-extralight text-md text-green_2">Contacts</h1>
          <span className="w-full mt-4 border-b dark:border-b-dark_border_1"></span>
          <ul data-testid="search-result-list">
            {searchResults &&
              searchResults.map((user) => (
                <Contact
                  contact={user}
                  setSearchResults={setSearchResults}
                  key={user._id}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
