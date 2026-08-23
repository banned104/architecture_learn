# 软件架构自学指南

这是一套以 **Node.js + TypeScript** 为主线的软件架构自学材料。

它不要求你先背会 SOLID、GoF 23 种设计模式、Clean Architecture 或 DDD。课程从一个更朴素的问题开始：

> 当需求不断变化时，怎样让修改停在它应该停下的位置？

软件能够运行，只能说明它完成了今天的任务。架构设计关心的是：明天增加规则、更换数据库、调整接口或排查故障时，我们要改多少地方，又可能意外破坏多少地方。

## 适合谁

这套材料适合已经接触过 TypeScript 或 React，但对后端、测试和架构设计仍缺少完整实践的人。只要能阅读普通 TypeScript 函数，就可以从第一章开始。

## 技术路线

- TypeScript 是主要示例语言。
- Node.js 22 LTS 及以上是支持的主要运行环境。
- npm、ESM、严格 TypeScript 与 Vitest 构成可运行示例工具链。
- 任务管理 API 是贯穿案例。
- React 用于讲前后端契约和 UI 状态所有权。
- 示例先使用内存 Repository；SQLite/PostgreSQL 在持久化章节讲设计与迁移边界。
- C++、Qt、QML 和 OpenGL 只在有助于迁移理解时作为对照。

课程不维护 Python 双主线。学习架构已经需要同时理解需求、边界、测试和运行环境，再维护两套语言示例会让注意力离开真正的问题。

## 阅读方法

先读 [学习路线](docs/00-start/学习路线.md)，再按章节编号顺序阅读。每章末尾先完成“请用自己的话解释”，再看下一章；遇到术语时先理解它描述的现象，不急着记英文定义。

作者和协作 Agent 应遵守 [写作规范](AUTHORING_GUIDE.md)。

## 章节索引

### 基础与原则

1. [软件架构首先管理变化](docs/01-foundations/01-软件架构首先管理变化.md)
2. [职责、依赖、耦合与内聚](docs/01-foundations/02-职责依赖耦合与内聚.md)
3. [运行时边界与自动化测试](docs/01-foundations/03-运行时边界与自动化测试.md)
4. [复杂度与模块边界](docs/01-foundations/04-复杂度与模块边界.md)
5. [SRP：按变化原因划分职责](docs/02-principles/05-SRP单一职责.md)
6. [OCP 与 Strategy](docs/02-principles/06-OCP与Strategy.md)
7. [LSP 与 ISP](docs/02-principles/07-LSP与ISP.md)
8. [DIP、Adapter、Repository 与依赖注入](docs/02-principles/08-DIP-Adapter-Repository与依赖注入.md)
9. [DRY、KISS、YAGNI 与互补原则](docs/02-principles/09-DRY-KISS-YAGNI与互补原则.md)

### 模式与 UI 架构

10. [Factory 与 Builder](docs/03-patterns/10-Factory与Builder.md)
11. [Adapter、Facade 与 Decorator](docs/03-patterns/11-Adapter-Facade与Decorator.md)
12. [Observer、Command 与 State](docs/03-patterns/12-Observer-Command与State.md)
13. [模式选择与反模式](docs/03-patterns/13-模式选择与反模式.md)
14. [React 与 UI 架构边界](docs/03-patterns/14-React与UI架构边界.md)

### 系统架构

15. [分层、六边形与 Clean Architecture](docs/04-system-architecture/15-分层六边形与Clean-Architecture.md)
16. [DDD 基础](docs/04-system-architecture/16-DDD基础.md)
17. [状态机、工作流与事件驱动](docs/04-system-architecture/17-状态机工作流与事件驱动.md)
18. [单体、模块化单体与微服务](docs/04-system-architecture/18-单体模块化单体与微服务.md)

### 工程质量

19. [测试策略](docs/05-engineering/19-测试策略.md)
20. [错误、超时、重试、幂等与补偿](docs/05-engineering/20-错误超时重试幂等与补偿.md)
21. [数据库、事务、索引与迁移](docs/05-engineering/21-数据库事务索引与迁移.md)
22. [配置、密钥、日志、指标、追踪与审计](docs/05-engineering/22-配置密钥日志指标追踪与审计.md)
23. [构建、部署、版本、兼容与恢复](docs/05-engineering/23-构建部署版本兼容与恢复.md)

### AI 工程与总复盘

24. [AI 上下文、规格、计划与 AGENTS.md](docs/06-ai/24-AI上下文规格计划与AGENTS.md.md)
25. [AI 评审、评估、安全与多 Agent 协作](docs/06-ai/25-AI评审评估安全与多Agent协作.md)
26. [完整任务 API 架构复盘](docs/06-ai/26-完整任务API架构复盘.md)

## 可运行示例

[Task API 示例](examples/task-api/README.md)使用内存 Repository 演示依赖方向和测试边界：

```powershell
cd examples/task-api
npm install
npm run typecheck
npm test
npm run build
```

## 附录

- [术语表](docs/appendices/术语表.md)
- [模式选择指南](docs/appendices/模式选择指南.md)
- [架构与 AI 检查清单](docs/appendices/架构与AI检查清单.md)
- [练习答案提示](docs/appendices/练习答案提示.md)
- [课后练习完整参考答案](docs/appendices/课后练习完整参考答案.md)
- [来源索引与证据边界](docs/appendices/来源索引.md)

## 当前进度

26 章正文、可运行示例和六份附录均已完成。练习同时提供快速提示版和逐题完整参考答案。最终质量门禁由 `node scripts/verify-course.mjs` 执行。

## 目录说明

```text
software_design_guide/
├── README.md
├── AUTHORING_GUIDE.md
├── docs/
│   ├── 00-start/               学习入口和课程路线
│   ├── 01-foundations/         变化、职责、运行时边界和模块
│   ├── 02-principles/          SOLID 与互补原则
│   ├── 03-patterns/            设计模式与 React UI 架构
│   ├── 04-system-architecture/ DDD、事件与部署边界
│   ├── 05-engineering/         测试、可靠性、数据与交付
│   ├── 06-ai/                  AI 工程与完整案例复盘
│   ├── appendices/             术语、决策、清单、答案和来源
│   ├── progress/               已完成工作的事实记录
│   └── superpowers/            设计说明与实施计划
├── examples/task-api/          可运行 Node.js + TypeScript 案例
└── scripts/                    教材自动验证脚本
```

目录只随真实内容增长，不创建空的未来阶段。
