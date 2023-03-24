import React from "react";
import DropdownMenu from "../DropdownMenu";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ConversationOption({ handleChangeCurrentConvo, conversation }) {
  const { messages } = conversation;

  const lastMessage = messages.slice(-1)[0];

  function handleClick(e) {
    handleChangeCurrentConvo(conversation);
  }

  const dropdownItems = [
    {
      label: (
        <>
          <FontAwesomeIcon icon={faPenSquare} className="mr-2" />
          Edit Title
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
    <div className="relative flex flex-row items-center p-4">
      <div className="absolute right-0 top-0 mr-4 mt-3 text-xs text-gray-500">
      <DropdownMenu items={dropdownItems} />
      </div>
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pink-500 font-bold text-pink-300">
        {lastMessage
          ? lastMessage.user.username[0].toUpperCase()
          : conversation.users[0].username[0].toUpperCase()}
      </div>
      <div className="ml-3 flex flex-grow flex-col cursor-pointer" onClick={handleClick}>
        <div className="text-sm font-medium">{conversation.title}</div>
        <div className="w-40 truncate text-xs">
          <span className="font-bold mr-2">
            {lastMessage ? `${lastMessage.user.username} :` : null}
          </span>
          {lastMessage ? 
          lastMessage.deleted? 
          "Message Deleted":
          lastMessage.content : "No messages yet"}
        </div>
      </div>
      <div className="ml-2 mb-1 flex-shrink-0 self-end">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          3
        </span>
      </div>

    </div>
  );
}

export default ConversationOption;
