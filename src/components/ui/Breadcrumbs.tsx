import Link from "next/link";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/lib/site";

export type Crumb = {
  name: string;
  path: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };

  return (
    <nav aria-label="Sayfa yolu" className="editorial pt-28 md:pt-32">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs tracking-[0.14em] text-muted uppercase">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-3">
              {index > 0 ? <span aria-hidden>/</span> : null}
              {last ? (
                <span aria-current="page" className="text-ink">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="link-underline">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={data} />
    </nav>
  );
}
