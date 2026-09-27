import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteUrl } from "@/content/site";
import { routing } from "@/i18n/routing";

/** 언어별 주소를 서로 가리키게 한다. */
function languagesFor(path: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`]),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = ["", ...projects.map((p) => `/projects/${p.slug}`)];

  return routing.locales.flatMap((locale) =>
    pages.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      // 메인이 상세 페이지보다 먼저다.
      priority: path === "" ? 1 : 0.8,
      alternates: { languages: languagesFor(path) },
    })),
  );
}
