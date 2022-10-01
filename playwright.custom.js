// @ts-check
const { devices } = require("@playwright/test");

const config = {
  testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },

  reporter: "html",

  projects: [
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: true,
        ignoreHttpsErrors: true,
        permissions: ["geolocation"],
        // viewport: { width: 720, height: 720 },
        screenshot: "only-on-failure",
        trace: "on", //off,on
      },
    },
    {
      name: "webkitprofile",
      use: {
        browserName: "webkit",
        headless: false,
        screenshot: "on",
        video: "retain-on-failure",
        trace: "on", //off,on
        ...devices["iPhone 11"],
      },
    },
  ],
};

module.exports = config;
