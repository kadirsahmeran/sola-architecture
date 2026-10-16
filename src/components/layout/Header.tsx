"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const { stop, start } = useSmoothScroll();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const [state, setState] = useState<"top" | "visible" | "hidden">("top");

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last;
      if (y < 24) setState("top");
      else if (delta > 12) setState("hidden");
      else if (delta < -12) setState("visible");
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      start();
      return;
    }
    document.body.style.overflow = "hidden";
    stop();
    return () => {
      document.body.style.overflow = "";
      start();
    };
  }, [open, start, stop]);

  const overHero = pathname === "/" && state === "top" && !open;
  const hidden = state === "hidden" && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "header-bar relative z-50",
          hidden ? "-translate-y-full" : "translate-y-0",
          overHero
            ? "bg-transparent text-paper"
            : "border-b border-ink/10 bg-canvas/85 text-ink backdrop-blur-md",
        )}
      >
        <div className="editorial flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="font-serif text-2xl tracking-[0.18em]">
            SOLA
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Ana menü">
            {navigation.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "link-underline text-[0.72rem] tracking-[0.16em] uppercase",
                    active && "text-accent",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/iletisim"
              className="link-underline hidden text-[0.72rem] tracking-[0.16em] uppercase sm:inline"
            >
              Projenizi Başlatalım
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobil-menu"
              onClick={() => setMenuPath((current) => (current === pathname ? null : pathname))}
            >
              {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
              <span className="sr-only">{open ? "Menüyü kapat" : "Menüyü aç"}</span>
            </button>
          </div>
        </div>
      </div>
      <MobileMenu open={open} pathname={pathname} onClose={() => setMenuPath(null)} />
    </header>
  );
}
