import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AnimatedLink({
  href,
  children,
  className,
  light = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 text-sm tracking-[0.14em] uppercase",
        light ? "text-paper" : "text-ink",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-out group-hover:scale-x-100" />
      </span>
      <ArrowUpRight
        aria-hidden
        className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </Link>
  );
}
