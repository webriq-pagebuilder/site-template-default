import { expect, type Locator, type Page } from "@playwright/test";
import { customAlphabet } from "nanoid";

export class StudioPage {
  readonly page: Page;
  readonly baseURL: string;

  // Left side pane elements - Pages, Store
  readonly leftPane: {
    pages: Locator;
  };
  // Top bar - Logo, New document, Search bar, Desk, Vision, Components, Forms, Payments, Blog, Media
  readonly studioNavbar;

  constructor(page, baseURL) {
    this.page = page;
    this.baseURL = baseURL;
  }

  async navigateToPages() {
    console.log("this.page", this.baseURL);

    await this.page.goto(`./studio`);

    // Find the element you want to click
    const element = this.page.locator('a:has-text("Pages")');
    // Scroll the page to the element
    await element.scrollIntoViewIfNeeded();
    // Wait for the element to be fully visible
    await this.page.waitForSelector('a:has-text("Pages")', {
      state: "visible",
    });
    // Click on the element
    await element.click({ force: true });
    await expect(this.page.locator('p:has-text("Loading...")')).toBeHidden();
  }

  async createNewPage(title, componentName) {
    const newPageButtonElement = `a[href="/studio/intent/create/template=page;type=page/"]`;
    await this.page.waitForSelector(newPageButtonElement, { state: "visible" });

    const button = await this.page.locator(newPageButtonElement);

    // Check for disabled attribute using data-disabled
    if (await button.evaluate((el) => el.dataset.disabled === "true")) {
      console.warn("Create new page button is disabled, reloading...");
      await this.page.reload();
    }

    await this.page.locator(newPageButtonElement).click({ force: true });

    const inputTitle = this.page.locator("input#title");
    await expect(this.page.locator('p:has-text("Loading...")')).toBeHidden();
    await this.page.waitForSelector("input#title", { state: "visible" });
    await inputTitle.click({ force: true });
    await inputTitle.fill(sectionTitle);

    await this.page
      .getByRole("button", { name: "Generate" })
      .click({ force: true });
    await page
      .getByRole("button", { name: "Add item…" })
      .click({ force: true });

    if (sections) {
      await expect(
        this.page.getByRole("menuitem", { name: sections })
      ).toBeVisible();
      await this.page
        .getByRole("menuitem", { name: sections })
        .click({ force: true });
      await expect(
        this.page
          .getByTestId("reference-input")
          .getByRole("button", { name: "Create new" })
      ).toBeVisible();
      await this.page
        .getByTestId("reference-input")
        .getByRole("button", { name: "Create new" })
        .click({ force: true });
    }
  }

  async launchPreview({ pageTitle }) {
    await this.page.goto(
      `${this.baseURL}/api/preview?secret=${
        process.env.NEXT_PUBLIC_PREVIEW_SECRET
      }&slug=${this._createSlug(pageTitle)}`
    );
    await this.page.waitForLoadState("domcontentloaded");
  }

  autologin_studio({ token, projectId }) {
    window.localStorage.setItem(
      `__studio_auth_token_${projectId}`,
      JSON.stringify({
        token,
        time: "2024-03-11T07:00:27.633Z",
      })
    );
  }

  _generatePageTitle(text) {
    let title: string;

    const uniqueKey =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nanoid = customAlphabet(uniqueKey, 4);

    title = text + nanoid();

    return title;
  }

  _createSlug = (pageTitle: string) => {
    let slug: string;

    slug = pageTitle?.toLowerCase()?.replace(/\s+/g, "-").replace(/-+/g, "-");
    return slug;
  };
}
