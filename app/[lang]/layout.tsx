import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Link } from "@/lib/link";
import { Header } from "@/lib/header";
import { site } from "@/lib/site";
import { PageIn } from "@/lib/page-in";
import { Toaster } from "@/lib/toast";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css"; // body font, served from this site (no outside CDN)
import "../globals.css";
import { asLang } from "@/lib/meta";
import { LANG_TAG, LANGS, type Tr } from "@/lib/t";
import { LangProvider } from "@/lib/use-lang";

// Display face for the name; body text is Pretendard (loaded below), the same pairing dotorian uses.
const display = Space_Grotesk({ subsets: ["latin"], weight: ["600"], variable: "--font-display" });

const TAGLINE: Tr = { ko: "반도체 공부와 프로젝트 기록.", en: "Semiconductor studies and project notes.", zh: "半导体学习与项目记录。" };
type P = { params: Promise<{ lang: string }> };

// One root layout per language: /… is Korean (rewritten to /ko in next.config.ts), /en/… and /zh/… are the others.
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const lang = asLang((await params).lang);
  // Canonical and alternate-language addresses are set per page (lib/meta.ts), since each page knows its own path.
  return { metadataBase: new URL(site.url), title: { default: "cuzmayb", template: "%s | cuzmayb" }, description: TAGLINE[lang] };
}

export default async function RootLayout({ children, params }: { children: React.ReactNode } & P) {
  const lang = asLang((await params).lang);
  return (
    <html lang={LANG_TAG[lang]} data-lang={lang} data-theme="light" className={display.variable} suppressHydrationWarning>
      <head>
        {/* Apply saved night mode before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}` }} />
      </head>
      <body>
        <LangProvider lang={lang}>
        <a href="#main" className="skip">Skip to content</a>
        <Header />
        <main id="main">
          <PageIn>{children}</PageIn>
        </main>
        <footer className="foot">
          <div className="foot-in">
          <nav className="foot-links" aria-label="Footer">
            <a href={site.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={`mailto:${site.email}`}>Email</a>
            {site.linkedin && <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
          </nav>
          <span className="foot-legal">© 2026 cuzmayb <Link href="/privacy">Privacy</Link></span>
          </div>
        </footer>
        <Toaster />
        </LangProvider>
      </body>
    </html>
  );
}
