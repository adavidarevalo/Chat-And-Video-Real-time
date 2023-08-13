import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from '../../../icons';
import HeaderMenu from './menu';
import { AppState } from '../../../redux/store';

export default function SidebarHeader() {
  const { user } = useSelector((state: AppState) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="h-[50px] dark:bg-dark_bg_2 flex items-center p16">
      <div className="w-full flex items-center justify-between">
        <button className="btn">
          <img src={user?.picture} alt={user?.name} className="w-full h-full rounded-full object-cover" />
        </button>
        <ul className="flex items-center gap-x-2 5">
          <li>
            <button className="btn">
              <CommunityIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <StoryIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <ChatIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li className="relative" onClick={() => setShowMenu((prev) => !prev)}>
            <button className={`btn ${showMenu ? 'bg-dark_hover_1' : ''}`}>
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
            {showMenu && <HeaderMenu />}
          </li>
        </ul>
      </div>
    </div>
  );
}
