/** @format */
import React, { useContext } from "react";
import { useState, useRef } from "react";
import { UserContext } from "../../../context/user";

function NewConversationForm({ allUsers, handleAddConv, setAddingConv }) {
  const { user } = useContext(UserContext);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState(allUsers.filter((eachUser)=> eachUser.id !== user.id));
  const [filterText, setFilterText] = useState("");
  const [errors, setErrors] = useState(false);
  const [newConvObj, setNewConvObj] = useState({
    title: "",
    users: [],
  });
  const optionInputRef = useRef();
 

  function onSubmit(e) {
    e.preventDefault();
    postConv(newConvObj);
  }

  function postConv(newConvObj) {
    const addedUserIds = newConvObj.users.map((user) => {""
      return { id: user.id };
    });
    const newConvUserIds = [...addedUserIds, { id: user.id }];
    fetch("/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        new_conv_user_ids: newConvUserIds,
        title: newConvObj.title,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((newConv) => {
          handleAddConv(newConv);
          setAddingConv(false);
        });
      } else {
        r.json().then((errorData) => {
          let errors = errorData.errors;
          let modifiedErrors = errors.map((error) => {
            let errorParts = error.split(" ");
            if (errorParts[0] === "Users") {
              errorParts.shift();
            }
            return errorParts.join(" ");
          });

          console.log(modifiedErrors);
          setErrors(modifiedErrors);
        });
      }
    });
  }

  const filteredOptions = options.filter((option) =>
    option.username.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleFilterInputChange = (event) => {
    setFilterText(event.target.value);
    setShowOptions(true);
  };
  function handleBlur() {
    setShowOptions(false);
  }

  function handleNewConvoUserDelete(e) {
    const deletedUserId = e.target.id;

    const filteredConvoUsers = newConvObj.users.filter(
      (user) => user.id != deletedUserId
    );

    const filteredUser = allUsers.find((user) => user.id == deletedUserId);

    setNewConvObj({
      ...newConvObj,
      users: filteredConvoUsers,
    });

    setOptions([...options, filteredUser]);
  }

  function handleOptionClick(e) {
    optionInputRef.current.blur();
    setShowOptions(false);
    setFilterText("");
    let newUser = allUsers.find(
      (user) => user.username === e.target.textContent
    );

    setNewConvObj({
      ...newConvObj,
      users: [...newConvObj.users, newUser],
    });

    const newOptions = options.filter((user) => user.id !== newUser.id);

    setOptions(newOptions);
  }

  function handleTitleChange(e) {
    setNewConvObj({
      ...newConvObj,
      title: e.target.value,
    });
  }

  return (
    <div className="relative ml-auto mr-auto w-10/12 rounded-lg border bg-white p-2">
      <span
        onClick={() => setAddingConv(false)}
        className="absolute top-0 right-0 mt-1 mr-2 cursor-pointer rounded-full border px-1 font-bold text-indigo-500 hover:bg-indigo-500 hover:text-white"
      >
        X
      </span>
      <form onSubmit={onSubmit}>
        <div>
          <h4 className=" mb-1 text-sm font-bold">Name new conversation:</h4>
          <input
            id="search-input"
            type="text"
            value={newConvObj.title}
            onChange={handleTitleChange}
            placeholder="e.g 'Family Chat'"
            className="mb-3 mr-4 w-full rounded-md border border-gray-300 py-2 pl-2 text-xs placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <div>
            <h4 className=" mb-1 text-sm font-bold">Add recipients:</h4>
            {newConvObj.users.map((user) => (
              <p
                key={user.id}
                className="m-1 rounded bg-indigo-500 px-4 font-bold text-white hover:bg-indigo-700"
              >
                {user.username}
                <span
                  id={user.id}
                  onClick={handleNewConvoUserDelete}
                  className="float-right cursor-pointer"
                >
                  X
                </span>
              </p>
            ))}
          </div>
          <input
            id="search-input"
            ref={optionInputRef}
            type="text"
            placeholder="Search.."
            className="w-full rounded-md border border-gray-300 py-2 pl-2 pr-4 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={filterText}
            onChange={handleFilterInputChange}
            onFocus={() => setShowOptions(true)}
            onBlur={handleBlur}
          />
          {showOptions && (
            <div className="absolute z-10 mt-1 h-auto max-h-40 w-full overflow-auto rounded-md bg-white shadow-lg">
              {filteredOptions.map((option) => (
                <p
                  key={option.id}
                  href={option.href}
                  className="block px-2 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
                  onClick={handleOptionClick}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {option.username}
                </p>
              ))}
            </div>
          )}
        </div>
        {errors ? errors.map((error, index)=> <p className="text-xs italic text-red-500 mt-1" key ={index}>{error}</p>): null}

        <button
          type="submit"
          className="mt-2 rounded-full bg-indigo-500 py-1 px-4 font-bold text-white hover:bg-indigo-700"
        >
          Create Conversation
        </button>
      </form>
    </div>
  );
}

export default NewConversationForm;
