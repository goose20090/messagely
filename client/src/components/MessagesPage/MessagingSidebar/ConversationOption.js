/** @format */

import React, { useRef, useState, useEffect } from "react";
import DropdownMenu from "../DropdownMenu";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../ConfirmationModal";

function ConversationOption({ handleChangeCurrentConvo, conversation }) {
  const { messages } = conversation;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [titleMaster, setTitleMaster] = useState(conversation.title);
  const [title, setTitle] = useState(conversation.title);
  const titleInputRef = useRef();

  const lastMessage = messages.slice(-1)[0];

  function handleClick(e) {
    handleChangeCurrentConvo(conversation);
  }

  function handleDelete(e) {
    setIsModalOpen(true);
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
        setIsEditing(true);
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
        handleDelete();
      },
    },
  ];

  useEffect(() => {
    if (isEditing) {
      titleInputRef.current.focus();
    }
  }, [isEditing]);

  function handleSubmit(e) {
    e.preventDefault();
    setTitleMaster(title);
    setIsEditing(false);
    handleConversationEdit();
  }

  function handleConversationEdit() {
    fetch(`/conversations/${conversation.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    })
      .then((r) => r.json())
      .then((editedConversation) => console.log(editedConversation));
  }

  function handleBlur() {
    setIsEditing(false);
    setTitle(titleMaster);
  }

  return (
    <div className="relative flex flex-row items-center p-4">
      {isModalOpen && <ConfirmationModal open={isModalOpen} setOpen={setIsModalOpen} title = {title} setIsModalOpen = {setIsModalOpen}/>}
      <div className="absolute right-0 top-0 mr-4 mt-3 text-xs text-gray-500">
        <DropdownMenu items={dropdownItems} />
      </div>
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pink-500 font-bold text-pink-300">
        {lastMessage
          ? lastMessage.user.username[0].toUpperCase()
          : conversation.users[0].username[0].toUpperCase()}
      </div>
      <div
        className="ml-3 flex flex-grow cursor-pointer flex-col"
        onClick={handleClick}
      >
        <div className="text-sm font-medium">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <input
                ref={titleInputRef}
                value={title}
                onBlur={handleBlur}
                onChange={(e) => setTitle(e.target.value)}
                className=" text-indigo-500"
              />
            </form>
          ) : (
            <span>{titleMaster}</span>
          )}
        </div>
        <div className="w-40 truncate text-xs">
          <span className="mr-2 font-bold">
            {lastMessage ? `${lastMessage.user.username} :` : null}
          </span>
          {lastMessage
            ? lastMessage.deleted
              ? "Message Deleted"
              : lastMessage.content
            : "No messages yet"}
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
