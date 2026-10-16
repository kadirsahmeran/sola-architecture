import Link from "next/link";
import { StudioImage } from "@/components/ui/StudioImage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageIntro } from "@/components/ui/PageIntro";
import { articleText, getPosts } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { formatDate, readingMinutes } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Mimarlık Günlüğü",
  description:
    "Işık, eşik, renovasyon, proje brief’i ve malzeme paleti üzerine stüdyo notları.",
  path: "/blog",
  image: "/images/u/stairs.jpg",
});

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Ana Sayfa", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <PageIntro
        eyebrow="Günlük"
        title="Mimarlık Günlüğü"
        text="Tasarım kararlarının nedenini anlatan kısa yazılar. Kategoriler: mimari tasarım, iç mimarlık, renovasyon, proje rehberleri ve malzeme."
      />
      <div className="editorial grid gap-16 pb-28">
        {posts.map((post, index) => (
          <article
            key={post.slug}
            className={index === 0 ? "grid items-center gap-8 lg:grid-cols-12" : "grid gap-6 border-t border-ink/15 pt-10 md:grid-cols-12"}
          >
            <Link
              href={`/blog/${post.slug}`}
              className={index === 0 ? "group relative block aspect-[16/10] lg:col-span-7" : "group relative block aspect-[16/10] md:col-span-4"}
            >
              <StudioImage
                src={post.cover.src}
                alt={post.cover.alt}
                sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 768px) 30vw, 100vw"}
                priority={index === 0}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </Link>
            <div className={index === 0 ? "lg:col-span-4 lg:col-start-9" : "md:col-span-7 md:col-start-6"}>
              <p className="text-xs tracking-[0.16em] text-accent uppercase">{post.category}</p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">
                <Link href={`/blog/${post.slug}`} className="link-underline">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-4 leading-7 text-muted">{post.excerpt}</p>
              <p className="mt-4 text-sm text-muted">
                {formatDate(post.publishedAt)} · {readingMinutes(articleText(post))} dk
              </p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
