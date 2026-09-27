/** 공개 연락 채널. 전화번호는 공개하지 않는다. */
export const email = "ja2x0n09@gmail.com";

/**
 * 이메일 외 채널. 채용 맥락이므로 GitHub·velog 를 앞에 둔다.
 * label 은 화면에 그대로 쓴다. LinkedIn 주소는 한글 이름이 퍼센트 인코딩된 형태라
 * 주소를 노출하지 않고 이름만 쓴다.
 */
export const channels = [
  { id: "github", href: "https://github.com/ja2x0n", label: "GitHub" },
  { id: "velog", href: "https://velog.io/@ja2x0n/posts", label: "velog" },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/%EC%9E%AC%EC%9B%90-%ED%97%88-1333233a1/",
    label: "LinkedIn",
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/7aexo_/",
    label: "Instagram",
  },
] as const;

export const githubUrl = "https://github.com/ja2x0n";
