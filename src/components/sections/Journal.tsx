import Link from "next/link";
import { StudioImage } from "@/components/ui/StudioImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { articleText, getPosts } from "@/lib/content";
import { formatDate, readingMinutes } from "@/lib/utils";

export function Journal() {
  const [featured, ...rest] = getPosts();
  if (!featured) return null;

  return (
    <section className="py-24 md:py-32">
      <div className="editorial">
        <div className="flex flex-col justify-between gap-6 border-b border-ink/10 pb-10 md:flex-row md:items-end">
          <div>
            <p className="label">08 — Günlük</p>
            <h2 className="mt-4 font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[0.92]">
              Mimarlık Günlüğü
            </h2>
          </div>
          <p className="max-w-sm text-muted">
            Işık, malzeme ve ölçü üzerine stüdyo masasından tutulan notlar.
          </p>
        </div>

        <article className="grid items-center gap-10 py-12 lg:grid-cols-12 lg:gap-16 lg:py-16">
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative block aspect-[16/10] overflow-hidden bg-canvas-2 lg:col-span-7"
          >
            <StudioImage
              src={featured.cover.src}
              alt={featured.cover.alt}
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
            />
          </Link>
          <div className="lg:col-span-5">
            <p className="text-[0.68rem] tracking-[0.18em] text-muted uppercase">
              {featured.category} · {formatDate(featured.publishedAt)} ·{" "}
              {readingMinutes(articleText(featured))} dk
            </p>
            <h3 className="mt-5 font-serif text-[clamp(2.4rem,4vw,4.2rem)] leading-[0.95]">
              <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
            </h3>
            <p className="mt-6 max-w-md text-base leading-7 text-muted">{featured.excerpt}</p>
            <div className="mt-8">
              <ButtonLink href={`/blog/${featured.slug}`}>Yazıyı oku</ButtonLink>
            </div>
          </div>
        </article>

        <ul className="grid gap-10 border-t border-ink/10 pt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {rest.map((post, index) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <p className="text-[0.68rem] tracking-[0.18em] text-accent uppercase">
                  {String(index + 2).padStart(2, "0")}
                </p>
                <div className="relative mt-4 aspect-[5/4] overflow-hidden bg-canvas-2">
                  <StudioImage
                    src={post.cover.src}
                    alt={post.cover.alt}
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-4 text-[0.68rem] tracking-[0.16em] text-muted uppercase">
                  {post.category}
                </p>
                <h3 className="mt-2 font-serif text-2xl leading-tight">
                  <span className="link-underline">{post.title}</span>
                </h3>
                <p className="mt-2 text-sm text-muted">{formatDate(post.publishedAt)}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <ButtonLink href="/blog">Tüm Yazılar</ButtonLink>
        </div>
      </div>
    </section>
  );
}
