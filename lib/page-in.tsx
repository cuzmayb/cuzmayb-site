"use client";

import { usePathname } from "next/navigation";

// Page transition: each navigation remounts the page wrapper, which fades in (opacity only).
export function PageIn({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div key={path} className="page-in">
      {children}
    </div>
  );
}
