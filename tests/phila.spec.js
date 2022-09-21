import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  // Go to https://www.yahoo.com/
  await page.goto("https://www.yahoo.com/");

  // Click input[role="combobox"]
  await page.locator('input[role="combobox"]').click();

  // Press CapsLock
  await page.locator('input[role="combobox"]').press("CapsLock");

  // Fill input[role="combobox"]
  await page.locator('input[role="combobox"]').fill("Philadelphia");

  // Press Enter
  await page.locator('input[role="combobox"]').press("Enter");
  await expect(page).toHaveURL(
    "https://search.yahoo.com/search?p=Philadelphia&fr=yfp-t&fr2=p%3Afp%2Cm%3Asb&ei=UTF-8&fp=1"
  );

  // Click text=www.phila.govCity of Philadelphia
  const [page1] = await Promise.all([
    page.waitForEvent("popup"),
    page.locator("text=www.phila.govCity of Philadelphia").click(),
  ]);
});
