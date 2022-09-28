const { test, expect } = require("@playwright/test");

test.only("ClientApp Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const productName = "iphone 13 pro";
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

  // div[class='card-body'] button:nth-of-type(2)

  // Iterate:
  const count = await product.count();
  for (let i = 0; i < count; i++) {
    if ((await product.nth(i).locator("b").textContent()) == productName) {
      await product.nth(i).locator("button:nth-of-type(2)").click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();

  await page.locator("div li").first().waitFor;

  const flag = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
  expect(flag).toBeTruthy;

  await page.locator("text=Checkout").click();
  await page
    .locator("input[placeholder*='Country']")
    .type("Uni", { delay: 1000 });

  const dropDown = page.locator(".ta-results");
  await dropDown.waitFor();

  const optionCount = await dropDown.locator("button").count();
  for (let i = 0; i < optionCount; i++) {
    const text = await dropDown.locator("button").nth(i).textContent();

    // if (text.includes("Ukraine"))

    if (text == "United Kingdom") {
      await page
        .locator("//*[@class='ta-results list-group ng-star-inserted']//button")
        .nth(i)
        .click();
      break;
    }
  }

  // await expect(page.locator(".user_name [type='text']")).toHaveText(username);

  await page.locator(".action__submit").click();
});

// // race condition
// await Promise.all(
//   page.waitForNavigation(),
//   signIn.click()
// )
