/** @format */

import React, { useContext } from "react";
import { UserContext } from "../../../context/user";

function ConversationOption({setCurrentConv, conversation}) { 

  const {user} = useContext(UserContext)

  const {messages} = conversation

  const lastMessage = messages.slice(-1)[0]



  return (
    <div className="relative flex flex-row items-center p-4">
      <div className="absolute right-0 top-0 mr-4 mt-3 text-xs text-gray-500">
        2 hours ago
      </div>
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pink-500 font-bold text-pink-300">
      {lastMessage.user.username[0].toUpperCase()}
      </div>
      <div className="ml-3 flex flex-grow flex-col cursor-pointer" onClick={()=>setCurrentConv(conversation)}>
        <div className="text-sm font-medium">{lastMessage.user.username}</div>
        <div className="w-40 truncate text-xs">
          {lastMessage.content}
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
