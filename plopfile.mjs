import fs from "fs";
import path from "path";

const COMPONENT_TYPES = {
  UI: "ui",
  SECTIONS: "sections",
  LAYOUTS: "layouts",
};

const UI_COMPONENTS = [
  { name: "Accordion", value: "accordion" },
  { name: "Avatar", value: "avatar" },
  { name: "Badge", value: "badge" },
  { name: "BlockStyle", value: "blockstyle" },
  { name: "Button", value: "button" },
  { name: "Calendar", value: "calendar" },
  { name: "Card", value: "card" },
  { name: "Checkbox", value: "checkbox" },
  { name: "Checkbox Group", value: "checkbox-group" },
  { name: "Data Table", value: "data-table" },
  { name: "Date Picker", value: "date-picker" },
  { name: "Dialog", value: "dialog" },
  { name: "Dropdown Menu", value: "dropdown-menu" },
  { name: "Form", value: "form" },
  { name: "Form Field", value: "form-field" },
  { name: "Heading", value: "heading" },
  { name: "Image", value: "image" },
  { name: "Input", value: "input" },
  { name: "Input File", value: "input-file" },
  { name: "Link", value: "link" },
  { name: "Menu", value: "menu" },
  { name: "Pagination", value: "pagination" },
  { name: "Popover", value: "popover" },
  { name: "Radio", value: "radio" },
  { name: "Radio Group", value: "radio-group" },
  { name: "Scroll Area", value: "scroll-area" },
  { name: "Select", value: "select" },
  { name: "Sheet", value: "sheet" },
  { name: "Skeleton", value: "skeleton" },
  { name: "Social Icons", value: "social-icons" },
  { name: "Stats Card", value: "stats-card" },
  { name: "Swiper Button", value: "swiper-button" },
  { name: "Swiper Pagination", value: "swiper-pagination" },
  { name: "Switch", value: "switch" },
  { name: "Table", value: "table" },
  { name: "Text", value: "text" },
  { name: "Textarea", value: "textarea" },
  { name: "Toast", value: "toast" },
  { name: "Toggle Group", value: "toggle-group" },
  { name: "Toggle", value: "toggle" },
  { name: "Tooltip", value: "tooltip" },
  { name: "WebriQ Form", value: "webriq-form" },
  { name: "Youtube Video", value: "youtube-video" },
];

const SECTION_COMPONENTS = [
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
];

const LAYOUT_COMPONENTS = [
  { name: "Container", value: "container" },
  { name: "Flex", value: "flex" },
  { name: "Grid", value: "grid" },
  { name: "Grid Item", value: "grid-item" },
  { name: "Section", value: "section" },
];

const SPECIAL_CASES = {
  "text-component": "text",
  "how-it-works": "how_it_works",
  "signin-signup": "signin_signup",
};

// Utility functions
const toPascalCase = (str) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

const getPackagePath = (componentName, subPath = "") =>
  path.resolve(
    process.cwd(),
    "node_modules",
    `@stackshift-ui/${componentName}`,
    subPath
  );

const fileExists = (filePath) => fs.existsSync(filePath);

// Component variant discovery
function getComponentVariants(componentName) {
  const distPath = getPackagePath(componentName, "dist");
  const srcPath = getPackagePath(componentName, "src");

  let variants = [{ name: "Index", value: "index" }];

  try {
    // Check dist directory first
    const distVariants = getVariantsFromDirectory(
      distPath,
      componentName,
      ".js"
    );
    if (distVariants.length > 0) {
      return variants.concat(distVariants);
    }

    // Fallback to src directory
    const srcVariants = getVariantsFromDirectory(
      srcPath,
      componentName,
      ".tsx"
    );
    return variants.concat(srcVariants);
  } catch (error) {
    console.error(`Error reading variants for ${componentName}:`, error);
    return variants;
  }
}

function getVariantsFromDirectory(dirPath, componentName, extension) {
  if (!fileExists(dirPath)) return [];

  const files = fs.readdirSync(dirPath);
  const patterns = getFilePatterns(componentName);

  return files
    .filter((file) => matchesPatterns(file, patterns, extension))
    .map((file) => createVariantFromFile(file, componentName))
    .filter(Boolean);
}

function getFilePatterns(componentName) {
  const patterns = [`${componentName}_`];

  // Add special case patterns
  if (componentName === "text-component") patterns.push("text_");
  if (componentName === "how-it-works") patterns.push("how_it_works_");
  if (componentName === "signin-signup") patterns.push("signin_signup_");

  return patterns;
}

function matchesPatterns(file, patterns, extension) {
  return (
    patterns.some((pattern) => file.startsWith(pattern)) &&
    file.endsWith(extension)
  );
}

function createVariantFromFile(file, componentName) {
  const baseName = file.replace(/\.(js|tsx)$/, "");
  let variantName;

  if (componentName === "how-it-works" || componentName === "signin-signup") {
    variantName = baseName.split("_").pop();
  } else {
    variantName = baseName.split("_")[1];
  }

  if (!variantName) return null;

  return {
    name: `Variant ${variantName.toUpperCase()}`,
    value: variantName,
  };
}

