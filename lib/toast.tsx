"use client";

import { useEffect, useState } from "react";
import type { Lang, Tr } from "@/lib/t";

// toast({ ko, en, zh }) from anywhere; <Toaster /> in the layout shows one message at a time, in the site language.
export function toast(message: string | Tr) {
  const lang = (document.documentElement.dataset.lang as Lang) || "ko";
  window.dispatchEvent(new CustomEvent("cm-toast", { detail: typeof message === "string" ? message : message[lang] }));
}

export function Toaster() {
  const [msg, setMsg] = useState<{ text: string; id: number } | null>(null);
  useEffect(() => {
    let t = 0;
    const on = (e: Event) => {
      setMsg({ text: (e as CustomEvent<string>).detail, id: Date.now() });
      clearTimeout(t);
      t = window.setTimeout(() => setMsg(null), 2200);
    };
    window.addEventListener("cm-toast", on);
    return () => window.removeEventListener("cm-toast", on);
  }, []);
  return (
    <div className="toast-slot" role="status" aria-live="polite">
      {msg && (
        <div key={msg.id} className="toast">
          {msg.text}
        </div>
      )}
    </div>
  );
}
