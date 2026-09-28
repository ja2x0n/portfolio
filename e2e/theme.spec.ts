import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers";

/**
 * 테마 버튼을 누르면 data-theme이 바뀌고, 새로고침해도 유지된다.
 * 첫 렌더에 반대 테마가 스쳐 보이면(깜빡임) 안 된다.
 */

/** ThemeToggle의 aria-label. messages/ko.json의 Header */
const toDark = "다크 모드로 전환";
const toLight = "라이트 모드로 전환";

test("테마를 바꾸면 data-theme이 바뀐다", async ({ page }) => {
  // 시스템 설정과 무관하게 라이트에서 시작한다.
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/ko");
  await waitForHydration(page);

  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "light");

  await page.getByRole("button", { name: toDark }).click();
  await expect(html).toHaveAttribute("data-theme", "dark");

  await page.getByRole("button", { name: toLight }).click();
  await expect(html).toHaveAttribute("data-theme", "light");
});

test("새로고침해도 선택한 테마가 유지된다", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/ko");
  await waitForHydration(page);
  await page.getByRole("button", { name: toDark }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("다크로 저장된 상태에서 첫 렌더에 라이트가 스치지 않는다", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/ko");
  await waitForHydration(page);
  await page.getByRole("button", { name: toDark }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  // 문서를 파싱하는 동안 기록한다. 스크립트가 늦게 돌면 light가 먼저 잡힌다.
  await page.addInitScript(() => {
    (window as unknown as { __themes: string[] }).__themes = [];
    const push = () => {
      const t = document.documentElement.getAttribute("data-theme");
      if (t) (window as unknown as { __themes: string[] }).__themes.push(t);
    };
    document.addEventListener("readystatechange", push);
    document.addEventListener("DOMContentLoaded", push);
  });

  await page.reload();
  const seen = await page.evaluate(
    () => (window as unknown as { __themes: string[] }).__themes,
  );
  expect(seen.length).toBeGreaterThan(0);
  expect(seen).not.toContain("light");
});
