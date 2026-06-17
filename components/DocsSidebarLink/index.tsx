"use client";

import { usePathname } from "next/navigation";
import { NavListLink } from "../NavList";

export function DocsSidebarLink({
  title,
  path,
  nested = false,
}: {
  title: string;
  path: string;
  nested?: boolean;
}) {
  const pathname = usePathname();

  return (
    <NavListLink
      aria-current={pathname === path || pathname?.startsWith(`${path}/`) ? "page" : undefined}
      href={path}
      nested={nested}
    >
      {title}
    </NavListLink>
  );
}
