import React from "react";

function ConversationTitle({onLogout}){
    return(
        <div class="flex flex-row items-center justify-between rounded-2xl py-4 px-6 shadow">
            <div class = "flex">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-pink-100">
                    T
                </div>
                <div class="ml-3 flex flex-col">
                    <div class="text-sm font-semibold">UI Art Design</div>
                    <div class="text-xs text-gray-500">Active</div>
                </div>
            </div>
          <button 
            onClick={onLogout}
            class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded-full"
          >Log Out</button>
        </div>
    )
}

export default ConversationTitle;