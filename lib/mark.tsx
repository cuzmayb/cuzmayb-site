"use client";

import { useEffect, useState } from "react";

// Stacked dies: the site's mark. On hover (or when `replay` changes) the dies lift slightly and re-seat
// one by one, bottom first. A started stack always finishes; re-entry while playing is ignored.
export function Mark({ size = 22, replay = 0 }: { size?: number; replay?: number }) {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    if (replay) setPlay(true);
  }, [replay]);
  return (
    <svg
      className="mark"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      data-play={play}
      onPointerEnter={() => setPlay(true)}
      onAnimationEnd={(e) => (e.target as Element).getAttribute("data-top") && setPlay(false)}
    >
      {[17, 12.5, 8, 3.5].map((y, i) => (
        <rect
          key={y}
          className="die"
          data-top={i === 3 ? "1" : undefined}
          style={{ "--i": i } as React.CSSProperties}
          x={3 + i}
          y={y}
          width={18 - i * 2}
          height={3.2}
          rx={0.8}
          fill="currentColor"
          opacity={1 - i * 0.18}
        />
      ))}
    </svg>
  );
}
