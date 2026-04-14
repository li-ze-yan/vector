import { getDocPageBySlug, getDocPageSlugs } from "@/lib";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsProps } from "./type";

export async function generateStaticParams() {
  const slugs = await getDocPageSlugs();
  return slugs?.map((slug) => ({ slug }));
}

export async function generateMetadata(props: DocsProps): Promise<Metadata> {
  const params = await props.params;
  const post = await getDocPageBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title}`;

  return {
    metadataBase: new URL("https://tailwindcss.com"),
    title,
    description: post.description,
  };
}

export default async function DocPage(props: DocsProps) {
  const params = await props?.params;
  const post = await getDocPageBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <>
      {/* Add a placeholder div so the Next.js router can find the scrollable element. */}
      <div hidden />
      <div className="px-4 pt-10 pb-24 sm:px-40">
        <h1
          data-title="true"
          className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white"
        >
          {post.title}
        </h1>
        <p data-description="true" className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">
          {post.description}
        </p>

        <div className="prose mt-10" data-content="true">
          <post.Component />
        </div>
      </div>
    </>
  );
}
