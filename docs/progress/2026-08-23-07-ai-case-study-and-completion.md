# 开发记录：AI 工程、完整案例与课程收尾

- 日期：2026-08-23
- 范围：第 24—26 章、五份附录、README 总索引和自动验证
- 状态：已完成

## 结果

课程达到 26 章完整正文。新增 AI 上下文/规格/计划、AI 评审/评估/安全、多 Agent 协作和完整 Task API 架构复盘；同时新增术语表、模式选择、检查清单、练习答案提示和来源索引。

README 已提供全部章节和示例入口。`scripts/verify-course.mjs` 自动检查编号、空文件、固定章节骨架、Markdown 围栏、Mermaid 类型声明、相对链接、未完成标记和危险 TypeScript 绕过，并执行示例工程类型检查、测试和构建。

## 审查与修正

最终独立审查补全了第 26 章的幂等查询/重放/冲突流、取消状态规则和未实现能力清单；验证脚本扩展为检查全部 Markdown 围栏与 Mermaid 声明，并排除生成的 `dist`。

OpenAI 官方文档在当前网络返回 403/阻断页，因此第 24—25 章明确记录证据边界，没有引用未逐段核验的具体默认值或原句。

## 验证

- `node scripts/verify-course.mjs`：通过。
- `examples/task-api` 的 `npm run typecheck`：通过。
- `examples/task-api` 的 `npm test`：5 个测试文件、18 个测试通过。
- `examples/task-api` 的 `npm run build`：通过。

## 已知限制

- Mermaid 仅执行围栏与图类型声明的静态检查，未使用完整渲染器逐图渲染。
- 外部链接记录来源与证据边界，最终可达性受读者网络环境影响。
- Task API 仍是内存教学基线，第 26 章列出的生产能力不是已实现功能。

## Git

项目未初始化 Git，没有创建提交。
