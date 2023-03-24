import React, { useRef } from "react";
import { useDetectOutsideClick } from "../../utilities/useDetectOutsideClick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function DropdownMenu({ items }) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  function handleClick(item){
    item.action();
    setIsActive(false);
  };
  function toggleDropdown(e){
    e.stopPropagation();
    setIsActive(!isActive);
  };
  
  

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={(e)=> {toggleDropdown(e)}}
        className="inline-flex justify-center items-center px-1 text-indigo-500 hover:text-gray-500 focus:outline-none"
      >
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      {isActive && (
        <div
          ref={dropdownRef}
          className="origin-top-right absolute right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
        >
          <ul className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <li key={index} className="cursor-pointer whitespace-nowrap">
                <button
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  onClick={() => handleClick(item)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
