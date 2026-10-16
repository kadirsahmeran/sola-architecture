"use client";

import { motion, useReducedMotion } from "motion/react";

export function AnimatedText({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <h1 className={className}>
      {lines.map((line, index) => (
        <motion.span
          key={line}
          className="block"
          initial={reduce ? false : { y: 18 }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.85,
            delay: 0.08 + index * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {line}
        </motion.span>
      ))}
    </h1>
  );
}
