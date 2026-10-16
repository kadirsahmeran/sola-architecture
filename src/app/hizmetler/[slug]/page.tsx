import Link from "next/link";
import { notFound } from "next/navigation";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  getProjectsForService,
  getService,
  getServices,
} from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const instant = false;

export function generateStaticParams() {
  return getServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/hizmetler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Hizmet bulunamadı" };
  return createMetadata({
    title: service.title,
    description: service.summary,
    path: `/hizmetler/${service.slug}`,
    image: service.image.src,
  });
}

export default async function ServicePage({ params }: PageProps<"/hizmetler/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const projects = getProjectsForService(service);
  const others = getServices().filter((item) => item.slug !== service.slug).slice(0, 3);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <article>
      <Breadcrumbs
        items={[
          { name: "Ana Sayfa", path: "/" },
          { name: "Hizmetler", path: "/hizmetler" },
          { name: service.title, path: `/hizmetler/${service.slug}` },
        ]}
      />
      <header className="editorial grid items-end gap-10 pb-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="label">{service.number}</p>
          <h1 className="mt-4 font-serif text-[clamp(3rem,6vw,5.8rem)] leading-[0.92]">
            {service.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{service.summary}</p>
        </div>
      </header>
      <div className="editorial">
        <ParallaxImage
          src={service.image.src}
          alt={service.image.alt}
          sizes="100vw"
          priority
          reveal
          className="aspect-[16/9]"
        />
      </div>
      <div className="editorial grid gap-12 py-20 lg:grid-cols-12">
        <div className="space-y-5 text-lg leading-8 lg:col-span-7">
          {service.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <h2 className="font-serif text-3xl">Kapsam</h2>
          <ul className="mt-6 space-y-4">
            {service.scope.map((item) => (
              <li key={item} className="border-t border-ink/15 pt-4">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <section className="bg-canvas-2">
        <div className="editorial grid gap-10 py-20 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl">Tasarım yaklaşımı</h2>
            <div className="mt-6 space-y-4 leading-8 text-muted">
              {service.approach.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <ol className="space-y-6">
            {service.process.map((step, index) => (
              <li key={step.title} className="border-t border-ink/15 pt-4">
                <p className="text-sm text-accent">0{index + 1}</p>
                <h3 className="mt-2 font-serif text-3xl">{step.title}</h3>
                <p className="mt-2 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      {projects.length > 0 ? (
        <section className="editorial py-20">
          <h2 className="font-serif text-4xl">İlgili projeler</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {projects.slice(0, 2).map((project) => (
              <ProjectCard key={project.slug} project={project} aspect="aspect-[16/10]" />
            ))}
          </div>
        </section>
      ) : null}
      <section className="editorial pb-20">
        <h2 className="mb-8 font-serif text-4xl">Sık sorulanlar</h2>
        <Accordion items={service.faqs} />
      </section>
      <section className="editorial pb-16">
        <h2 className="font-serif text-3xl">Diğer hizmetler</h2>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {others.map((item) => (
            <li key={item.slug}>
              <Link href={`/hizmetler/${item.slug}`} className="link-underline">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <div className="bg-ink text-paper">
        <div className="editorial flex flex-col items-start gap-8 py-20 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-xl font-serif text-5xl">Bu hizmetle başlayalım.</h2>
          <ButtonLink href="/iletisim" tone="dark">
            İletişime geçin
          </ButtonLink>
        </div>
      </div>
      <JsonLd data={faqLd} />
    </article>
  );
}
