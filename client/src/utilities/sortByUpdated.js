/** @format */

export function sortByUpdatedAt(conversations) {
  return conversations.sort((a, b) => {
    const dateA = new Date(a.updated_at);
    const dateB = new Date(b.updated_at);

    return dateB - dateA;
  });
}
