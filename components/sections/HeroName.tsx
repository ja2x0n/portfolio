"use client";

import { useEffect, useRef } from "react";
import styles from "./Home.module.css";

/** 선택이 멈춘 뒤 칸이 사라지기 시작할 때까지 */
const HOLD_MS = 2000;
/** 칸 하나가 사라지고 다음 칸이 사라질 때까지 */
const STAGGER_MS = 70;

/**
 * 글자를 칸으로 나눈 히어로 이름.
 * 브라우저 선택 표시는 글자 밑 여백까지 칠하므로, 선택된 글자에 data-lit를 달아
 * 글자 높이에 맞춘 연한 파랑 칸을 대신 보여준다.
 * 선택이 2초 동안 그대로면 먼저 선택한 글자부터 차례로 칸이 사라진다.
 */
export default function HeroName({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const chars = [
      ...(ref.current?.querySelectorAll<HTMLElement>(`.${styles.char}`) ?? []),
    ];
    // 선택된 순서. 사라질 때도 이 순서를 따른다.
    let order: HTMLElement[] = [];
    let timers: number[] = [];
    const clearTimers = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };

    const onChange = () => {
      const sel = getSelection();
      const active = !!sel && !sel.isCollapsed;
      // 오른쪽에서 왼쪽으로 드래그하면 새로 잡힌 글자도 오른쪽부터 넣는다.
      const backward =
        active &&
        !!sel.anchorNode &&
        !!sel.focusNode &&
        !!(
          sel.anchorNode.compareDocumentPosition(sel.focusNode) &
          Node.DOCUMENT_POSITION_PRECEDING
        );

      for (const el of backward ? [...chars].reverse() : chars) {
        const selected = active && sel.containsNode(el, true);
        if (selected && !order.includes(el)) {
          order.push(el);
          el.dataset.lit = "";
        } else if (!selected && order.includes(el)) {
          order = order.filter((o) => o !== el);
          delete el.dataset.lit;
        }
      }

      clearTimers();
      if (!order.length) return;
      timers.push(
        window.setTimeout(() => {
          order.forEach((el, i) =>
            timers.push(
              window.setTimeout(() => delete el.dataset.lit, i * STAGGER_MS),
            ),
          );
        }, HOLD_MS),
      );
    };

    document.addEventListener("selectionchange", onChange);
    return () => {
      document.removeEventListener("selectionchange", onChange);
      clearTimers();
    };
  }, []);

  return (
    // 글자를 칸으로 나누면 한 글자씩 읽힐 수 있어 이름 전체를 이름표로 준다.
    <h1 ref={ref} className={styles.name} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={line} className={styles.line} aria-hidden="true">
          {/* 줄 사이 공백: 복사하면 "Heo Jae Won"이 되게 한다. */}
          {i > 0 && " "}
          <span>
            {/* 단어 사이 공백도 칸으로 만들어 JAE와 WON의 칸을 잇는다. */}
            {[...line].map((char, j) => (
              <span key={j} className={styles.char}>
                {char}
              </span>
            ))}
          </span>
        </span>
      ))}
    </h1>
  );
}
