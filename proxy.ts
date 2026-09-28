import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

/*
 * 이미 언어가 붙은 주소(/ko, /en, /ja 와 그 하위)는 정적으로 만들어져 있다.
 * 미들웨어까지 태우면 요청마다 함수가 깨어나 서버 시간이 90~190ms 더 든다.
 * 언어를 판단해야 하는 주소 — 루트와 언어 없는 경로 — 만 통과시킨다.
 */
export const config = {
  matcher: "/((?!(?:ko|en|ja)(?:/|$)|api|_next|_vercel|.*\\..*).*)",
};
