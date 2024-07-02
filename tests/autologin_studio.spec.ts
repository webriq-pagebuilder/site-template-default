const base = require("@playwright/test");
const { StudioPage } = require("./__pages__/StudioPage");

exports.test = base.test.extend({
  studioPage: async ({ page }, use) => {
    await use(new StudioPage(page));
  },
});
exports.expect = base.expect;
