/** @format */

import React from "react";

function Search({ user }) {
  return (
    <div className="flex flex-row  items-center border-b border-indigo-600 pb-2">
      <div className="flex flex-row">
        <div className="text-lg font-semibold">{user.username}'s Messages</div>
        <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
          5
        </div>
      </div>
      <div className="ml-auto">
        <button className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-gray-500">
          <svg
            className="h-4 w-4 stroke-current"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Search;
