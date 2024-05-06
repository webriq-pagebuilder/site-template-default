import { createClient } from "@sanity/client"

export const apiVersion = "2021-10-21";

export const client = createClient({
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "9itgab5x",
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: apiVersion,
  token: process.env.SANITY_STUDIO_API_READ_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
  useCdn: typeof document !== "undefined" && process.env.NODE_ENV === "production",
});

export const isCStudio = process.env.SANITY_STUDIO_IN_CSTUDIO || process.env.NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO
export const isGPT3Enabled = process.env.SANITY_STUDIO_GPT3_ENABLED || process.env.NEXT_PUBLIC_SANITY_GPT3_ENABLED