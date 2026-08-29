import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("portfolio interactions work", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
    "MYO MYAT THIHA",
  );

  await page.getByRole("button", { name: "Web3" }).click();
  const veriLoan = page.locator("#work").getByRole("button", { name: /VeriLoan/ });
  await expect(veriLoan).toBeVisible();
  await veriLoan.click();
  await expect(
    page.getByRole("heading", { level: 1, name: "VeriLoan" }),
  ).toBeVisible();
  await page.getByRole("button", { name: /All work/ }).click();
  await expect(page.locator("#work")).toBeAttached();
});

test("contact modal is keyboard accessible", async ({ page }) => {
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Email me" }).click();
  const dialog = page.getByRole("dialog", { name: "Start a conversation." });
  await expect(dialog).toBeVisible();
  await expect(page.getByLabel("Name")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("orbit always animates when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const orbitTrack = page.locator("[data-always-animate]").last();
  const transformBefore = await orbitTrack.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await page.waitForTimeout(300);
  const transformAfter = await orbitTrack.evaluate(
    (element) => getComputedStyle(element).transform,
  );

  expect(transformAfter).not.toBe(transformBefore);
});

test("home page has no automatically detectable WCAG A/AA violations", async ({
  page,
}) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
