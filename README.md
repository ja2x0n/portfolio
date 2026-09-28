# Portfolio

프론트엔드 개발자 허재원의 개인 포트폴리오 사이트입니다.

**https://ja2x0n-portfolio.kro.kr**

## 기능

- 한국어·영어·일본어 (`/ko`, `/en`, `/ja`)
- 라이트·다크 모드
- Home → About → Values → Tech Stack → Projects → Experience → Contact 한 페이지 구성
- 프로젝트 상세 페이지 (`/[locale]/projects/[slug]`)

## 스택

| 구분   | 사용                                          |
| ------ | --------------------------------------------- |
| 코어   | Next.js 16 (App Router), React 19, TypeScript |
| 스타일 | CSS Modules, CSS 변수 (`styles/tokens.css`)   |
| 다국어 | next-intl                                     |
| 테마   | next-themes                                   |
| 모션   | motion                                        |
| 테스트 | Playwright (E2E)                              |
| 배포   | Vercel                                        |

## 실행

```bash
npm install
npm run dev
```

| 명령                | 설명           |
| ------------------- | -------------- |
| `npm run dev`       | 개발 서버      |
| `npm run build`     | 운영 빌드      |
| `npm run lint`      | ESLint         |
| `npm run typecheck` | 타입 검사      |
| `npm run format`    | Prettier 정리  |
| `npm run test:e2e`  | Playwright E2E |

E2E 는 dev 서버가 아니라 운영 빌드를 띄워서 돈다. 처음 실행하면 브라우저를 내려받는다.

```bash
npx playwright install chromium
```

## 폴더

```
app/[locale]/   페이지와 레이아웃
components/     Header, 섹션 공통 래퍼, 섹션
content/        번역하지 않는 데이터 (기술명, 경력 순서, 링크)
messages/       언어별 문구
i18n/           언어 라우팅
styles/         디자인 토큰, 전역 스타일
fonts/          직접 호스팅하는 폰트와 라이선스
e2e/            Playwright 테스트
public/         이미지, 로고
```

## 작업 방식

Issue → 브랜치(`타입-번호-작업명`) → 커밋 전 컨펌 → PR → Squash merge.
자세한 규칙은 [docs/rules/agent-workflow.md](docs/rules/agent-workflow.md)에 있습니다.

## AI 활용

이 저장소의 코드는 상당 부분을 AI(Claude)와 함께 작성했습니다. 커밋 메시지의
`Co-Authored-By` 가 그 기록입니다.

설계 판단, 콘텐츠의 사실 관계, 최종 검토는 직접 했습니다. AI가 만든 결과는
화면·Network 탭·E2E·모바일 뷰포트로 확인한 뒤 반영했습니다.
