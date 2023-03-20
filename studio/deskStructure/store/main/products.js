//import type { SanityDocument } from "sanity"
//import { StructureBuilder } from "sanity/desk";

import { EditIcon, EyeOpenIcon, EarthGlobeIcon, UserIcon } from "@sanity/icons"
import { MdAccessibility } from "react-icons/md";
import { BsFillBagFill } from "react-icons/bs";

import Iframe from "sanity-plugin-iframe-pane"

import resolveProductionUrl from "../../../resolvePreviewUrl"
import SeoPreviews from "../../../components/previews/seo/SeoPreviews"
import BraillePreview from "../../../components/previews/a11y/braille/Braille"
import ColorblindPreview from "../../../components/previews/a11y/colorblind-filter/ColorblindPreview"
import TextToSpeechPreview from "../../../components/previews/a11y/text-to-speech/TextToSpeechPreview"

/** This shows all main products. If products with the same name are added from overrides/products, it will replace the values shown on preview. **/
  export const ProductStructure = (S) => {
    return S.listItem()
      .title("Products")
      .schemaType("mainProduct")
      .icon(BsFillBagFill)
      .child(
        S.documentTypeList("mainProduct")
          .title("Products")
          .child((documentId) =>
            S.document()
              .documentId(documentId)
              .schemaType("mainProduct")
              .views([
                  S.view.form().icon(EditIcon),
                  // Including the iframe pane, with a function to create the url
                  S.view
                    .component(Iframe)
                    .options({
                      url: (doc) => resolveProductionUrl(doc),
                      reload: {
                        button: true, // default `undefined`
                        revision: true, // boolean | number. default `undefined`. If a number is provided, add a delay (in ms) before the automatic reload on document revision
                      },
                    })
                    .title("Web Preview")
                    .icon(EarthGlobeIcon),
                  S.view
                    .component(SeoPreviews)
                    .options({ url: (doc) => resolveProductionUrl(doc) })
                    .icon(EyeOpenIcon)
                    .title("SEO Preview"),
                  S.view
                    .component(ColorblindPreview)
                    .options({ url: (doc) => resolveProductionUrl(doc) })
                    .icon(EyeOpenIcon)
                    .title("Colorblind"),
                  S.view
                    .component(TextToSpeechPreview)
                    .options({ fields: ["title", "excerpt", "body"] })
                    .icon(UserIcon)
                    .title("Text to speech"),
                  S.view.component(BraillePreview).icon(UserIcon).title("Braille"),
                ])
          )
      );
  }