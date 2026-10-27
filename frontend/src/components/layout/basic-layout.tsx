import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
export function BasicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        跳转到主要内容
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
          <Link href="/" className="brand" aria-label="声伴 Voira 首页">
            <span className="brand-mark" aria-hidden="true" />
            声伴 · Voira
          </Link>
          <ThemeToggle />
        </header>
        <main id="main-content" className="site-content" tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer">
          <span>AI 生成形象</span>
          <span>声伴 · Voira</span>
        </footer>
      </div>
    </div>
  );
}
