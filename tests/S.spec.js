const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./utils/APIUtils");

// Payload ---> Bodies:
const loginPayload = {
  userEmail: "dimagadjilla@gmail.com",
  userPassword: "3036057Dr",
};
const orderPayload = {
  orders: [
    { country: "Ukraine", productOrderedId: "6262e9d9e26b7e1a10e89c04" },
  ],
};

// Start Before Method
let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test("Place An Order Test", async ({ page }) => {
  // Store Token into localStorage for Skipping Login
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  // At That Moment The Web Page is Opened:
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("button[routerlink='/dashboard/myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});
