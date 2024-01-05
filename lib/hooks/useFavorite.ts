"use client";

import { useSession } from "next-auth/react";

export function useFavorite() {
  const { data: session } = useSession();

  return session?.user.favoriteParkings;
}
