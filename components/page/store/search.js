import { Components } from "components/list";

export function SearchPageSections({ data, preview }) {
  const { sections } = data;

  return (
    <>
      {sections &&
        sections?.map((section, index) => {
          const Component = Components[section._type];

          // skip rendering unknown components
          if (!Component) {
            return null;
          }

          return (
            <Component
              key={index}
              template={{
                bg: "gray",
                color: "webriq",
              }}
              data={section}
              preview={preview}
            />
          );
        })}
    </>
  );
}
