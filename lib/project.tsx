import { Link } from "@/lib/link";
import { pick } from "@/lib/article";
import { ArticleEnhance, CopyMenu } from "@/lib/article-tools";
import { getAll, related, type Entry, type Lang } from "@/lib/content";
import { Mark } from "@/lib/mark";
import { LANG_TAG, T, tr } from "@/lib/t";

// Project page, laid out like the reference: hero (kicker, mark + title, description | cover), a facts row,
// quick links + tools, a sticky section nav, then "Overview" (key results) and "Records" (the write-up).
export function ProjectArticle({ e, lang: cur }: { e: Entry; lang: Lang }) {
  const all = getAll("projects");
  const no = String(all.findIndex((p) => p.slug === e.slug) + 1).padStart(2, "0"); // newest = 01, the same number the list shows
  const rel = related(e);
  return (
    <article className="pj">
      <ArticleEnhance tocs={{ ko: e.l.ko.toc, en: e.l.en.toc, zh: e.l.zh.toc }} />
      {[cur].map((lang) => {
        const p = e.l[lang];
        return (
          <div key={lang} className={`lb lb-${lang}`} lang={p.translated ? LANG_TAG[lang] : "ko"}>
            <header className="pj-hero">
              <div className="pj-copy">
                <p className="pj-kicker">Project {no}</p>
                <div className="pj-titlerow">
                  <span className="pj-brand"><Mark size={28} /></span>
                  <h1 className="pj-title">{p.title}</h1>
                </div>
                <p className="pj-desc">{p.summary}</p>
                {!p.translated && <p className="untranslated"><T {...tr.koreanOnly} /></p>}
              </div>
              <figure className="pj-media">
                {e.cover ? <img src={e.cover} alt={p.coverCaption ?? ""} width={e.coverSize?.[0]} height={e.coverSize?.[1]} fetchPriority="high" /> : <span className="pj-media-empty"><Mark size={96} /></span>}
              </figure>
            </header>

            <dl className="pj-facts">
              <div><dt><T ko="기간" en="Period" zh="时间" /></dt><dd>{p.period}</dd></div>
              {p.team && <div><dt><T ko="팀" en="Team" zh="团队" /></dt><dd>{p.team}</dd></div>}
              {p.role && <div><dt><T ko="역할" en="Role" zh="角色" /></dt><dd>{p.role}</dd></div>}
              <div><dt><T ko="상태" en="Status" zh="状态" /></dt><dd>{p.status ?? <T ko="완료" en="Done" zh="已完成" />}</dd></div>
              {(p.result ?? p.findings[0]) && <div><dt><T ko="결과" en="Result" zh="结果" /></dt><dd>{p.result ?? p.findings[0]}</dd></div>}
            </dl>

            <div className="pj-utility">
              <div>
                <p className="pj-ulabel"><T ko="바로가기" en="Shortcuts" zh="快捷链接" /></p>
                <div className="pj-actions">
                  <CopyMenu title={p.title} raw={p.raw} />
                  {rel.slice(0, 2).map((r) => (
                    <Link key={r.kind + r.slug} href={`/${r.kind}/${r.slug}`} className="pj-action">
                      <span className="kind"><T {...(r.kind === "projects" ? tr.kindProject : tr.kindPost)} /></span>
                      <T {...pick(r, "title")} />
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="pj-ulabel"><T ko="기술과 도구" en="Tools" zh="技术与工具" /></p>
                <ul className="pj-tech">
                  {p.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </div>

            <nav className="pj-nav" aria-label={{ ko: "섹션", en: "Sections", zh: "章节" }[lang]}>
              {p.findings.length > 0 && <a href={`#${lang}-overview`}><T ko="개요" en="Overview" zh="概要" /></a>}
              {e.cover && p.coverCaption && <a href={`#${lang}-outputs`}><T ko="결과물" en="Outputs" zh="成果" /> <span>1</span></a>}
              <a href={`#${lang}-records`}><T ko="기록" en="Records" zh="记录" /> <span>{p.toc.length}</span></a>
              {e.sources.length > 0 && <a href={`#${lang}-sources`}><T ko="근거" en="Sources" zh="依据" /> <span>{e.sources.length}</span></a>}
            </nav>

            {p.findings.length > 0 && (
              <section className="pj-section" id={`${lang}-overview`}>
                <p className="pj-skicker">Overview</p>
                <h2 className="pj-stitle"><T ko="핵심 결과" en="Key results" zh="主要结果" /></h2>
                <ol className="pj-findings">
                  {p.findings.map((f, i) => (
                    <li key={f}><span className="pj-fnum">{String(i + 1).padStart(2, "0")}</span>{f}</li>
                  ))}
                </ol>
              </section>
            )}

            {e.cover && p.coverCaption && (
              <section className="pj-section" id={`${lang}-outputs`}>
                <p className="pj-skicker">Outputs</p>
                <h2 className="pj-stitle"><T ko="직접 확인할 수 있는 결과물" en="What you can look at" zh="可以直接查看的成果" /></h2>
                <figure className="fig">
                  <img src={e.cover} alt="" width={e.coverSize?.[0]} height={e.coverSize?.[1]} loading="lazy" />
                  <figcaption>{p.coverCaption}</figcaption>
                </figure>
              </section>
            )}

            <section className="pj-section" id={`${lang}-records`}>
              <p className="pj-skicker">Records</p>
              <h2 className="pj-stitle"><T ko="프로젝트 기록" en="Project record" zh="项目记录" /></h2>
              <div className="prose pj-prose" dangerouslySetInnerHTML={{ __html: p.html }} />
            </section>

            {e.sources.length > 0 && (
              <section className="pj-section" id={`${lang}-sources`}>
                <p className="pj-skicker">Sources</p>
                <h2 className="pj-stitle"><T ko="근거 자료" en="Sources" zh="依据资料" /></h2>
                <ol className="pj-sources">
                  {e.sources.map((s) => (
                    <li key={s.label}>{s.href ? <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label} <span aria-hidden="true">↗</span></a> : s.label}</li>
                  ))}
                </ol>
              </section>
            )}
          </div>
        );
      })}
      <div className="pj-foot">
        <Link href="/projects" className="back">
          <span className="arrow" aria-hidden="true">←</span> <T {...tr.backProjects} />
        </Link>
      </div>
    </article>
  );
}
