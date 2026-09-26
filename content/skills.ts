/**
 * 기술 스택 구조. 기술명은 번역하지 않으므로 여기에 둔다.
 * 사용 맥락 문구는 messages/{locale}.json 의 TechStack.desc 에 있다.
 */

/** 분류. 화면에서는 각 행 오른쪽에 라벨로 붙는다. */
export const skillGroupIds = ["frontend", "stateData", "styling"] as const;

export type SkillGroupId = (typeof skillGroupIds)[number];

export type Skill = {
  name: string;
  group: SkillGroupId;
  /**
   * 설명을 붙일 주요 기술의 messages 키(TechStack.points).
   * 이 값이 있으면 칩이 아니라 설명과 함께 위에 놓인다.
   */
  points?: string;
  /** public 기준 로고 경로 */
  logo: string;
  /** 아직 실제로 쓰지 않은 기술. 화면에서 사용 경험과 구분해 표시한다. */
  learning?: boolean;
  /**
   * 가로로 긴 글자형 로고. 아이콘형과 같은 규칙으로 맞추면 높이에 눌려 작아지므로
   * 폭을 더 쓰게 한다.
   */
  wordmark?: boolean;
};

export const skills: Skill[] = [
  {
    name: "React",
    group: "frontend",
    points: "react",
    logo: "/images/logos/react.png",
  },
  {
    name: "React Router",
    group: "frontend",
    logo: "/images/logos/react-router.png",
  },
  {
    name: "JavaScript",
    group: "frontend",
    points: "javascript",
    logo: "/images/logos/javascript.png",
  },
  {
    name: "Next.js",
    group: "frontend",
    logo: "/images/logos/nextjs.png",
    learning: true,
  },
  {
    name: "TypeScript",
    group: "frontend",
    logo: "/images/logos/typescript.png",
    learning: true,
  },
  {
    name: "Zustand",
    group: "stateData",
    logo: "/images/logos/zustand.png",
  },
  {
    name: "Axios",
    group: "stateData",
    logo: "/images/logos/axios.png",
    wordmark: true,
  },
  {
    name: "CSS Modules",
    group: "styling",
    logo: "/images/logos/css.png",
  },
  {
    name: "Tailwind CSS",
    group: "styling",
    logo: "/images/logos/tailwind.png",
    learning: true,
  },
];
