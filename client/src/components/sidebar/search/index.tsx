import React, { useState } from 'react';
import { FilterIcon, ReturnIcon, SearchIcon } from '../../../icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { User } from '../../../types/user.type';
import { AppState } from '../../../redux/store';
import _ from 'lodash';

interface SidebarSearchProps {
  searchLength: number;
  setSearchResults: React.Dispatch<React.SetStateAction<User[]>>;
}

export default function SidebarSearch({
  searchLength,
  setSearchResults,
}: SidebarSearchProps) {
  const { user } = useSelector((state: AppState) => state.user);
  const [show, setShow] = useState(false);

  const handlerSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = _.get(e, 'target.value');

    if (value && e.key !== 'Enter') {
      setSearchResults([]);
    }
    if (value && e.key === 'Enter') {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/user?search=${value}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          },
        );
        setSearchResults(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error;
          if (axiosError.response) {
            console.log(axiosError.response.data.error.message);
          } else {
            console.log('Network error or request cancelled');
          }
        } else {
          console.log('Unknown error occurred');
        }
      }
    }
  };
  return (
    <div className="h-[49px] py-1.5">
      <div className="px-[10px]">
        <div className="flex items-center gap-x-2">
          <div className="w-full dark:bg-dark_bg_2 rounded-lg pl-2 flex">
            {show || searchLength > 0 ? (
              <span
                className="w-8 flex items-center justify-center rotateAnimation cursor-pointer"
                onClick={() => setSearchResults([])}
              >
                <ReturnIcon className="fill-green_1 w-5" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center">
                <SearchIcon className="dark:fill-dark_svg_2 w-5" />
              </span>
            )}
            <input
              type="text"
              placeholder="Search or start a new chat"
              className="input"
              onFocus={() => setShow(true)}
              onBlur={() => searchLength === 0 && setShow(false)}
              onKeyDown={handlerSearch}
            />
          </div>
          <button className="btn">
            <FilterIcon className="dark:fill-dark_svg_2" />
          </button>
        </div>
      </div>
    </div>
  );
}
