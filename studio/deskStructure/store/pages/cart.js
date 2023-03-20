//import type { SanityDocument } from "sanity"
//import { StructureBuilder } from "sanity/desk";

import { EditIcon, EyeOpenIcon, EarthGlobeIcon, UserIcon } from "@sanity/icons"
import { MdAccessibility } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

import Iframe from "sanity-plugin-iframe-pane"

import resolveProductionUrl from "../../../resolvePreviewUrl"
import SeoPreviews from "../../../components/previews/seo/SeoPreviews"
import BraillePreview from "../../../components/previews/a11y/braille/Braille"
import ColorblindPreview from "../../../components/previews/a11y/colorblind-filter/ColorblindPreview"
import TextToSpeechPreview from "../../../components/previews/a11y/text-to-speech/TextToSpeechPreview"

export const Cart = (S) => {
    return S.listItem()
        .title("Cart")
        .schemaType("cartPage")
        .icon(FaShoppingCart)
        .child(
        S.document()
            .title("Cart")
            .schemaType("cartPage")
            .documentId("cartPage")
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
};