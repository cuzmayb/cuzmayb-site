import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Content Security Policy: the browser only loads what is listed here, so an injected script or a foreign host is refused.
// Pages are static, so inline scripts are allowed by 'unsafe-inline' rather than per-request nonces
// (docs: 01-app/02-guides/content-security-policy.md, "Without Nonces"). Add a host here when a new outside service is used.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://giscus.app https://www.googletagmanager.com${isDev ? " 'unsafe-eval'" : ""}`, // giscus: guestbook widget; googletagmanager: Google Analytics, when site.gaId is set
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'", // fonts are bundled (Pretendard from npm, Space Grotesk through next/font)
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com",
  `connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com${isDev ? " ws:" : ""}`,
  "frame-src https://giscus.app https://www.youtube-nocookie.com", // guestbook widget, intro video
  "frame-ancestors 'none'", // nobody can put this site inside a frame (clickjacking)
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }, // browsers ignore this over plain http (localhost)
];

const nextConfig: NextConfig = {
  // Static markdown site: no Cache Components / PPR needed.
  devIndicators: false, // the dev-only "N" badge covered the bonder; errors still show
  poweredByHeader: false, // do not advertise the framework
  // Korean lives at the bare addresses; inside the app it is the "ko" language like the other two.
  async rewrites() {
    return [
      { source: "/", destination: "/ko" },
      // Two rules per case, exact and nested. One rule with ":path*" turns "/projects" into "/ko/projects/" (trailing
      // slash), and on Vercel a client-side navigation to that address answered 500 for sections that have child pages.
      { source: "/:section(projects|blog|concepts|about|resume|guestbook|package|privacy)", destination: "/ko/:section" },
      { source: "/:section(projects|blog|concepts|about|resume|guestbook|package|privacy)/:path+", destination: "/ko/:section/:path+" },
      // Any other bare address is Korean too, so an unknown one gets the site's 404 instead of the framework's.
      { source: "/:first((?!(?:ko|en|zh)(?:/|$))[^/.]+)", destination: "/ko/:first" },
      { source: "/:first((?!(?:ko|en|zh)(?:/|$))[^/.]+)/:path+", destination: "/ko/:first/:path+" },
    ];
  },
  // Old addresses keep working. The exploded view used to live at /mk1.
  async redirects() {
    return [
      // The old Vercel address sends everyone to the real domain, path kept.
      { source: "/:path*", has: [{ type: "host", value: "cuzmayb.vercel.app" }], destination: "https://cuzmayb.com/:path*", permanent: true },
      { source: "/mk1", destination: "/package", permanent: true },
      { source: "/:lang(ko|en|zh)/mk1", destination: "/:lang/package", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
