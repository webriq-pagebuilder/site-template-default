import { StructureBuilder, deskTool as sanityDesktool } from "sanity/desk";
import packageJson from "../../package.json";

import { Page } from "./pages";

import { webriqStudioDeskVersion } from "@webriq-pagebuilder/sanity-plugin-desk-studio-version";

/**
 * NOTE: The legacy E-commerce / C-Studio desk templates were removed
 * (see PR #323/#327 "Remove legacy E-commerce/C-Studio templates").
 *
 * The wiring below is retained, commented out, for future reference / revert.
 * The removed `./store` desk structure (collections, products, cart, search,
 * wishlist) was deleted from this repo — restore the source with:
 *
 *
 * Then uncomment the import and the `showStore` block below.
 *
 * import {
 *   NEXT_PUBLIC_SANITY_STUDIO_FROM_STAGING_APP,
 *   NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO,
 * } from "studio/config";
 * import { Store } from "./store";
 *
 * let showStore = true;
 *
 * if (NEXT_PUBLIC_SANITY_STUDIO_FROM_STAGING_APP !== "true") {
 *   if (NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO !== "true") {
 *     showStore = false;
 *   }
 * }
 *
 * // ...and in `.items()`:
 * showStore
 *   ? [Page(S), S.divider(), Store(S), webriqStudioDeskVersion(S, packageJson)]
 *   : [Page(S), webriqStudioDeskVersion(S, packageJson)]
 */

export default sanityDesktool({
  structure: (S) =>
    S.list()
      .title("Content")
      .items([Page(S), webriqStudioDeskVersion(S, packageJson)]),
  name: "desk",
  title: "Desk",
});
