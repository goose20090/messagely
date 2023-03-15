/** @format */
import React from "react";
import { Redirect } from "react-router-dom";
import MessagingSidebar from "./MessagingSidebar";
import ConversationShow from "./ConversationShow";
import ConversationList from "./ConversationList";
import ConversationOption from "./ConversationOption";
import ConversationsContainer from "./ConversationsContainer";
import NewConversationButton from "./NewConversationButton";
import Search from "./Search";
import ConversationTitle from "./ConversationTitle";
import MessagesContainer from "./MessagesContainer";
import NewMessageEntry from "./NewMessageEntry";
import ReceivedMessage from "./RecievedMessage";
import UserMessage from "./UserMessage";

function MessagesPage({ user, setUser, setLoading }) {
  if (!user) return <Redirect to="/" />;

  function onLogout() {
    setLoading(true);
    setUser(false);
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      console.log("logout successful");
      setLoading(false);
    });
  }

  console.log(user);

  return (
    <>
      {/* <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-h- h-full w-full max-w-md space-y-8 border">
          <h1>Hi {user.username}</h1>
          <button
            onClick={onLogout}
            className="rounded border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 shadow hover:bg-gray-100"
          >
            Log Out
          </button>
        </div>
      </div> */}
      <div class="flex h-screen flex-row text-gray-800 antialiased">
        <MessagingSidebar>
          <Search />
          <ConversationsContainer>
            <ConversationList>
              <ConversationOption />
            </ConversationList>
            <NewConversationButton />
          </ConversationsContainer>
        </MessagingSidebar>
        <ConversationShow>
          <ConversationTitle onLogout={onLogout} />
          <MessagesContainer>
            <ReceivedMessage />
            <UserMessage />
          </MessagesContainer>
          <NewMessageEntry />
        </ConversationShow>
      </div>
    </>
  );
}

export default MessagesPage;
