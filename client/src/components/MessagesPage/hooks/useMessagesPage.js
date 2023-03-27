import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/user";

function useMessagesPage() {
  const [loading, setLoading] = useState(true);
  const [addingConv, setAddingConv] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [search, setSearch] = useState("");
  const [masterConvs, setMasterConvs] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const { conversations } = user;
  const [userConvos, setUserConvos] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currentConv, setCurrentConv] = useState({});

  useEffect(() => {
    let nonDeletedConvos

    if (user) {
        nonDeletedConvos = conversations.filter((convo) => !convo.deleted);
      const sortedNonDeletedConvos = sortConversationsByUpdatedAt(nonDeletedConvos);

      setUserConvos(sortedNonDeletedConvos);
      setMasterConvs(sortedNonDeletedConvos)
      setUnreadCount(user.total_unread_message_count)
      setCurrentConv(false);
      setLoading(false);
      fetch("/users")
        .then((res) => res.json())
        .then((usersData) => setAllUsers(usersData));
    }
  }, []);

  function sortConversationsByUpdatedAt(conversations) {
    return conversations.sort((a, b) => {
      const dateA = new Date(a.updated_at);
      const dateB = new Date(b.updated_at);

      return dateB - dateA;
    });
  }

  function handleChangeCurrentConvo(conv) {
    setCurrentConv(conv);
  }

  function updateTotalUnreadCount(convUnreadCount) {
    setUnreadCount(unreadCount - convUnreadCount);
  }

  function handleAddConv(newConv) {
    setUserConvos([newConv, ...conversations]);
    setMasterConvs([newConv, ...conversations]);
    setUser({
      ...user,
      conversations: [newConv, ...conversations],
    });
  }

  function handleMessageMutation(mutatedMessage) {
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
    setMasterConvs(newConversations);
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
    setMasterConvs(convosSortedByDate);
  }

  function handleConversationDelete(deletedConv) {
    const updatedConvos = userConvos.map((userConvo) => {
      if (userConvo.id === deletedConv.id) {
        return { ...userConvo, deleted: true };
      } else {
        return userConvo;
      }
    });

    const newNonDeletedConvos = updatedConvos.filter((convo) => !convo.deleted);

    setUserConvos(newNonDeletedConvos);
    setMasterConvs(newNonDeletedConvos)
    setUser({...user,conversations: newNonDeletedConvos});

    if (newNonDeletedConvos.length > 0) {
      setCurrentConv(newNonDeletedConvos[0]);
    } else {
      setCurrentConv(false);
    }
  }

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setUserConvos(filterConversationsByUsername([...masterConvs], e.target.value));
  }

  function filterConversationsByUsername(conversations, searchValue) {
    if (!searchValue) return sortConversationsByUpdatedAt(masterConvs);

    return conversations.filter((conversation) => {
      const users = conversation.users;
      return users.some((user) =>
        user.username.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  }
  return {
    loading,
    addingConv,
    setAddingConv,
    search,
    setSearch,
    userConvos,
    setUserConvos,
    allUsers,
    setAllUsers,
    currentConv,
    setCurrentConv,
    user,
    setUser,
    handleChangeCurrentConvo,
    updateTotalUnreadCount,
    handleAddConv,
    handleMessageMutation,
    handleAddMessage,
    handleConversationDelete,
    handleSearchChange,
    unreadCount,
    updateTotalUnreadCount
  };
}

export default useMessagesPage