import { getTranslations } from "next-intl/server";
import ProjectCarousel from "@/components/ProjectCarousel/ProjectCarousel";
import Section from "@/components/Section/Section";
import { projects } from "@/content/projects";

export default async function Projects() {
  const t = await getTranslations("Projects");

  // 번역은 서버에서 끝내고, Carousel에는 화면에 그릴 문자열만 넘긴다.
  const items = [
    ...projects.map((p) => ({
      slug: p.slug,
      name: p.name,
      period: p.period,
      stack: [...p.stack],
      image: p.image,
      summary: t(`items.${p.slug}.summary`),
      role: t(`items.${p.slug}.role`),
    })),
    // 아직 없는 프로젝트 자리. 카드 사이사이에 들어간다.
    {
      slug: null,
      name: t("upcoming.name"),
      summary: t("upcoming.summary"),
    },
  ];

  return (
    <Section id="projects" title={t("title")}>
      <ProjectCarousel
        items={items}
        labels={{
          carousel: t("carousel"),
          prev: t("prev"),
          next: t("next"),
          period: t("period"),
          role: t("role"),
          stack: t("stack"),
          imagePlaceholder: t("imagePlaceholder"),
        }}
      />
    </Section>
  );
}
