@AGENTS.md

# Vector

基于 create-next-app 创建的 Next.js 16 (App Router) 项目，目前处于初始脚手架阶段。

## 技术栈

- **框架**: Next.js 16.2.3 (App Router)
- **语言**: TypeScript 5 (strict 模式)
- **UI**: React 19, Tailwind CSS 4 (通过 @tailwindcss/postcss)
- **字体**: Geist Sans / Geist Mono (通过 next/font/google)
- **代码检查**: ESLint 9 flat config (eslint-config-next core-web-vitals + typescript)
- **包管理器**: npm (package-lock.json)

## 常用命令

```bash
npm run dev      # 启动开发服务器 (next dev)
npm run build    # 生产构建 (next build)
npm run start    # 启动生产服务器 (next start)
npm run lint     # 运行 ESLint 检查
npm run format   # Prettier 格式化全部文件
```

## 项目结构

```
app/
  layout.tsx     # 根布局 (Geist 字体, Tailwind)
  page.tsx       # 首页
  globals.css    # 全局样式 + Tailwind 主题配置
public/          # 静态资源 (SVG)
```

- 使用 App Router（`app/` 目录，而非 `pages/`）。
- 路径别名 `@/*` 映射到项目根目录（在 tsconfig.json 中配置）。
- 暗色模式通过 `prefers-color-scheme` 媒体查询和 Tailwind `dark:` 工具类实现。

## Git 规范

- 使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：`type(scope): description`
- 允许的 type: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
- scope 可选，description 使用英文，首字母小写，不加句号
- 示例: `feat(auth): add login page`, `fix: resolve hydration mismatch`, `chore: update dependencies`
- pre-commit hook 会自动通过 lint-staged 执行 ESLint + Prettier
- commit-msg hook 会通过 commitlint 校验 commit message 格式

## 代码约定

- Tailwind CSS 4 使用 `@import "tailwindcss"` 而非 `@tailwind` 指令；主题 token 通过 `globals.css` 中的 `@theme inline` 定义。
- ESLint 使用 flat config 格式（`eslint.config.mjs`），而非 `.eslintrc`。
- PostCSS 配置在 `postcss.config.mjs` 中，使用 `@tailwindcss/postcss` 插件。
- 尚未配置测试框架。
- 尚未配置数据库 / ORM / 状态管理。
