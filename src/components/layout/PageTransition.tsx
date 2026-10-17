"use client";

import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return children;
  return <div className="page-enter">{children}</div>;
}
