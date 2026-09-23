"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./ProjectCarousel.module.css";

type Item = {
  slug: string;
  name: string;
  period: string;
  stack: string[];
  image: string | null;
  summary: string;
  role: string;
};

type Labels = {
  carousel: string;
  prev: string;
  next: string;
  period: string;
  role: string;
  stack: string;
  imagePlaceholder: string;
};

/** 원통 한 바퀴의 칸 수. 프로젝트가 적으면 번갈아 반복해 채운다. */
const MIN_SLOTS = 10;
/** 드래그 1px당 회전 각도 */
const DEG_PER_PX = 0.12;
/** 이 거리 이상 끌면 드래그로 보고, 최소 한 칸은 넘긴다. */
const SWIPE_PX = 40;
/** 손을 뗀 뒤 관성으로 더 미끄러지는 시간(ms). 놓는 속도에 곱해 목표를 정한다. */
const INERTIA_MS = 220;
/** 한 번의 드래그로 넘길 수 있는 최대 칸 수 */
const MAX_STEPS = 3;
/** 가로 휠을 이만큼 굴리면 한 칸 넘어간다. */
const WHEEL_PX = 90;

const mod = (a: number, b: number) => ((a % b) + b) % b;

/**
 * 3D 원형 Carousel. 카드를 원통 둘레에 두고 원통을 돌려 넘긴다. 자동으로 돌지 않는다.
 * 드래그하는 동안은 손을 따라 돌고, 놓으면 가장 가까운 카드에 맞춰 멈춘다.
 */
