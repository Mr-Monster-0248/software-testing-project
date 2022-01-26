import { test, expect } from "@playwright/test";

const baseUrl = "https://g.hr.dmerej.info";

interface testObject {
  text: string;
  url: string;
}

const urls: testObject[] = [
  { text: "List Employees", url: "/employees" },
  { text: "Add new employee", url: "/add_employee" },
  { text: "List teams", url: "/teams" },
  { text: "Create new team", url: "/add_team" },
  { text: "Reset database", url: "/reset_db" },
  { text: "Home", url: "/" },
];

for (const url of urls) {
  test(`Should go to ${url.url} url`, async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator(`text=${url.text}`).click();

    const currentURL = page.url();
    expect(currentURL).toEqual(`${baseUrl}${url.url}`);
  });
}

for (const url of urls) {
  test(`Should go to ${baseUrl} from ${url.url}`, async ({ page }) => {
    await page.goto(`${baseUrl}${url.url}`);
    await page.locator(`text=Home`).click();

    const currentURL = page.url();
    expect(currentURL).toEqual(`${baseUrl}/`);
  });
}
