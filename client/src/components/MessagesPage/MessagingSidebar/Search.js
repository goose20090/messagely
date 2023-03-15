import React from "react";

function Search(){
    return(
        <div class="flex flex-row items-center border-b pb-2 border-indigo-600">
            <div class="flex flex-row items-center">
            <div class="text-xl font-semibold">User Messages</div>
            <div class="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                5
            </div>
            </div>
            <div class="ml-auto">
            <button class="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                <svg
                class="h-4 w-4 stroke-current"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
                </svg>
            </button>
            </div>
        </div>
    )
}

export default Search;