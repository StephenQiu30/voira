import Image from "next/image";
import Link from "next/link";
import { LocaleSwitch } from "@/components/locale-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Dictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";
export function BasicLayout({
  children,
  locale,
  copy,
}: {
  children: React.ReactNode;
  locale: Locale;
  copy: Dictionary["layout"];
}) {
  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        {copy.skip}
      </a>
      <div className="scene-surface">
        <div className="scene-background" aria-hidden="true">
          <Image
            className="scene-dark"
            src="/scenes/voira-studio-dark.png"
            alt=""
            fill
            sizes="100vw"
            preload
          />
          <Image
            className="scene-light"
            src="/scenes/voira-studio.png"
            alt=""
            fill
            sizes="100vw"
          />
        </div>
        <header className="site-header">
          <Link href={`/${locale}`} className="brand" aria-label={copy.home}>
            <span className="brand-mark" aria-hidden="true" />
            {copy.brand}
          </Link>
          <p className="room-status">
            <strong>{copy.standby}</strong>
            <span>{copy.roomClosed}</span>
          </p>
          <div className="header-actions">
            <LocaleSwitch locale={locale} label={copy.switchLocale} />
            <ThemeToggle label={copy.theme} />
          </div>
        </header>
        <main id="main-content" className="site-content" tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer">
          <span>{copy.generated}</span>
          <span>{copy.footerBrand}</span>
        </footer>
      </div>
    </div>
  );
}
