import { getTranslations } from "next-intl/server";
import ProjectList from "@/components/ProjectList/ProjectList";
import Section from "@/components/Section/Section";
import { projects } from "@/content/projects";

export default async function Projects() {
  const t = await getTranslations("Projects");

  // 번역은 서버에서 끝내고, 목록에는 화면에 그릴 문자열만 넘긴다.
  const items = projects.map((p) => ({
    slug: p.slug,
    name: p.name,
    period: p.period,
    stack: [...p.stack],
    image: p.image,
    summary: t(`items.${p.slug}.summary`),
  }));

  return (
    <Section id="projects" title={t("title")}>
      <ProjectList items={items} labels={{ viewDetail: t("viewDetail") }} />
    </Section>
  );
}
