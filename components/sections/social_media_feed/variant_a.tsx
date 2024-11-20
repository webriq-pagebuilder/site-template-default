import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@stackshift-ui/button";
import { DefaultSocialMediaIcons } from "helper";

function VariantA({ username, media, platform, hashtags, numberOfPosts, fetchNextPage, nextCursor }) {
  const defaultPosts = 6;
  const postsToDisplay = numberOfPosts < 1 ? defaultPosts : numberOfPosts;
  const [selected, setSelected] = useState("");

  return (
    <section className="py-20">
      {media?.length !== 0 ? (
        <div className="container mx-auto lg:px-4 w-full lg:w-2/3">
          <div className="grid justify-center sm:flex sm:flex-wrap sm:justify-between mb-4">
            <div className="flex sm:my-auto">
              <DefaultSocialMediaIcons {...{ platform }} />
              <Link
                className="font-bold align-middle ml-3"
                href={`https://www.instagram.com/${username ?? "username"}`}
                target="_blank"
              >
                {`@${username ?? "username"}`}
              </Link>
            </div>
            <div className="mt-4 sm:mt-0 sm:mb-4 sm:w-1/3 ml-auto">
              <select
                aria-label="socialMediaHashtags"
                name="socialMediaHashtags"
                className="w-full rounded bg-white border border-gray-200 p-3 outline-none"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option value="">Filter by hashtag</option>
                {hashtags?.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 justify-center">
            {media
              ?.slice(0, postsToDisplay)
              ?.filter((post) => post?.caption?.includes(selected))
              ?.map((post, index) => (
                <Link href={post?.permalink} key={index} target="_blank">
                  <div className="relative overflow-hidden">
                    {post?.media_url && (
                      <Image
                        className="h-full sm:h-[350px] sm:w-full object-cover"
                        src={post?.media_url}
                        sizes="100vw"
                        height={350}
                        width={350}
                        alt={post?.id ?? `${platform} post`} // post media ID
                      />
                    )}
                    <div className="absolute inset-0 z-10 flex flex-col items-start bg-gray-900 p-6 opacity-0 duration-300 hover:opacity-75">
                      <p className="mb-auto font-bold text-white md:text-xl">
                        {post?.caption}
                      </p>
                      <span className="text-white">
                        {`${new Date(post?.timestamp).toDateString()}`}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          {media?.length > numberOfPosts && (
            <div className="mt-10 text-center">
              <Button
                className="bg-primary hover:bg-secondary text-white px-4 py-3 rounded-t-xl rounded-l-xl"
                //href={`https://www.instagram.com/${username ?? "username"}`}
                //target="_blank"
                onClick={fetchNextPage()}
                disabled={!nextCursor}
              >
                View more posts
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="container mx-auto lg:px-4 w-full lg:w-2/3">
          <h1 className="text-2xl font-bold text-center">
            No social media feed to display. Make sure the profile is added to this StackShift and set from the UI.
          </h1>
        </div>
      )}
    </section>
  );
}

export default React.memo(VariantA);
