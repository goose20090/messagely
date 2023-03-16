import React from "react";

function ConversationList({children}){
    return(
        <div className="-mx-4 flex h-full flex-col divide-y overflow-y-auto">
            {children}
        </div>

    )
}

export default ConversationList;