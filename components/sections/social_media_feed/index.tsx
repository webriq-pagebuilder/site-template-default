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
  const { profileFeed, setProfileFeed } = useSocialMediaFeed();

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

    setProfileFeed(account);
  }, [data?.variants?.selectAccount, setProfileFeed]);

  const hashtags = profileFeed?.media
    ?.flatMap((post) => post?.caption?.match(/#[^\s#]+/g) || [])
    .filter((tag, index, self) => self.indexOf(tag) === index);

  const props = {
    media: profileFeed?.media,
    username: profileFeed?.userName,
    platform: profileFeed?.platform,
    hashtags,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(SocialMediaFeed);