export default function ProjectCarousel({
  items,
  labels,
}: {
  items: Item[];
  labels: Labels;
}) {
  const total = items.length;
  // 칸 수를 프로젝트 수의 배수로 맞춰야 번갈아 놓은 순서가 이음새 없이 이어진다.
  const slots =
    total >= MIN_SLOTS ? total : total * Math.ceil(MIN_SLOTS / total);
  const angle = 360 / slots;

  // 몇 칸 돌렸는지. 한 방향으로 계속 돌 수 있도록 나머지를 취하지 않는다.
  const [step, setStep] = useState(0);
  // 마우스가 올라간 카드의 칸 번호. 없으면 null.
  const [hover, setHover] = useState<number | null>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  // 회전이 끝난 뒤 다시 판정하려면 마지막 마우스 위치가 필요하다.
  const pointer = useRef<{ x: number; y: number } | null>(null);
  // 놓는 순간의 속도를 알려면 마지막 움직임의 위치와 시각이 필요하다.
  const drag = useRef<{
    x: number;
    dx: number;
    lastX: number;
    lastT: number;
    v: number;
  } | null>(null);
  const wheel = useRef({ sum: 0, until: 0 });
  // 드래그로 끝난 입력에서 이어지는 click은 무시한다.
  const dragged = useRef(false);

  /**
   * 마우스가 어느 카드 위에 있는지 좌표로 직접 정한다.
   * 카드는 3D로 돌기 때문에 CSS :hover는 회전이 끝나도 이전 카드에 남거나
   * 보이는 카드와 다른 카드에 걸린다. 위치로 판정하면 회전 뒤에도 어긋나지 않는다.
   */
  const updateHover = () => {
    const point = pointer.current;
    const ring = ringRef.current;
    if (!point || !ring) {
      setHover(null);
      return;
    }
    let found: number | null = null;
    // 카드끼리 겹치는 자리에서는 앞에 있는(가운데에 가까운) 카드가 이긴다.
    let nearest = Infinity;
    Array.from(ring.children).forEach((child, i) => {
      const card = child as HTMLElement;
      const distance = Number(card.dataset.distance);
      if (distance >= 3 || distance >= nearest) return;
      const r = card.getBoundingClientRect();
      if (point.x < r.left || point.x > r.right) return;
      if (point.y < r.top || point.y > r.bottom) return;
      found = i;
      nearest = distance;
    });
    setHover(found);
  };

  const current = mod(step, slots) % total;

  const turn = (delta: number) => setStep((s) => s + delta);

  const setDrag = (deg: number) =>
    ringRef.current?.style.setProperty("--drag", `${deg}deg`);

  const release = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    ringRef.current?.removeAttribute("data-dragging");
    setDrag(0);
    dragged.current = Math.abs(d.dx) >= SWIPE_PX;
    if (!dragged.current) return;
    // 민 거리에 관성 거리를 더해 목표 칸을 정한다. 빠르게 튕기면 여러 칸을 지나간다.
    const projected = d.dx + d.v * INERTIA_MS;
    const steps =
      Math.round((projected * DEG_PER_PX) / angle) || Math.sign(d.dx);
    // 한 번에 너무 많이 돌면 어디로 갔는지 알기 어렵다.
    turn(-Math.max(-MAX_STEPS, Math.min(MAX_STEPS, steps)));
  };

  return (
    <div
      className={styles.root}
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.carousel}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") turn(-1);
        if (e.key === "ArrowRight") turn(1);
      }}
    >
      <div
        className={styles.stage}
        onPointerDown={(e) => {
          drag.current = {
            x: e.clientX,
            dx: 0,
            lastX: e.clientX,
            lastT: e.timeStamp,
            v: 0,
          };
          dragged.current = false;
          // 터치는 손가락이 영역 밖에서 떨어져도 pointerup을 받도록 붙잡는다.
          // 마우스까지 붙잡으면 카드 안 링크의 클릭이 이 영역으로 바뀐다.
          if (e.pointerType !== "mouse")
            e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (e.pointerType === "mouse") {
            pointer.current = { x: e.clientX, y: e.clientY };
            updateHover();
          }
          const d = drag.current;
          if (!d) return;
          d.dx = e.clientX - d.x;
          const dt = e.timeStamp - d.lastT;
          if (dt > 0) d.v = (e.clientX - d.lastX) / dt;
          d.lastX = e.clientX;
          d.lastT = e.timeStamp;
          if (Math.abs(d.dx) < 4) return;
          ringRef.current?.setAttribute("data-dragging", "");
          setDrag(d.dx * DEG_PER_PX);
        }}
        onPointerUp={release}
        onPointerCancel={release}
        onPointerLeave={(e) => {
          if (e.pointerType !== "mouse") return;
          pointer.current = null;
          setHover(null);
          release();
        }}
        // 트랙패드 가로 스크롤로도 넘긴다. 세로로 굴릴 때는 페이지 스크롤을 방해하지 않는다.
        onWheel={(e) => {
          if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
          if (e.timeStamp < wheel.current.until) return;
          wheel.current.sum += e.deltaX;
          if (Math.abs(wheel.current.sum) < WHEEL_PX) return;
          turn(Math.sign(wheel.current.sum));
          wheel.current = { sum: 0, until: e.timeStamp + 400 };
        }}
      >
        <div
          ref={ringRef}
          className={styles.ring}
          // 버튼이나 휠로 돌리면 마우스가 가만히 있어도 올라간 카드가 바뀐다.
          // 도는 동안의 위치로 판정하면 틀리므로 멈춘 뒤에 다시 본다.
          onTransitionEnd={updateHover}
          style={
            {
              "--turn": `${-step * angle}deg`,
              "--angle": `${angle}deg`,
            } as React.CSSProperties
          }
        >
          {Array.from({ length: slots }, (_, i) => {
            const item = items[i % total];
            const m = mod(i - step, slots);
            // 가운데에서 몇 칸 떨어졌는지. 음수는 왼쪽, 양수는 오른쪽.
            const offset = m > slots / 2 ? m - slots : m;
            const distance = Math.abs(offset);
            const isFront = offset === 0;
            return (
              <article
                key={i}
                className={styles.card}
                style={{ "--i": i } as React.CSSProperties}
                data-front={isFront}
                data-distance={Math.min(distance, 3)}
                data-hover={hover === i}
                aria-roledescription="slide"
                aria-label={`${(i % total) + 1} / ${total}`}
                // 반복해 채운 카드와 옆 카드는 스크린리더와 키보드에서 뺀다.
                aria-hidden={!isFront}
                tabIndex={isFront ? 0 : -1}
                // 옆 카드를 누르면 그 카드까지 돌린다.
                onClick={() => {
                  if (!isFront && !dragged.current) turn(offset);
                }}
              >
                <div className={styles.media}>
                  {item.image ? (
                    <Image
                      className={styles.photo}
                      src={item.image}
                      alt={item.name}
                      fill
                      draggable={false}
                      sizes="(min-width: 768px) 740px, 80vw"
                    />
                  ) : (
                    <span className={styles.placeholder}>
                      {labels.imagePlaceholder}
                    </span>
                  )}
                </div>

                {/* 사진 아래쪽을 점점 흐리게 하고 그 위에 설명을 얹는다. */}
                <div className={styles.info}>
                  <div className={styles.head}>
                    <h3 className={styles.name}>{item.name}</h3>
                    <p className={styles.period}>
                      <span className={styles.srOnly}>{labels.period} </span>
                      {item.period}
                    </p>
                  </div>
                  <p className={styles.summary}>{item.summary}</p>
                  {/* 역할·기술은 호버·포커스·탭으로 펼친다. */}
                  <div className={styles.more}>
                    <div>
                      <p className={styles.role}>
                        <span className={styles.srOnly}>{labels.role} </span>
                        {item.role}
                      </p>
                      <ul className={styles.tags} aria-label={labels.stack}>
                        {item.stack.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className={styles.bar}>
        <button
          type="button"
          className={styles.arrow}
          aria-label={labels.prev}
          onClick={() => turn(-1)}
        >
          <ChevronLeft size={20} />
        </button>
        <p className={styles.count} aria-live="polite">
          <span>{String(current + 1).padStart(2, "0")}</span> /{" "}
          {String(total).padStart(2, "0")}
        </p>
        <button
          type="button"
          className={styles.arrow}
          aria-label={labels.next}
          onClick={() => turn(1)}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
