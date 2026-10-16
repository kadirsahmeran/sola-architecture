"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import "lenis/dist/lenis.css";

type SmoothScrollApi = {
  scrollTo: (target: string | number | HTMLElement) => void;
  stop: () => void;
  start: () => void;
};

const fallback: SmoothScrollApi = {
  scrollTo: (target) => {
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
      return;
    }
    const element = typeof target === "string" ? document.querySelector(target) : target;
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  },
  stop: () => {},
  start: () => {},
};

const SmoothScrollContext = createContext<SmoothScrollApi>(fallback);

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  const api = useMemo<SmoothScrollApi>(
    () => ({
      scrollTo: (target) => {
        const lenis = lenisRef.current;
        if (!lenis) {
          fallback.scrollTo(target);
          return;
        }
        if (typeof target === "number") lenis.scrollTo(target);
        else lenis.scrollTo(target, { offset: -12 });
      },
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }),
    [],
  );

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)");
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | null = null;
    const ticker = (time: number) => {
      lenis?.raf(time * 1000);
    };

    const enable = () => {
      if (lenis || !desktop.matches) return;
      lenis = new Lenis({ autoRaf: false, lerp: 0.085, smoothWheel: true });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();
    };

    const disable = () => {
      if (!lenis) return;
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenis = null;
      lenisRef.current = null;
    };

    const onChange = () => {
      if (desktop.matches) enable();
      else disable();
    };

    onChange();
    desktop.addEventListener("change", onChange);

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href^='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const element = document.querySelector(href);
      if (!(element instanceof HTMLElement)) return;
      event.preventDefault();
      if (lenisRef.current) lenisRef.current.scrollTo(element, { offset: -12 });
      else element.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", onClick);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      desktop.removeEventListener("change", onChange);
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      disable();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>
  );
}
