import { Card } from "components/ui/Card";
import { Text } from "components/ui/Text";
import { BlogPost } from "types";

interface CategoriesListProps {
  categories: string[];
  activeTab: string;
  setActiveTab: React.Dispatch<string>;
}

export function CategoriesList({
  categories,
  activeTab,
  setActiveTab,
}: CategoriesListProps) {
  return (
    <Card>
      <h1 className="mb-4 font-bold text-gray-500 uppercase">Topics</h1>
      <ul>
        {categories?.length > 1 && (
          <li
            className={`rounded hover:bg-webriq-lightblue hover:text-webriq-darkblue ${
              activeTab === "All" ? "bg-webriq-lightblue" : null
            }`}
          >
            <button
              aria-label="Show all blog posts"
              className={`mb-4 block px-3 py-2 focus:outline-none ${
                activeTab === "All"
                  ? "font-bold text-webriq-darkblue focus:outline-none"
                  : null
              }`}
              onClick={() => setActiveTab("All")}
            >
              All
            </button>
          </li>
        )}
        {categories?.map((category, index) => (
          <li
            className={`rounded hover:bg-webriq-lightblue hover:text-webriq-darkblue ${
              activeTab === category ? "bg-webriq-lightblue" : null
            }`}
            key={index}
          >
            <button
              aria-label={category}
              className={`mb-4 block px-3 py-2 focus:outline-none ${
                activeTab === category
                  ? "font-bold text-webriq-darkblue focus:outline-none"
                  : null
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
