test("Select a dropdown by value", async () => {
  const fruits = await page.$("#fruits");
  await fruits?.selectOption("5");
});

test("Select a dropdown by value", async () => {
  const fruits = await page.$("#fruits");
  await fruits?.selectOption("5");

  const msg = await page.$("div.notification");
  if (msg) {
    expect(await msg.textContent()).toContain("Apple");
  }
});

test("Count of the select", async () => {
  const lang = await page.$$("#lang option");
  console.log(lang);
});

test("Get Selected Test", async () => {
  await page.selectOption("#country", "India");

  await page.locator(".custom-select").selectOption("tem2"); // option > value = "item2" <option
  await page.locator(".custom-select").selectOption({ label: "Table" });
});
