"use client";

import { NavList, NavListHeading, NavListItem, NavListItems } from "@/components";
import {
  DocCategory,
  DockerDocConfig,
  PostgreSQLDocConfig,
  ReactDocConfig,
} from "@/lib/doc-config";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DocsSidebarLink } from "../DocsSidebarLink";

export function TopNavLink(props: { href: string } & React.ComponentPropsWithoutRef<"a">) {
  const Component = props.href.startsWith("/plus") ? "a" : Link;

  return (
    <Component
      className={clsx(
        "group",
        "inline-flex items-center gap-3 text-base/8 text-gray-600 sm:text-sm/7 dark:text-gray-300",
        "**:data-outline:stroke-gray-400 dark:**:data-outline:stroke-gray-500 **:[svg]:first:size-5 **:[svg]:first:sm:size-4",
        "hover:text-gray-950 hover:**:data-highlight:fill-gray-300 hover:**:data-outline:stroke-gray-950",
        "dark:hover:text-white dark:hover:**:data-highlight:fill-gray-600 dark:hover:**:data-outline:stroke-white",
        "aria-[current]:font-semibold aria-[current]:text-gray-950 aria-[current]:**:data-highlight:fill-gray-300 aria-[current]:**:data-outline:stroke-gray-950",
        "dark:aria-[current]:text-white dark:aria-[current]:**:data-highlight:fill-gray-600 dark:aria-[current]:**:data-outline:stroke-white",
      )}
      {...props}
    />
  );
}

export function DocsSidebar() {
  const pathname = usePathname();
  const [docConfig, setDocConfig] = useState<DocCategory>({});

  useEffect(() => {
    const handleSetDocConfig = () => {
      if (pathname.includes("/react-docs")) return setDocConfig(ReactDocConfig);
      if (pathname.includes("/docker-docs")) return setDocConfig(DockerDocConfig);
      if (pathname.includes("/postgresql-docs")) return setDocConfig(PostgreSQLDocConfig);
      setDocConfig({});
    };
    handleSetDocConfig();
  }, [pathname]);

  return (
    <nav className="flex flex-col gap-8">
      {Object.entries(docConfig).map(([category, entries]) => (
        <NavList key={category} data-autoscroll>
          <NavListHeading>{category}</NavListHeading>
          <NavListItems>
            {entries.map(([title, path, children]) => (
              <NavListItem key={path}>
                <DocsSidebarLink title={title} path={path?.replace("/docs/", "/")} />

                {Array.isArray(children) && children.length > 0 && (
                  <NavListItems nested>
                    {children.map(([title, path]) => (
                      <NavListItem key={path}>
                        <DocsSidebarLink title={title} path={path?.replace("/docs/", "/")} nested />
                      </NavListItem>
                    ))}
                  </NavListItems>
                )}
              </NavListItem>
            ))}
          </NavListItems>
        </NavList>
      ))}
    </nav>
  );
}
