/**
 * 기술 스택 구조. 기술명은 번역하지 않으므로 여기에 둔다.
 * 사용 맥락 문구는 messages/{locale}.json 의 TechStack.desc 에 있다.
 * desc 키가 없는 기술은 이름만 표시한다.
 */
export const skillGroups = [
  {
    id: "frontend",
    items: [
      { name: "React", desc: "react" },
      { name: "React Router", desc: "reactRouter" },
      { name: "JavaScript" },
      { name: "Next.js", desc: "next" },
      { name: "TypeScript", desc: "typescript" },
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
      { name: "Responsive UI" },
      { name: "Tailwind CSS" },
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
