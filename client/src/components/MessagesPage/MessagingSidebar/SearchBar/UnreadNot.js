import React from "react";

function UnreadNot({num}){
    return (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
          {num}
      </div>
    )
}

export default UnreadNot;