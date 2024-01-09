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
    setProfileFeed({ platform: data?.variants?.platform });
  }, [data?.variants?.platform, setProfileFeed]);

  const props = {
    media: profileFeed?.media,
    username: profileFeed?.media?.[0]?.username,
    platform: data?.variants?.platform,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(SocialMediaFeed);
