import fs from "fs";

export default function (plop) {
  plop.setGenerator("component", {
    description: "Create a new React component",
    prompts: [
      {
        type: "list",
        name: "type",
        message: "What type of component do you want to create?",
        choices: [
          { name: "UI Component", value: "ui" },
          { name: "Section Component", value: "sections" },
          { name: "Layout Component", value: "layouts" },
        ],
      },
      {
        type: "list",
        name: "variant",
        message: "Select the variant:",
        when: (answers) => answers.type === "ui",
        choices: [
          { name: "Avatar", value: "avatar" },
          { name: "Badge", value: "badge" },
          { name: "BlockStyle", value: "blockstyle" },
          { name: "Button", value: "button" },
          { name: "Card", value: "card" },
          { name: "Checkbox", value: "checkbox" },
          { name: "Checkbox Group", value: "checkbox-group" },
          { name: "Form", value: "form" },
          { name: "Form Field", value: "form-field" },
          { name: "Heading", value: "heading" },
          { name: "Image", value: "image" },
          { name: "Input", value: "input" },
          { name: "Input File", value: "input-file" },
          { name: "Link", value: "link" },
          { name: "Radio", value: "radio" },
          { name: "Radio Group", value: "radio-group" },
          { name: "Select", value: "select" },
          { name: "Social Icons", value: "social-icons" },
          { name: "Stats Card", value: "stats-card" },
          { name: "Swiper Button", value: "swiper-button" },
          { name: "Swiper Pagination", value: "swiper-pagination" },
          { name: "Text", value: "text" },
          { name: "Textarea", value: "textarea" },
          { name: "WebriQ Form", value: "webriq-form" },
          { name: "Youtube Video", value: "youtube-video" },
        ],
      },
      {
        type: "list",
        name: "variant",
        message: "Select the section type:",
        when: (answers) => answers.type === "sections",
        choices: [
          { name: "App Promo", value: "app-promo" },
          { name: "Blog", value: "blog" },
          { name: "Call To Action", value: "call-to-action" },
          { name: "Contact", value: "contact" },
          { name: "Cookies", value: "cookies" },
          { name: "Faqs", value: "faqs" },
          { name: "Features", value: "features" },
          { name: "Footer", value: "footer" },
          { name: "Header", value: "header" },
          { name: "How It Works", value: "how-it-works" },
          { name: "Logo Cloud", value: "hero" },
          { name: "Navigation", value: "navigation" },
          { name: "Newsletter", value: "newsletter" },
          { name: "Portfolio", value: "portfolio" },
          { name: "Sign in Sign up", value: "signin-signup" },
          { name: "Statistics", value: "statistics" },
          { name: "Team", value: "team" },
          { name: "Testimonial", value: "testimonial" },
          { name: "Text Component", value: "text-component" },
        ],
      },
      {
        type: "list",
        name: "variant",
        message: "Select the layout type:",
        when: (answers) => answers.type === "layouts",
        choices: [
          { name: "Container", value: "container" },
          { name: "Flex", value: "flex" },
          { name: "Grid", value: "grid" },
          { name: "Grid Item", value: "grid-item" },
          { name: "Section", value: "section" },
        ],
      },
      {
        type: "input",
        name: "name",
        message: "Component name:",
        when: (answers) => answers.variant,
        default: (answers) => answers.variant,
        validate: (value) => {
          if (value.length === 0) {
            return "Please enter a component name.";
          }
          return true;
        },
      },
    ],
    actions: (answers) => {
      const filePath = `node_modules/@stackshift-ui/${answers.variant}/src/${answers.variant}.tsx`;

      let templateContent = fs.readFileSync(filePath, "utf8");

      // Replace import { lazy } from 'react' to import dynamic from 'next/dynamic'
      templateContent = templateContent.replace(
        /import\s+{\s*lazy\s*}\s+from\s+['"]react['"];/g,
        'import dynamic from "next/dynamic";'
      );

      // Replace import from './types' to '../../../types'
      templateContent = templateContent.replace(
        /from\s+['"]\.\/types['"];/g,
        'from "../../../types";'
      );

      const toPascalCase = (str) =>
        str
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("");

      if (answers.type === "sections") {
        const importName = `${toPascalCase(answers.variant)}`;
        const importStatement = `import * as ${importName}Variants from "@stackshift-ui/${answers.variant}";`;

        if (!templateContent.includes(importStatement)) {
          templateContent = templateContent.replace(
            /(import.*;)/,
            `$&\n${importStatement}`
          );
        }

        templateContent = templateContent.replace(
          /const Variants = {\s*([\s\S]*?)\s*};/,
          (match, content) => {
            const variantKeys = [...content.matchAll(/(variant_[a-z]+)/g)].map(
              (m) => m[1]
            );

            const formattedKeys = variantKeys.map((key) => {
              const suffix = key.split("_")[1];
              return `  ${key}: ${importName}Variants.${importName}_${suffix.toUpperCase()}`;
            });

            return `const Variants = {\n${formattedKeys.join(",\n")}\n};`;
          }
        );
      }

      return [
        {
          type: "add",
          path: "components/{{type}}/{{kebabCase name}}/index.tsx",
          template: templateContent,
        },
      ];
    },
  });
}
