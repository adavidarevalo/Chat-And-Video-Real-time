import React, { useState } from 'react';
import SidebarHeader from './header';
import SidebarNotification from './notification';
import SidebarSearch from './search';
import SidebarConversation from './conversation_list';
import SearchResults from './search/results';
import { User } from '../../types/user.type';

export default function Sidebar() {
  const [searchResults, setSearchResults] = useState<User[]>([]);
  return (
    <div className="flex0030 h-full select-none">
      <SidebarHeader />
      <SidebarNotification />
      <SidebarSearch
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
      />
      {searchResults.length > 0 ? (
        <SearchResults
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
      ) : (
        <SidebarConversation />
      )}
    </div>
  );
}
