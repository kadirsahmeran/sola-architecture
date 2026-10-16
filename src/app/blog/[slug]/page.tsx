import Link from "next/link";
import { notFound } from "next/navigation";
import { StudioImage } from "@/components/ui/StudioImage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  articleText,
  getPost,
  getPosts,
  getRelatedPosts,
  getServicesBySlugs,
} from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { formatDate, readingMinutes } from "@/lib/utils";
import type { Metadata } from "next";

export const instant = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Yazı bulunamadı" };
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.cover.src,
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const headings = post.blocks.filter(
    (block): block is { type: "h2" | "h3"; id: string; text: string } =>
      block.type === "h2" || block.type === "h3",
  );
  const related = getRelatedPosts(post);
  const services = getServicesBySlugs(post.relatedServiceSlugs);
  const minutes = readingMinutes(articleText(post));

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: site.legalName },
    publisher: { "@type": "Organization", name: site.legalName },
    image: `${site.url}${post.cover.src}`,
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    articleSection: post.category,
  };

  return (
    <article>
      <Breadcrumbs
        items={[
          { name: "Ana Sayfa", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <header className="editorial max-w-4xl pb-10">
        <p className="label">{post.category}</p>
        <h1 className="mt-4 font-serif text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95]">
          {post.title}
        </h1>
        <p className="mt-6 text-sm text-muted">
          {post.author} · {formatDate(post.publishedAt)} · Güncelleme {formatDate(post.updatedAt)} ·{" "}
          {minutes} dk okuma
        </p>
      </header>
      <div className="editorial">
        <div className="relative aspect-[16/8] bg-canvas-2">
          <StudioImage
            src={post.cover.src}
            alt={post.cover.alt}
            sizes="100vw"
            priority
          />
        </div>
      </div>
      <div className="editorial grid gap-12 py-16 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <nav aria-label="İçindekiler" className="sticky top-28">
            <p className="label">İçindekiler</p>
            <ol className="mt-4 space-y-3 text-sm">
              {headings.map((heading) => (
                <li key={heading.id} className={heading.type === "h3" ? "pl-4" : undefined}>
                  <a href={`#${heading.id}`} className="link-underline">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
        <div className="max-w-2xl lg:col-span-7 lg:col-start-5">
          <nav aria-label="İçindekiler" className="mb-10 border-y border-ink/15 py-5 lg:hidden">
            <p className="label">İçindekiler</p>
            <ol className="mt-4 space-y-2 text-sm">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`} className="link-underline">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="space-y-6 text-lg leading-8">
            {post.blocks.map((block, index) => {
              if (block.type === "h2") {
                return (
                  <h2 id={block.id} key={block.id} className="scroll-mt-28 pt-6 font-serif text-4xl">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "h3") {
                return (
                  <h3 id={block.id} key={block.id} className="scroll-mt-28 pt-2 font-serif text-3xl">
                    {block.text}
                  </h3>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={`ul-${index}`} className="list-disc space-y-2 pl-5">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={`${block.text.slice(0, 24)}-${index}`}>{block.text}</p>;
            })}
          </div>
          {services.length > 0 ? (
            <div className="mt-14 border-t border-ink/15 pt-8">
              <p className="label">İlgili hizmetler</p>
              <ul className="mt-4 space-y-3">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/hizmetler/${service.slug}`} className="link-underline">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      {related.length > 0 ? (
        <section className="editorial pb-24">
          <h2 className="font-serif text-4xl">İlgili yazılar</h2>
          <ul className="mt-8 grid gap-8 md:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/blog/${item.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <StudioImage
                      src={item.cover.src}
                      alt={item.cover.alt}
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-4 text-xs tracking-[0.16em] text-accent uppercase">{item.category}</p>
                  <h3 className="mt-2 font-serif text-3xl">
                    <span className="link-underline">{item.title}</span>
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <JsonLd data={articleLd} />
    </article>
  );
}
