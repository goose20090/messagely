/** @format */

import React from "react";

function UserMessage() {
  return (
    <div className="col-start-6 col-end-13 rounded-lg p-3">
      <div className="flex flex-row-reverse items-center justify-start">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
          A
        </div>
        <div className="relative mr-3 rounded-xl bg-indigo-100 py-2 px-4 text-sm shadow">
          <div>I'm ok what about you?</div>
        </div>
      </div>
    </div>
  );
}

export default UserMessage;


