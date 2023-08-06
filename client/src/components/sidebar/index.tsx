import React, { useState } from 'react'
import SidebarHeader from './header'
import SidebarNotification from './notification'
import SidebarSearch from './search'
import SidebarConversation from './conversation_list'
import SearchResults from './search/results'

export default function Sidebar() {
  const [searchResults, setSearchResults] = useState<any>([])
  return (
    <div className="w-[40%] h-full select-none">
      <SidebarHeader />
      <SidebarNotification />
      <SidebarSearch searchLength={searchResults.length} setSearchResults={setSearchResults} />
      {searchResults.length > 0 ? <SearchResults searchResults={searchResults} /> : <SidebarConversation />}
    </div>
  );
}
