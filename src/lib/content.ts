import { posts } from "@/data/posts";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import type { Post, Project, ProjectCategory, Service } from "@/types/content";

const categories = new Set<ProjectCategory>([
  "konut",
  "villa",
  "ic-mekan",
  "ticari",
  "renovasyon",
]);

export function isProjectCategory(value: string): value is ProjectCategory {
  return categories.has(value as ProjectCategory);
}

export function getProjects() {
  return projects;
}

export function getFeaturedProjects() {
  const order = [
    "yali-evi",
    "nord-isik",
    "zeytin-evi",
    "sahil-konutu",
    "tas-avlu",
    "atolye-on-iki",
    "perde-ev",
    "loft-yedi",
  ];
  return order
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: Project, limit = 2) {
  const same = projects.filter(
    (item) => item.slug !== project.slug && item.category === project.category,
  );
  const rest = projects.filter(
    (item) => item.slug !== project.slug && item.category !== project.category,
  );
  return [...same, ...rest].slice(0, limit);
}

export function getServices() {
  return services;
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getProjectsForService(service: Service) {
  return service.relatedProjectSlugs
    .map((slug) => getProject(slug))
    .filter((project): project is Project => Boolean(project));
}

export function getPosts() {
  return [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: Post, limit = 2) {
  const same = posts.filter(
    (item) => item.slug !== post.slug && item.category === post.category,
  );
  const rest = getPosts().filter(
    (item) => item.slug !== post.slug && item.category !== post.category,
  );
  return [...same, ...rest].slice(0, limit);
}

export function getServicesBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getService(slug))
    .filter((service): service is Service => Boolean(service));
}

export function articleText(post: Post) {
  return post.blocks
    .map((block) => {
      if (block.type === "ul") return block.items.join(" ");
      return block.text;
    })
    .join(" ");
}

export const projectFilters = [
  { id: "tumu", label: "Tümü" },
  { id: "konut", label: "Konut" },
  { id: "villa", label: "Villa" },
  { id: "ic-mekan", label: "İç Mekân" },
  { id: "ticari", label: "Ticari" },
  { id: "renovasyon", label: "Renovasyon" },
] as const;
