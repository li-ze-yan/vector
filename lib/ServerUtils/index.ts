import { TOCEntry } from "@/components/TableOfContents/type";
import fs from "node:fs/promises";
import path from "node:path";

export async function getDocPageSlugs(subdir?: string) {
  const docsDir = path.join(process.cwd(), "docs", ...(subdir ? [subdir] : []));
  const slugs = [];
  for (const file of await fs.readdir(docsDir)) {
    if (!file.endsWith(".mdx")) continue;
    slugs.push(path.parse(file).name);
  }
  return slugs;
}

export async function getDocPageBySlug(
  slug: string,
  subdir?: string,
): Promise<null | { Component: React.FC; title: string; description: string }> {
  try {
    const filePath = path.join(process.cwd(), "docs", ...(subdir ? [subdir] : []), `${slug}.mdx`);
    const stat = await fs.stat(filePath).catch(() => null);
    if (!stat) {
      return null;
    }

    const mdxModule = subdir
      ? await import(`@/docs/${subdir}/${slug}.mdx`)
      : await import(`@/docs/${slug}.mdx`);
    if (!mdxModule.default) {
      return null;
    }

    return {
      Component: mdxModule.default,
      title: mdxModule.title,
      description: mdxModule.description,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function generateTableOfContents(slug: string, subdir?: string) {
  const filePath = path.join(process.cwd(), "docs", ...(subdir ? [subdir] : []), `${slug}.mdx`);
  // Check if the file exists
  if (!(await fs.stat(filePath).catch(() => false))) {
    return [];
  }

  const markdown = await fs.readFile(filePath, "utf8");

  return generateTableOfContentsFromMarkdown(markdown);
}

export async function generateTableOfContentsFromMarkdown(markdown: string) {
  const headings = [
    // Match Markdown and HTML headings (e.g., ## Heading, <h2>Heading</h2>)
    ...markdown.matchAll(
      /^(#+)\s+(.+)$|^<h([1-6])(?:\s+[^>]*\bid=["'](.*?)["'][^>]*)?>(.*?)<\/h\3>/gm,
    ),
  ].map((match) => {
    let level;
    let text;
    let slug;

    if (match[1]) {
      // Markdown headings
      level = match[1].length;
      text = match[2].trim().replaceAll("\\", "");
    } else {
      // HTML headings
      level = parseInt(match[3], 10); // Extract level from <hN>
      text = match[5].trim().replaceAll("\\", "");
      if (match[4]) {
        slug = `#${match[4]}`;
      }
    }

    // Generate slug
    slug ??= `#${text
      .replace(/`([^`]+)`/g, "$1") // Remove inline code formatting
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .toLowerCase()}`;

    return { level, text, slug, children: [] };
  });

  const toc: TOCEntry[] = [];
  const stack: TOCEntry[] = [{ level: 0, text: "", slug: "", children: toc }];

  const containsQuickReference = markdown.match(/\<ApiTable\s+rows=\{\[/);
  if (containsQuickReference) {
    toc.push({
      level: 0,
      text: "Quick reference",
      slug: "#quick-reference",
      children: [],
    });
  }

  for (const heading of headings) {
    while (stack[stack.length - 1].level >= heading.level) stack.pop();
    stack[stack.length - 1].children.push(heading);
    stack.push(heading);
  }

  return toc;
}
