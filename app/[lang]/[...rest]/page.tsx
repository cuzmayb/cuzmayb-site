import { notFound } from "next/navigation";

// Any address with no page of its own lands here, so the site's own 404 (../not-found.tsx) renders inside the layout.
export default function Rest() {
  notFound();
}
