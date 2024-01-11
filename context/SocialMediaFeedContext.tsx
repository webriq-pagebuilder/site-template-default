import { createContext, useContext, useEffect, useState } from "react";
import {
  NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SANITY_PROJECT_ID,
} from "studio/config";

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
  };
  const [profileFeed, setProfileFeed] = useState(initialState);

  useEffect(() => {
    async function fetchUserMedia() {
      fetch(`${NEXT_PUBLIC_APP_URL}/api/social-accounts/media`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "get_usermedia",
          platform: profileFeed?.platform,
          studioId: NEXT_PUBLIC_SANITY_PROJECT_ID,
          itemId: profileFeed?.itemId,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          const userMedia = response?.data;
          userMedia &&
            setProfileFeed({
              itemId: profileFeed?.itemId,
              platform: profileFeed?.platform,
              userName: profileFeed?.userName,
              status: "success",
              media: userMedia,
            });
        })
        .catch((error) => {
          console.error(error);
          setProfileFeed((prevState) => ({
            ...prevState,
            status: "error",
          }));
        });
    }

    fetchUserMedia();
  }, [profileFeed?.itemId, profileFeed?.platform, profileFeed?.userName]);

  return (
    <SocialMediaFeedContext.Provider value={{ profileFeed, setProfileFeed }}>
      {children}
    </SocialMediaFeedContext.Provider>
  );
}
