import { ArrowUp, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub, SiInstagram, SiVelog } from "react-icons/si";
import { channels, email } from "@/content/links";
import { Link } from "@/i18n/navigation";
import styles from "./Footer.module.css";

/** 채널 아이콘. LinkedIn 은 상표 문제로 Simple Icons 에서 빠져 Font Awesome 것을 쓴다. */
const icons: Record<string, React.ComponentType<{ size?: number }>> = {
  github: SiGithub,
  velog: SiVelog,
  linkedin: FaLinkedinIn,
  instagram: SiInstagram,
};

const navIds = ["about", "projects", "contact"] as const;

/**
 * 메인과 상세 페이지 아래에 공통으로 붙는다.
 * 배경과 글자색을 뒤집어 본문이 여기서 끝났다는 것을 보여 준다.
 */
export default async function Footer() {
  const t = await getTranslations("Footer");
  const note = t.raw("note") as string[];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.intro}>
            <p className={styles.name}>Heo Jae Won</p>
            <div className={styles.note}>
              {note.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <nav className={styles.nav} aria-label={t("navLabel")}>
            <p className={styles.navTitle}>{t("navLabel")}</p>
            <ul className={styles.list}>
              {navIds.map((id) => (
                <li key={id}>
                  {/* 상세 페이지에서도 언어를 유지해야 하므로 next-intl 의 Link 를 쓴다. */}
                  <Link className={styles.link} href={`/#${id}`}>
                    {t(`nav.${id}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.rights}>{t("rights")}</p>

          {/* 글자 없이 아이콘만 둔다. 이름은 aria-label 로 남긴다. */}
          <ul className={styles.socials}>
            <li>
              <a
                className={styles.social}
                href={`mailto:${email}`}
                aria-label="Email"
              >
                <Mail size={26} aria-hidden />
              </a>
            </li>
            {channels.map((channel) => {
              const Icon = icons[channel.id];
              return (
                <li key={channel.id}>
                  <a
                    className={styles.social}
                    href={channel.href}
                    aria-label={channel.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={26} />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* 상세 페이지에는 #home 이 없다. 빈 조각은 어느 문서에서나 맨 위로 간다. */}
          <a className={styles.toTop} href="#top">
            {t("top")}
            <ArrowUp size={16} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
