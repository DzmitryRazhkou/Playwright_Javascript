const { test, expect } = require("@playwright/test");
const { BasePage } = require("../pageObjects/BasePage");
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeOrder.json")));

test.only("ClientApp Playwright test", async ({ page }) => {
  const productName = dataSet.productName;
  const userName = dataSet.username;
  const password = dataSet.password;

  const basePage = new BasePage(page);
  const loginPage = basePage.getLoginPage();
  const dashBoardPage = basePage.getDashboardPage();
  const cartPage = basePage.getCartPage();
  const ordersReviewPage = basePage.getOrdersReviewPage();
  const ordersHistoryPage = basePage.getOrdersHistoryPage();

  await loginPage.launchURL();
  await loginPage.login(userName, password);
  await dashBoardPage.searchProductAddCart(productName);
  await dashBoardPage.navigateToCart();

  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();

  await ordersReviewPage.searchCountryAndSelect("Uk", "Ukraine");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);

  await dashBoardPage.navigateToOrders();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
