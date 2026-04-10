import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  // [BRANCH_NAME] type: subject 형식 파싱
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[(.+)\] (\w+): (.+)$/,
      headerCorrespondence: ["scope", "type", "subject"],
    },
  },
  rules: {
    // type 목록 제한
    "type-enum": [
      2,
      "always",
      [
        "init", // 최초 레포지토리 연동
        "feat", // 새로운 기능
        "fix", // 버그 수정
        "docs", // 문서 변경
        "style", // 코드 포맷 (기능 변경 없음)
        "refactor", // 리팩토링
        "test", // 테스트 추가/수정
        "chore", // 빌드 설정, 패키지 관리 등
        "revert", // 커밋 되돌리기
        "a11y", // 웹 접근성
      ],
    ],
    // type은 소문자로
    "type-case": [2, "always", "lower-case"],
    // subject(제목)는 비어있으면 안 됨
    "subject-empty": [2, "never"],
    // subject 끝에 마침표 금지
    "subject-full-stop": [2, "never", "."],
    // subject 대소문자 제한 해제 (한국어, 고유명사 허용)
    "subject-case": [0],
  },
};

export default config;
