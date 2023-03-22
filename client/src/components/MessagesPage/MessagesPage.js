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


  // Loading boolean states
  const [loading, setLoading] = useState(true)

  const [addingConv, setAddingConv] = useState(false)

  // User context object
  const {user} = useContext(UserContext)

  const {conversations} = user

  const [userConvos, setUserConvos] = useState([])

  const [allUsers, setAllUsers] = useState([])

  const [currentConv, setCurrentConv] = useState({})

  const [currentConvUsers, setCurrentConvUsers] = useState([])

  let uniqueConversations

  if (user){
    
    // Having issue with seed data repeating 
   uniqueConversations = [...new Map(conversations.map((conversation) => [conversation["id"], conversation])).values()];
  }

  useEffect(()=>{
    if(user){
      console.log(uniqueConversations)
    setUserConvos(uniqueConversations)
    setCurrentConv(uniqueConversations[0])
      if(uniqueConversations[0]){
        setCurrentConvUsers(uniqueConversations[0].messages.map((message)=> message.user))
      }
    setLoading(false)
    fetch('/users')
    .then((res)=> res.json())
    .then((usersData)=> setAllUsers(usersData))
    }
  },[])

  function handleAddConv(newConversation){
    console.log(newConversation)

    // Bring the conversationTitle logic out of itself
    // 
  }


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
                {userConvos? userConvos.map((conversation)=> <ConversationOption key = {conversation.id} conversation={conversation} setCurrentConv = {setCurrentConv}/>): null}
                {addingConv? <NewConversationForm allUsers = {allUsers} handleAddConv= {handleAddConv}/>: null}
              </ConversationList>
              <NewConversationButton setAddingConv = {setAddingConv}/>
            </ConversationsContainer>
          </MessagingSidebar>
          <ConversationShow>
            {
              <ConversationTitle
                onLogout={onLogout}
                currentConvUsers = {currentConvUsers}
                setLoading= {setLoading}
              />
            }
            <MessagesContainer>
              {
              currentConv?
              currentConv.messages.map((message) => {
                if (message.user_id === user.id) {
                  return <UserMessage message={message} key={message.id} />;
                } else return <ReceivedMessage message={message} key={message.id} />;
              }):
              null
              }
            </MessagesContainer>
            <NewMessageEntry currentConv ={currentConv} user = {user} setCurrentConv = {setCurrentConv}/>
          </ConversationShow>
          </div>
      )}
    </div>
  );
}

export default MessagesPage;
