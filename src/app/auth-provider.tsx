"use client";

import { SessionProvider } from "next-auth/react";
import { SessionProviderProps } from "next-auth/react";

export default function AuthProvider({ children }: SessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
