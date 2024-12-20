import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@stackshift-ui/button";
import { DefaultSocialMediaIcons } from "helper";

function VariantB({ username, media, platform, hashtags, numberOfPosts, fetchNextPage, nextCursor }) {
  const defaultPosts = 6;
  const postsToDisplay = numberOfPosts < 1 ? defaultPosts : numberOfPosts;
  const [selected, setSelected] = useState("");

  return (
    <section className="py-20 bg-background">
      {media?.length !== 0 ? (
        <div className="container mx-auto lg:px-4 w-full lg:w-2/3">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-center text-primary">
              {`Follow us on ${platform ?? "social media"}`}
            </h1>
          </div>
          <div className="mb-4 sm:w-1/3 sm:ml-auto">
            <select
              aria-label="socialMediaHashtags"
              name="socialMediaHashtags"
              className="w-full rounded-md bg-white border border-gray-200 p-3 outline-none"
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
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-3 justify-center">
            {media
              ?.slice(0, postsToDisplay)
              ?.filter((post) => post?.caption?.includes(selected))
              ?.map((post, index) => (
                <Link href={post?.permalink} key={index} target="_blank">
                  {post?.media_url && (
                    <div className="h-full overflow-hidden bg-white border border-gray-200 rounded-md">
                      <div className="p-4">
                        <div className="flex">
                          <div className="my-auto">
                            <DefaultSocialMediaIcons {...{ platform }} />
                          </div>
                          <div className="align-middle ml-3">
                            <p className="font-bold">
                              {username ?? "username"}
                            </p>
                            <span className="text-gray-500 text-sm">
                              {`${new Date(post?.timestamp).toDateString()}`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Image
                        className="h-full w-full sm:h-[350px] object-cover"
                        src={post?.media_url}
                        width={350}
                        height={350}
                        sizes="100vw"
                        alt={post?.id ?? `${platform} post`} // post media ID
                      />
                      <div className="p-4">
                        <p className="text-ellipsis overflow-hidden">
                          {post?.caption}
                        </p>
                      </div>
                    </div>
                  )}
                </Link>
              ))}
          </div>
          {media?.length > numberOfPosts && (
            <div className="mt-10 text-center">
              <Button
                className="bg-primary hover:bg-secondary text-white px-4 py-3 rounded-md"
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

export default React.memo(VariantB);
