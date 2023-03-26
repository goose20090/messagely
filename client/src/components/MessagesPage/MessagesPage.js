/** @format */
import React, { useContext, useEffect, useState, useRef } from "react";
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

  const [unreadCount, setUnreadCount] = useState(0)

  // User context object
  const { user, setUser } = useContext(UserContext);

  const { conversations } = user;

  let nonDeletedConvos;
  if (conversations) {
    nonDeletedConvos = conversations.filter((convo) => !convo.deleted);
  }
  const [userConvos, setUserConvos] = useState([]);

  const [allUsers, setAllUsers] = useState([]);

  const [currentConv, setCurrentConv] = useState({});

  console.log(user)

  useEffect(() => {
    if (user) {
      setUserConvos(sortConversationsByUpdatedAt(nonDeletedConvos));
      setUnreadCount(user.total_unread_message_count)
      setCurrentConv(false);
      setLoading(false);
      fetch("/users")
        .then((res) => res.json())
        .then((usersData) => setAllUsers(usersData));
    }
  }, []);

  function handleChangeCurrentConvo(conv) {
    setCurrentConv(conv);
  }

  function updateTotalUnreadCount(convUnreadCount){ 
    setUnreadCount(unreadCount - convUnreadCount)
  }

  function handleAddConv(newConv) {
    setUserConvos([newConv, ...conversations]);
    setUser({
      ...user,
      conversations: [newConv, ...conversations],
    });
  }

  function sortConversationsByUpdatedAt(conversations) {
    return conversations.sort((a, b) => {
      const dateA = new Date(a.updated_at);
      const dateB = new Date(b.updated_at);
  
      return dateB - dateA;
    });
  }

  function handleMessageMutation(mutatedMessage) {
    console.log(mutatedMessage);
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
          updated_at: Date.now()
        };
      } else return conversation;
    });

    const convosSortedByDate = sortConversationsByUpdatedAt(newConversations)

    setUser({
      ...user,
      conversations: convosSortedByDate
    })

    setUserConvos(convosSortedByDate);
  }

  function handleConversationDelete(deletedConv) {
    const updatedConvos = userConvos.map((userConvo) => {
      if (userConvo.id === deletedConv.id) {
        return { ...userConvo, deleted: true };
      } else {
        return userConvo;
      }
    });
  
    const nonDeletedConvos = updatedConvos.filter((convo) => !convo.deleted);
  
    setUserConvos(nonDeletedConvos);
    setUser({...user,conversations: nonDeletedConvos});
  
    if (nonDeletedConvos.length > 0) {
      setCurrentConv(nonDeletedConvos[0]);
    } else {
      setCurrentConv(false);
    }
  }

  if (!user) return <Redirect to="/" />;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex h-screen flex-row text-gray-800 antialiased">
          <MessagingSidebar>
            <Search user={user} unreadCount = {unreadCount}/>
            <ConversationsContainer>
              <ConversationList>
                {userConvos
                  ? userConvos.map((conversation) => {
                      if (conversation.deleted) {
                        return null;
                      } else
                        return (
                          <ConversationOption
                            key={conversation.id}
                            conversation={conversation}
                            handleChangeCurrentConvo={handleChangeCurrentConvo}
                            handleConversationDelete={handleConversationDelete}
                            updateTotalUnreadCount={updateTotalUnreadCount}
                          />
                        );
                    })
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
