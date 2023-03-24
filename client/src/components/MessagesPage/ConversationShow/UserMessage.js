import React from "react";
import DropdownMenu from "../DropdownMenu";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserMessage({ message }) {
  const dropdownItems = [
    {
      label: (
        <>
          <FontAwesomeIcon icon={faPenSquare} className="mr-2" />
          Edit
        </>
      ),
      action: () => {
        console.log("Option 1 clicked");
      },
    },
    {
      label: (
        <>
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
          Delete
        </>
      ),
      action: () => {
        console.log("Option 2 clicked");
      },
    },
    // Add more options as needed
  ];
  return (
    <div className="col-start-6 col-end-13 rounded-lg p-3">
      <div className="flex flex-row-reverse items-center justify-start">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
          {message.user.username[0].toUpperCase()}
        </div>
        <div className="relative mr-3 rounded-xl bg-indigo-100 py-3 px-4 text-sm shadow">
          <div className="absolute top-0 right-0 mr-1">
            <DropdownMenu items={dropdownItems} />
          </div>
          <div>{message.content}</div>
        </div>
      </div>
    </div>
  );
}

export default UserMessage;
