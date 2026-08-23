# Responsibility, Dependency, Coupling, and Cohesion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完成第二章，使读者能从 TypeScript 调用和 import 关系中识别职责、依赖方向、耦合与内聚，并理解文件拆分不等于边界清晰。

**Architecture:** 第二章复用第一章的任务创建案例。反例让任务规则直接调用数据库，最小改进把运行时输入校验、任务规则和外部协调分开；依赖方向通过调用图解释，不引入 Repository 接口或依赖注入容器。

**Tech Stack:** Markdown、TypeScript 教学片段、Mermaid、PowerShell 文档校验

## Global Constraints

- 主线只使用 Node.js + TypeScript。
- 专业术语先从现象推出，再给英文名称。
- 明确反驳“一文件一职责”“依赖越少越好”“高内聚就是放在同一文件”。
- HTTP 输入使用 `unknown` 表示运行时不可信数据；不得用类型断言冒充校验。
- 第二章不引入完整 Clean Architecture、Repository 接口、Service 类或依赖注入容器。
- 不初始化 Git，不创建提交。

---

### Task 1: 编写第二章正文

**Files:**
- Create: `docs/01-foundations/02-职责依赖耦合与内聚.md`

**Interfaces:**
- Consumes: 第一章中的 `Task`、`createTask` 和 `createTaskHandler` 概念
- Produces: 后续输入校验、应用用例、持久化边界和测试章节共同使用的依赖判断方法

- [x] **Step 1: 写文件分开但边界未形成的反例**

展示 `task.ts` 直接 import `insertTask` 的短代码，让数据库变化继续迫使任务规则模块修改。

- [x] **Step 2: 用人话区分五个概念**

围绕“谁负责决定、谁必须知道谁、变化会牵连谁、哪些知识应该待在一起”依次解释职责、依赖、依赖方向、耦合和内聚。

- [x] **Step 3: 写最小改进**

使用三个窄函数：`readTitle(input: unknown)` 负责输入形状校验，`createTask(...)` 负责业务规则，`createTaskHandler(input: unknown)` 负责协调 ID、时间和保存操作。

- [x] **Step 4: 解释依赖图与变化传播**

使用 Mermaid 对比 `domain -> database` 与 `handler -> domain`、`handler -> persistence` 两种依赖方向，并明确数据流方向不等于源码依赖方向。

- [x] **Step 5: 写边界、误区与练习**

包含什么时候不需要拆、文件数量误区、import 数量误区、运行时输入验证、复述题、识别题和取舍题。

### Task 2: 更新导航和进度

**Files:**
- Modify: `README.md`
- Create: `docs/progress/2026-08-23-02-responsibility-dependency.md`

**Interfaces:**
- Consumes: 已完成且通过审查的第二章
- Produces: 正确阅读顺序、当前课程状态和下一章入口

- [x] **Step 1: 更新 README 阅读顺序**

在第一章之后加入第二章链接，把“架构基础 2”标记为已完成。

- [x] **Step 2: 更新下一阶段**

将下一阶段明确为“运行时输入、业务规则与自动化测试”，不要宣称任务管理 API 已实现。

- [x] **Step 3: 写追加式进度记录**

记录第二章实际内容、审查发现、验证命令、限制和下一步，不修改第一批进度记录。

### Task 3: 验证第二章

**Files:**
- Verify: `README.md`
- Verify: `docs/01-foundations/02-职责依赖耦合与内聚.md`

**Interfaces:**
- Consumes: Task 1 和 Task 2 的交付
- Produces: 章节结构、链接和术语准确性的验证证据

- [x] **Step 1: 检查章节骨架**

确认问题、短代码、人话解释、术语、最小改进、什么时候不需要、复述题、练习和小结均存在。

- [x] **Step 2: 检查 TypeScript 风险模式**

搜索 `as any`、` as `、非空断言和未经说明的外部变量。允许中文正文出现普通单词，不允许示例依靠断言越过运行时边界。

- [x] **Step 3: 检查导航与空文件**

验证 README 的全部相对链接存在，目录中没有空文件。

- [x] **Step 4: 独立审查**

要求只读审查者核验术语准确性、初学者可读性、TypeScript 类型安全和与第一章的连续性；修正所有具体问题后再完成进度记录。
