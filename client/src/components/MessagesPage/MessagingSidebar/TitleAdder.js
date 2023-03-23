/** @format */

import React from "react";

function TitleAdder({ setUsersAdded, usersAdded, newConvObj }) {
  const { users } = newConvObj;
  console.log(users);
  return (
    <>
      <div>
        <h4>Name New Conversation:</h4>
        {users.map((user) => (
          <p
            key={user.id}
            className="m-1 rounded bg-indigo-500 px-4 font-bold text-white hover:bg-indigo-700"
          >
            {user.username}
          </p>
        ))}
        <span
          onClick={() => setUsersAdded(!usersAdded)}
          className="absolute top-0 right-0 mt-0 mr-0 cursor-pointer"
        >
          X
        </span>
      </div>
      <input
        id="search-input"
        type="text"
        placeholder="e.g 'Family Chat'"
        className="mr-4 w-full rounded-md border border-gray-300 py-2 pl-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
      <button className="mt-2 rounded-full bg-indigo-500 py-1 px-4 font-bold text-white hover:bg-indigo-700">
        Create Conversation
      </button>
    </>
  );
}
export default TitleAdder;
