export type DocItem = readonly [title: string, path: string, children?: readonly DocItem[]];
export type DocCategory = Record<string, readonly DocItem[]>;

export const DocConfig: DocCategory = {
  Filters: [
    ["filter", "/docs/filter", [["blur", "/docs/filter-blur"]]],
    ["backdrop-filter", "/docs/backdrop-filter", [["blur", "/docs/backdrop-filter-blur"]]],
  ],
};

export const ReactDocConfig: DocCategory = {
  React: [
    [
      "Hooks",
      "/docs/react-docs/react-hooks",
      [
        ["useState", "/docs/react-docs/react-hooks-usestate"],
        ["useEffect", "/docs/react-docs/react-hooks-useeffect"],
      ],
    ],
    [
      "组件基础",
      "/docs/react-docs/react-components",
      [
        ["JSX 语法", "/docs/react-docs/react-components-jsx"],
        ["Props", "/docs/react-docs/react-components-props"],
      ],
    ],
    [
      "状态管理",
      "/docs/react-docs/react-state",
      [
        ["Context", "/docs/react-docs/react-state-context"],
        ["Zustand", "/docs/react-docs/react-state-zustand"],
      ],
    ],
    [
      "性能优化",
      "/docs/react-docs/react-performance",
      [
        ["useMemo", "/docs/react-docs/react-performance-usememo"],
        ["useCallback", "/docs/react-docs/react-performance-usecallback"],
      ],
    ],
  ],
};

export const DockerDocConfig: DocCategory = {
  Docker: [["Docker入门", "/docs/docker-docs/docker-intro"]],
};
