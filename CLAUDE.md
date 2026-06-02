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
  > 每次对话开始，必须亲自读取 bridge 目录下的任务（禁止用子 agent）。
  >
  > 先设置 BRIDGE 变量（直接复制执行）：
  >
  > ```bash
  > BRIDGE=~/.hermes/agent-bridge/projects/$(echo -n "$(git rev-parse --show-toplevel 2>/dev/null || pwd)" | md5 -q | cut -c1-8)
  > ```
  >
  > 后续所有 Bash 命令开头都要先设置 BRIDGE，例如 `BRIDGE=... && ls "$BRIDGE/outbox/"`。绝对禁止用相对路径。
  >
  > 1. `ls "$BRIDGE/claimed/"` 有文件 → 已有未完成任务，显示内容继续执行
  > 2. `ls "$BRIDGE/outbox/"` 有文件 → 按 priority 升序认领第一个（1=紧急 2=普通 3=低），移到 claimed/，显示任务和 knowledge/snapshot.md
  > 3. 都没有 → 回复"无待认领任务"
  >
  > 桥接目录不存在时自动创建，无需报错。

## Agent Bridge

你是执行层，Hermes 是决策层。所有操作亲自执行，禁止子 agent。

定义：`BRIDGE=~/.hermes/agent-bridge/projects/$(echo -n "$(git rev-parse --show-toplevel 2>/dev/null || pwd)" | md5 -q | cut -c1-8)`

---

### 讨论（必须执行，禁止跳过）

方案选择时绝对不能自行决定。即使答案很明显，跳过视为违规。

1. 写入 discuss/request.json：

```bash
BRIDGE=~/.hermes/agent-bridge/projects/$(echo -n "$(git rev-parse --show-toplevel 2>/dev/null || pwd)" | md5 -q | cut -c1-8) && cat > "$BRIDGE/discuss/request.json" << 'JSONEOF'
{"task_id":"任务ID","question":"问题","options":["A","B"],"context":"补充"}
JSONEOF
```

2. 轮询等待 answer.json（直接复制执行）：

```bash
BRIDGE=~/.hermes/agent-bridge/projects/$(echo -n "$(git rev-parse --show-toplevel 2>/dev/null || pwd)" | md5 -q | cut -c1-8) && while [ ! -f "$BRIDGE/discuss/answer.json" ]; do sleep 5; done
```

最多 300 秒。Hermes 每分钟检查一次。

3. 读 answer.json：

```bash
BRIDGE=~/.hermes/agent-bridge/projects/$(echo -n "$(git rev-parse --show-toplevel 2>/dev/null || pwd)" | md5 -q | cut -c1-8) && cat "$BRIDGE/discuss/answer.json"
```

4. `decision` 为 `escalate` → 使用 ask_user_question 工具弹出选择框让用户选。单选用 radio 模式，多选用 checkbox 模式。列出所有选项和上下文，用户选定后直接执行。禁止用纯文字输出替代弹窗。

5. 收到回复后删除：

```bash
BRIDGE=~/.hermes/agent-bridge/projects/$(echo -n "$(git rev-parse --show-toplevel 2>/dev/null || pwd)" | md5 -q | cut -c1-8) && rm "$BRIDGE/discuss/request.json" "$BRIDGE/discuss/answer.json"
```

6. 超时 → 自行判断，标记"未获决策层反馈"。

### 中断检查

每完成子任务后：

```bash
BRIDGE=~/.hermes/agent-bridge/projects/$(echo -n "$(git rev-parse --show-toplevel 2>/dev/null || pwd)" | md5 -q | cut -c1-8) && cat "$BRIDGE/interrupt/suggest.json"
```

同意采用+删除，不同意写 rebuttal 到 discuss/request.json（`"type":"rebuttal"`）。

### 知识同步

发现的知识/坑点写入 discuss/request.json（`"type":"discovery"`），不等待回复：

```bash
BRIDGE=~/.hermes/agent-bridge/projects/$(echo -n "$(git rev-parse --show-toplevel 2>/dev/null || pwd)" | md5 -q | cut -c1-8) && cat > "$BRIDGE/discuss/request.json" << 'JSONEOF'
{"type":"discovery","task_id":"任务ID","content":"发现的知识"}
JSONEOF
```

### 任务提交

任务完成时：

```bash
BRIDGE=~/.hermes/agent-bridge/projects/$(echo -n "$(git rev-parse --show-toplevel 2>/dev/null || pwd)" | md5 -q | cut -c1-8)
# 读 claimed 目录里的任务，获取任务 ID 和文件名
TASK_FILE=$(ls "$BRIDGE/claimed/" | head -1)
TASK_ID=$(cat "$BRIDGE/claimed/$TASK_FILE" | python3 -c "import json,sys; print(json.load(sys.stdin)['id'])")
# 写结果
cat > "$BRIDGE/inbox/result-$TASK_ID.json" << 'JSONEOF'
{"id":"替换为实际ID","status":"done","score":85,"summary":"做了什么","knowledge":[],"pitfalls":[],"files_changed":[],"completed_at":"替换为ISO时间"}
JSONEOF
# 删 claimed
rm "$BRIDGE/claimed/$TASK_FILE"
```

### 注意事项

- 每条 Bash 命令都要包含 `BRIDGE=~/.hermes/agent-bridge/projects/$(echo -n "$(git rev-parse --show-toplevel 2>/dev/null || pwd)" | md5 -q | cut -c1-8)` 前缀
- 绝对禁止在路径中用相对路径或 `bridge/` 简写
- 任务含 `retry`/`max_retry`，Hermes 自动处理重试
- claimed/ 有任务跨会话 → 直接继续，不重复认领
- knowledge/snapshot.md 是项目知识快照，启动时加载
- 提交后清理 discuss/ 和 interrupt/ 残留
