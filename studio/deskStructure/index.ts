import { deskTool as sanityDesktool } from "sanity/desk";
import packageJson from "../../package.json";

import { Page } from "./pages";
import { Store } from "./store";

import { webriqStudioDeskVersion } from "@webriq-pagebuilder/sanity-plugin-desk-studio-version";

export default sanityDesktool({
  structure: (S) =>
    S.list()
      .title("Content")
      .items([
        Page(S),
        S.divider(),
        Store(S),
        webriqStudioDeskVersion(S, packageJson),
      ]),
  name: "desk",
  title: "Desk",
});
