import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  light:
    "btn-light border text-ink [--sweep:#242424] hover:text-paper",
  dark:
    "border border-white/35 bg-white/10 text-paper backdrop-blur-md [--sweep:#F5F3EF] hover:border-paper hover:text-ink",
};

export function ButtonLink({
  href,
  children,
  className,
  tone = "light",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: keyof typeof tones;
}) {
  return (
    <Link href={href} className={cn("btn-sweep group w-full sm:w-auto", tones[tone], className)}>
      {children}
      {tone === "light" ? (
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-ink transition-colors duration-300 group-hover:bg-paper/15 group-hover:text-paper">
          <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        </span>
      ) : (
        <ArrowRight aria-hidden className="h-3.5 w-3.5 shrink-0" />
      )}
    </Link>
  );
}
