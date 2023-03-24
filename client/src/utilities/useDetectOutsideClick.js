import { useEffect, useState } from "react";

export function useDetectOutsideClick(ref, initialState) {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [ref]);

  return [isActive, setIsActive];
}
