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

export const ReactDocConfig = {
  React: [
    [
      "Hooks",
      "/docs/react-docs/react-hooks",
      [
        ["useState", "/docs/react-docs/react-hooks-usestate"],
        ["useEffect", "/docs/react-docs/react-hooks-useeffect"],
      ] as const,
    ] as const,
    [
      "组件基础",
      "/docs/react-docs/react-components",
      [
        ["JSX 语法", "/docs/react-docs/react-components-jsx"],
        ["Props", "/docs/react-docs/react-components-props"],
      ] as const,
    ] as const,
    [
      "状态管理",
      "/docs/react-docs/react-state",
      [
        ["Context", "/docs/react-docs/react-state-context"],
        ["Zustand", "/docs/react-docs/react-state-zustand"],
      ] as const,
    ] as const,
    [
      "性能优化",
      "/docs/react-docs/react-performance",
      [
        ["useMemo", "/docs/react-docs/react-performance-usememo"],
        ["useCallback", "/docs/react-docs/react-performance-usecallback"],
      ] as const,
    ] as const,
  ] as const,
};
