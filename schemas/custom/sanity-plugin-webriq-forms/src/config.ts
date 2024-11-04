export const namespace = "webriq-forms";
export const apiBaseURL =
  process.env.apiBaseURL ||
  "https://pagebuilderforms.webriq.com" ||
  "https://ndzsixva5l.execute-api.us-west-2.amazonaws.com/pagebuilder";

export const pluginConfigKeys = [
  {
    key: "apiEmail",
    title: "API Email",
  },
  {
    key: "apiKey",
    title: "API Key",
  },
  {
    key: "primaryDomain",
    title:
      "Primary Domain (your landing page's domain. example: https://webriq-atis.webriq.me)",
    description:
      "Domain(s) where your WebriQ Form can be used to send form submission!",
  },
];

export const getAuthHeaders = (credentials: { apiEmail: string, apiKey: string }) => {
  const { apiEmail, apiKey } = credentials;

  return {
    "x-api-email": apiEmail,
    "x-api-key": apiKey,
  };
};

export const studioBaseUrl = process.env.SANITY_STUDIO_URL || process.env.NEXT_PUBLIC_SANITY_STUDIO_URL