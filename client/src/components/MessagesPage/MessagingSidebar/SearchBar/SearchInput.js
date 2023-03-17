/** @format */

import React from "react";

function SearchInput({handleBlur, handleFocus, isFocused}) {
  return (
    <div class="max-w- mx-auto">
    <form action="" className="relative mx-auto w-max">
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="search"
        className={`focus: peer relative z-10 h-12 w-12 cursor-pointer rounded-full border border-indigo-300 bg-transparent pl-8 outline-none focus:w-full focus:cursor-text focus:pl-16 focus:pr-4 ${
          isFocused ? "transition-all duration-300" : ""
        }`}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`peer-focus: absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent border-indigo-300 stroke-gray-500 px-3.5 peer-focus:stroke-indigo-500 ${
          isFocused
            ? "peer-focus:border-indigo-300 peer-focus:stroke-indigo-500"
            : ""
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </form>
  </div>
  )
}

export default SearchInput;
