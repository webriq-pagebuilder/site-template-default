import { createContext, useContext, useEffect, useState } from "react";
import { NEXT_PUBLIC_APP_URL, NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN } from "studio/config";

const SocialMediaContext = createContext(null); // pass default value

interface SocialMediaContextProps {
  children: React.ReactNode;
}

export function SocialMediaContextProvider({ children }: SocialMediaContextProps) {
  const [profileData, setProfileData] = useState(null);

  // TODO: UPDATE THE USEFFECT WITH THE API ENDPOINT AND PARAMS FROM THE STACKSHIFT APP
  useEffect(() => {
    async function fetchProfile() {
      fetch(`${NEXT_PUBLIC_APP_URL}/api/app/social-media/instagram`, {
        method: "GET",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ accessToken: NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN })
      })
        .then((response) => response.json())
        .then((response) => {
          const user = response?.data;

          user && setProfileData(user);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    fetchProfile();
  }, []);

  return (
    <SocialMediaContext.Provider value={profileData}>
      {children}
    </SocialMediaContext.Provider>
  );
}

export function useSocialMedia() {
  return useContext(SocialMediaContext);
}
