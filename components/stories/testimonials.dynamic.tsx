import { dynamicStoryData } from "components/common";
import { defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

// NOTE: If this component has a custom component, comment out this line and import that instead
// Example: import { testimonialSchema } from "schemas/custom/sanity-plugin-schema-default/src/schemas/sections/testimonial/schema";
import { testimonialSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import { Components } from "components/list";

    const TestimonialsComponent = Components.testimonial;

    export default {
      title: "Components/Testimonials",
      component: TestimonialsComponent,
      tags: ["autodocs"],
      render: ({ variant, label, ...args }) => {
        const data = {
          label: label,
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(TestimonialsComponent, { data: data });
      }
    };
  `,
  stories: async () => {
    const testimonialData =
      (await sanityClient.fetch(componentsQuery, {
        schema: "testimonial",
      })) || []; // Provide a default empty array

    return dynamicStoryData({
      data: testimonialData,
      schemaFields: testimonialSchema,
    });
  },
});
