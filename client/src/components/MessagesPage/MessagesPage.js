/** @format */
import React from "react";
import { Redirect } from "react-router-dom";
// ConversationShow components
import ConversationShow from "./ConversationShow/ConversationShow";
import ConversationTitle from "./ConversationShow/ConversationTitle";
import MessagesContainer from "./ConversationShow/MessagesContainer";
import NewMessageEntry from "./ConversationShow/NewMessageEntry";
import ReceivedMessage from "./ConversationShow/RecievedMessage";
import UserMessage from "./ConversationShow/UserMessage";
// MessagingSidebar components
import MessagingSidebar from "./MessagingSidebar/MessagingSidebar";
import ConversationList from "./MessagingSidebar/ConversationList";
import ConversationOption from "./MessagingSidebar/ConversationOption";
import ConversationsContainer from "./MessagingSidebar/ConversationsContainer";
import NewConversationButton from "./MessagingSidebar/NewConversationButton";
import Search from "./MessagingSidebar/Search";
 
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

  return (
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
  );
}

export default MessagesPage;
