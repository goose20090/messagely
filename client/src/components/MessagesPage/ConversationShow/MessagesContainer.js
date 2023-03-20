/** @format */

import React, { useEffect, useRef} from "react";

function MessagesContainer({ children }) {

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    container.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [children]);

  return (
    <div className="h-full overflow-hidden py-4">
      <div className="h-full overflow-y-auto">
        <div className="grid grid-cols-12 gap-y-2" ref={containerRef}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MessagesContainer;
