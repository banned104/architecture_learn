# Architecture Foundations First Chapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立 Node.js + TypeScript 软件架构教材的入口、写作规则和第一章，使读者从“需求变化”而不是从设计模式名词开始学习架构。

**Architecture:** Markdown 是第一阶段唯一内容载体。README 负责导航，AUTHORING_GUIDE 负责统一写作规则，学习路线说明课程顺序，第一章独立承担一个完整概念闭环。首阶段不创建运行时依赖，示例代码保持为可读的 TypeScript 片段。

**Tech Stack:** Markdown、TypeScript 示例、PowerShell 文档校验

## Global Constraints

- 主线只使用 Node.js + TypeScript；Python 不进入示例。
- 第一阶段不引入 Docusaurus、数据库、Web 框架或前端工程。
- 专业术语第一次出现时必须在同一段用人话解释。
- 每章必须包含问题、短代码、解释、最小改进、使用边界、复述题和练习。
- 不初始化 Git，不创建提交。

---

### Task 1: 建立教材入口与写作契约

**Files:**
- Create: `README.md`
- Create: `AUTHORING_GUIDE.md`
- Create: `docs/00-start/学习路线.md`

**Interfaces:**
- Consumes: 已确认的 Node.js + TypeScript 主路线与费曼式正文顺序
- Produces: 所有后续章节必须遵循的文档结构、术语规则与导航入口

- [x] **Step 1: 写 README 导航**

写明教材解决的问题、适用读者、为什么不用 Python 双主线、推荐阅读顺序、目录入口和当前进度。

- [x] **Step 2: 写 AUTHORING_GUIDE**

固定以下正文骨架，并给每一项写出判断标准：

```text
问题 → 短代码 → 人话解释 → 术语 → 最小改进 → 使用边界 → 复述题 → 练习
```

- [x] **Step 3: 写学习路线**

将课程拆成基础、原则、模式、架构、工程实践、AI 协作六个阶段，并明确每阶段必须留下的可验证产物。

- [x] **Step 4: 检查入口链接**

Run:

```powershell
Get-ChildItem -LiteralPath D:\Codes\software_design_guide -Recurse -File
```

Expected: README、AUTHORING_GUIDE 与学习路线均存在，README 中的相对链接指向真实文件。

### Task 2: 完成第一章“软件架构首先管理变化”

**Files:**
- Create: `docs/01-foundations/01-软件架构首先管理变化.md`

**Interfaces:**
- Consumes: `AUTHORING_GUIDE.md` 的章节模板
- Produces: 后续“职责、依赖、耦合与边界”章节使用的共同概念基础

- [x] **Step 1: 写问题与反例**

使用一个任务创建函数，同时承担输入读取、校验、ID 生成、时间生成、数据库保存与 HTTP 返回，让读者看到多个变化原因如何挤在一起。

- [x] **Step 2: 解释变化原因与职责**

不用 SOLID 开场；先让读者回答“什么变化会迫使这段代码修改”，再引入职责、耦合和边界三个术语。

- [x] **Step 3: 给出最小改进**

只提取纯业务函数 `createTask`，把时间和 ID 作为输入传入；暂不引入 Repository、Controller 或依赖注入容器。

- [x] **Step 4: 写使用边界和练习**

明确小脚本不必分层，给出复述题、变化原因练习和一个短重构题。

- [x] **Step 5: 执行章节结构检查**

Run:

```powershell
Select-String -LiteralPath 'D:\Codes\software_design_guide\docs\01-foundations\01-软件架构首先管理变化.md' -Pattern '问题|术语|什么时候不需要|请用自己的话|练习'
```

Expected: 五类结构标记均至少命中一次。

### Task 3: 文档一致性验证与进度记录

**Files:**
- Create: `docs/progress/2026-08-23-01-foundations-start.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: Task 1 和 Task 2 的完成结果
- Produces: 可核验的首批交付记录和下一章入口

- [x] **Step 1: 搜索偏离主线的内容**

Run:

```powershell
Get-ChildItem -LiteralPath D:\Codes\software_design_guide\README.md,D:\Codes\software_design_guide\AUTHORING_GUIDE.md,D:\Codes\software_design_guide\docs\00-start,D:\Codes\software_design_guide\docs\01-foundations -Recurse -Filter *.md | Select-String -Pattern 'FastAPI|Pydantic|pytest|Python 后端'
```

Expected: 没有把 Python 描述成课程主线的匹配。

- [x] **Step 2: 检查空文件与未完成标记**

Run:

```powershell
Get-ChildItem -LiteralPath D:\Codes\software_design_guide -Recurse -File | Where-Object Length -eq 0
```

Expected: 无输出。

Run:

```powershell
Get-ChildItem -LiteralPath D:\Codes\software_design_guide\README.md,D:\Codes\software_design_guide\AUTHORING_GUIDE.md,D:\Codes\software_design_guide\docs\00-start,D:\Codes\software_design_guide\docs\01-foundations -Recurse -Filter *.md | Select-String -CaseSensitive -Pattern 'TBD|TODO|待补充'
```

Expected: 无输出。

- [x] **Step 3: 写进度记录**

记录实际完成的文档、范围决策、执行过的验证、已知限制和下一章“职责、依赖与边界”。不得宣称未执行的测试或 Git 提交。

- [x] **Step 4: 更新 README 当前进度**

把第一章标记为已完成，下一章标记为未开始，并链接到进度记录。
