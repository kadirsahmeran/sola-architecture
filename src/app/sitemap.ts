import type { MetadataRoute } from "next";
import { getPosts, getProjects, getServices } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = site.contentUpdated;
  const staticRoutes = ["", "/projeler", "/hizmetler", "/hakkimizda", "/blog", "/iletisim"].map(
    (path) => ({
      url: `${site.url}${path || "/"}`,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const projectRoutes = getProjects().map((project) => ({
    url: `${site.url}/projeler/${project.slug}`,
    lastModified: updated,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const serviceRoutes = getServices().map((service) => ({
    url: `${site.url}/hizmetler/${service.slug}`,
    lastModified: updated,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postRoutes = getPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes, ...postRoutes];
}
