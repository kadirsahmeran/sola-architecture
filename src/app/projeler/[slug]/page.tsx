import Link from "next/link";
import { notFound } from "next/navigation";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { LightboxGallery } from "@/components/projects/LightboxGallery";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getProject, getProjects, getRelatedProjects, getService } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const instant = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projeler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Proje bulunamadı" };
  return createMetadata({
    title: project.title,
    description: project.excerpt,
    path: `/projeler/${project.slug}`,
    image: project.cover.src,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projeler/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const service = getService(project.serviceSlug);
  const related = getRelatedProjects(project);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.excerpt,
    dateCreated: project.year,
    contentLocation: project.location,
    image: `${site.url}${project.cover.src}`,
    url: `${site.url}/projeler/${project.slug}`,
  };

  return (
    <article>
      <Breadcrumbs
        items={[
          { name: "Ana Sayfa", path: "/" },
          { name: "Projeler", path: "/projeler" },
          { name: project.title, path: `/projeler/${project.slug}` },
        ]}
      />
      <header className="editorial pb-10">
        <p className="label">{project.categoryLabel}</p>
        <h1 className="mt-4 max-w-4xl font-serif text-[clamp(3rem,7vw,6.2rem)] leading-[0.9]">
          {project.title}
        </h1>
        <dl className="mt-8 grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
          {[
            ["Konum", project.location],
            ["Yıl", project.year],
            ["Alan", project.area],
            ["Tür", project.categoryLabel],
          ].map(([label, value]) => (
            <div key={label} className="border-t border-ink/15 pt-3">
              <dt className="text-muted">{label}</dt>
              <dd className="mt-1">{value}</dd>
            </div>
          ))}
        </dl>
      </header>
      <div className="editorial">
        <ParallaxImage
          src={project.cover.src}
          alt={project.cover.alt}
          sizes="100vw"
          priority
          className="aspect-[16/9]"
        />
      </div>
      <div className="editorial grid gap-16 py-20 lg:grid-cols-12">
        <div className="space-y-5 text-lg leading-8 lg:col-span-7">
          <h2 className="font-serif text-4xl">Proje hikâyesi</h2>
          {project.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="space-y-5 leading-8 text-muted lg:col-span-4 lg:col-start-9">
          <h2 className="font-serif text-4xl text-ink">Tasarım yaklaşımı</h2>
          {project.approach.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {service ? (
            <Link href={`/hizmetler/${service.slug}`} className="link-underline inline-block text-ink">
              {service.title}
            </Link>
          ) : null}
        </div>
      </div>
      <div className="editorial pb-20">
        <h2 className="mb-8 font-serif text-4xl">Galeri</h2>
        <LightboxGallery images={project.gallery} label={project.title} />
      </div>
      <div className="editorial grid gap-10 pb-20 md:grid-cols-3">
        {project.materials.map((material) => (
          <div key={material.name} className="border-t border-ink/15 pt-5">
            <h3 className="font-serif text-3xl">{material.name}</h3>
            <p className="mt-3 leading-7 text-muted">{material.note}</p>
          </div>
        ))}
      </div>
      {project.plans.length > 0 ? (
        <div className="editorial pb-20">
          <h2 className="mb-8 font-serif text-4xl">Çizimler</h2>
          <LightboxGallery images={project.plans} label={`${project.title} çizimleri`} />
        </div>
      ) : null}
      {related.length > 0 ? (
        <div className="editorial pb-20">
          <h2 className="mb-10 font-serif text-4xl">Benzer projeler</h2>
          <div className="grid gap-10 md:grid-cols-2">
            {related.map((item) => (
              <ProjectCard key={item.slug} project={item} aspect="aspect-[16/10]" />
            ))}
          </div>
        </div>
      ) : null}
      <div className="bg-ink text-paper">
        <div className="editorial flex flex-col items-start gap-8 py-20 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-xl font-serif text-5xl leading-[0.95]">
            Bu tür bir işi konuşmak ister misiniz?
          </h2>
          <ButtonLink href="/iletisim" tone="dark">
            Projenizi Başlatalım
          </ButtonLink>
        </div>
      </div>
      <JsonLd data={jsonLd} />
    </article>
  );
}
