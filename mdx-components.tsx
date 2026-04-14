import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import React from "react";

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (React.isValidElement(node)) {
    if (node.type === "small") {
      return "";
    }

    // @ts-expect-error -- ReactElement.props typing doesn't expose children
    return getTextContent(node.props.children);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  return ""; // If the node is neither text nor a React element
}

function slugify(str: React.ReactNode) {
  return getTextContent(str)
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Heading = ({ children }: React.PropsWithChildren) => {
    const slug = slugify(children);
    return React.createElement(`h${level}`, { id: slug }, [
      React.createElement(
        "a",
        {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        },
        children,
      ),
    ]);
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

const components = {
  // Allows customizing built-in components, e.g. to add styling.
  // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,

  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),

  a(props) {
    if (props.href?.startsWith("/plus") || props.href?.startsWith("https://tailwindcss.com/plus")) {
      return <a {...props} />;
    }

    return <Link {...(props as React.ComponentProps<typeof Link>)} />;
  },

  code({ children }) {
    if (typeof children !== "string") {
      return <code>{children}</code>;
    }

    if (children.startsWith("<")) {
      return <code>{children}</code>;
    }

    return (
      <code>
        {children
          .split(/(<[^>]+>)/g)
          .map((part, i) =>
            part.startsWith("<") && part.endsWith(">") ? <var key={i}>{part}</var> : part,
          )}
      </code>
    );
  },

  pre(props) {
    const child = React.Children.only(props.children) as React.ReactElement;
    if (!child) return null;

    const { className } = child.props as any;
    let { children: code } = child.props as any;
    const lang = className ? className.replace("language-", "") : "";
    let filename = undefined;

    // Extract `[!code filename:…]` directives from the first line of code
    const lines = code.split("\n");
    const filenameRegex = /\[\!code filename\:(.+)\]/;
    const match = lines[0].match(filenameRegex);
    if (match) {
      filename = match[1];
      code = lines.splice(1).join("\n");
    }

    return (
      <div>
        {/* <CodeExample example={{ lang, code }} className="not-prose" filename={filename} /> */}
        {lang}
        {code}
        {filename}
      </div>
    );
  },
} satisfies MDXComponents;

declare global {
  // Provide type-safety of provided components inside MDX files.
  type MDXProvidedComponents = typeof components;
}

// This file is required to use MDX in `app` directory.
export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
