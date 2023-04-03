/** @format */

import React, { useState, useRef, useEffect } from "react";
import DropdownMenu from "../DropdownMenu";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import autosize from "autosize";
import DeletedMessage from "./DeletedMessage";
import { datify } from "../../../utilities/datify";

function UserMessage({ message, handleMessageMutation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [messageContentMaster, setMessageContentMaster] = useState(
    message.content
  );
  const [messageContent, setMessageContent] = useState(message.content);
  const messageInputRef = useRef();
  const dropdownItems = [
    {
      label: (
        <>
          <FontAwesomeIcon icon={faPenSquare} className="mr-2" />
          Edit
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
        setIsDeleted(true);
        handleDeleteSubmit();
      },
    },
  ];

  useEffect(() => {
    if (isEditing) {
      messageInputRef.current.focus();
      autosize(messageInputRef.current);
    }
  }, [isEditing]);

  function handleMessageInputChange(e) {
    setMessageContent(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEditSubmit();
    }
  }
  function handleEditSubmit() {
    fetch(`/messages/${message.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: messageContent,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((editedMessage) => {
          setErrors([]);
          setMessageContentMaster(messageContent);
          setIsEditing(false);
          handleMessageMutation(editedMessage);
        });
      } else {
        r.json().then((errorData) => setErrors(errorData.errors));
      }
    });
  }

  function handleDeleteSubmit() {
    fetch(`/messages/${message.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deleted: true,
      }),
    })
      .then((r) => r.json())
      .then((deletedMessage) => handleMessageMutation(deletedMessage));
  }

  function handleBlur() {
    setIsEditing(false);
    setMessageContent(messageContentMaster);
  }

  return (
    <div className="col-start-6 col-end-13 rounded-lg p-3">
      {isDeleted || message.deleted ? (
        <div className="flex flex-row-reverse items-center justify-start">
          <DeletedMessage />
        </div>
      ) : (
        <div className="flex flex-row-reverse items-center justify-start">
          {errors.length > 0 &&
            errors.map((error) => (
              <p className=" ml-4 text-xs italic text-red-500" key={error}>
                {error}
              </p>
            ))}
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
            {message.user.username[0].toUpperCase()}
          </div>
          <div className="relative mr-3 rounded-xl bg-indigo-100 py-3 px-4 text-sm shadow">
            <div className="absolute top-0 right-0 mr-1">
              <DropdownMenu items={dropdownItems} />
            </div>
            <div>
              {isEditing ? (
                <textarea
                  className=" text-xs"
                  value={messageContent}
                  onChange={handleMessageInputChange}
                  ref={messageInputRef}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                />
              ) : (
                <span>{messageContentMaster}</span>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full justify-end">
        <span className="text-xs italic">{datify(message.created_at)}</span>
      </div>
    </div>
  );
}

export default UserMessage;
