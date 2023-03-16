/** @format */

import React from "react";

function MessagesContainer({ children }) {
  return (
    <div className="h-full overflow-hidden py-4">
      <div className="h-full overflow-y-auto">
        <div className="grid grid-cols-12 gap-y-2">
            {children}
        </div>
      </div>
    </div>
  );
}

export default MessagesContainer;
