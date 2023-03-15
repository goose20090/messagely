import React from "react";

function ConversationsContainer({children}){
    return (
        <div class="relative h-full overflow-hidden pt-2">
            {children}
        </div>
    )
}

export default ConversationsContainer;