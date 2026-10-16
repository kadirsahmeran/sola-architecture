"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { navigation } from "@/lib/site";

export function MobileMenu({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const node = panel.current;
    const closeButton = document.querySelector<HTMLElement>(
      "button[aria-controls='mobil-menu']",
    );
    const links = node?.querySelectorAll<HTMLElement>("a, button") ?? [];
    const focusable = [...(closeButton ? [closeButton] : []), ...Array.from(links)];
    focusable[1]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [open, onClose]);

  const list = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.05 },
    },
  };
  const item = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panel}
          id="mobil-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menü"
          className="fixed inset-0 z-40 overflow-y-auto bg-canvas text-ink lg:hidden"
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reduce ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.nav
            className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 py-24 text-center"
            variants={list}
            initial="hidden"
            animate="show"
          >
            {navigation.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <motion.div key={link.href} variants={item}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className="font-serif text-[clamp(2rem,8.5vw,3.75rem)] leading-none"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div variants={item} className="pt-6">
              <Link
                href="/iletisim"
                onClick={onClose}
                className="text-sm tracking-[0.18em] text-accent uppercase"
              >
                Projenizi Başlatalım
              </Link>
            </motion.div>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
