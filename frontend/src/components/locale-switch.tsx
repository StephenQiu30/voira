"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  localeCookie,
  localeLabel,
  locales,
  withLocale,
  type Locale,
} from "@/i18n/locales";

export function LocaleSwitch({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const next = locales.find((item) => item !== locale) ?? locale;
  return (
    <Button variant="glass" asChild>
      <Link
        href={withLocale(pathname, next)}
        hrefLang={next}
        aria-label={label}
        onClick={() => {
          document.cookie = `${localeCookie}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
        }}
      >
        <span lang={next}>{localeLabel(next)}</span>
      </Link>
    </Button>
  );
}
