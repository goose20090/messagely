/** @format */

import React from "react";
import DeletedMessage from "./DeletedMessage";

function ReceivedMessage({ message }) {
  let formattedDate;

  function formatDate(date) {
    const createdDate = new Date(date);
    const todayDate = new Date();
    if (createdDate.toDateString() === todayDate.toDateString()) {
      formattedDate = `${createdDate.getHours()}:${createdDate.getMinutes()}`;
    } else {
      formattedDate = `${createdDate.getDate()}/${
        createdDate.getMonth() + 1
      }/${createdDate.getFullYear()}`;
    }

    return formattedDate;
  }
  formattedDate = (formatDate(message.created_at))
  return (
    <div className="col-start-1 col-end-8 rounded-lg p-3">
      {message.deleted ? (
        <div className="flex flex-row items-center justify-start">
          <DeletedMessage />
        </div>
      ) : (
        <div className="flex flex-row items-center">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
            {message.user.username[0].toUpperCase()}
          </div>
          <div className="relative ml-3 rounded-xl bg-white py-2 px-4 text-sm shadow">
            <div>{message.content}</div>
          </div>
        </div>
      )}
      <div className="flex w-full justify-start">
        <span className={`text-xs italic`}>{formattedDate}</span>
      </div>
    </div>
  );
}

export default ReceivedMessage;
