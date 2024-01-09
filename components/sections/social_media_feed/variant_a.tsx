import React from "react";
import Image from "next/image";
import Link from "next/link";
import { DefaultSocialMediaIcons } from "helper";

function VariantA({ username, media, platform }) {
  return (
    <section className="py-20">
      {media && (
        <div className="container mx-auto lg:px-4 xl:px-6 w-full lg:w-2/3">
          <div className="flex flex-wrap justify-between mb-4">
            <div className="flex my-auto">
              <DefaultSocialMediaIcons {...{ platform }} />
              <p className="font-bold align-middle ml-3">
                {`@${username ?? "username"}`}
              </p>
            </div>
            <Link
              className="bg-webriq-darkblue text-white px-4 py-3 rounded"
              href={`https://www.instagram.com/${username ?? "username"}`}
            >
              Follow
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 justify-center">
            {media?.map((post, index) => (
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
                  <div className="absolute inset-0 z-10 flex flex-col items-start rounded bg-gray-900 p-6 opacity-0 duration-300 hover:opacity-75">
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
        </div>
      )}
    </section>
  );
}

export default React.memo(VariantA);
