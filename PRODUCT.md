# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The owner first. cuzmayb is a personal record of semiconductor work (process, packaging, thermal, signal integrity) that the owner keeps adding to and rereads. Other readers (recruiters, labs, fellow engineers) may arrive through a link, but no outside audience is the primary target. Confirmed 2026-11-19.

## Product Purpose

A place to keep projects and study notes as finished, readable writeups instead of scattered vault notes. Success: each project and post states what was assumed, what was found, and where the evidence stops, so the owner can come back to it later and trust it.

## Positioning

The tagline is **반도체 공부와 프로젝트 기록** (EN "Semiconductor studies and project notes", ZH "半导体学习与项目记录"; confirmed 2026-11-19), chosen to read plainly for recruiters, companies, colleagues and professors alike. "cause, maybe." is no longer used as a tagline. The name comes from "because, maybe" in Oasis's "Wonderwall"; the About page says so. Do not reinterpret it as "cause = 원인" in copy; that gloss was an earlier assistant invention, not the owner's meaning.

## Operating Context

- Source material lives in the owner's Obsidian vaults (`~/Obsidian/thermal-stack/`, `~/Obsidian/전공/`, the owner's folder under `~/Obsidian/HBM-team/`). Site content is copied in as edited Markdown, never linked to the vault directly.
- Content is Korean prose with technical terms, tables of numbers, and units (K/W, mA/cm², µm).
- Writing happens in Markdown files under `content/`; no CMS.

## Capabilities and Constraints

- Pages: home (opening screen, then a featured project and a "now" line), projects (timeline, filter by shared tag), project detail (with a Sources list), blog (filter by 관점 and keyword), post detail, concepts, about, resume.
- Next.js App Router, static generation from Markdown (gray-matter + marked). Deploy target Vercel; not yet deployed.
- Deferred on purpose: comments, view counts, guestbook, login, games.
- Undecided: English version (not requested), custom domain.

## Brand Commitments

- Name: cuzmayb (lowercase), from "because, maybe" (Oasis, "Wonderwall"). Also the owner's email handle.
- Owner wants to be identified with semiconductors.
- Visual inspiration the owner offered: England (owner is a Jude Bellingham fan) and the Oasis reference. Use colours and mood only; never crests, kit logos, album art, band logos, or lyrics beyond the two words of the name.

## Evidence on Hand

- Project writeups: `content/projects/*.md` (HBM bonding-layer void thermal detection, TGV copper filling capstone, GPU-HBM channel SI, 3D contest cooling rack, coin cell post-analysis).
- Posts: `content/blog/*.md`.
- Report figures and photos may be used (capstone OM cross-sections, contest renders, plots). Originals under `~/my/`.
- Absent and not to be fabricated: contest result, HFSS SI numbers (pending), real HBM product measurements.

## Product Principles

1. Every number has a source; limits and what was not done are stated next to results.
2. Written for rereading: structure and tables over persuasion.
3. Real names: the owner's name appears only as the About greeting ("안녕하세요, 정효준입니다" / "Hi, I'm Hyojun Jung"), added back 2026-11-19 at the owner's request; the site itself goes by cuzmayb. No teammates' or professors' names. Roles only.
4. Resume page, school, department and GPA are back (2026-11-20, owner's request, reversing the removal earlier that day). `/resume` shows the English resume (`lib/resume.ts`, PDF from `npm run resume:pdf`); About states school, graduation date and GPA 4.05/4.5. Phone, birth date, home address and personal email stay off the site.
