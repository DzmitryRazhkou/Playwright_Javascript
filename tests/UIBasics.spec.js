const { test, expect } = require("@playwright/test");

test("Browser Context Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const username = page.locator("#username");
  const password = page.locator("#password");
  const signIn = page.locator("#signInBtn");
  const error = page.locator("[style*='block']");
  const cardTitles = page.locator(".card-body a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(" =====> " + (await page.title()) + " <===== ");
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  await username.type("dimagadjilla@gmail.com");
  await password.type("3036057Dr");
  await signIn.click();
  console.log(await error.textContent());
  await expect(error).toContainText("Incorrect username/password.");

  await username.fill("");
  await username.fill("rahulshettyacademy");
  await password.fill("");
  await password.fill("learning");
  await signIn.click();
  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(3).textContent());
  const allCardTitles = await cardTitles.allTextContents();
  console.log(allCardTitles);
});

test("Page Playwrigth Test", async ({ page }) => {
  await page.goto("https://www.google.com");
  console.log(" =====> " + (await page.title()) + " <===== ");
  await expect(page).toHaveTitle("Google");
});

test.only("Child Page", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const documentLink = page.locator("a[href*='academy']");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(" =====> " + (await page.title()) + " <===== ");
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await expect(documentLink).toHaveAttribute("class", "blinkingText");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);

  const txt = await newPage
    .locator("a[href*='mentor@rahulshettyacademy.com']")
    .textContent();
  const arrayText = txt.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
});
