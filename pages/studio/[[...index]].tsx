/**
 * This route is responsible for the built-in authoring environment using Sanity Studio v3.
 * All routes under /studio will be handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { NEXT_PUBLIC_APP_URL } from "@/studio/config";
import AutologinPrepage from "@/studio/components/AutologinPrepage";

// Simple dynamic import of the Studio component - avoids SSR completely
const SanityStudio = dynamic(() => import("@/components/Studio"), {
	ssr: false,
	loading: () => (
		<div
			style={{
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>
			Loading Studio...
		</div>
	),
});

function apiFetch<T = unknown>(
	input: RequestInfo | URL,
	init?: RequestInit
): Promise {
	return new Promise(async (resolve, reject) => {
		const response = await fetch(input, init);
		const data = await response.json();

		if (response.ok) {
			resolve(data);
		}

		reject({
			message: data?.message || response?.statusText || "Something went wrong.",
		});
	});
}

function parseJson(val: string) {
	try {
		return JSON.parse(val);
	} catch {
		return {};
	}
}

function cleanUp() {
	const localStorageItems = { ...window.localStorage };
	Object.entries(localStorageItems).forEach((item) => {
		const [key] = item;
		if (key.startsWith("__studio_auth_token")) {
			window.localStorage.removeItem(key);
		}
	});
}

function validateToken({
	projectKey,
	token,
}: {
	projectKey: string | undefined;
	token: string;
}): Promise {
	return new Promise(async (resolve) => {
		try {
			const response = await Promise.all([
				apiFetch(
					`https://${projectKey}.api.sanity.io/v2021-06-07/users/me?tag=sanity.studio.users.get-current`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				),
				apiFetch<{ length?: number }>(
					`https://${projectKey}.api.sanity.io/v2021-06-07/projects/${projectKey}/datasets/production/acl?tag=sanity.studio.acl.get`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				),
			]);

			const [currentUser, acl] = response as [
				{ id?: string },
				{ length?: number },
			];

			if (currentUser?.id && acl?.length) {
				resolve({ success: true });
			} else {
				resolve({ success: false });
			}
		} catch {
			resolve({ success: false });
		}
	});
}

export default function StudioPage() {
	const maxRetries = 10;
	const router = useRouter();

	const [isReady, setIsReady] = useState(false);
	const [retryAutologinCount, setRetryAutologinCount] = useState(0);

	useEffect(() => {
		if (router.isReady) {
			if (router.query?.token) {
				function fetchAutologinToken() {
					try {
						console.log("Start setting up login to studio...");

						const urlParams = router?.asPath?.split("?")?.[1];
						fetch(`${NEXT_PUBLIC_APP_URL}/api/studio?${urlParams}`)
							.then((res) => {
								if (!res.ok) {
									cleanUp();
									console.log("[INFO] Unable to fetch autologin token! ");
									setRetryAutologinCount((prev) => prev + 1);
								}
								return res.json();
							})
							.then((result) => {
								if (result?.token?.key) {
									window.localStorage.setItem(
										result.token.key,
										result.token.value
									);
									const { token: newToken } = parseJson(result.token.value);
									validateToken({
										projectKey,
										token: newToken,
									}).then((response) => {
										if (response?.success) {
											setIsReady(true);
										} else {
											window.location.href = "/studio";
										}
									});
								}
							});
					} catch (error) {
						console.log(
							"[ERROR] Something went wrong. Failed to process autologin request. ",
							error
						);
					}
				}

				const projectKey = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
				const localStorageTokenKey = `__studio_auth_token_${projectKey}`;
				const { token: existingToken } = parseJson(
					window.localStorage.getItem(localStorageTokenKey) || ""
				);

				if (existingToken) {
					validateToken({ projectKey, token: existingToken }).then(
						(response) => {
							if (response?.success) {
								setIsReady(true);
							} else {
								// if not success, set token
								if (retryAutologinCount < maxRetries) {
									fetchAutologinToken();
								}
							}
						}
					);
				} else {
					// if no existingToken, set token
					if (retryAutologinCount < maxRetries) {
						fetchAutologinToken();
					}
				}
			} else {
				setIsReady(true);
			}
		}
	}, [router, retryAutologinCount]);

	if (isReady) {
		return (
			<>
				<Head>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<SanityStudio />
			</>
		);
	}

	return (
		<AutologinPrepage
			status={retryAutologinCount < maxRetries ? "retry" : "failed"}
		/>
	);
}
