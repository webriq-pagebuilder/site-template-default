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
          { name: "Section Component", value: "section" },
          { name: "Layout Component", value: "layout" },
        ],
      },
      {
        type: "input",
        name: "name",
        message: "Component name:",
        validate: (value) => {
          if (value.length === 0) {
            return "Please enter a component name.";
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "components/sections/{{kebabCase name}}/index.tsx",
        templateFile: "scripts/templates/component.tsx.hbs",
      },
    ],
  });
}
