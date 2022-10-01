const { test, expect, request } = require("@playwright/test");

test("Visual ScreenShot Test", async ({ page }) => {
  await page.goto("https://www.yahoo.com/");
  expect(await page.screenshot()).toMatchSnapshot("start.png");
});
