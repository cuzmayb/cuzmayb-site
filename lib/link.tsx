"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { href } from "@/lib/t";
import { useLang } from "@/lib/use-lang";

// next/link that stays in the page's language: "/blog" becomes "/en/blog" on an English page.
export function Link({ href: to, ...rest }: Omit<ComponentProps<typeof NextLink>, "href"> & { href: string }) {
  return <NextLink href={href(useLang(), to)} {...rest} />;
}
