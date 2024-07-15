import { useEffect, useState } from "react";
import Head from "next/head";
import { NextStudio } from "next-sanity/studio";
import { useRouter } from "next/router";
import { StudioLayout, StudioProvider } from "sanity";
import config from "sanity.config";
import { NEXT_PUBLIC_APP_URL } from "studio/config";
import AutologinPrepage from "studio/components/AutologinPrepage";

function apiFetch<T = any>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  return new Promise(async(resolve, reject) => {
    const response = await fetch(input, init)
    const data = await response.json()

    if(response.ok) {
        resolve(data)
    }
    
    reject({
        message: data?.message || response?.statusText || "Something went wrong."
    })
  })
}

function parseJson(val: string) {
  try {
    return JSON.parse(val)
  } catch (error) {
    return {}
  }
}

function cleanUp(window) {
  const localStorageItems = { ...window.localStorage };
  Object.entries(localStorageItems).every((item) => {
    var [key, value] = item;
    if (key.startsWith("__studio_auth_token")) {
      window.localStorage.removeItem(key);
    }
  });
}

function validateToken({projectKey, token}): Promise<{success?: boolean}> {
  return new Promise(async(resolve) => {
    try {
      const response = await Promise.all([
        apiFetch(
          `https://${projectKey}.api.sanity.io/v2021-06-07/users/me?tag=sanity.studio.users.get-current`,
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        ),
        apiFetch(
          `https://${projectKey}.api.sanity.io/v2021-06-07/projects/${projectKey}/datasets/production/acl?tag=sanity.studio.acl.get`,
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        )
      ])

      const [currentUser, acl] = response
            
      if(currentUser?.id && acl?.length) {
        resolve({success: true})
      } else {
        resolve({success: false})
      }
    } catch (error) {
      resolve({success: false})
    }
  })
}

export default function StudioPage() {
  const maxRetries = 10;
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);
  const [retryAutologin, setRetryAutologin] = useState(0);

  useEffect(() => {
    if(router.isReady) {
      if(router.query?.token) {

        function fetchAutologinToken() {
          try {
            console.log("Start setting up login to studio...");

            const urlParams = router?.asPath?.split("?")?.[1];
            fetch(`${NEXT_PUBLIC_APP_URL}/api/studio?${urlParams}`)
              .then((res) => {
                if (!res.ok) {
                  cleanUp(window);
                  console.log("[INFO] Unable to fetch autologin token! ");
                  setRetryAutologin(retryAutologin + 1);
                }
                return res.json();
              })
              .then((result) => {
                if(result?.token?.key) {
                  window.localStorage.setItem(result.token.key, result.token.value);
                  const { token: newToken } = parseJson(result.token.value)
                  validateToken({
                    projectKey,
                    token: newToken
                  }).then(response => {
                    if(response?.success) {
                      setIsReady(true);
                    } else {
                      window.location.href = "/studio"
                    }
                  })
                }
              });
          } catch (error) {
            console.log(
              "[ERROR] Something went wrong. Failed to process autologin request. ",
              error
            );
          }
        }

        const projectKey = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
        const localStorageTokenKey = `__studio_auth_token_${projectKey}`
        const { token: existingToken} = parseJson(window.localStorage.getItem(localStorageTokenKey) || "")

        if(existingToken) {
          validateToken({projectKey, token: existingToken}).then(response => {
            if(response?.success) {
              setIsReady(true)
            } else {
              // if not success
              // set token
              if (retryAutologin < maxRetries) {
                fetchAutologinToken();
              }
            }
          })
        } else {
          // if no existingToken
          // set token
          if (retryAutologin < maxRetries) {
            fetchAutologinToken();
          }
        }
      } else {
        setIsReady(true)
      }
    }
  }, [router, retryAutologin]);

  if(isReady) {
    return (
      <>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <NextStudio config={config}>
          <StudioProvider config={config}>
            <StudioLayout />
          </StudioProvider>
        </NextStudio>
      </>
    );
  }

  return (
    <AutologinPrepage
      status={retryAutologin < maxRetries ? "retry" : "failed"}
    />
  );

}
