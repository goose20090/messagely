/** @format */
import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchConversations } from "../../conversationsSlice";
 
function MessagesPage({ user, setUser, setLoading }) {


  const conversations = useSelector((state)=>state.conversations.entities)

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchConversations());
  }, [dispatch])

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

  console.log(conversations)
  if (!user) return <Redirect to="/" />;
  return (
      <div className="flex h-screen flex-row text-gray-800 antialiased">
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
