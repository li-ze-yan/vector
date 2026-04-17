export const DocConfig = {
  Filters: [
    ["filter", "/docs/filter", [["blur", "/docs/filter-blur"]] as const] as const,
    [
      "backdrop-filter",
      "/docs/backdrop-filter",
      [["blur", "/docs/backdrop-filter-blur"]] as const,
    ] as const,
  ] as const,
};

// export type ReactDocsConfig = {

// }
