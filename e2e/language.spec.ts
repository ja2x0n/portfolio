import { expect, test } from "@playwright/test";
import { switchTo } from "./helpers";

/**
 * 언어를 바꾸면 URL의 로케일과 화면 문구가 함께 바뀌고, 새로고침해도 그 언어에 머문다.
 * CSS Modules 클래스는 빌드마다 해시가 바뀌므로 역할과 접근 가능한 이름으로만 잡는다.
 */

/** 각 언어에서 화면에 반드시 보이는 문구. messages/*.json 의 Home.viewProjects */
const viewProjects = {
  ko: "프로젝트 보기",
  en: "View projects",
  ja: "プロジェクトを見る",
} as const;

test("언어를 바꾸면 URL과 문구가 함께 바뀐다", async ({ page }) => {
  await page.goto("/ko");
  await expect(page.getByRole("link", { name: viewProjects.ko })).toBeVisible();

  await switchTo(page, "en");
  await expect(page).toHaveURL(/\/en(\/|$|#)/);
  await expect(page.getByRole("link", { name: viewProjects.en })).toBeVisible();

  await switchTo(page, "ja");
  await expect(page).toHaveURL(/\/ja(\/|$|#)/);
  await expect(page.getByRole("link", { name: viewProjects.ja })).toBeVisible();
});

test("새로고침해도 선택한 언어에 머문다", async ({ page }) => {
  await page.goto("/ko");
  await switchTo(page, "en");
  await expect(page).toHaveURL(/\/en(\/|$|#)/);

  await page.reload();
  await expect(page).toHaveURL(/\/en(\/|$|#)/);
  await expect(page.getByRole("link", { name: viewProjects.en })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("세 언어 모두 문구가 비어 있지 않다", async ({ page }) => {
  for (const locale of ["ko", "en", "ja"] as const) {
    await page.goto(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    // 번역 키가 빠지면 next-intl 이 키 이름을 그대로 노출한다.
    await expect(page.locator("body")).not.toContainText("Home.");
    await expect(page.locator("body")).not.toContainText("About.");
  }
});

test("언어를 고른 뒤 루트로 오면 그 언어로 간다", async ({ page }) => {
  await page.goto("/ko");
  await switchTo(page, "en");
  await expect(page).toHaveURL(/\/en(\/|$|#)/);

  // 언어가 붙은 주소는 미들웨어를 타지 않으므로 선택을 쿠키로 남긴다.
  await page.goto("/");
  await expect(page).toHaveURL(/\/en(\/|$|#)/);
});
