/** @format */

export function sortByUpdatedAt(conversations) {
  return conversations.sort((a, b) => {
    const lastMessageA = a.messages[a.messages.length - 1].created_at;
    const lastMessageB = b.messages[b.messages.length - 1].created_at;

    return new Date(lastMessageB) - new Date(lastMessageA);
  });
}
