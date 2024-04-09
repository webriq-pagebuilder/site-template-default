export function autologin_studio({ token, projectId }) {
  console.log("🚀 ~ autologin_studio ~ { token, projectId }:", {
    token,
    projectId,
  });

  window.localStorage.setItem(
    `__studio_auth_token_${projectId}`,
    JSON.stringify({
      token,
      time: "2024-03-11T07:00:27.633Z",
    })
  );
}
