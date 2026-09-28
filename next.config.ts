import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/*
 * 이 사이트는 전부 정적이고 사용자 입력도 외부 스크립트도 없다.
 * 그래서 CSP 의 목적은 "주입된 외부 출처를 막는 것" 하나다.
 *
 * script-src 에 unsafe-inline 이 남아 있는 이유:
 * next-themes 의 깜빡임 방지 스크립트와 Next 의 RSC 페이로드가 인라인
 * <script> 다. nonce 를 쓰려면 요청마다 값을 만들어야 하고, 그러면 정적
 * 생성을 포기해야 한다. 인라인을 허용해도 외부 출처는 여전히 막힌다.
 *
 * style-src 도 같다. Next 가 스타일을 인라인으로 넣는다.
 * img-src 의 data: 는 히어로 배경의 필름 결(SVG 데이터 URI) 때문이다.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          /*
           * preload 는 붙이지 않는다. 등재는 도메인 최상위(kro.kr)의
           * 정책인데 이 사이트는 그 하위이고 최상위를 통제하지 않는다.
           */
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default createNextIntlPlugin("./i18n/request.ts")(nextConfig);
