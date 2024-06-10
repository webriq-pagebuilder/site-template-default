import {
  SANITY_PROJECT_ID,
  SANITY_PROJECT_DATASET,
  SANITY_API_READ_TOKEN,
} from "studio/config";

interface Config {
  dataset: string;
  projectId: string;
  useCdn: boolean;
  apiVersion: string;
  token?: string;
}

let config: Config = {
  // Find your project ID and dataset in `sanity.json` in your studio project
  dataset: SANITY_PROJECT_DATASET,
  projectId: SANITY_PROJECT_ID,
  useCdn:
    typeof document !== "undefined" && process.env.NODE_ENV === "production",
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // When in production the Sanity API is only queried on build-time, and on-demand when responding to webhooks.
  // Thus the data need to be fresh and API response time is less important.
  // When in development/working locally, it's more important to keep costs down as hot reloading can incurr a lot of API calls
  // And every page load calls getStaticProps.
  // To get the lowest latency, lowest cost, and latest data, use the Instant Preview mode
  apiVersion: "2022-03-13",
  token: SANITY_API_READ_TOKEN,
};

export { config };
