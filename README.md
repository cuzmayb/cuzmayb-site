# cuzmayb

Personal site: semiconductor study notes and project records, in Korean, English and Chinese.
Next.js (App Router), content as Markdown, no database.
Each language has its own address: Korean at `/…`, English at `/en/…`, Chinese at `/zh/…` (pages live under `app/[lang]/`; `next.config.ts` rewrites the bare addresses to `ko`).

## Credits

The site design (layout and page structure) is based on the homepage of [Dotorian](https://dotorian.kro.kr) ([GitHub](https://github.com/bluealmond33-debug)), used with their permission (2026-11-19) on condition of credit. The content, the stacked-die mark, the 3D-stack motion and the project pages are my own.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Where things are

- `content/projects`, `content/blog`: one `slug.md` per entry (Korean, the source), with `slug.en.md` / `slug.zh.md` next to it. Frontmatter fields are listed in `lib/content.ts`.
- `content/about*.md`: the About page.
- `lib/resume.ts`: the resume page; `RESUME_URL=https://cuzmayb.vercel.app npm run resume:pdf` rewrites `public/resume*.pdf` from the deployed pages. Links inside the PDF take the address it was printed from, so printing from `localhost` (the default) leaves localhost links.
- Project frontmatter `sources:` (list of `label`, optional `href`): papers, reports, code and data behind the numbers, shown as a Sources section.
- `lib/site.ts` `featured`: the project shown on the home page.
- `lib/site.ts`: links (GitHub, email, LinkedIn, giscus, intro video). A `null` value hides that link everywhere.
- `app/globals.css`: all styles.

## Deploy

- `NEXT_PUBLIC_SITE_URL`: the public address, used by the sitemap, robots.txt and link previews.
