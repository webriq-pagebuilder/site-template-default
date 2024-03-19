import { SANITY_PROJECT_ID, SANITY_PROJECT_DATASET } from "studio/config";

interface Config {
  dataset: string;
  projectId: string;
  useCdn: boolean;
  apiVersion: string;
}

let config: Config = {
  dataset: SANITY_PROJECT_DATASET,
  projectId: SANITY_PROJECT_ID,
  useCdn:
    typeof document !== "undefined" && process.env.NODE_ENV === "production",
  apiVersion: "2022-03-07",
};

export { config };