// Template processing
function getTemplatePath(componentName, variantStyle) {
  let filePath = getPackagePath(componentName, `src/${componentName}.tsx`);

  // Handle special cases for main files
  if (componentName === "text-component" && !fileExists(filePath)) {
    const altPath = getPackagePath(componentName, "src/text.tsx");
    if (fileExists(altPath)) filePath = altPath;
  }

  // Handle variant-specific files
  if (variantStyle && variantStyle !== "index") {
    const variantPath = getVariantPath(componentName, variantStyle);
    if (fileExists(variantPath)) filePath = variantPath;
  }

  return filePath;
}

function getVariantPath(componentName, variantStyle) {
  const basePath = getPackagePath(componentName, "src");

  // Try standard pattern first
  let variantPath = path.join(basePath, `${componentName}_${variantStyle}.tsx`);
  if (fileExists(variantPath)) return variantPath;

  // Try special case patterns
  const specialCase = SPECIAL_CASES[componentName];
  if (specialCase) {
    variantPath = path.join(basePath, `${specialCase}_${variantStyle}.tsx`);
  }

  return variantPath;
}

function processTemplate(templateContent, answers) {
  // Basic formatting
  templateContent = formatTemplate(templateContent);

  // Replace lazy imports
  templateContent = replaceLazyImports(templateContent);

  // Fix import paths
  templateContent = fixImportPaths(templateContent);

  // Process sections specifically
  if (answers.type === COMPONENT_TYPES.SECTIONS) {
    templateContent = processSectionTemplate(templateContent, answers);
  }

  // Ensure final newline
  if (!templateContent.endsWith("\n")) {
    templateContent += "\n";
  }

  return templateContent;
}

function formatTemplate(content) {
  return content
    .replace(/;(?!\n)/g, ";\n")
    .replace(/\{(?!\n)/g, "{\n")
    .replace(/(?<!\n)\}/g, "\n}")
    .replace(/\r\n/g, "\n");
}

function replaceLazyImports(content) {
  const patterns = [
    {
      regex: /import\s+React,\s*\{\s*lazy\s*\}\s*from\s+['"]react['"];/gs,
      replacement: `import React from 'react';\nimport dynamic from 'next/dynamic';`,
    },
    {
      regex: /import\s*\{\s*lazy\s*\}\s*from\s+['"]react['"];/gs,
      replacement: `import dynamic from 'next/dynamic';`,
    },
  ];

  patterns.forEach(({ regex, replacement }) => {
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
    }
  });

  return content;
}

function fixImportPaths(content) {
  return content.replace(
    /from\s+['"]\.\/types['"];/g,
    'from "../../../types";'
  );
}

function processSectionTemplate(content, answers) {
  // Remove individual component imports
  content = content.replace(
    /import\s+\w+\s+from\s+['"]\.\/[^'"]+_[a-z]['"];\s*\n?/g,
    ""
  );

  // Add dynamic import if needed
  if (!content.includes('import dynamic from "next/dynamic"')) {
    content = content.replace(
      /(import React from ['"]react['"];)/,
      '$1\nimport dynamic from "next/dynamic";'
    );
  }

  // Add package import
  const importName = toPascalCase(answers.variant);
  const importStatement = `import * as ${importName}Variants from "@stackshift-ui/${answers.variant}";`;

  if (!content.includes(importStatement)) {
    content = content.replace(/(import.*;)/, `$&\n${importStatement}`);
  }

  // Update variants object
  content = updateVariantsObject(content, importName);

  return content;
}

function updateVariantsObject(content, importName) {
  return content.replace(
    /const Variants = {\s*([\s\S]*?)\s*};/,
    (match, variantContent) => {
      const variantKeys = [...variantContent.matchAll(/(variant_[a-z]+)/g)].map(
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

// Main plop configuration
export default function (plop) {
  plop.setGenerator("component", {
    description: "Create a new React component",
    prompts: [
      {
        type: "list",
        name: "type",
        message: "What type of component do you want to create?",
        choices: [
          { name: "UI Component", value: COMPONENT_TYPES.UI },
          { name: "Section Component", value: COMPONENT_TYPES.SECTIONS },
          { name: "Layout Component", value: COMPONENT_TYPES.LAYOUTS },
        ],
      },
      {
        type: "list",
        name: "variant",
        message: "Select the variant:",
        when: (answers) => answers.type === COMPONENT_TYPES.UI,
        choices: UI_COMPONENTS,
      },
      {
        type: "list",
        name: "variant",
        message: "Select the section type:",
        when: (answers) => answers.type === COMPONENT_TYPES.SECTIONS,
        choices: SECTION_COMPONENTS,
      },
      {
        type: "list",
        name: "variant",
        message: "Select the layout type:",
        when: (answers) => answers.type === COMPONENT_TYPES.LAYOUTS,
        choices: LAYOUT_COMPONENTS,
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
        when: (answers) =>
          answers.type === COMPONENT_TYPES.SECTIONS && answers.variant,
        choices: (answers) => getComponentVariants(answers.variant),
      },
    ],
    actions: (answers) => {
      try {
        const filePath = getTemplatePath(answers.variant, answers.variantStyle);
        const templateContent = fs.readFileSync(filePath, "utf8");
        const processedContent = processTemplate(templateContent, answers);

        const fileName =
          answers.variantStyle && answers.variantStyle !== "index"
            ? `variant_${answers.variantStyle}.tsx`
            : "index.tsx";

        return [
          {
            type: "add",
            path: `components/{{type}}/{{kebabCase name}}/${fileName}`,
            template: processedContent,
            skipIfExists: true,
          },
        ];
      } catch (error) {
        console.error(`Error processing template:`, error);
        return [];
      }
    },
  });
}
