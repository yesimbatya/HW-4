"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

const queryClient = new QueryClient();

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
