"use client";

import { LiveQueryProvider } from "@sanity/preview-kit";
import { getClient } from "@/lib/sanity.client";

interface PreviewProviderProps {
  children: React.ReactNode;
  token: string;
}

export function PreviewProvider({ children, token }: PreviewProviderProps) {
  const client = getClient(true).withConfig({ token });

  return <LiveQueryProvider client={client}>{children}</LiveQueryProvider>;
}
