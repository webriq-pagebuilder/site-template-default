import test from "@playwright/test";
import { StudioPage } from "tests/__pages__/StudioPage";

test("it autologins and go to pages", async ({ page, baseURL }) => {
  const studio = new Studio(page, baseURL);

  studio.newPage(pageTitle);
  studio.newSectionInPage(sectionTitle, "variant_a");
});
