const { test, expect } = require("@playwright/test");

test.only("ClientApp Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const productName = "IPHONE 13 PRO";
  const username = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const signIn = page.locator("#login");
  const product = page.locator(".card-body");
  const cardTitles = page.locator(".card-body b");

  await page.goto("https://rahulshettyacademy.com/client/");
  console.log(" =====> " + (await page.title()) + " <===== ");
  await expect(page).toHaveTitle("Let's Shop");

  await username.fill("dimagadjilla@gmail.com");
  await password.fill("3036057Dr");
  await signIn.click();
  await page.waitForLoadState("networkidle");
  const allCardTitles = await cardTitles.allTextContents();
  console.log(allCardTitles);

  // Iterate:
  const count = await product.count();
  for (let i = 0; i < count; i++) {
    if (product.nth(i).locator("b").textContent() === productName) {
      await product.nth(i).locator(".card-body button:nth-of-type(2)").click();
      break;
    }
  }
});

// // race condition
// await Promise.all(
//   page.waitForNavigation(),
//   signIn.click()
// )
