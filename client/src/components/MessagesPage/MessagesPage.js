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
import Search from "./MessagingSidebar/SearchBar/Search";
import Loader from "../Auth/Loader";
import { UserContext } from "../../context/user";
import NewConversationForm from "./MessagingSidebar/NewConversationForm";


function MessagesPage({ onLogout }) {


  const [loading, setLoading] = useState(true)

  const [addingConv, setAddingConv] = useState(false)

  const {user} = useContext(UserContext)

  const [allUsers, setAllUsers] = useState([])

  
  const {conversations} = user

  const [currentConv, setCurrentConv] = useState({})

  let uniqueConversations
  let uniqueUsers

  if (user){
   uniqueConversations = [...new Map(conversations.map((conversation) => [conversation["id"], conversation])).values()];

  }

  useEffect(()=>{
    if(user){
    setCurrentConv(uniqueConversations[0])
    setLoading(false)
    fetch('/users')
    .then((res)=> res.json())
    .then((res)=> setAllUsers(res))
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
            <Search user = {user}/>
            <ConversationsContainer>
              <ConversationList>
                {uniqueConversations.map((conversation)=> <ConversationOption key = {conversation.id} conversation={conversation} setCurrentConv = {setCurrentConv}/>)}
                {addingConv? <NewConversationForm allUsers = {allUsers}/>: null}
              </ConversationList>
              <NewConversationButton setAddingConv = {setAddingConv}/>
            </ConversationsContainer>
          </MessagingSidebar>
          <ConversationShow>
            {
              <ConversationTitle
                onLogout={onLogout}
                currentConv = {currentConv}
                setLoading= {setLoading}
              />
            }
            <MessagesContainer>
              {currentConv.messages.map((message) => {
                if (message.user_id === user.id) {
                  return <UserMessage message={message} key={message.id} />;
                } else return <ReceivedMessage message={message} key={message.id} />;
              })}
            </MessagesContainer>
            <NewMessageEntry currentConv ={currentConv} user = {user} setCurrentConv = {setCurrentConv}/>
          </ConversationShow>
          </div>
      )}
    </div>
  );
}

export default MessagesPage;
