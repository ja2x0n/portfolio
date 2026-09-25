/**
 * 원이 퍼져 나갈 시작점을 요소에 적어 둔다.
 * 마우스가 들어온 자리에서 배경이 차오르게 하려면 좌표가 필요하다.
 */
export function setPointerOrigin(e: React.PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
}
