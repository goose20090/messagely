/** @format */

import React, { useRef, useState, useEffect } from "react";
import DropdownMenu from "../DropdownMenu";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../ConfirmationModal";

function ConversationOption({ handleChangeCurrentConvo, conversation, handleConversationDelete, updateTotalUnreadCount}) {
  const { messages } = conversation;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [titleMaster, setTitleMaster] = useState(conversation.title);
  const [title, setTitle] = useState(conversation.title);
  const titleInputRef = useRef();
  const [unreadCount, setUnreadCount]= useState(conversation.unread_messages_count)

  const lastMessage = messages.slice(-1)[0];

  function handleConversationClick() {
    handleChangeCurrentConvo(conversation);

    if (unreadCount> 0){
    fetch(`/conversations/${conversation.id}/update_unread`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res)=> res.json())
    .then((res)=> {
      setUnreadCount(0)
      updateTotalUnreadCount(unreadCount)
    })}
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

  function handleModalDeleteClick(){
    console.log('delete action triggered')
    fetch(`/conversations/${conversation.id}`, {
      method: "DELETE"
    })
    .then((res)=> {
      handleConversationDelete(conversation);
    })
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

  let formattedDate

  function formatDate(date){

    const createdDate = new Date(date);
    const todayDate = new Date();
    if (createdDate.toDateString() === todayDate.toDateString()) {
        formattedDate = `${createdDate.getHours()}:${createdDate.getMinutes()}`;
    } else {
        formattedDate = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`;
    }

    return formattedDate
}

  if (lastMessage){
    formatDate(lastMessage.created_at)
  }
  else{
    formatDate(conversation.created_at)
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
    <div className="flex items-left">
      <div className="w-40 truncate text-xs">
        <span className="mr-2 font-bold">
          {lastMessage ? `${lastMessage.user.username} :` : null}
        </span>
        
        {lastMessage
          ? lastMessage.deleted
            ?<span className="italic"> Message Deleted</span>
            : lastMessage.content
          :<span className="italic float-left"> No messages yet </span>}
      </div>
      <span className="text-xs italic ml-2"></span>
    </div>
  </div>
  <div className="ml-2 mb-1 flex-shrink-0 self-end flex flex-col items-end">
    {unreadCount > 0 ? (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white mb-1">
        {unreadCount}
      </span>
    ) : (
      <span className="h-5 text-xs italic ml-2">{formattedDate}</span>
    )}
  </div>
</div>



  );
}

export default ConversationOption;
