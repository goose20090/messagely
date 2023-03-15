import React from "react";

function ReceivedMessage(){
    return(
        <div class="col-start-1 col-end-8 rounded-lg p-3">
        <div class="flex flex-row items-center">
          <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
            A
          </div>
          <div class="relative ml-3 rounded-xl bg-white py-2 px-4 text-sm shadow">
            <div>Hey How are you today?</div>
          </div>
        </div>
      </div>
    )
}

export default ReceivedMessage;