import { deskTool as sanityDesktool } from "sanity/desk";

import { Page } from "./pages";
import { Store } from "./store";
import { StudioDocs } from "../components/StudioDocs";
import { HelpCircleIcon } from "@sanity/icons";

export default sanityDesktool({
  structure: (S) =>
    S.list()
      .title("Content")
      .items([
        Page(S),
        S.divider(),
        Store(S),

        // Help Guide below
        S.listItem()
          .title("Guide")
          .icon(HelpCircleIcon)
          .child(S.component(StudioDocs).title("Help Guide")),
      ]),
  name: "desk",
  title: "Desk",
});
