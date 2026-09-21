/**
 * 기술 스택 구조. 기술명은 번역하지 않으므로 여기에 둔다.
 * 사용 맥락 문구는 messages/{locale}.json 의 TechStack.desc 에 있다.
 */
export const skillGroups = [
  {
    id: "frontend",
    items: [
      { name: "React", desc: "react" },
      { name: "React Router", desc: "reactRouter" },
      { name: "JavaScript", desc: "javascript" },
      { name: "Next.js", desc: "learning" },
      { name: "TypeScript", desc: "learning" },
    ],
  },
  {
    id: "stateData",
    items: [
      { name: "Zustand", desc: "zustand" },
      { name: "Axios", desc: "axios" },
    ],
  },
  {
    id: "styling",
    items: [
      { name: "CSS Modules", desc: "cssModules" },
      { name: "Tailwind CSS", desc: "learning" },
    ],
  },
  {
    id: "validation",
    items: [
      { name: "E2E Test", desc: "e2e" },
      { name: "Codex", desc: "codex" },
    ],
  },
] as const;
