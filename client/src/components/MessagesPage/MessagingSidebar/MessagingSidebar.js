import React from "react";


function MessagingSidebar({children}){
    return (
        <div class="flex w-96 flex-shrink-0 flex-row bg-gray-100 p-4">
          <div class="-mr-4 flex h-full w-full flex-col py-4 pl-4 pr-4 ">
            {children}
          </div>
        </div>
    )
}

export default MessagingSidebar;