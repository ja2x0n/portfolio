import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./page.module.css";

/**
 * 설계서 `03. 사이트 구조`의 상세 화면 순서.
 * TODO(content): 각 섹션의 내용은 설계서 06-1, 06-2에서 옮긴다.
 */
const SECTIONS = [
  "problem",
  "flow",
  "role",
  "features",
  "troubleshooting",
  "ai",
  "result",
  "learned",
  "links",
] as const;

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: "Projects" });
  return {
    title: project.name,
    description: t(`items.${slug}.summary`),
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  // 프로젝트가 둘뿐이라 다음 프로젝트는 순환한다.
  const next = projects[(index + 1) % projects.length];

  const t = await getTranslations("Projects");
  const d = await getTranslations("ProjectDetail");

  return (
    <main className={styles.main}>
      <article>
        <header className={styles.cover}>
          <Link href="/#projects" className={styles.back}>
            <ArrowLeft size={16} aria-hidden="true" />
            {d("back")}
          </Link>

          <h1 className={styles.name}>{project.name}</h1>
          <p className={styles.summary}>{t(`items.${slug}.summary`)}</p>

          <dl className={styles.meta}>
            <div>
              <dt>{t("period")}</dt>
              <dd>{project.period}</dd>
            </div>
            <div>
              <dt>{t("role")}</dt>
              <dd>{t(`items.${slug}.role`)}</dd>
            </div>
            <div>
              <dt>{t("stack")}</dt>
              <dd>{project.stack.join(" · ")}</dd>
            </div>
          </dl>

          <div className={styles.media}>
            {project.image ? (
              <Image
                className={styles.photo}
                src={project.image}
                alt={project.name}
                fill
                priority
                sizes="(min-width: 1024px) 960px, 100vw"
              />
            ) : (
              <span className={styles.placeholder}>
                {t("imagePlaceholder")}
              </span>
            )}
          </div>
        </header>

        {SECTIONS.map((section) => (
          <section key={section} className={styles.section}>
            <h2 className={styles.title}>{d(`sections.${section}`)}</h2>
            {/* TODO(content): 설계서 06-1, 06-2의 내용을 옮긴다. */}
            <p className={styles.preparing}>{d("preparing")}</p>
          </section>
        ))}
      </article>

      <nav className={styles.bottom} aria-label={d("nav")}>
        <Link href="/#projects" className={styles.move}>
          <ArrowLeft size={16} aria-hidden="true" />
          {d("back")}
        </Link>
        <Link href={`/projects/${next.slug}`} className={styles.move}>
          {d("next", { name: next.name })}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </nav>
    </main>
  );
}
