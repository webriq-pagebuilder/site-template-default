import { loadEnvConfig } from "@next/env";
import { createClient } from "next-sanity";

loadEnvConfig(process.cwd());

export function createBackfillClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const token = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;

  if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");

  return createClient({
    projectId,
    dataset,
    apiVersion: "2022-03-13",
    useCdn: false,
    token,
  });
}
