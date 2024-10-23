const fs = require("fs");
const path = require("path");
const { fileURLToPath } = require("url");
const deepmerge = require("deepmerge");
const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const defaultTheme = require("tailwindcss/defaultTheme");

// Get the current directory name
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Path to the Tailwind CSS configuration file
const configFilePath = path.resolve(__dirname, "../tailwind.config.ts");

// New theme configuration to merge
const newThemeConfig = {
  extend: {
    colors: {
      primary: "tomato",
      secondary: "orange",
      success: "green",
    },
    spacing: {
      tiny: "0.25rem",
      huge: "4rem",
    },
    fontFamily: {
      serif: ["Georgia", "serif"],
    },
  },
};

// Function to read, merge, and write the configuration
const mergeTailwindConfig = () => {
  try {
    // Read the existing configuration file
    const configFileContent = fs.readFileSync(configFilePath, "utf-8");
    console.log("Config file content read successfully.");

    // Parse the configuration file content
    const ast = babelParser.parse(configFileContent, {
      sourceType: "module",
      plugins: ["typescript"],
    });
    console.log("AST parsed successfully.");

    let themeNode = null;

    // Traverse the AST to find the theme object
    traverse(ast, {
      enter(path) {
        if (
          path.node.type === "ObjectProperty" &&
          path.node.key.name === "theme"
        ) {
          themeNode = path.node.value;
          path.stop();
        }
      },
    });

    if (!themeNode) {
      throw new Error("Could not find the theme object in the file");
    }
    console.log("Theme node found:", themeNode);

    // Convert the theme node to a JavaScript object
    const existingThemeConfig = eval(
      `(function(defaultTheme) { return ${configFileContent.substring(
        themeNode.start,
        themeNode.end
      )} })(defaultTheme)`
    );
    console.log("Existing theme config:", existingThemeConfig);

    // Merge the new theme configuration with the existing one
    const mergedThemeConfig = deepmerge(existingThemeConfig, newThemeConfig);
    console.log("Merged theme config:", mergedThemeConfig);

    // Convert the merged theme configuration back to a string
    const mergedThemeConfigString = JSON.stringify(mergedThemeConfig, null, 2);

    // Replace the old theme values with the merged values in the original file content
    const updatedConfigFileContent =
      configFileContent.substring(0, themeNode.start) +
      mergedThemeConfigString +
      configFileContent.substring(themeNode.end);

    // Write the updated configuration back to the file
    fs.writeFileSync(configFilePath, updatedConfigFileContent, "utf-8");

    console.log("Tailwind configuration merged successfully!");
  } catch (error) {
    console.error("Error merging Tailwind configuration:", error);
  }
};

// Execute the function
mergeTailwindConfig();
