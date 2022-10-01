class LoginPage {
  constructor(page) {
    this.page = page;
    this.signIn = page.locator("#login");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
  }

  async launchURL() {
    await this.page.goto("https://rahulshettyacademy.com/client/");
  }

  async login(username, password) {
    await this.userName.type(username);
    await this.password.type(password);
    await this.signIn.click();
    await this.page.waitForLoadState("networkidle");
  }
}
module.exports = { LoginPage };
