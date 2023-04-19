import React from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";

import { SanityImage, Form } from "types";

export interface ContactProps {
  title?: string;
  contactDescription?: string;
  officeInformation?: string;
  contactEmail?: string;
  contactNumber?: string;
  socialLinks?: SocialLinks[];
  form?: Form;
  block?: any;
}

interface SocialLinks {
  socialMedia?: string;
  socialMediaLink?: string;
  _key?: string;
  _type?: string;
  socialMediaIcon?: {
    alt?: string;
    image?: SanityImage;
  };
  socialMediaPlatform?: string;
}

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function Contact({ data, enableInlineEditing }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props: ContactProps = {
    title: data?.variants?.title,
    contactDescription: data?.variants?.contactDescription,
    officeInformation: data?.variants?.officeInformation,
    contactEmail: data?.variants?.contactEmail,
    contactNumber: data?.variants?.contactNumber,
    socialLinks: data?.variants?.socialLinks,
    form: data?.variants?.form,
    block: data?.variants?.block,
  };

  return (
    <>
      {enableInlineEditing && (
        <EditSection documentType={data?._type} documentId={data?._id} />
      )}
      {Variant ? <Variant {...props} /> : null}
    </>
  );
}
export default React.memo(Contact);
