import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useSocialMediaFeed } from "@/context/SocialMediaFeedContext";

import { SectionsProps } from "@/types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function SocialMediaFeed({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = variant ? Variants?.[variant] : null;
  const socials = useSocialMediaFeed();
  const postsToDisplay =
    data?.variants?.numberOfPosts && data?.variants?.numberOfPosts < 1
      ? socials?.profileFeed?.media?.length
      : data?.variants?.numberOfPosts;

  useEffect(() => {
    if (!socials || !data?.variants?.user) return;

    // Only update if values have actually changed
    if (
      socials.profileFeed?.account?.userId !== data?.variants?.user?.userId ||
      socials.profileFeed?.account?.userName !==
        data?.variants?.user?.userName ||
      socials.profileFeed?.account?.profileName !==
        data?.variants?.user?.profileName ||
      socials.profileFeed?.account?.profilePictureUrl !==
        data?.variants?.user?.profilePictureUrl
    ) {
      socials.setProfileFeed((prev) => ({
        ...prev,
        status: socials.profileFeed?.media?.length ? "loaded" : "loading",
      }));
    }
  }, [data?.variants?.user]);

  const allHashtags = socials?.profileFeed?.media
    ?.slice(0, postsToDisplay)
    ?.flatMap((post) => post?.caption?.match(/#[^\s#]+/g) || [])
    .filter((tag, index, self) => self.indexOf(tag) === index);

  const props = {
    baseUrl: socials?.profileFeed?.baseUrl,
    media: socials?.profileFeed?.media,
    username: socials?.profileFeed?.account?.userName,
    userId: socials?.profileFeed?.account?.userId,
    platform: socials?.profileFeed?.account?.platform,
    profileName: socials?.profileFeed?.account?.profileName,
    profilePictureUrl: socials?.profileFeed?.account?.profilePictureUrl,
    fetchNextPage: socials?.fetchNextPage,
    fetchPreviousPage: socials?.fetchPreviousPage,
    nextCursor: socials?.nextCursor,
    prevCursor: socials?.prevCursor,
    hashtags: data?.variants?.hashtags ?? allHashtags,
    numberOfPosts: data?.variants?.numberOfPosts,
    linkedAcct: data?.variants?.user,
    isLoading:
      !socials?.profileFeed?.media?.length ||
      socials?.profileFeed?.status === "loading",
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(SocialMediaFeed);
