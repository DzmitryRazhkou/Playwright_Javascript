const { test, expect, request } = require("@playwright/test");

let token;
let orderId;

const postPayload = {
  userEmail: "dimagadjilla@gmail.com",
  userPassword: "3036057Dr",
};
const orderPayload = {
  orders: [
    { country: "Ukraine", productOrderedId: "6262e9d9e26b7e1a10e89c04" },
  ],
};

test.beforeAll(async () => {
  const apiContext = await request.newContext();

  // POST Call for Getting Token:
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: postPayload,
    }
  );

  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();

  //   Store Token Value:
  token = loginResponseJson.token;
  console.log(" =====> " + token + " <===== ");

  // POST Call for Creating Order:
  const orderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderPayload,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );
  const orderResponseJson = await orderResponse.json();
  orderId = await orderResponseJson.orders[0];
  console.log(orderId);
});

test("ClientApp Playwright test", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client/");

  await page.locator("button[routerlink='/dashboard/myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
