import test from "@playwright/test";

test("hello there", async ({ page }) => {
  // Arrange
  arrange();

  // Act
  act();

  // Assert
  assert();
});

export async function arrange() {
  await createNewPage();
  await createNewSectionAndVariant();
}

export function cleanup() {
  await removeComponent();
  await deletePage();
}

export function act() {
  await fillTitle("New Title");
  await fillFirstContent("bla bla bla");
  await fillSecondContent("bla bla bla");
  await fillSecondContent("bla bla bla");
}

export function assert() {
  await expect(studio.title.toBeVisible());
}
