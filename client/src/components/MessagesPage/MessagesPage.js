/** @format */
import React from "react";
import useMessagesPage from "./hooks/useMessagesPage";
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
import NewConversationForm from "./MessagingSidebar/NewConversationForm";

function MessagesPage({ onLogout }) {
    const {
    loading,
    addingConv,
    setAddingConv,
    search,
    userConvos,
    allUsers,
    currentConv,
    handleChangeCurrentConvo,
    handleAddConv,
    handleMessageMutation,
    handleAddMessage,
    handleConversationDelete,
    handleSearchChange,
    unreadCount,
    updateTotalUnreadCount,
    user
    } = useMessagesPage();
  if (!user) return <Redirect to="/" />;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex h-screen flex-row text-gray-800 antialiased">
          <MessagingSidebar>
            <Search
              user={user}
              unreadCount={unreadCount}
              search={search}
              handleSearchChange={handleSearchChange}
            />
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
