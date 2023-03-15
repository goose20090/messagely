/** @format */

import React from "react";

function MessagesContainer({ children }) {
  return (
    <div class="h-full overflow-hidden py-4">
      <div class="h-full overflow-y-auto">
        <div class="grid grid-cols-12 gap-y-2">
            {children}
        </div>
      </div>
    </div>
  );
}

export default MessagesContainer;
