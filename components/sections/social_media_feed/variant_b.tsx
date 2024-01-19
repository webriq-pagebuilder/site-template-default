import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DefaultSocialMediaIcons } from "helper";

function VariantB({ username, media, platform, hashtags }) {
  const [selected, setSelected] = useState("");

  return (
    <section className="py-20">
      {media && (
        <div className="container mx-auto lg:px-4 xl:px-6 w-full lg:w-2/3">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-center">
              {`Follow us on ${platform ?? "social media"}`}
            </h1>
          </div>
          <div className="mb-4 w-1/3 ml-auto">
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
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 justify-center">
            {media
              ?.filter((post) => post?.caption?.includes(selected))
              ?.map((post, index) => (
                <Link href={post?.permalink} key={index} target="_blank">
                  {post?.media_url && (
                    <div className="h-full overflow-hidden bg-white border border-gray-200">
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
                        className="h-full sm:h-[350px] sm:w-full object-cover"
                        src={post?.media_url}
                        width={350}
                        height={350}
                        sizes="(min-width: 1540px) 480px, (min-width: 1280px) 395px, (min-width: 1040px) 309px, (min-width: 780px) 352px, (min-width: 560px) 480px, 88.33vw"
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
        </div>
      )}
    </section>
  );
}

export default React.memo(VariantB);
