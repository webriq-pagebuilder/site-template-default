import React, { createContext, useContext, useEffect, useState } from "react";
import { SANITY_PROJECT_ID, SOCIAL_ACCOUNTS_API_URL } from "studio/config";
import { SocialProfileFeed, Socials } from "types";

interface SocialMediaFeedContextProps {
  accountId: string;
  limit?: number;
  showRecentPosts?: boolean;
  showPostsFrom?: number;
  children?: React.ReactNode;
}

const SocialMediaFeedContext = createContext<Socials | null>(null); // pass default value

export function useSocialMediaFeed(): Socials {
  const context = useContext(SocialMediaFeedContext);

  if (!context) {
    console.error("'useSocialMediaFeed' must be used within a SocialMediaFeedContextProvider");
  }

  return context;
}

export function SocialMediaFeedContextProvider({
  accountId,
  limit,
  showRecentPosts,
  showPostsFrom,
  children
}: SocialMediaFeedContextProps) {
  const initialState = {
    account: {
      userId: "",
      userName: "",
      profileName: "",
      profilePictureUrl: "",
    },
    status: "loading",
    media: [],
    baseUrl: "",
  };

  const [profileFeed, setProfileFeed] = useState<SocialProfileFeed>(initialState);
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);

  async function fetchUserMedia(cursor: string | null = null) {
    try {
      const response = await fetch(`${SOCIAL_ACCOUNTS_API_URL}/media`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: accountId,
          studioId: SANITY_PROJECT_ID,
          limit,
          after: cursor,
          before: cursor,
          showRecentPosts,
          showPostsFrom,
        }),
      });

      const data = await response.json();

      if (data) {
        setProfileFeed({
          ...profileFeed,
          status: "success",
          media: data?.media,
          baseUrl: data?.baseUrl,
        });
        setNextCursor(data?.nextCursor);
        setPrevCursor(data?.previousCursor);
      }
    } catch (error) {
      console.error(
        "[ERROR] Something went wrong when fetching profile media. ",
        error
      );
      setProfileFeed((prevState) => ({
        ...prevState,
        status: "error",
        media: [],
      }));
    }
  }

  useEffect(() => {
    fetchUserMedia();
  }, [
    accountId,
    limit,
    showRecentPosts,
    showPostsFrom
  ]);

  function fetchNextPage() {
    fetchUserMedia("next");
  }

  function fetchPreviousPage() {
    fetchUserMedia("previous");
  }

  return (
    <SocialMediaFeedContext.Provider
      value={{
        profileFeed,
        setProfileFeed,
        fetchNextPage,
        fetchPreviousPage,
        nextCursor,
        prevCursor,
      }}
    >
      {children}
    </SocialMediaFeedContext.Provider>
  );
}