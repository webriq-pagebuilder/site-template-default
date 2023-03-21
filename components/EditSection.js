import Link from "next/link";
import { defaultTheme } from "sanity";
import { EditIcon } from "@sanity/icons";
import { ThemeProvider, Button } from "@sanity/ui";


function EditSection({ documentId, sectionId }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Link className="absolute z-40 m-2 right-0" href={`/studio/desk/pages;${documentId};${sectionId}`} target="_blank">
        <Button
          fontSize={18}
          icon={EditIcon}
          mode="ghost"
          padding={[2, 2, 3]}
          text="Edit"
          tone="primary"
        />
      </Link>
    </ThemeProvider>
  )
}

export default EditSection