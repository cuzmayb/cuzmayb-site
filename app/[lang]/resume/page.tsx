import type { Metadata } from "next";
import { asLang, pageMeta } from "@/lib/meta";
import { Link } from "@/lib/link";
import { activities, certification, education, interest, language, military, name, projects, skills, type Row } from "@/lib/resume";
import { activitiesKo, educationKo, interestKo, licenseKo, nameKo, personalKo, projectsKo, skillsKo, summaryKo, trainingKo } from "@/lib/resume-ko";
import { awardsZh, campusZh, certZh, educationZh, intentZh, nameZh, personalZh, projectsZh, selfZh, skillsZh } from "@/lib/resume-zh";
import { site } from "@/lib/site";
import { T, tr } from "@/lib/t";

type P = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  return pageMeta(asLang((await params).lang), "/resume", { title: { ko: "이력서", en: "Resume", zh: "简历" }, description: { ko: "학력, 프로젝트, 수상, 도구를 한 장으로 정리한 이력서.", en: "Education, projects, awards and tools on one page.", zh: "一页整理的学历、项目、获奖与工具。" } });
}

const W = (w: Row["when"]) => (typeof w === "string" ? w : <T {...w} />);

function Body({ r }: { r: Row }) {
  return (
    <>
      {r.title && (
        <strong>
          <T {...r.title} />
          {r.href && <span className="cv-go" aria-hidden="true">→</span>}
        </strong>
      )}
      {r.sub && <small><T {...r.sub} /></small>}
      {r.points && (
        <ul className="cv-points">
          {r.points.map((p, i) => <li key={i}><T {...p} /></li>)}
        </ul>
      )}
    </>
  );
}

// Each row with an href opens the project (or post) that tells the whole story.
function Section({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <section className="cv-sec">
      <h2>{title}</h2>
      <ul>
        {rows.map((r, i) => (
          <li key={i}>
            <span className="cv-when">{W(r.when)}</span>
            {r.href ? (
              <Link href={r.href} className="cv-what cv-link"><Body r={r} /></Link>
            ) : (
              <div className="cv-what"><Body r={r} /></div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

// Three different documents, one per site language, each written to that market's conventions and with its own PDF:
// Korean resume (lib/resume-ko.ts), Chinese 简历 (lib/resume-zh.ts), English CV (lib/resume.ts, below).
function ZhResume() {
  return (
    <div className="cv" lang="zh-CN">
      <header className="cv-head">
        <h1 className="page">个人简历</h1>
        <p className="cv-name">{nameZh}</p>
        <p className="cv-print">{site.email} · {site.github.replace("https://", "")}</p>
        <p className="cv-personal">{personalZh}</p>
        <p className="cv-interest">{intentZh}</p>
        <a className="cv-pdf" href="/resume-zh.pdf" download>下载 PDF</a>
      </header>
      <Section title="教育背景" rows={educationZh} />
      <Section title="科研与项目经历" rows={projectsZh} />
      <Section title="专业技能" rows={skillsZh} />
      <Section title="证书与培训" rows={certZh} />
      <Section title="荣誉奖项" rows={awardsZh} />
      <Section title="校园经历" rows={campusZh} />
      <section className="cv-sec">
        <h2>自我评价</h2>
        <ul className="cv-points cv-summary">
          {selfZh.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </section>
    </div>
  );
}

// Korean order follows Korean semiconductor hiring guides: personal line (with military service) and target role,
// education with major courses, job training, projects, skills split by equipment / process / tools, then languages,
// licences, awards and activities.
function KoResume() {
  return (
    <div className="cv" lang="ko">
      <header className="cv-head">
        <h1 className="page">이력서</h1>
        <p className="cv-name">{nameKo}</p>
        <p className="cv-print">{site.email} · {site.github.replace("https://", "")}</p>
        <p className="cv-personal">{personalKo}</p>
        <p className="cv-interest">{interestKo}</p>
        <a className="cv-pdf" href="/resume-ko.pdf" download>PDF 받기</a>
      </header>
      <section className="cv-sec">
        <h2>핵심 역량</h2>
        <ul className="cv-points cv-summary">
          {summaryKo.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </section>
      <Section title="학력" rows={educationKo} />
      <Section title="직무 교육 · 실습" rows={trainingKo} />
      <Section title="프로젝트 경험" rows={projectsKo} />
      <Section title="보유 기술" rows={skillsKo} />
      <Section title="어학 · 자격" rows={licenseKo} />
      <Section title="수상 · 대외활동" rows={activitiesKo} />
    </div>
  );
}

export default async function Resume({ params }: P) {
  const lang = asLang((await params).lang);
  if (lang === "ko") return <KoResume />;
  if (lang === "zh") return <ZhResume />;
  return (
    <div className="cv">
      <header className="cv-head">
        <h1 className="page"><T {...tr.resume} /></h1>
        <p className="cv-name">{name}</p>
        <p className="cv-print">{site.email} · {site.github.replace("https://", "")}</p>
        <p className="cv-interest">{interest}</p>
        {site.resume && <a className="cv-pdf" href={site.resume} download><T ko="PDF 받기" en="Download PDF" zh="下载 PDF" /></a>}
      </header>
      <div lang="en">
        <Section title="EDUCATION" rows={education} />
        <Section title="RESEARCH & PROJECTS" rows={projects} />
        <Section title="TECHNICAL SKILLS" rows={skills} />
        <Section title="FAB TRAINING & CERTIFICATIONS" rows={certification} />
        <Section title="HONORS & ACTIVITIES" rows={activities} />
        <Section title="LANGUAGES" rows={language} />
        <Section title="MILITARY SERVICE" rows={military} />
      </div>
    </div>
  );
}
