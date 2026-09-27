/**
 * 기술 스택 구조. 기술명은 번역하지 않으므로 여기에 둔다.
 * 사용 맥락 문구는 messages/{locale}.json 의 TechStack.desc 에 있다.
 */

/** 분류. 화면에서는 각 행 오른쪽에 라벨로 붙는다. */
export const skillGroupIds = ["frontend", "stateData", "styling"] as const;

export type SkillGroupId = (typeof skillGroupIds)[number];

export type Skill = {
  /** messages 의 TechStack.desc 키 */
  id: string;
  name: string;
  group: SkillGroupId;
  /** public 기준 로고 경로 */
  logo: string;
  /** 아직 실제로 쓰지 않은 기술. 화면에서 사용 경험과 구분해 아래에 따로 둔다. */
  learning?: boolean;
  /**
   * 가로로 긴 글자형 로고. 아이콘형과 같은 규칙으로 맞추면 높이에 눌려 작아지므로
   * 폭을 더 쓰게 한다.
   */
  wordmark?: boolean;
};

/** 위에서부터 읽는 순서다. 실제로 쓴 기술을 앞에, 배우는 중인 기술을 뒤에 둔다. */
export const skills: Skill[] = [
  {
    id: "react",
    name: "React",
    group: "frontend",
    logo: "/images/logos/react.png",
  },
  {
    id: "javascript",
    name: "JavaScript",
    group: "frontend",
    logo: "/images/logos/javascript.png",
  },
  {
    id: "reactRouter",
    name: "React Router",
    group: "frontend",
    logo: "/images/logos/react-router.png",
  },
  {
    id: "zustand",
    name: "Zustand",
    group: "stateData",
    logo: "/images/logos/zustand.png",
  },
  {
    id: "axios",
    name: "Axios",
    group: "stateData",
    logo: "/images/logos/axios.png",
    wordmark: true,
  },
  {
    // TODO(decision): 설명이 이 저장소의 사용 방식에 기대고 있다. 다른 프로젝트 경험을 확인받아야 한다.
    id: "cssModules",
    name: "CSS Modules",
    group: "styling",
    logo: "/images/logos/css.png",
  },
  {
    // TODO(decision): 학습 범위와 이유를 초안으로 썼다. 사실 확인이 필요하다.
    id: "nextjs",
    name: "Next.js",
    group: "frontend",
    logo: "/images/logos/nextjs.png",
    learning: true,
  },
  {
    // TODO(decision): 학습 범위와 이유를 초안으로 썼다. 사실 확인이 필요하다.
    id: "typescript",
    name: "TypeScript",
    group: "frontend",
    logo: "/images/logos/typescript.png",
    learning: true,
  },
  {
    // TODO(decision): 학습 범위와 이유를 초안으로 썼다. 사실 확인이 필요하다.
    id: "tailwind",
    name: "Tailwind CSS",
    group: "styling",
    logo: "/images/logos/tailwind.png",
    learning: true,
  },
];
