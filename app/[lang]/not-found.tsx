import type { Metadata } from "next";
import { Link } from "@/lib/link";
import { T, tr } from "@/lib/t";

export const metadata: Metadata = { title: "없는 페이지" };

export default function NotFound() {
  return (
    <>
      <h1 className="page"><T {...tr.notFound} /></h1>
      <p className="lede"><T {...tr.notFoundLede} /></p>
      <p>
        <Link href="/projects" className="back"><span className="arrow" aria-hidden="true">←</span> <T {...tr.projects} /></Link> · <Link href="/blog" className="back"><T {...tr.blog} /></Link>
      </p>
    </>
  );
}
