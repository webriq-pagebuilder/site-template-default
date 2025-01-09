import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useSocialMediaFeed } from "context/SocialMediaFeedContext";

import { SectionsProps } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function SocialMediaFeed({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];
  const socials = useSocialMediaFeed();
  const postsToDisplay =
    data?.variants?.numberOfPosts < 1
      ? socials?.profileFeed?.media?.length
      : data?.variants?.numberOfPosts;

  useEffect(() => {
    let account = {
      itemId: "",
      platform: "",
      userName: "",
      status: "loading",
      media: [],
    };

    if (data?.variants?.selectAccount) {
      account = JSON.parse(data?.variants?.selectAccount);
    }

    socials?.setProfileFeed(account);
  }, [data?.variants?.selectAccount, socials?.setProfileFeed]);

  const allHashtags = socials?.profileFeed?.media
    ?.slice(0, postsToDisplay)
    ?.flatMap((post) => post?.caption?.match(/#[^\s#]+/g) || [])
    .filter((tag, index, self) => self.indexOf(tag) === index);

  const props = {
    media: socials?.profileFeed?.media,
    username: socials?.profileFeed?.userName,
    platform: socials?.profileFeed?.platform,
    hashtags: data?.variants?.hashtags ?? allHashtags,
    numberOfPosts: data?.variants?.numberOfPosts,
    fetchNextPage: socials?.fetchNextPage,
    fetchPreviousPage: socials?.fetchPreviousPage,
    nextCursor: socials?.nextCursor,
    prevCursor: socials?.prevCursor,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(SocialMediaFeed);
