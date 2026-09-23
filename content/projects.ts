/**
 * 대표 프로젝트. 이름·기간·기술은 번역하지 않으므로 여기에 둔다.
 * 한 줄 소개와 역할 문구는 messages/{locale}.json 의 Projects.items 에 있다.
 * image는 사용자가 사진을 제공하면 public/images/projects/ 경로를 넣는다.
 */
export const projects = [
  {
    slug: "capteam",
    name: "CapTeam",
    period: "2026.03 — 2026.08",
    stack: [
      "React",
      "React Router",
      "Axios",
      "CSS Modules",
      "Zustand",
      "WebSocket",
      "STOMP",
    ],
    image: "/images/projects/capteam.png",
  },
  {
    slug: "jichini",
    name: "JICHINI",
    period: "2026.01 — 2026.03",
    stack: ["React", "React Router", "CSS Modules", "WebSocket", "STOMP"],
    image: null,
  },
] as const;
