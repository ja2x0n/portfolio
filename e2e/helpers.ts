import { expect, type Page } from "@playwright/test";

/** 언어 메뉴 항목의 aria-label. LanguageSwitch 의 names 와 같다. */
export const names = { ko: "한국어", en: "English", ja: "日本語" } as const;

/**
 * React 가 붙기 전에는 헤더 버튼에 핸들러가 없어 클릭이 그냥 사라진다.
 * Playwright 는 클릭을 다시 시도하지 않으므로 먼저 기다려야 한다.
 *
 * ThemeToggle 은 마운트 전에 아이콘을 그리지 않는다. 아이콘이 보이면 붙은 것이다.
 */
export async function waitForHydration(page: Page) {
  await expect(page.locator("header button svg").first()).toBeVisible();
}

/** 언어 메뉴를 열어 target 으로 바꾼다. */
export async function switchTo(page: Page, target: keyof typeof names) {
  await waitForHydration(page);
  const button = page.locator("button[aria-controls='language-menu']");
  await button.click();
  // 메뉴가 열린 것을 확인한 뒤에 항목을 누른다.
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("link", { name: names[target], exact: true }).click();
}
