import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { SANITY_PROJECT_ID, SOCIAL_ACCOUNTS_API_URL } from "studio/config";
import { SocialProfileFeed, Socials } from "types";
import { sanityClient } from "lib/sanity.client";

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
      platform: "",
    },
    status: "loading",
    media: [],
    baseUrl: "",
  };

  const [profileFeed, setProfileFeed] = useState<SocialProfileFeed>(initialState);
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);

  const fetchUserProfileAndMedia = useCallback(
    async (direction?: string) => {
      try {
        const getProfileData = await sanityClient.fetch(
          `*[_type == 'socialAccounts'][0].accounts`
        );
        const profile =
          getProfileData?.length !== 0
            ? getProfileData?.find((user) => user?.userId === accountId)
            : {};

        const cursor =
          direction === "next"
            ? nextCursor
            : direction === "previous"
            ? prevCursor
            : null;

        const data = await fetch(`${SOCIAL_ACCOUNTS_API_URL}/media`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            platform: profile?.platform,
            userId: accountId,
            studioId: SANITY_PROJECT_ID,
            limit,
            after: direction === "next" ? cursor : null,
            before: direction === "previous" ? cursor : null,
            showRecentPosts,
            showPostsFrom,
          }),
        }).then((response) => response.json());

        setProfileFeed((prevState) => ({
          ...prevState,
          status: "success",
          media: data?.media || [],
          baseUrl: data?.baseUrl || "",
          account: profile, // Use the fresh profile data
        }));
        setNextCursor(data?.nextCursor || null);
        setPrevCursor(data?.previousCursor || null);
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
    },
    [
      accountId,
      limit,
      showPostsFrom,
      showRecentPosts,
      nextCursor,
      prevCursor,
    ]
  );

  useEffect(() => {
    fetchUserProfileAndMedia();
  }, [fetchUserProfileAndMedia]);

  function fetchNextPage() {
    fetchUserProfileAndMedia("next");
  }

  function fetchPreviousPage() {
    fetchUserProfileAndMedia("previous");
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