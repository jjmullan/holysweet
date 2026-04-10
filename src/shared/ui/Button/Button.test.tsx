import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

// describe : 관련 테스트들을 하나의 그룹으로 묶는다
describe("Button 컴포넌트", () => {
  // ────────────────────────────────────────────
  // 1. 렌더링 테스트 — 화면에 제대로 그려지는지 확인
  // ────────────────────────────────────────────
  it("label 텍스트가 화면에 렌더링된다", () => {
    render(<Button label="저장" />);

    // screen.getByText : 텍스트로 DOM 요소를 찾는다 (없으면 에러)
    expect(screen.getByText("저장")).toBeInTheDocument();
  });

  it("disabled prop이 true면 버튼이 비활성화된다", () => {
    render(<Button label="저장" disabled />);

    // getByRole : 접근성 역할(role)로 요소를 찾는다
    expect(screen.getByRole("button", { name: "저장" })).toBeDisabled();
  });

  // ────────────────────────────────────────────
  // 2. 인터랙션 테스트 — 사용자 행동을 시뮬레이션
  // ────────────────────────────────────────────
  it("클릭하면 onClick 핸들러가 호출된다", async () => {
    // userEvent.setup() : 실제 브라우저처럼 이벤트를 순서대로 발생시킨다
    const user = userEvent.setup();

    // jest.fn() : 호출 여부를 추적할 수 있는 가짜(mock) 함수
    const handleClick = jest.fn();

    render(<Button label="저장" onClick={handleClick} />);

    await user.click(screen.getByRole("button", { name: "저장" }));

    // toHaveBeenCalledTimes : 함수가 정확히 N번 호출됐는지 확인
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disabled 상태에서 클릭해도 onClick이 호출되지 않는다", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button label="저장" disabled onClick={handleClick} />);

    await user.click(screen.getByRole("button", { name: "저장" }));

    // toHaveBeenCalledTimes(0) = not.toHaveBeenCalled()
    expect(handleClick).not.toHaveBeenCalled();
  });
});
