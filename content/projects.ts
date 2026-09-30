/**
 * 대표 프로젝트. 이름·기간·팀 구성·기술은 번역하지 않으므로 여기에 둔다.
 * 한 줄 소개와 본문은 messages/{locale}.json 에 있다.
 * image는 사용자가 사진을 제공하면 public/images/projects/ 경로를 넣는다.
 */
export const projects = [
  {
    slug: "capteam",
    name: "CapTeam",
    period: "2026.03 — 2026.08",
    /** mine: 내가 맡은 자리. 화면에서 강조한다. */
    team: [
      { label: "Frontend 1", mine: true },
      { label: "Backend 2", mine: false },
      { label: "AI 2", mine: false },
    ],
    stack: ["React", "React Router", "Axios", "CSS Modules", "Zustand"],
    image: "/images/projects/capteam.png",
    /**
     * 서비스 아키텍처 다이어그램. 있는 프로젝트만 해당 섹션이 나온다.
     * 그림에 검은 배경이 칠해져 있어 화면에서도 어두운 도판으로 담는다.
     */
    architecture: {
      src: "/images/projects/capteam-architecture.png",
      width: 1693,
      height: 929,
    },
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ja2x0n/CapTeam-Frontend",
      },
    ],
  },
] as const;
