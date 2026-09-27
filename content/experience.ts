/**
 * Experience 표시 순서. 최신이 위에 온다.
 * 기간과 설명 문구는 언어마다 다르므로 messages/{locale}.json 의 Experience.items 에 있다.
 */

/** 수상. 활동과 나눠 앞에 크게 둔다. */
export const awardIds = [
  "capteam",
  "hackathon",
  "portfolioAward",
  "jichini",
] as const;

/** 활동과 이력. 연도로 묶어 "진행 중" 이 줄마다 반복되지 않게 한다. */
export const activityGroups = [
  { year: "2026", ids: ["classLeader", "wine", "sports"] },
  { year: "2025", ids: ["scholarship", "singapore"] },
] as const;

/** 학력. 맨 아래에 따로 크게 둔다. */
export const educationId = "school";
