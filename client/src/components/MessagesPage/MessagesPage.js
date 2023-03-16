/** @format */
import React, { useContext, useEffect, useState } from "react";
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
import Loader from "../Auth/Loader";
import { UserContext } from "../../context/user";

function MessagesPage({ onLogout }) {


  const [loading, setLoading] = useState(true)

  const {user} = useContext(UserContext)

  const {conversations} = user

  const [currentConv, setCurrentConv] = useState({})

  useEffect(()=>{
    if(user){
    setCurrentConv(conversations[0])
    
    setLoading(false)
    }
  },[])

  if (!user) return <Redirect to="/" />;


  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex h-screen flex-row text-gray-800 antialiased">
          <MessagingSidebar>
            <Search user={user} />
            <ConversationsContainer>
              <ConversationList>
                {conversations.map((conversation)=> <ConversationOption key = {conversation.id} conversation={conversation} setCurrentConv = {setCurrentConv}/>)}
              </ConversationList>
              <NewConversationButton />
            </ConversationsContainer>
          </MessagingSidebar>
          <ConversationShow>
            {
              <ConversationTitle
                onLogout={onLogout}
                currentConv = {currentConv}
              />
            }
            <MessagesContainer>
              {currentConv.messages.map((message) => {
                if (message.user_id === user.id) {
                  return <UserMessage message={message} key={message.id} />;
                } else return <ReceivedMessage message={message} key={message.id} />;
              })}
            </MessagesContainer>
            <NewMessageEntry />
          </ConversationShow>
          </div>
      )}
    </div>
  );
}

export default MessagesPage;
