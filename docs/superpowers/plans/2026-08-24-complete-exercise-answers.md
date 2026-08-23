# Complete Exercise Answers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 26 章教材中的全部课后题提供逐题、可核对、带判断依据的完整参考答案。

**Architecture:** 保留现有提示版，新增单一完整答案附录作为权威逐题入口。答案按章节分组并链接原文；README、学习路线和进度记录只负责导航与事实同步。

**Tech Stack:** Markdown、TypeScript/SQL 教学片段、现有 Node.js 课程验证脚本。

## Global Constraints

- 正文和答案均使用中文，代码标识符使用常规英文。
- 每题必须给判断依据；开放题明确其他可接受方案。
- 不使用 `any`、类型断言或非空断言绕过边界。
- 不把第 26 章的生产目标误写成已实现功能。
- 不初始化 Git，不创建提交。

---

### Task 1: 提取完整题目清单

**Files:**
- Read: `docs/01-foundations/01-*.md` 至 `docs/06-ai/26-*.md`
- Create: `docs/appendices/课后练习完整参考答案.md`

**Interfaces:**
- Produces: 26 个章节标题和每章按原顺序排列的题目小节。

- [x] 使用章节中的“请用自己的话解释”和“练习”标题提取全部题目。
- [x] 按第 1—26 章建立覆盖清单，不改写题意。

### Task 2: 编写逐题完整答案

**Files:**
- Modify: `docs/appendices/课后练习完整参考答案.md`

**Interfaces:**
- Consumes: Task 1 的题目清单。
- Produces: 每题“参考答案、判断依据、其他可接受答案/常见误区”的完整内容。

- [x] 为第 1—9 章写完整答案。
- [x] 为第 10—18 章写完整答案。
- [x] 为第 19—26 章写完整答案。
- [x] 为实现题补充最小可读 TypeScript、SQL、表格或步骤。

### Task 3: 导航与事实同步

**Files:**
- Modify: `README.md`
- Modify: `docs/00-start/学习路线.md`
- Create: `docs/progress/2026-08-24-01-complete-exercise-answers.md`

**Interfaces:**
- Produces: 提示版和完整答案版的清晰入口，以及事实性的完成记录。

- [x] 在 README 附录区增加完整答案入口并更新附录数量。
- [x] 在学习路线增加完整答案入口。
- [x] 记录实际写入、审查和验证结果。

### Task 4: 审查与验证

**Files:**
- Review: `docs/appendices/课后练习完整参考答案.md`
- Run: `scripts/verify-course.mjs`
- Run: `examples/task-api` quality gates

**Interfaces:**
- Produces: 无漏题、无明显技术错误、链接和工程门禁通过的交付。

- [x] 独立审查章节覆盖和题号映射。
- [x] 独立审查 TypeScript、架构与可靠性答案。
- [x] 修正 findings 后运行 `node scripts/verify-course.mjs`。
- [x] 确认 typecheck、18 项测试和 build 通过。
