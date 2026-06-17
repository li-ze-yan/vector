"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

export function DocsSidebarAutoscroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const activeLink = element.querySelector("[data-autoscroll] [aria-current=page]");
    if (!activeLink) return;

    if ("scrollIntoViewIfNeeded" in activeLink) {
      (activeLink as any).scrollIntoViewIfNeeded();
    } else {
      activeLink.scrollIntoView();
    }
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}
