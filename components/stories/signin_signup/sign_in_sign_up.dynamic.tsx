import { dynamicStoryData } from "components/common";
import { defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

// NOTE: If this component has a custom component, comment out this line and import that instead
// Example: import { signInSignUpSchema } from "schemas/custom/sanity-plugin-schema-default/src/schemas/sections/sign_in_sign_up/schema";
import { signInSignUpSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import { Components } from "components/list";

    const SignInSignUpComponent = Components.signInSignUp;

    export default {
      title: "Components/Sign in",
      component: SignInSignUpComponent,
      tags: ["autodocs"],
      render: ({ variant, label, ...args }) => {
        const data = {
          label: label,
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(SignInSignUpComponent, { data: data });
      }
    };
  `,
  stories: async () => {
    const signInSignUpData =
      (await sanityClient.fetch(componentsQuery, {
        schema: "signInSignUp",
      })) || []; // Provide a default empty array

    return dynamicStoryData({
      data: signInSignUpData,
      schemaFields: signInSignUpSchema,
    });
  },
});
