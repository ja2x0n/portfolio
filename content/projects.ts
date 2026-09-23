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
    team: "Frontend 1 · Backend 2 · AI 2",
    stack: [
      "React",
      "React Router",
      "Axios",
      "CSS Modules",
      "Zustand",
      "WebSocket",
      "STOMP",
    ],
    tools: ["Figma", "Codex", "Browser DevTools", "E2E"],
    image: "/images/projects/capteam.png",
  },
] as const;
