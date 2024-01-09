import { createContext, useContext, useEffect, useState } from "react";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";

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
    platform: "",
    status: "loading",
    media: [],
  };

  const [profileFeed, setProfileFeed] = useState(initialState);

  useEffect(() => {
    setProfileFeed((prevState) => ({
      ...prevState,
      platform: profileFeed?.platform,
    }));

    if (profileFeed?.platform === "instagram") {
      fetchInstagramMedia();
    }
  }, [profileFeed?.platform]);

  async function fetchInstagramMedia() {
    fetch(`${NEXT_PUBLIC_SITE_URL}/api/social-accounts/instagram`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const userMedia = response?.data;

        userMedia &&
          setProfileFeed({
            platform: "instagram",
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

  return (
    <SocialMediaFeedContext.Provider value={{ profileFeed, setProfileFeed }}>
      {children}
    </SocialMediaFeedContext.Provider>
  );
}
