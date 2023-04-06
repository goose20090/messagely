/** @format */

import React, { useRef, useState, useEffect } from "react";
import DropdownMenu from "../DropdownMenu";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../ConfirmationModal";
import { datify } from "../../../utilities/datify";

function ConversationOption({
  handleChangeCurrentConvo,
  conversation,
  handleConversationDelete,
  updateTotalUnreadCount,
}) {
  const { messages } = conversation;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [titleMaster, setTitleMaster] = useState(conversation.title);
  const [title, setTitle] = useState(conversation.title);
  const titleInputRef = useRef();
  const [unreadCount, setUnreadCount] = useState(
    conversation.unread_messages_count
  );
  // console.log(conversation);

  const lastMessage = messages.slice(-1)[0];

  function handleConversationClick() {
    handleChangeCurrentConvo(conversation);

    if (unreadCount > 0) {
      fetch(`/conversations/${conversation.id}/update_unread`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setUnreadCount(0);
          updateTotalUnreadCount(unreadCount);
        });
    }
  }

  function handleDeleteClick() {
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
        handleDeleteClick();
      },
    },
  ];

  useEffect(() => {
    if (isEditing) {
      titleInputRef.current.focus();
    }
  }, [isEditing]);

  function handleModalDeleteClick() {
    console.log("delete action triggered");
    fetch(`/conversations/${conversation.id}`, {
      method: "DELETE",
    }).then((res) => {
      handleConversationDelete(conversation);
    });
  }

  function handleEditSubmit(e) {
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

  let formattedDate;

  if (lastMessage) {
    formattedDate = datify(lastMessage.created_at);
  } else {
    formattedDate = datify(conversation.created_at);
  }

  return (
    <div className="relative flex flex-row items-center p-4">
      {isModalOpen && (
        <ConfirmationModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          title={title}
          setIsModalOpen={setIsModalOpen}
          handleModalDeleteClick={handleModalDeleteClick}
        />
      )}
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
        onClick={handleConversationClick}
      >
        <div className="text-sm font-medium">
          {isEditing ? (
            <form onSubmit={handleEditSubmit}>
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
        <div className="items-left flex">
          <div className="w-40 truncate text-xs">
            <span className="mr-2 font-bold">
              {lastMessage ? `${lastMessage.user.username} :` : null}
            </span>

            {!lastMessage ? (
              <span className="float-left italic"> No messages yet </span>
            ) : lastMessage.deleted ? (
              <span className="italic"> Message Deleted</span>
            ) : (
              lastMessage.content
            )}
          </div>
          <span className="ml-2 text-xs italic"></span>
        </div>
      </div>
      <div className="ml-2 mb-1 flex flex-shrink-0 flex-col items-end self-end">
        {unreadCount > 0 ? (
          <span className="mb-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount}
          </span>
        ) : (
          <span className="ml-2 h-5 text-xs italic">{formattedDate}</span>
        )}
      </div>
    </div>
  );
}

export default ConversationOption;
