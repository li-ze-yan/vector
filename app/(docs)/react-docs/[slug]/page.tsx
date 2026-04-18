import { TableOfContents } from "@/components";
import { generateTableOfContents, getDocPageBySlug, getDocPageSlugs } from "@/lib/server-utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsProps } from "./type";

export async function generateStaticParams() {
  const slugs = await getDocPageSlugs("react-docs");
  return slugs?.map((slug) => ({ slug }));
}

export async function generateMetadata(props: DocsProps): Promise<Metadata> {
  const params = await props.params;
  const post = await getDocPageBySlug(params.slug, "react-docs");

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
  const [post, tableOfContents] = await Promise.all([
    getDocPageBySlug(params.slug, "react-docs"),
    generateTableOfContents(params.slug, "react-docs"),
  ]);

  if (!post) {
    return notFound();
  }

  return (
    <>
      {/* Add a placeholder div so the Next.js router can find the scrollable element. */}
      <div hidden />
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 xl:max-w-7xl xl:grid-cols-[minmax(0,1fr)_var(--container-2xs)]">
        <div className="px-4 pt-10 pb-24">
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
        <div className="max-xl:hidden">
          <div className="sticky top-14 max-h-[calc(100svh-3.5rem)] overflow-x-hidden px-6 pt-10 pb-24">
            <TableOfContents tableOfContents={tableOfContents} />
            {/* <RandomPromo /> */}
          </div>
        </div>
      </div>
    </>
  );
}
