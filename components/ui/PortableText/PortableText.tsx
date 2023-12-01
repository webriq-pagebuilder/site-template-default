import React from "react";
import { defaultBlockStyle } from "helper";
import { PortableText } from "lib/sanity";

export function CustomPortableText({ components, value }) {
  const mergedBlockStyle = {
    block: { ...defaultBlockStyle.block, ...(components?.block ?? {}) },
    code: components?.code ?? defaultBlockStyle.code,
    list: { ...defaultBlockStyle.list, ...(components?.list ?? {}) },
    listItem: {
      ...defaultBlockStyle.listItem,
      ...(components?.listItem ?? {}),
    },
    marks: { ...defaultBlockStyle.marks, ...(components?.marks ?? {}) },
    types: { ...defaultBlockStyle.types, ...(components?.types ?? {}) },
  };

  return <PortableText components={mergedBlockStyle} value={value} />;
}
