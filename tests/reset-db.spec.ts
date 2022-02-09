import { test, expect } from "@playwright/test";

const baseUrl = "https://g.hr.dmerej.info/";

test(`Should reset the database, checking the employees`, async ({ page }) => {
  await page.goto(baseUrl + "reset_db");
  await page.locator('button[type="submit"]').click();

  await page.goto(baseUrl + "employees");
  await page.screenshot({ path: `screenshot_db_reset_employees.png` });
  await expect(page.locator("text='No employees yet'")).toHaveCount(1);
});

test(`Should reset the database, checking the teams`, async ({ page }) => {
  await page.goto(baseUrl + "reset_db");
  await page.locator('button[type="submit"]').click();

  await page.goto(baseUrl + "teams");
  await page.screenshot({ path: `screenshot_db_reset_teams.png` });
  await expect(page.locator("text='No teams yet'")).toHaveCount(1);
});
