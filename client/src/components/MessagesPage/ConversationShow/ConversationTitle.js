import React from "react";
import useStringify from "../../../utilities/useStringify"


function ConversationTitle({onLogout, currentConv}){

    const currentConvUsers = currentConv.messages.map((message)=> message.user)
    const usernamesString = useStringify(currentConvUsers)
    return(
        <div className="flex flex-row items-center justify-between rounded-2xl py-4 px-6 shadow">
            <div className= "flex">
                <div className="ml-3 flex flex-col">
                    <div className="text-sm font-semibold">{usernamesString}</div>
                    <div className="text-xs text-gray-500">Active</div>
                </div>
            </div>
          <button 
            onClick={onLogout}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded-full"
          >Log Out</button>
        </div>
    )
}

export default ConversationTitle;