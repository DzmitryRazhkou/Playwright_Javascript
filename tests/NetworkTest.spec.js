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
let fakePayload = { data: [], message: "No Orders" };

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
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63377b76c4d0c51f4f3208f3"
  );
  (route) => {
    const response = page.request.fetch(route.request());
    let body = fakePayload;
    route.fulfill({
      response,
      body,
    });
  };

  await page.pause();
  await page.locator("button[routerlink='/dashboard/myorders']").click();
  console.log(await page.locator(".mt-4").textContent());
});
