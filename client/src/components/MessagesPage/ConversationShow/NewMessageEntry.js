/** @format */

import React, { useState } from "react";

function NewMessageEntry({currentConv, user, handleAddMessage}) {


  const [message, setMessage] = useState('')

  function handleChange(e){
    setMessage(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault() 
    fetch("/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
        user_id: user.id,
        conversation_id: currentConv.id
      }),
    })
    .then((r)=> r.json())
    .then((returnedMessage)=> {
      handleAddMessage(returnedMessage)
      setMessage('')
    }
    )
  }  
  
  return (
    <div>
      {/* <p>Errors</p> */}
    <div className="flex flex-row items-center">
      <div className="flex h-12 w-full flex-row items-center rounded-3xl border px-2">
        <form className="flex w-full" onSubmit = {handleSubmit}>
          <input
            type="text"
            className="flex h-10 w-11/12 items-center rounded border border-transparent text-sm focus:outline-none"
            placeholder="Type your message...."
            value = {message}
            onChange = {handleChange}
          />
          <button type = "submit" className="bg-grey-200 back ml-10 flex h-10 w-10 items-center justify-center rounded-full border text-indigo-800 hover:bg-gray-300">
            <svg
              className="-mr-px h-5 w-5 rotate-90 transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </button>
        </form>
      </div>
      <div className="ml-6"></div>
    </div>
    </div>
  );
}

export default NewMessageEntry;
