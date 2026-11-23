"use client";

import { Link } from "@/lib/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Burger } from "@/lib/burger";
import { Mark } from "@/lib/mark";
import { PillNav } from "@/lib/pill-nav";
import { Prefs } from "@/lib/prefs";
import { bare } from "@/lib/t";

export function Header() {
  const path = usePathname();
  const [hidden, setHidden] = useState(false);

  // Slide away while reading down, come back on the first scroll up.
  useEffect(() => {
    let last = scrollY;
    const on = () => {
      const y = scrollY;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 80);
      last = y;
    };
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  if (bare(path) === "/") return null; // the home page is its own navigation
  return (
    <header className="top" data-hidden={hidden}>
      <div className="top-in">
        <Burger />
        <Link href="/" className="brand">
          <Mark /> <span className="brand-text">cuzmayb</span>
        </Link>
        <PillNav className="pills" />
        <Prefs inline />
      </div>
    </header>
  );
}
