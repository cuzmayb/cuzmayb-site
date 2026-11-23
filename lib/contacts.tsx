import { site } from "@/lib/site";

const icon = { width: 21, height: 21, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

const links = [
  {
    label: "GitHub",
    href: site.github,
    svg: <svg {...icon}><path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></svg>,
  },
  {
    label: "Email",
    href: site.email && `mailto:${site.email}`,
    svg: <svg {...icon}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>,
  },
  {
    label: "LinkedIn",
    href: site.linkedin,
    svg: <svg {...icon}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0" /></svg>,
  },
];

// Icon-only links (each named for screen readers and on hover).
export function Contacts() {
  return (
    <div className="contacts">
      <ul>
        {links
          .filter((l) => l.href)
          .map((l) => (
            <li key={l.label}>
              <a href={l.href!} aria-label={l.label} title={l.label} {...(l.href!.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                {l.svg}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
