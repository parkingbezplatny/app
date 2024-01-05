"use client";

export function useReloadSession() {
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };
  return reloadSession;
}
