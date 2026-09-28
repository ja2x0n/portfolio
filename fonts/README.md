# 폰트

| 용도   | 폰트        | 출처                                                                  | 라이선스                  |
| ------ | ----------- | --------------------------------------------------------------------- | ------------------------- |
| 한국어 | Paperlogy   | [fonts-archive/Paperlogy](https://github.com/fonts-archive/Paperlogy) | SIL OFL, 상업적 사용 가능 |
| 일본어 | 시스템 폰트 | 내려받지 않는다 (`--font-ja`, `styles/tokens.css`)                    | 해당 없음                 |
| 영문   | Anybody     | Google Fonts (`next/font/google`)                                     | SIL OFL                   |

Paperlogy는 400, 600, 700 세 굵기만 받아 둔다. 300(Light)은 쓰는 곳이 없어 뺐다. 다른 굵기가 필요하면 위 저장소에서 같은 이름 규칙으로 받는다.

## 일본어를 웹폰트로 쓰지 않는 이유

M PLUS 1 을 `next/font` 로 쓰면 유니코드 범위별로 쪼개진 `@font-face` 가
358개 생기고, 그 CSS 270KB 가 **한국어·영어 페이지까지 따라와 렌더를 막는다.**
`/ko` 와 `/ja` 가 같은 `[locale]` 라우트라 로케일별로 갈라낼 수 없다.
동적 import 로도 안 된다는 것을 확인했다 (Issue #70, #72).

그래서 OS 에 이미 깔려 있는 글꼴만 쓴다. 목록은 `styles/tokens.css` 의
`--font-ja` 에 있다.
