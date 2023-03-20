import { deskTool as sanityDesktool } from "sanity/desk"

import { Page } from "./pages"
import { Store } from "./store"
//import { Guides } from "./guides"

export default sanityDesktool({
  structure: (S) =>
    S.list()
      .title("Content")
      .items([
        Page(S),
        S.divider(),
        Store(S),
        //Guides(S)
      ]),
  name: "desk",
  title: "Desk",
})
