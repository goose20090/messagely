import React, {useState, useRef, useEffect} from "react";
import DropdownMenu from "../DropdownMenu";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import autosize from "autosize";

function UserMessage({ message }) {
  const [isEditing, setIsEditing] = useState(false)
  const [messageContent, setMessageContent] = useState(message.content)
  const messageInputRef = useRef()
  const dropdownItems = [
    {
      label: (
        <>
          <FontAwesomeIcon icon={faPenSquare} className="mr-2" />
          Edit
        </>
      ),
      action: () => {
        setIsEditing(true)
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

  useEffect(() => {
    if (isEditing) {
      messageInputRef.current.focus()
      autosize(messageInputRef.current)
    }
  }, [isEditing])

  function handleMessageInputChange(e){
    setMessageContent(e.target.value)
  }

  function handleKeyDown(e){
    if (e.key === "Enter" && !e.shiftKey){
      e.preventDefault()
      handleSubmit()
    }
  }
  function handleSubmit(){
    setIsEditing(false)

    fetch(`/messages/${message.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: messageContent
      })
    })
    .then((r)=> r.json())
    .then((r)=> console.log(r))
  }

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
          <div>
            {isEditing ? (
                <textarea
                  className=" text-xs"
                  value={messageContent}
                  onChange={handleMessageInputChange}
                  ref={messageInputRef}
                  onBlur={() => setIsEditing(false)}
                  onKeyDown = {handleKeyDown}
                />
            ) : (
              <span>{messageContent}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserMessage;
