import React from "react";

function ConversationsContainer({children}){
    return (
        <div className="relative h-full overflow-hidden pt-2">
            {children}
        </div>
    )
}

export default ConversationsContainer;