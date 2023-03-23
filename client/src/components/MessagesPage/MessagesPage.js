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
import NewConversationOption from "./MessagingSidebar/NewConversationOption";
import Search from "./MessagingSidebar/SearchBar/Search";
import Loader from "../Auth/Loader";
import { UserContext } from "../../context/user";
import NewConversationForm from "./MessagingSidebar/NewConversationForm";

function MessagesPage({ onLogout }) {
  // Loading boolean states
  const [loading, setLoading] = useState(true);

  const [addingConv, setAddingConv] = useState(false);

  // User context object
  const { user } = useContext(UserContext);

  const { conversations } = user;

  const [userConvos, setUserConvos] = useState([]);

  const [allUsers, setAllUsers] = useState([]);

  const [currentConv, setCurrentConv] = useState({});

  const [currentConvUsers, setCurrentConvUsers] = useState([]);


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

  function handleAddConv(newConvObj) {
    const addedUserIds = newConvObj.users.map((user) => {
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
    })
      .then((r) => r.json())
      .then((r) => setUserConvos([...conversations, r]));
  }

  if (!user) return <Redirect to="/" />;
  console.log(userConvos)
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
                  ? userConvos.map((conversation) => <ConversationOption
                        key={conversation.id}
                        conversation={conversation}
                        handleChangeCurrentConvo={handleChangeCurrentConvo}
                      />
                    )
                  : null}
                {addingConv ? (
                  <NewConversationForm
                    allUsers={allUsers}
                    handleAddConv={handleAddConv}
                  />
                ) : null}
              </ConversationList>
              <NewConversationButton setAddingConv={setAddingConv} />
            </ConversationsContainer>
          </MessagingSidebar>
          <ConversationShow>
            {
              <ConversationTitle
                onLogout={onLogout}
                currentConv={currentConv}
                setLoading={setLoading}
              />
            }
            <MessagesContainer>
              {currentConv
                ? currentConv.messages.map((message) => {
                    if (message.user_id === user.id) {
                      return <UserMessage message={message} key={message.id} />;
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
              setCurrentConv={setCurrentConv}
            />
          </ConversationShow>
        </div>
      )}
    </div>
  );
}

export default MessagesPage;
