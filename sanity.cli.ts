import { SANITY_PROJECT_ID, SANITY_PROJECT_DATASET } from "@/studio/config";

import { defineCliConfig } from "sanity/cli";

const projectId = SANITY_PROJECT_ID;
const dataset = SANITY_PROJECT_DATASET;

export default defineCliConfig({ api: { projectId, dataset } });
