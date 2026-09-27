import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";

export const alt = "Heo Jae Won · Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * 공유 카드 이미지. 빌드 때 만들어진다.
 * ImageResponse 에는 사이트 폰트가 없으므로 글자는 라틴 문자만 쓴다.
 */
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#000000",
        color: "#f2f3f5",
        padding: 80,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 99,
            background: "#0a84ff",
          }}
        />
        <div style={{ fontSize: 26, letterSpacing: 6, color: "#94979e" }}>
          FRONTEND DEVELOPER
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 132,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          Heo Jae Won
        </div>
        <div style={{ fontSize: 34, color: "#94979e" }}>
          Turning user problems into screen flows, built with the team.
        </div>
      </div>

      <div style={{ display: "flex", fontSize: 26, color: "#94979e" }}>
        ja2x0n-portfolio.kro.kr
      </div>
    </div>,
    size,
  );
}
