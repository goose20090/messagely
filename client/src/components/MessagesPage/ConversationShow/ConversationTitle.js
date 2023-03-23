import React from "react";
import useStringify from "../../../utilities/useStringify";

function ConversationTitle({currentConv}){
    const usernamesString = useStringify(currentConv.users)

    return(
        <div className= "flex float-left">
        <div className="ml-3 flex flex-col">
            <div className="text-m font-bold">{currentConv.title}</div>
            <div className="text-sm text-gray-500">{usernamesString}</div>
        </div>
    </div>
    )
}

export default ConversationTitle;