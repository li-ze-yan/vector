import { Breadcrumb } from "@/components";
import { getSectionAndTitleBySlug } from "@/lib/ClientUtils";
import { getDocPageSlugs } from "@/lib/ServerUtils";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getDocPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function DocsTitle(props: Params) {
  const params = await props.params;
  const sectionAndTitle = getSectionAndTitleBySlug(params.slug);
  if (!sectionAndTitle) return null;

  return <Breadcrumb section={sectionAndTitle.section} title={sectionAndTitle.title} />;
}
