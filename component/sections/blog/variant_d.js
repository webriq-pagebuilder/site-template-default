import { urlFor } from "lib/sanity";
import React from "react";

function VariantD({ caption, title, posts, buttonLabel }) {
  const [activeTab, setActiveTab] = React.useState(posts?.[0]?.topics); //set the first index category as initial value

  const filteredPosts = posts?.reduce((newArr, post) => {
    if (post.topics === activeTab) {
      newArr.push(post.blogPosts);
    }
    return newArr;
  }, []);

  console.log(filteredPosts);

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <span className="text-webriq-darkblue font-bold">{caption}</span>
              <h2 className="text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h2>
            </div>
            <div className="hidden lg:block text-right w-1/2">
              {buttonLabel && (
                <button className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose transition duration-200">
                  {buttonLabel}
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            {posts?.length !== 0 && (
              <div className="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                <div className="py-4 px-6 bg-white shadow rounded">
                  <h4 className="mb-4 text-gray-500 font-bold uppercase">
                    Topics
                  </h4>
                  {posts && (
                    <ul>
                      {posts?.map((post) => (
                        <li key={post?._key}>
                          <button
                            className={`block py-2 px-3 mb-4 rounded hover:text-webriq-darkblue hover:bg-webriq-lightblue ${
                              activeTab === post?.topics && "font-bold"
                            }`}
                            onClick={() => setActiveTab(post?.topics)}
                          >
                            {post?.topics}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
            <div className="w-full lg:w-3/4 px-3">
              {filteredPosts &&
                filteredPosts?.[0]?.map((post) => (
                  <div
                    className="flex flex-wrap -mx-3 mb-8 lg:mb-6"
                    key={post?._key}
                  >
                    <div className="mb-4 lg:mb-0 w-full lg:w-1/4 px-3">
                      <img
                        className="w-full h-full object-cover rounded"
                        src={urlFor(post?.mainImage)}
                        alt=""
                      />
                    </div>
                    <div className="w-full lg:w-3/4 px-3">
                      <a
                        className="hover:underline hover:text-webriq-darkblue hover:bg-webriq-lightblue"
                        href={
                          post?.primaryButton?.type === "linkExternal"
                            ? post?.primaryButton?.externalLink
                            : post?.primaryButton?.type === "linkInternal"
                            ? post?.primaryButton?.internalLink === "Home" ||
                              post?.primaryButton?.internalLink === "home"
                              ? "/"
                              : post?.primaryButton?.internalLink
                            : "page-not-found"
                        }
                      >
                        <h3 className="mb-1 text-2xl font-bold font-heading">
                          {post?.heading}
                        </h3>
                      </a>
                      <div className="mb-2 flex items-center text-sm">
                        <span className="text-webriq-darkblue">
                          {post?.postedBy}
                        </span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-gray-400">{post?.dateAdded}</span>
                      </div>
                      <p className="text-gray-500">{post?.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantD);
