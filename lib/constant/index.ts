import localFont from "next/font/local";

export const inter = localFont({
  src: [
    { path: "../../fonts/InterVariable.woff2", weight: "100 900", style: "normal" },
    {
      path: "../../fonts/InterVariable-Italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-inter",
});

export const source = localFont({
  src: [
    {
      path: "../../fonts/SourceSansPro-Regular.ttf.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-source-sans-pro",
});

export const plexMono = localFont({
  src: [
    {
      path: "../../fonts/IBMPlexMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/IBMPlexMono-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/IBMPlexMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/IBMPlexMono-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../fonts/IBMPlexMono-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/IBMPlexMono-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-plex-mono",
});

export const ubuntuMono = localFont({
  src: [
    {
      path: "../../fonts/Ubuntu-Mono-bold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-ubuntu-mono",
});

export const MyGithub = process.env.NEXT_PUBLIC_MY_GITHUB!;
export const MyEmail = process.env.NEXT_PUBLIC_MY_EMAIL!;

export const skills = [
  {
    title: "React",
    description: "用于构建用户界面的 JavaScript 库，通过组件化开发和虚拟 DOM 实现高效的 UI 渲染",
  },
  { title: "Vue", description: "渐进式 JavaScript 框架，以易上手和灵活的响应式数据绑定著称" },
  {
    title: "Vite",
    description: "下一代前端构建工具，基于原生 ES 模块提供极速的开发服务器和构建体验",
  },
  {
    title: "Dart",
    description: "Google 开发的客户端优化编程语言，支持 AOT 和 JIT 编译，是 Flutter 的官方开发语言",
  },
  {
    title: "Flutter",
    description: "Google 开源的跨平台 UI 框架，使用 Dart 语言一套代码构建移动端、Web 和桌面应用",
  },
  {
    title: "Node",
    description: "基于 V8 引擎的 JavaScript 运行时，让 JavaScript 在服务端高效处理异步 I/O 任务",
  },
  {
    title: "Python",
    description: "通用高级编程语言，语法简洁优雅，广泛应用于数据科学、AI 和后端开发",
  },
  {
    title: "PostgreSQL",
    description: "功能强大的开源关系型数据库，支持复杂查询、JSON 数据类型和高并发事务处理",
  },
  {
    title: "Docker",
    description: "容器化平台，将应用及其依赖打包为轻量级容器，实现一致的开发和部署环境",
  },
  { title: "K8S", description: "容器编排系统，自动化管理容器的部署、扩缩容和故障恢复" },
];
