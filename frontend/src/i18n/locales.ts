export const locales = ["zh-CN", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh-CN";
export const localeCookie = "voira-locale";

const localeLabels: Record<Locale, string> = {
  "zh-CN": "中文",
  en: "EN",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localeLabel(locale: Locale) {
  return localeLabels[locale];
}

export function localeFromPathname(pathname: string): Locale | null {
  const segment = pathname.split("/")[1] ?? "";
  return isLocale(segment) ? segment : null;
}

export function withLocale(pathname: string, locale: Locale) {
  const current = localeFromPathname(pathname);
  if (current)
    return pathname.replace(new RegExp(`^/${current}`), `/${locale}`);
  if (pathname === "/") return `/${locale}`;
  return `/${locale}${pathname}`;
}

function matchLanguage(tag: string): Locale | null {
  const normalized = tag.toLowerCase();
  if (normalized === "zh" || normalized.startsWith("zh-")) return "zh-CN";
  if (normalized === "en" || normalized.startsWith("en-")) return "en";
  return null;
}

export function negotiateLocale(
  acceptLanguage: string | null,
  cookie: string | undefined,
): Locale {
  if (cookie && isLocale(cookie)) return cookie;
  if (!acceptLanguage) return defaultLocale;
  const ranges = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", ...params] = part.trim().split(";");
      const quality = params
        .map((item) => item.trim())
        .find((item) => item.startsWith("q="));
      const q = quality ? Number(quality.slice(2)) : 1;
      return { tag: tag.trim(), q: Number.isFinite(q) ? q : 0 };
    })
    .filter((item) => item.tag && item.tag !== "*")
    .sort((left, right) => right.q - left.q);
  for (const range of ranges) {
    const locale = matchLanguage(range.tag);
    if (locale) return locale;
  }
  return defaultLocale;
}
