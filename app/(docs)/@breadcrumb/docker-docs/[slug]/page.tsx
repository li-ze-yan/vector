import { Breadcrumb } from "@/components";
import { getSectionAndTitleBySlug } from "@/lib/client-utils";
import { DockerDocConfig } from "@/lib/doc-config";
import { getDocPageSlugs } from "@/lib/server-utils";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getDocPageSlugs("docker-docs");
  return slugs.map((slug) => ({ slug }));
}

export default async function DocsTitle(props: Params) {
  const params = await props.params;
  const sectionAndTitle = getSectionAndTitleBySlug(params.slug, DockerDocConfig, "docker-docs");
  if (!sectionAndTitle) return null;

  return <Breadcrumb section={sectionAndTitle.section} title={sectionAndTitle.title} />;
}
