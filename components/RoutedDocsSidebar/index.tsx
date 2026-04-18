"use client";

import { usePathname } from "next/navigation";
import { DocCategory, DockerDocConfig, ReactDocConfig } from "@/lib/doc-config";
import { DocsSidebar } from "../DocsSidebar";

function pickConfig(pathname: string | null): DocCategory {
  if (pathname?.includes("/docker-docs")) return DockerDocConfig;
  return ReactDocConfig;
}

export function RoutedDocsSidebar() {
  const pathname = usePathname();
  return <DocsSidebar docConfig={pickConfig(pathname)} />;
}
