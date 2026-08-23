# Complete 26-Chapter Course Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在保留已完成第 1—2 章的基础上，一次性完成第 3—26 章、可运行 Task API、附录和总索引。

**Architecture:** 教材按基础、原则、模式、系统架构、工程质量和 AI 工程逐层推进。示例工程采用模块化单体，依赖方向为 HTTP → application → domain，infrastructure 在组合根实现 application 定义的端口。

**Tech Stack:** Node.js 22+、TypeScript、ESM、npm、Vitest、Node.js 内置 HTTP。

## Global Constraints

- 正文语言为中文，代码标识符使用常规英文。
- Python 不进入主线。
- 每章遵守 `AUTHORING_GUIDE.md` 的固定骨架。
- 外部输入使用 `unknown` 并在边界收窄。
- 不提前引入没有当前变化或测试问题支撑的抽象。
- 不初始化 Git，不创建提交。

---

### Task 1: 完整路线与可运行基线

**Files:**
- Create: `docs/01-foundations/03-运行时边界与自动化测试.md`
- Create: `docs/01-foundations/04-复杂度与模块边界.md`
- Create: `docs/02-principles/05-SRP单一职责.md` 至 `09-DRY-KISS-YAGNI与互补原则.md`
- Create: `examples/task-api/**`

**Interfaces:**
- Produces: `Task`、`TaskRepository`、创建/查询/完成用例和 HTTP 组合根。

- [x] 建立测试先行的 TypeScript 工程配置。
- [x] 实现领域规则、Repository 端口、内存适配器和 HTTP 路由。
- [x] 编写第 3—9 章并链接可运行代码。
- [x] 运行 typecheck、test 和 build；修正全部失败。
- [x] 执行独立只读审查并修正问题。

### Task 2: 模式与 React UI 架构

**Files:**
- Create: `docs/03-patterns/10-Factory与Builder.md` 至 `14-React与UI架构边界.md`

**Interfaces:**
- Consumes: Task API 的状态、用例和端口。
- Produces: 面向当前变化选择模式和 UI 状态所有者的判断方法。

- [x] 编写第 10—14 章。
- [x] 检查每个模式均有不用它的场景。
- [x] 执行独立只读审查并修正问题。

### Task 3: 系统架构

**Files:**
- Create: `docs/04-system-architecture/15-分层六边形与Clean-Architecture.md` 至 `18-单体模块化单体与微服务.md`

**Interfaces:**
- Consumes: 前文模块与模式判断。
- Produces: 系统级边界、领域语言、状态流和部署边界选择。

- [x] 编写第 15—18 章。
- [x] 确认架构名称不被写成目录模板。
- [x] 执行独立只读审查并修正问题。

### Task 4: 工程质量

**Files:**
- Create: `docs/05-engineering/19-测试策略.md` 至 `23-构建部署版本兼容与恢复.md`

**Interfaces:**
- Consumes: Task API 的可运行边界。
- Produces: 测试、故障、数据、遥测和交付决策。

- [x] 编写第 19—23 章。
- [x] 覆盖成功、失败、超时、重试、恢复与运维边界。
- [x] 执行独立只读审查并修正问题。

### Task 5: AI 工程、总复盘与附录

**Files:**
- Create: `docs/06-ai/24-AI上下文规格计划与AGENTS.md.md` 至 `26-完整任务API架构复盘.md`
- Create: `docs/appendices/*.md`
- Modify: `README.md`
- Modify: `docs/00-start/学习路线.md`

**Interfaces:**
- Consumes: 全课程概念和最终示例。
- Produces: AI 协作闭环、最终架构地图、术语表、决策表和练习答案。

- [x] 使用 OpenAI 官方文档的已核验证据边界编写第 24—25 章。
- [x] 用第 26 章串联完整 Task API 架构。
- [x] 编写术语、模式选择、检查清单、练习答案和来源索引。
- [x] 更新 README、路线与进度记录。
- [x] 执行章节编号、链接、围栏、Mermaid、危险 TypeScript 模式和全工程质量门禁。
