"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { trapTab, useL } from "@/lib/use-lang";

// Video dialog opened from the home logo: dimmed, blurred backdrop and a 680x480 rounded card that plays
// the clip muted on loop with no controls. Esc, the close button or a click outside closes it.
export function IntroVideo({ src, onClose }: { src: string; onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);
  const L = useL();
  const title = L({ ko: "소개 영상", en: "Intro video", zh: "介绍视频" });

  useEffect(() => {
    close.current?.focus(); // keep keyboard focus on our page, not inside the embedded player
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); trapTab(e, [close.current]); };
    addEventListener("keydown", esc);
    document.documentElement.style.overflow = "hidden";
    return () => { removeEventListener("keydown", esc); document.documentElement.style.overflow = ""; };
  }, [onClose]);

  return createPortal(
    <div className="video-back" onClick={onClose}>
      <div className="video-card" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        {/* View-only: the player never takes pointer or keyboard focus, so Esc always reaches the page. */}
        {/\.(mp4|webm)$/i.test(src) ? (
          <video src={src} autoPlay muted loop playsInline tabIndex={-1} />
        ) : (
          <iframe
            src={src}
            title={title}
            tabIndex={-1}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
        <button ref={close} type="button" className="video-close" aria-label={L({ ko: "닫기", en: "Close", zh: "关闭" })} onClick={onClose}>×</button>
      </div>
    </div>,
    document.body,
  );
}
