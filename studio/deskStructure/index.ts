import { deskTool as sanityDesktool } from "sanity/desk"

import { Page } from "./pages"
import { Store } from "./store"

export default sanityDesktool({
  structure: (S) =>
    S.list()
      .title("Content")
      .items([
        Page(S),
        S.divider(),
        Store(S),
      ]),
  name: "desk",
  title: "Desk",
})
