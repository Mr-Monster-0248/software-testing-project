import { test, expect } from "@playwright/test";

interface Employee {
  name: string;
  email: string;
  address_line1: string;
  address_line2: string;
  city: string;
  zip_code: string;
  hiring_date: string;
  job_title: string;
}

const bob: Employee = {
  name: "bob",
  email: "bob@bobmail.com",
  address_line1: "1 rue bob",
  address_line2: "99999",
  city: "Marseille",
  zip_code: "1234",
  hiring_date: "26/01/2022",
  job_title: "dictator",
};

const input_names = [
  "name",
  "email",
  "address_line1",
  "address_line2",
  "city",
  "zip_code",
  "hiring_date",
  "job_title",
];

const addEmployeeUrl = "https://g.hr.dmerej.info/add_employee";

for (let [key, value] of Object.entries(bob)) {
  test(`Should fail because of missing key : ${key}`, async ({ page }) => {
    await page.goto(addEmployeeUrl);

    for (let input of input_names) {
      input === key
        ? await page.fill(`input[name="${input}"]`, "")
        : await page.fill(`input[name="${input}"]`, bob[input]);
    }

    await page.locator('button[type="submit"]').click();
    await page.screenshot({ path: `screenshot_${key}.png` });
    await expect(page.locator(`li[class="error"]`)).toHaveCount(1);
  });
}

test(`Should add a new employee`, async ({ page }) => {
  await page.goto(addEmployeeUrl);

  for (let input of input_names) {
    await page.fill(`input[name="${input}"]`, `${bob[input]}`);
  }

  await page.locator('button[type="submit"]').click();
  await page.screenshot({ path: "screenshot_success.png" });
  const currentURL = page.url();
  expect(currentURL).toEqual("https://g.hr.dmerej.info/employees");
});
