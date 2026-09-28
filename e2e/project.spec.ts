import { expect, test } from "@playwright/test";
import { switchTo } from "./helpers";

/**
 * 홈에서 프로젝트로 들어가고, 뒤로가기로 돌아온다. 그 사이 언어가 바뀌지 않는다.
 * 프로젝트 이름은 번역하지 않으므로 세 언어에서 같은 문자열로 잡는다.
 */
const PROJECT = "CapTeam";

test("홈에서 프로젝트 상세로 들어가고 뒤로 돌아온다", async ({ page }) => {
  await page.goto("/ko");

  await page
    .getByRole("link", { name: new RegExp(PROJECT) })
    .first()
    .click();
  await expect(page).toHaveURL(/\/ko\/projects\/capteam/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(PROJECT);

  await page.goBack();
  await expect(page).toHaveURL(/\/ko(\/|$|#)/);
  await expect(page.getByRole("link", { name: "프로젝트 보기" })).toBeVisible();
});

test("영어에서 들어가도 영어 상세로 간다", async ({ page }) => {
  await page.goto("/en");

  await page
    .getByRole("link", { name: new RegExp(PROJECT) })
    .first()
    .click();
  await expect(page).toHaveURL(/\/en\/projects\/capteam/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(PROJECT);
});

test("상세 페이지에서 언어를 바꿔도 같은 프로젝트에 머문다", async ({
  page,
}) => {
  await page.goto("/ko/projects/capteam");

  await switchTo(page, "ja");

  await expect(page).toHaveURL(/\/ja\/projects\/capteam/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(PROJECT);
});
