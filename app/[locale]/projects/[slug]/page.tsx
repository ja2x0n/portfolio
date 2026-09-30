import { ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import HoverButton from "@/components/HoverButton/HoverButton";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Reveal from "@/components/Reveal/Reveal";
import { projects } from "@/content/projects";
import { routing } from "@/i18n/routing";
import styles from "./page.module.css";

/** 제목과 항목으로 이루어진 묶음. 담당 역할과 배운 점에 쓴다. */
type Group = { title: string; desc?: string; items: string[] };
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
  const learned = raw<Group[]>("learned");

  return (
    <main className={styles.main}>
      <article className={styles.article}>
        <div className={styles.top}>
          <HoverButton
            href="/#projects"
            variant="ghost"
            icon={<ArrowLeft size={16} />}
            iconFirst
          >
            {d("back")}
          </HoverButton>
        </div>

        <header className={styles.hero}>
          <div className={styles.media}>
            {project.image ? (
              <Image
                className={styles.photo}
                src={project.image}
                alt={project.name}
                fill
                priority
                sizes="(min-width: 1200px) 1152px, 100vw"
              />
            ) : null}
          </div>

          {/* 사진 아래쪽만 흐리게 해서 그 위에 제목과 소개를 얹는다. */}
          <div className={styles.heroInfo}>
            <div>
              <div className={styles.head}>
                <h1 className={styles.name}>{project.name}</h1>
                {result[0] ? <p className={styles.award}>{result[0]}</p> : null}
              </div>
              <p className={styles.summary}>{t(`items.${slug}.summary`)}</p>
            </div>
            {project.links.length > 0 ? (
              <ul className={styles.links}>
                {project.links.map((link) => (
                  <li key={link.href}>
                    <HoverButton
                      href={link.href}
                      variant="onPhoto"
                      icon={<ArrowUpRight size={18} />}
                      external
                    >
                      {link.label}
                    </HoverButton>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </header>

        <section className={styles.cover}>
          <h2 className={styles.srOnly}>{d("labels.info")}</h2>
          <dl className={styles.meta}>
            <div>
              <dt>{t("period")}</dt>
              <dd>{project.period}</dd>
            </div>
            <div>
              <dt>{d("labels.team")}</dt>
              <dd className={styles.team}>
                {project.team.map((part) => (
                  <span key={part.label} data-mine={part.mine}>
                    {part.label}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>{t("role")}</dt>
              <dd>{t(`items.${slug}.role`)}</dd>
            </div>
            <div>
              <dt>{t("stack")}</dt>
              <dd>
                <ul className={styles.chips}>
                  {project.stack.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </section>

        <Reveal>
          <section className={styles.section}>
            <h2 className={styles.title}>{d("sections.problem")}</h2>
            <p className={styles.body}>
              {d.rich(`${slug}.problem`, { b: (chunks) => <b>{chunks}</b> })}
            </p>
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
              {flow.map((step, i) => (
                <li key={step} style={{ "--i": i } as React.CSSProperties}>
                  {step}
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        {project.architecture ? (
          <Reveal>
            <section className={styles.section}>
              <h2 className={styles.title}>{d("sections.architecture")}</h2>
              {/*
                그림에 검은 배경이 칠해져 있어 어두운 도판으로 담는다.
                원본이 1693px 라 좁은 화면에서는 줄이지 않고 가로로 넘긴다.
                줄이면 다이어그램 안의 글자가 읽히지 않는다.
              */}
              <figure className={styles.figure}>
                <div className={styles.figureScroll}>
                  <Image
                    className={styles.diagram}
                    src={project.architecture.src}
                    alt={d("architectureAlt")}
                    width={project.architecture.width}
                    height={project.architecture.height}
                    sizes="(min-width: 900px) 56rem, 900px"
                  />
                </div>
              </figure>
              <a
                className={styles.figureFull}
                href={project.architecture.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                {d("architectureFull")} ↗
              </a>
            </section>
          </Reveal>
        ) : null}

        <Reveal>
          <section className={styles.section}>
            <h2 className={styles.title}>{d("sections.role")}</h2>
            <div className={styles.groups}>
              {role.map((group) => (
                <div key={group.title}>
                  <h3 className={styles.groupTitle}>{group.title}</h3>
                  {group.desc ? (
                    <p className={styles.lead}>{group.desc}</p>
                  ) : null}
                  <ul className={`${styles.list} ${styles.sub}`}>
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
                <details
                  key={trouble.title}
                  className={styles.trouble}
                  open={i === 0}
                >
                  <summary className={styles.troubleHead}>
                    <span className={styles.number}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{trouble.title}</span>
                    <ChevronDown
                      className={styles.chevron}
                      size={18}
                      aria-hidden="true"
                    />
                  </summary>
                  <dl className={styles.steps2}>
                    <div>
                      <dt data-star="situation">{d("labels.situation")}</dt>
                      <dd>{trouble.situation}</dd>
                    </div>
                    {trouble.task ? (
                      <div>
                        <dt data-star="task">{d("labels.task")}</dt>
                        <dd>{trouble.task}</dd>
                      </div>
                    ) : null}
                    {trouble.action.length > 0 ? (
                      <div>
                        <dt data-star="action">{d("labels.action")}</dt>
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
                      <dt data-star="outcome">{d("labels.outcome")}</dt>
                      <dd>
                        <ul className={styles.list}>
                          {trouble.outcome.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </details>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className={styles.section}>
            <h2 className={styles.title}>{d("sections.ai")}</h2>
            <p className={styles.body}>
              {d.rich(`${slug}.ai`, { b: (chunks) => <b>{chunks}</b> })}
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section className={styles.section}>
            <h2 className={styles.title}>{d("sections.learned")}</h2>
            <div className={styles.notes}>
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
        <HoverButton
          href="/#projects"
          variant="ghost"
          icon={<ArrowLeft size={16} />}
          iconFirst
        >
          {d("back")}
        </HoverButton>
      </nav>
    </main>
  );
}
