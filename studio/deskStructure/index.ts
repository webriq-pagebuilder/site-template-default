import packageJson from "../../package.json";
import {
  NEXT_PUBLIC_SANITY_STUDIO_FROM_STAGING_APP,
  NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO,
} from "studio/config";

import { Page } from "./pages";
import { Store } from "./store";

import { webriqStudioDeskVersion } from "@webriq-pagebuilder/sanity-plugin-desk-studio-version";

let showStore = true;

if (NEXT_PUBLIC_SANITY_STUDIO_FROM_STAGING_APP !== "true") {
  if (NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO !== "true") {
    showStore = false;
  }
}

export const stackshiftDesk = (S) =>
  S.list()
    .title("Content")
    .items(
      showStore
        ? [
            S.divider(),
            Page(S),
            S.divider(),
            Store(S),
            webriqStudioDeskVersion(S, packageJson),
          ]
        : [Page(S), webriqStudioDeskVersion(S, packageJson)]
    );
