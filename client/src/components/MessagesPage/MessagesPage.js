/** @format */
import React, { useEffect, useState } from "react";
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

  const [displayConv, setDisplayConv]= useState(conversations[0])

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchConversations());
    setDisplayConv(conversations[0])
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



  if (!user) return <Redirect to="/" />;
  return (
      <div className="flex h-screen flex-row text-gray-800 antialiased">
        <MessagingSidebar>
          <Search user = {user} />
          <ConversationsContainer>
            <ConversationList>
              {conversations.map((conversation)=> <ConversationOption conversation = {conversation}/>)}
            </ConversationList>
            <NewConversationButton />
          </ConversationsContainer>
        </MessagingSidebar>
        <ConversationShow>
          <ConversationTitle onLogout={onLogout} conversation = {displayConv}/>
          <MessagesContainer>
            {displayConv.messages.map((mess)=> {
              if (mess.id === user.id){
                return <UserMessage message = {mess}/>
              }
              else return <ReceivedMessage message = {mess}/>
              })}
          </MessagesContainer>
          <NewMessageEntry />
        </ConversationShow>
      </div>
  );
}

export default MessagesPage;
