import { createContext, useContext, useEffect, useState } from "react";
import { SOCIAL_ACCOUNTS_API_URL, SANITY_PROJECT_ID } from "studio/config";

interface SocialMediaFeedContextProps {
  children: React.ReactNode;
}

const SocialMediaFeedContext = createContext(null); // pass default value

export function useSocialMediaFeed() {
  return useContext(SocialMediaFeedContext);
}

export function SocialMediaFeedContextProvider({
  children,
}: SocialMediaFeedContextProps) {
  const initialState = {
    itemId: "",
    platform: "",
    userName: "",
    status: "loading",
    media: [],
    after: null,
    before: null,
  };

  const [profileFeed, setProfileFeed] = useState(initialState);
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);

  async function fetchUserMedia(cursor: "next" | "previous" | null = null) {
    try {
      const response = await fetch(`${SOCIAL_ACCOUNTS_API_URL}/media`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform: profileFeed?.platform,
          studioId: SANITY_PROJECT_ID,
          itemId: profileFeed?.itemId,
          after: cursor === "next" ? nextCursor : null,
          before: cursor === "previous" ? prevCursor : null,
        }),
      })
        
      const data = await response.json();
      const userMedia = data?.media;

      if (userMedia) { 
        setProfileFeed({
          ...profileFeed,
          status: "success",
          media: userMedia,
        });

        setNextCursor(data?.nextCursor);
        setPrevCursor(data?.previousCursor);
      }
        
    } catch (error) {
      console.error("[ERROR] Something went wrong when fetching profile media. ", error);

      setProfileFeed((prevState) => ({
        ...prevState,
        status: "error",
        media: []
      }));
    };
  }


  useEffect(() => {
    fetchUserMedia();
  }, [profileFeed?.itemId, profileFeed?.platform, profileFeed?.userName]);

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
