const { test, expect } = require("@playwright/test");

let webContent;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const username = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const signIn = page.locator("#login");

  await page.goto("https://rahulshettyacademy.com/client/");
  await username.fill("dimagadjilla@gmail.com");
  await password.fill("3036057Dr");
  await signIn.click();
  await page.waitForLoadState("networkidle");

  //   Retrieve all localStorageData into JSON File:
  await context.storageState({ path: "state.json" });

  //   Store all data into variable and use it for newPage()
  webContent = await browser.newContext({ storageState: "state.json" });
});

test("ClientApp Playwright test", async () => {
  //   We already loged in in the before and retrieve data:
  const page = await webContent.newPage();
  await page.goto("https://rahulshettyacademy.com/client/");

  const productName = "iphone 13 pro";
  const products = await page.locator(".card-body");

  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  const count = await products.count();
  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) == productName) {
      await products.nth(i).locator("button:nth-of-type(2)").click();
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
});

test("ClientApp Titles test", async () => {
  //   We already loged in in the before and retrieve data:
  const page = await webContent.newPage();
  await page.goto("https://rahulshettyacademy.com/client/");

  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});
