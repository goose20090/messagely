
export function clearSessionOnRefresh() {
  if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    fetch("/sessions/clear_on_refresh", {
      method: "DELETE",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      credentials: "same-origin",
    });
  }
}