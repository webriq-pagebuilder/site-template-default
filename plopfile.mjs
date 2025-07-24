import fs from "fs";
import path from "path";

export default function (plop) {
  function getComponentVariants(componentName) {
    // First try to look in the dist directory for .js files
    const distPath = path.resolve(
      process.cwd(),
      "node_modules",
      `@stackshift-ui/${componentName}`,
      "dist"
    );

    // Also check in the src directory for .tsx files
    const srcPath = path.resolve(
      process.cwd(),
      "node_modules",
      `@stackshift-ui/${componentName}`,
      "src"
    );

    let variants = [{ name: "Index", value: "index" }]; // Always include Index option
    let foundVariants = false;

    try {
      // First check the dist directory
      if (fs.existsSync(distPath)) {
        const distFiles = fs.readdirSync(distPath);
        const distVariants = distFiles
          .filter(
            (file) =>
              file.startsWith(`${componentName}_`) && file.endsWith(".js")
          )
          .map((file) => {
            const variantName = file.replace(".js", "").split("_")[1];
            return {
              name: `Variant ${variantName.toUpperCase()}`,
              value: variantName,
            };
          });

        if (distVariants.length > 0) {
          variants = variants.concat(distVariants);
          foundVariants = true;
        }
      }

      // If no variants found in dist, check the src directory
      if (!foundVariants && fs.existsSync(srcPath)) {
        const srcFiles = fs.readdirSync(srcPath);
        const srcVariants = srcFiles
          .filter(
            (file) =>
              (file.startsWith(`${componentName}_`) ||
                file.startsWith(`text_`) || // Special case for text-component
                file.startsWith(`how_it_works_`) || // Special case for how-it-works
                file.startsWith(`signin_signup_`)) && // Special case for signin-signup
              file.endsWith(".tsx")
          )
          .map((file) => {
            // Extract the variant name (the part after the last underscore)
            let variantName;
            if (
              file.startsWith("how_it_works_") ||
              file.startsWith("signin_signup_")
            ) {
              variantName = file.replace(".tsx", "").split("_").pop();
            } else {
              variantName = file.replace(".tsx", "").split("_")[1];
            }
            return {
              name: `Variant ${variantName.toUpperCase()}`,
              value: variantName,
            };
          });

        if (srcVariants.length > 0) {
          variants = variants.concat(srcVariants);
        }
      }
    } catch (error) {
      console.error(`Error reading variants for ${componentName}:`, error);
    }

    return variants;
  }

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
          { name: "Logo Cloud", value: "logo-cloud" },
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
      {
        type: "list",
        name: "variantStyle",
        message: "Select the variant style:",
        when: (answers) => answers.type === "sections" && answers.variant,
        choices: (answers) => getComponentVariants(answers.variant),
      },
    ],
    actions: (answers) => {
      // Get the basic component file
      const componentName = answers.variant;
      let filePath = `node_modules/@stackshift-ui/${componentName}/src/${componentName}.tsx`;

      // Special case for text-component which might have files named differently
      if (componentName === "text-component") {
        // Check if the main file exists
        if (!fs.existsSync(filePath)) {
          // Try the alternative name pattern
          const altFilePath = `node_modules/@stackshift-ui/${componentName}/src/text.tsx`;
          if (fs.existsSync(altFilePath)) {
            filePath = altFilePath;
          }
        }
      }

      // For sections with variants, try to get the variant-specific file
      if (answers.type === "sections" && answers.variantStyle !== "index") {
        // Try regular naming pattern
        let variantPath = `node_modules/@stackshift-ui/${componentName}/src/${componentName}_${answers.variantStyle}.tsx`;

        // Special case for text-component which might have files named "text_a.tsx" instead of "text-component_a.tsx"
        if (componentName === "text-component" && !fs.existsSync(variantPath)) {
          variantPath = `node_modules/@stackshift-ui/${componentName}/src/text_${answers.variantStyle}.tsx`;
        }

        // Special case for how-it-works component
        if (componentName === "how-it-works" && !fs.existsSync(variantPath)) {
          variantPath = `node_modules/@stackshift-ui/${componentName}/src/how_it_works_${answers.variantStyle}.tsx`;
        }

        // Special case for signin-signup component
        if (componentName === "signin-signup" && !fs.existsSync(variantPath)) {
          variantPath = `node_modules/@stackshift-ui/${componentName}/src/signin_signup_${answers.variantStyle}.tsx`;
        }

        if (fs.existsSync(variantPath)) {
          filePath = variantPath;
        }
      }

      let templateContent = "";
      try {
        templateContent = fs.readFileSync(filePath, "utf8");

        // Add proper formatting to ensure newlines
        // Replace semicolons with semicolons + newline to separate imports
        templateContent = templateContent.replace(/;(?!\n)/g, ";\n");

        // Fix braces and other formatting
        templateContent = templateContent.replace(/\{(?!\n)/g, "{\n");
        templateContent = templateContent.replace(/(?<!\n)\}/g, "\n}");

        const hasReactLazyWithReact =
          /import\s+React,\s*\{\s*lazy\s*\}\s*from\s+['"]react['"];/gs;
        const hasLazyOnly = /import\s*\{\s*lazy\s*\}\s*from\s+['"]react['"];/gs;

        if (hasReactLazyWithReact.test(templateContent)) {
          templateContent = templateContent.replace(
            hasReactLazyWithReact,
            `import React from 'react';\nimport dynamic from 'next/dynamic';`
          );
        } else if (hasLazyOnly.test(templateContent)) {
          templateContent = templateContent.replace(
            hasLazyOnly,
            `import dynamic from 'next/dynamic';`
          );
        }

        templateContent = templateContent.replace(/\r\n/g, "\n");
        // Replace import from './types' to '../../../types'
        templateContent = templateContent.replace(
          /from\s+['"]\.\/types['"];/g,
          'from "../../../types";'
        );

        // Make sure the content ends with a newline
        if (!templateContent.endsWith("\n")) {
          templateContent += "\n";
        }
      } catch (error) {
        console.error(`Error reading template file: ${filePath}`, error);
        return [];
      }

      const toPascalCase = (str) =>
        str
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("");

      if (answers.type === "sections") {
        const importName = `${toPascalCase(answers.variant)}`;
        console.log("importName", importName);

        let importStatement = `import * as ${importName}Variants from "@stackshift-ui/${answers.variant}";`;

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

      // Determine file path and name based on variant style
      let fileName = "index.tsx";

      if (answers.variantStyle && answers.variantStyle !== "index") {
        fileName = `variant_${answers.variantStyle}.tsx`;
      }

      return [
        {
          type: "add",
          path: `./components/{{type}}/{{kebabCase name}}/${fileName}`,
          template: templateContent,
          skipIfExists: true,
        },
      ];
    },
  });
}
