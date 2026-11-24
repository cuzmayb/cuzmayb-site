import { Link } from "@/lib/link";
import { pick } from "@/lib/article";
import { ArticleEnhance, CopyMenu } from "@/lib/article-tools";
import { related, type Entry, type Lang } from "@/lib/content";
import { Mark } from "@/lib/mark";
import { SemFigure } from "@/lib/fig/sem/figure";
import { dateTr, kw, LANG_TAG, T, tr } from "@/lib/t";

// Blog post, laid out like the reference: centred 684px column, breadcrumb + 48px title + author line,
// a sticky side column (date, reading time, copy) on wide screens, 18px body.
export function PostArticle({ e, lang: cur }: { e: Entry; lang: Lang }) {
  const rel = related(e);
  // Blog posts and concept notes share this layout; only the way back differs.
  const home = e.kind === "concepts" ? { href: "/concepts", name: tr.concepts, back: tr.backConcepts } : { href: "/blog", name: tr.blog, back: tr.backBlog };
  return (
    <article className="post">
      <ArticleEnhance tocs={{ ko: e.l.ko.toc, en: e.l.en.toc, zh: e.l.zh.toc }} />
      {[cur].map((lang) => {
        const p = e.l[lang];
        return (
          <div key={lang} className={`lb lb-${lang}`} lang={p.translated ? LANG_TAG[lang] : "ko"}>
            <header className="post-hero">
              <div className="post-crumb">
                <Link href={home.href}><T {...home.name} /></Link>
                <span aria-hidden="true">/</span>
                <span>{p.groupLabel ?? (e.keyword ? kw(e.keyword)[lang] : p.view)}</span>
              </div>
              <h1 className="post-title">{p.title}</h1>
              <div className="post-author">
                <span className="post-avatar"><Mark size={18} /></span>
                <span className="post-author-text">
                  <strong>cuzmayb</strong>
                  <span><T ko="반도체 공부와 프로젝트 기록" en="Semiconductor studies and project notes" zh="半导体学习与项目记录" /></span>
                </span>
              </div>
              {!p.translated && <p className="untranslated"><T {...tr.koreanOnly} /></p>}
            </header>

            <div className="post-grid">
              <aside className="post-side">
                <time dateTime={e.date}><T {...dateTr(e.date)} /></time>
                <span>{p.minutes}<T {...tr.minRead} /></span>
                {p.view && <span>{p.view}</span>}
                <CopyMenu title={p.title} raw={p.raw} />
                {p.toc.length >= 2 && (
                  <nav className="toc-side" aria-label={{ ko: "목차", en: "Contents", zh: "目录" }[lang]}>
                    {p.toc.map((t) => (
                      <a key={t.id} href={`#${t.id}`}>
                        <span className="dash" aria-hidden="true" />
                        <span>{t.text}</span>
                      </a>
                    ))}
                  </nav>
                )}
              </aside>
              <div className="post-body">
                <p className="post-lede">{p.summary}</p>
                {/* A `<div data-fig="name"></div>` line in the markdown is where a live figure goes; the prose is split around it. */}
                {p.html.split(/<div data-fig="(\w+)"><\/div>/).map((part, i) =>
                  i % 2 ? <Figure key={i} name={part} lang={lang} /> : <div key={i} className="prose" dangerouslySetInnerHTML={{ __html: part }} />,
                )}
                <div className="tags">
                  {p.tags.map((t) => (
                    <span key={t}>#{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="post-foot">
        {rel.length > 0 && (
          <section className="related">
            <h2><T {...tr.related} /></h2>
            <ul>
              {rel.map((r) => (
                <li key={r.kind + r.slug}>
                  <Link href={`/${r.kind}/${r.slug}`}>
                    <span className="kind"><T {...(r.kind === "projects" ? tr.kindProject : tr.kindPost)} /></span> <T {...pick(r, "title")} /> <span className="arrow" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <Link href={home.href} className="back">
          <span className="arrow" aria-hidden="true">←</span> <T {...home.back} />
        </Link>
      </div>
    </article>
  );
}

const FIGURES: Record<string, (props: { lang: Lang }) => React.ReactNode> = { sem: SemFigure };
const Figure = ({ name, lang }: { name: string; lang: Lang }) => {
  const F = FIGURES[name];
  return F ? <F lang={lang} /> : null;
};
