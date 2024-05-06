import htm from "htm";
import vhtml from "vhtml";
import { htmlToBlocks } from "@sanity/block-tools";
import { toHTML, uriLooksSafe } from "@portabletext/to-html";

const html = htm.bind(vhtml);

const PortableTextComponents = {
  types: {
    image: ({ value }) => html`<img src="${value.imageUrl}" />`,
    // add custom block components here
  },

  marks: {
    link: ({ children, value }) => {
      // ⚠️ `value.href` IS NOT "SAFE" BY DEFAULT ⚠️
      // ⚠️ Make sure you sanitize/validate the href! ⚠️
      const href = value.href || "";

      if (uriLooksSafe(href)) {
        const rel = href.startsWith("/") ? undefined : "noreferrer noopener";
        return html`<a href="${href}" rel="${rel}">${children}</a>`;
      }

      // If the URI appears unsafe, render the children (eg, text) without the link
      return children;
    },
  },
};

// Convert HTML description from Ecwid to a block array (Portable Text)
// reference: https://www.sanity.io/docs/presenting-block-text#ca5dfebdfd57
export const HTMLtoPortableText = (html, type) => {
  if (html) {
    const blocks = htmlToBlocks(html, type);
    // return block content
    return blocks;
  }
  return [...(html || [])]; // empty array fallback if html is "undefined"
};

// Convert portable text to HTML
// Reference: https://github.com/portabletext/to-html
export const PortableTextToHTML = (content) => {
  if (content) {
    return toHTML(content, { components: PortableTextComponents });
  }
  // if content returns "undefined" then nothing to convert
  return console.log(
    "[INFO] Nothing to convert! Portable text has no content..."
  );
};
