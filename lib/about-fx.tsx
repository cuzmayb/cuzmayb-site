"use client";

import { useEffect } from "react";

// About page: the small drawings beside some items (notepad, runner) start moving once they reach the middle of the screen,
// and pause whenever they are off screen, picking up where they stopped when they come back.
// The page body is static HTML from markdown, so this only flips a data attribute; the motion itself is CSS.
export function AboutFx() {
  useEffect(() => {
    const notes = document.querySelectorAll<SVGElement>(".ab-pic");
    // The bottom half of the window is cut off the observed area, so "intersecting" means the notebook's top has passed the middle.
    const started = new WeakSet<Element>();
    // Off screen the loops are paused (animation-play-state), so they cost nothing while nobody sees them.
    const seen = new IntersectionObserver((entries) => {
      for (const e of entries) if (started.has(e.target)) e.target.toggleAttribute("data-open", e.isIntersecting);
    });
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        started.add(e.target);
        e.target.setAttribute("data-open", "");
        io.unobserve(e.target);
        seen.observe(e.target);
      }
    }, { rootMargin: "0px 0px -50% 0px" });
    notes.forEach((n) => io.observe(n));
    return () => { io.disconnect(); seen.disconnect(); };
  }, []);
  return null;
}
