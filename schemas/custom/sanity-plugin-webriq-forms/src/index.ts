import { definePlugin, Tool as SanityTool } from "sanity";
import { route } from "sanity/router";
import { CheckmarkIcon as Icon } from "@sanity/icons";
import Index from "./views/Index";
import { namespace } from "./config";

// schemas
import { default as webriqForm } from "./schema";
import { default as webriqFormField } from "./schema/field";

const tool = {
  title: "Forms",
  name: namespace,
  router: route.create("/", [
    route.create(`/:formId/submissions`),
    route.create(`/:formId`),
  ]),
  icon: Icon,
  component: Index,
} as SanityTool;

export const webriqForms = definePlugin({
  name: "sanity-plugin-webriq-forms",
  tools: (prev) => {
    return [...prev, tool];
  },
  schema: {
    types: [webriqForm, webriqFormField],
  },
});
