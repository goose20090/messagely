/** @format */

export function sortByLastMessage(conversations) {
  return conversations.sort((a, b) => {
    const lastMessageA =
      a.messages.length > 0
        ? a.messages[a.messages.length - 1].created_at
        : a.created_at;
    const lastMessageB =
      b.messages.length > 0
        ? b.messages[b.messages.length - 1].created_at
        : b.created_at;

    return new Date(lastMessageB) - new Date(lastMessageA);
  });
}
