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
  let accountInfo;
  const { profileFeed, setProfileFeed } = useSocialMediaFeed();

  if (data?.variants?.selectAccount) {
    accountInfo = JSON.parse(data?.variants?.selectAccount);
  }

  useEffect(() => {
    setProfileFeed(accountInfo);
  }, [accountInfo, setProfileFeed]);

  const props = {
    media: profileFeed?.media,
    username: profileFeed?.userName,
    platform: profileFeed?.platform,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(SocialMediaFeed);
