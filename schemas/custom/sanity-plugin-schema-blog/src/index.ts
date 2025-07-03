import { default as author } from "./schemas/author";
import { default as blogBlockContent } from "./schemas/blogBlockContent";
import { default as category } from "./schemas/category";
import { default as post } from "./schemas/post";

const blogSchema = {
  author,
  blogBlockContent,
  category,
  post,
};

export default blogSchema;
