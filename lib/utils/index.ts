import fs from "node:fs/promises";
import path from "node:path";

const js = String.raw;

export const darkModeScript = js`
  if (!('_updateTheme' in window)) {
    window._updateTheme = function updateTheme(theme) {
      let classList = document.documentElement.classList;

      classList.remove("light", "dark", "system");
      document.querySelectorAll('meta[name="theme-color"]').forEach(el => el.remove())
      if (theme === 'dark') {
        classList.add('dark')

        let meta = document.createElement('meta')
        meta.name = 'theme-color'
        meta.content = 'oklch(.13 .028 261.692)'
        document.head.appendChild(meta)
      } else if (theme === 'light') {
        classList.add('light')

        let meta = document.createElement('meta')
        meta.name = 'theme-color'
        meta.content = 'white'
        document.head.appendChild(meta)
      } else {
        classList.add('system')

        let meta1 = document.createElement('meta')
        meta1.name = 'theme-color'
        meta1.content = 'oklch(.13 .028 261.692)'
        meta1.media = '(prefers-color-scheme: dark)'
        document.head.appendChild(meta1)

        let meta2 = document.createElement('meta')
        meta2.name = 'theme-color'
        meta2.content = 'white'
        meta2.media = '(prefers-color-scheme: light)'
        document.head.appendChild(meta2)
      }
    }

    try {
      _updateTheme(localStorage.currentTheme)
    } catch (_) {}

    try {
      if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
        document.documentElement.classList.add('os-macos')
      }
    } catch (_) {}
  }
`;

export async function getDocPageSlugs() {
  const docsDir = path.join(process.cwd(), "docs");
  const slugs = [];
  for (const file of await fs.readdir(docsDir)) {
    if (!file.endsWith(".mdx")) continue;
    slugs.push(path.parse(file).name);
  }
  return slugs;
}

export async function getDocPageBySlug(
  slug: string,
): Promise<null | { Component: React.FC; title: string; description: string }> {
  try {
    const filePath = path.join(process.cwd(), "docs", `${slug}.mdx`);
    debugger;
    const stat = await fs.stat(filePath).catch(() => null);
    if (!stat) {
      return null;
    }

    const mdxModule = await import(`@/docs/${slug}.mdx`);
    if (!mdxModule.default) {
      return null;
    }

    return {
      Component: mdxModule.default,
      title: mdxModule.title,
      description: mdxModule.description,
    };
  } catch (e) {
    debugger;

    console.error(e);
    return null;
  }
}
