/** @format */
import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
// ConversationShow components
import ConversationShow from "./ConversationShow/ConversationShow";
import ConversationHeader from "./ConversationShow/ConversationHeader";
import MessagesContainer from "./ConversationShow/MessagesContainer";
import NewMessageEntry from "./ConversationShow/NewMessageEntry";
import ReceivedMessage from "./ConversationShow/RecievedMessage";
import UserMessage from "./ConversationShow/UserMessage";
import ConversationTitle from "./ConversationShow/ConversationTitle";
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
  const [loading, setLoading] = useState(true);

  const [addingConv, setAddingConv] = useState(false);

  // User context object
  const { user, setUser } = useContext(UserContext);

  const { conversations } = user;

  const [userConvos, setUserConvos] = useState([]);

  const [allUsers, setAllUsers] = useState([]);

  const [currentConv, setCurrentConv] = useState({});

  useEffect(() => {
    if (user) {
      // console.log(conversations)
      setUserConvos(conversations);
      setCurrentConv(conversations[0]);
      setLoading(false);
      fetch("/users")
        .then((res) => res.json())
        .then((usersData) => setAllUsers(usersData));
    }
  }, []);

  function handleChangeCurrentConvo(convo) {
    setCurrentConv(convo);
  }

  function handleAddConv(newConv) {
    setUserConvos([...conversations, newConv]);
    setUser({
      ...user,
      conversations: [...conversations, newConv],
    });
  }

  function handleMessageMutation(mutatedMessage) {
    console.log(mutatedMessage)
    const newConversations = user.conversations.map((conversation) => {
      if (conversation.id === mutatedMessage.conversation_id) {
        return {
          ...conversation,
          messages: conversation.messages.map((message) => {
            if (message.id === mutatedMessage.id) {
              return mutatedMessage;
            } else {
              return message;
            }
          }),
        };
      } else {
        return conversation;
      }
    });

    setUser({
      ...user,
      conversations: newConversations,
    });
    setUserConvos(newConversations);
  }

  function handleAddMessage(addedMessage) {
    setCurrentConv({
      ...currentConv,
      messages: [...currentConv.messages, addedMessage],
    });
    const newConversations = user.conversations.map((conversation) => {
      if (conversation.id === currentConv.id) {
        return {
          ...conversation,
          messages: [...currentConv.messages, addedMessage],
        };
      } else return conversation;
    });

    setUserConvos(newConversations);
  }

  if (!user) return <Redirect to="/" />;
  console.log(user)
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
                {userConvos
                  ? userConvos.map((conversation) => (
                      <ConversationOption
                        key={conversation.id}
                        conversation={conversation}
                        handleChangeCurrentConvo={handleChangeCurrentConvo}
                      />
                    ))
                  : null}
                {addingConv ? (
                  <NewConversationForm
                    allUsers={allUsers}
                    handleAddConv={handleAddConv}
                    setAddingConv={setAddingConv}
                  />
                ) : null}
              </ConversationList>
              <NewConversationButton setAddingConv={setAddingConv} />
            </ConversationsContainer>
          </MessagingSidebar>
          <ConversationShow>
            <ConversationHeader>
              <div className="flex items-center justify-between rounded-2xl p-3 shadow">
                {currentConv ? (
                  <ConversationTitle currentConv={currentConv} />
                ) : (
                  <>
                    <div />
                    <h1 className="font-bold">Welcome to Messagely</h1>
                  </>
                )}
                <button
                  onClick={onLogout}
                  className="float-right rounded-full bg-indigo-500 py-1 px-4 font-bold text-white hover:bg-indigo-700"
                >
                  Log Out
                </button>
              </div>
            </ConversationHeader>
            <MessagesContainer>
              {currentConv
                ? currentConv.messages.map((message) => {
                    if (message.user_id === user.id) {
                      return (
                        <UserMessage
                          message={message}
                          handleMessageMutation={handleMessageMutation}
                          key={message.id}
                        />
                      );
                    } else
                      return (
                        <ReceivedMessage message={message} key={message.id} />
                      );
                  })
                : null}
            </MessagesContainer>
            <NewMessageEntry
              currentConv={currentConv}
              user={user}
              handleAddMessage={handleAddMessage}
            />
          </ConversationShow>
        </div>
      )}
    </div>
  );
}

export default MessagesPage;
