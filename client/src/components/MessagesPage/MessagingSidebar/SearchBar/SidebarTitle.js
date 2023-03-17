import React from "react";
import UnreadNot from "./UnreadNot";

function SidebarTitle({user}){
    return(
        <div className="flex w-64 justify-start overflow-hidden rounded-lg bg-gray-100  transition-opacity duration-500">
        <div className="w-40 flex-col text-lg font-semibold">
          {user.username}'s Messages
        </div>
        <UnreadNot num={5} />
      </div>
    )
}

export default SidebarTitle