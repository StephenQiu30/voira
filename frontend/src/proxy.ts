import { NextResponse, type NextRequest } from "next/server";
import {
  localeCookie,
  localeFromPathname,
  negotiateLocale,
  withLocale,
} from "./i18n/locales";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (localeFromPathname(pathname)) return;
  const locale = negotiateLocale(
    request.headers.get("accept-language"),
    request.cookies.get(localeCookie)?.value,
  );
  const url = request.nextUrl.clone();
  url.pathname = withLocale(pathname, locale);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api|.*\\..*).*)"],
};
