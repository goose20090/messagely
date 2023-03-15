/** @format */

import React from "react";

function ConversationOption() {
  return (
    <div class="relative flex flex-row items-center p-4">
      <div class="absolute right-0 top-0 mr-4 mt-3 text-xs text-gray-500">
        2 hours ago
      </div>
      <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pink-500 font-bold text-pink-300">
        T
      </div>
      <div class="ml-3 flex flex-grow flex-col">
        <div class="text-sm font-medium">Flo Steinle</div>
        <div class="w-40 truncate text-xs">
          Good after noon! how can i help you?
        </div>
      </div>
      <div class="ml-2 mb-1 flex-shrink-0 self-end">
        <span class="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          3
        </span>
      </div>
    </div>
  );
}

export default ConversationOption;
