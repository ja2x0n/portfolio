import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal/Reveal";
import { projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./page.module.css";

/** 제목과 항목으로 이루어진 묶음. 담당 역할과 배운 점에 쓴다. */
type Group = { title: string; items: string[] };
type Trouble = {
  title: string;
  situation: string;
  task: string;
  action: string[];
  outcome: string[];
};

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

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const t = await getTranslations("Projects");
  const d = await getTranslations("ProjectDetail");
  // 목록은 raw 로 꺼낸다. 문장 하나가 아니라 항목 묶음이기 때문이다.
  const raw = <T,>(key: string) => d.raw(`${slug}.${key}`) as T;

  const approach = raw<string[]>("approach");
  const flow = raw<string[]>("flow");
  const role = raw<Group[]>("role");
  const troubles = raw<Trouble[]>("troubleshooting");
  const result = raw<string[]>("result");
  const limits = raw<string[]>("limits");
  const learned = raw<Group[]>("learned");

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
              <dt>{d("labels.team")}</dt>
              <dd>{project.team}</dd>
            </div>
            <div>
              <dt>{t("role")}</dt>
              <dd>{t(`items.${slug}.role`)}</dd>
            </div>
            <div>
              <dt>{t("stack")}</dt>
              <dd>{project.stack.join(" · ")}</dd>
            </div>
            <div>
              <dt>{d("labels.tools")}</dt>
              <dd>{project.tools.join(" · ")}</dd>
            </div>
            <div>
              <dt>{d("labels.result")}</dt>
              <dd>{result[0]}</dd>
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

        <Reveal>
          <section className={styles.section}>
            <h2 className={styles.title}>{d("sections.problem")}</h2>
            <p className={styles.body}>{raw<string>("problem")}</p>
          </section>
        </Reveal>

        <Reveal>
          <section className={styles.section}>
            <h2 className={styles.title}>{d("sections.flow")}</h2>
            <ul className={styles.list}>
              {approach.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <ol className={styles.steps}>
              {flow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        </Reveal>

        <Reveal>
          <section className={styles.section}>
            <h2 className={styles.title}>{d("sections.role")}</h2>
            <div className={styles.groups}>
              {role.map((group) => (
                <div key={group.title}>
                  <h3 className={styles.groupTitle}>{group.title}</h3>
                  <ul className={styles.list}>
                    {group.items.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className={styles.section}>
            <h2 className={styles.title}>{d("sections.troubleshooting")}</h2>
            <div className={styles.troubles}>
              {troubles.map((trouble, i) => (
                <article key={trouble.title} className={styles.trouble}>
                  <h3 className={styles.groupTitle}>
                    <span className={styles.number}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {trouble.title}
                  </h3>
                  <dl className={styles.steps2}>
                    <div>
                      <dt>{d("labels.situation")}</dt>
                      <dd>{trouble.situation}</dd>
                    </div>
                    {trouble.task ? (
                      <div>
                        <dt>{d("labels.task")}</dt>
                        <dd>{trouble.task}</dd>
                      </div>
                    ) : null}
                    {trouble.action.length > 0 ? (
                      <div>
                        <dt>{d("labels.action")}</dt>
                        <dd>
                          <ul className={styles.list}>
                            {trouble.action.map((line) => (
                              <li key={line}>{line}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    ) : null}
                    <div>
                      <dt>{d("labels.outcome")}</dt>
                      <dd>
                        <ul className={styles.list}>
                          {trouble.outcome.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className={styles.section}>
            <h2 className={styles.title}>{d("sections.ai")}</h2>
            <p className={styles.body}>{raw<string>("ai")}</p>
            <p className={styles.note}>{raw<string>("aiNote")}</p>
          </section>
        </Reveal>

        <Reveal>
          <section className={styles.section}>
            <h2 className={styles.title}>{d("sections.result")}</h2>
            <ul className={styles.list}>
              {result.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <ul className={`${styles.list} ${styles.limits}`}>
              {limits.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section className={styles.section}>
            <h2 className={styles.title}>{d("sections.learned")}</h2>
            <div className={styles.groups}>
              {learned.map((group) => (
                <div key={group.title}>
                  <h3 className={styles.groupTitle}>{group.title}</h3>
                  <ul className={styles.list}>
                    {group.items.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      </article>

      <nav className={styles.bottom} aria-label={d("nav")}>
        <Link href="/#projects" className={styles.move}>
          <ArrowLeft size={16} aria-hidden="true" />
          {d("back")}
        </Link>
      </nav>
    </main>
  );
}
