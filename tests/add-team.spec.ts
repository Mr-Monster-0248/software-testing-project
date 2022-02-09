import { test, expect } from "@playwright/test";

const baseUrl = "https://g.hr.dmerej.info/";

test(`Should add a new team`, async ({ page }) => {
  await page.goto(baseUrl + "add_team");
  await page.fill(`input[name="name"]`, `bobTeam`);
  await page.locator('button[type="submit"]').click();

  await page.screenshot({ path: "screenshot_add_team_success.png" });
  const currentURL = page.url();
  expect(currentURL).toEqual(baseUrl + "teams");
});

test(`Should fail to add a team due to missing name`, async ({ page }) => {
  await page.goto(baseUrl + "add_team");
  await page.locator('button[type="submit"]').click();

  await page.screenshot({ path: "screenshot_add_team_failure.png" });
  await expect(page.locator("text='Server Error (500)'")).toHaveCount(1);
});
