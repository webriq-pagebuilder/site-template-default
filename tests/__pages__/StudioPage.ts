exports.StudioPage = class StudioPage {
  page;

  constructor(page) {
    this.page = page;
  }

  autologin_studio({ token, projectId }) {
    window.localStorage.setItem(
      `__studio_auth_token_${projectId}`,
      JSON.stringify({
        token,
        time: "2024-03-11T07:00:27.633Z",
      })
    );
  }
};
