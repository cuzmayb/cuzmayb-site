// One place for links. A null value hides that link everywhere.
export const site = {
  // Public address, used for absolute links (sitemap, robots, link previews). Set NEXT_PUBLIC_SITE_URL when deploying.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")).replace(/\/$/, ""),
  github: "https://github.com/cuzmayb",
  email: "cuzmayb@gmail.com",
  linkedin: "https://www.linkedin.com/in/cuzmayb" as string | null,
  resume: "/resume.pdf" as string | null, // regenerate after deploying: RESUME_URL=https://cuzmayb.vercel.app npm run resume:pdf (printing from localhost leaves localhost links)
  // Guestbook uses giscus (GitHub Discussions). Fill from https://giscus.app once the repo is public.
  giscus: null as null | { repo: string; repoId: string; category: string; categoryId: string },
  // Logo click opens this clip: a YouTube link (watch, youtu.be or shorts URL; ?t= / &start= is kept)
  // or a video file you have the rights to, placed in public/ (e.g. "/intro.mp4").
  introVideo: null as string | null, // TODO: e.g. "https://www.youtube.com/watch?v=XXXXXXXXXXX&t=42"
};

// YouTube link -> privacy-enhanced embed that autoplays muted, loops, and hides controls (like the reference dialog).
export function youtubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|\/shorts\/|\/embed\/)([\w-]{11})/);
  if (!m) return null;
  const id = m[1];
  const t = url.match(/[?&](?:t|start)=(\d+)/)?.[1];
  const q = new URLSearchParams({ autoplay: "1", mute: "1", loop: "1", playlist: id, controls: "0", playsinline: "1", rel: "0", modestbranding: "1" });
  if (t) q.set("start", t);
  return `https://www.youtube-nocookie.com/embed/${id}?${q}`;
}

export const nav = [
  { href: "/projects", key: "projects" },
  { href: "/blog", key: "blog" },
  { href: "/concepts", key: "concepts" },
  { href: "/about", key: "about" },
  { href: "/resume", key: "resume" },
] as const;
