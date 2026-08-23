# Task API 示例

这是教材的可运行贯穿案例。它故意保持为小型模块化单体，用代码证明运行时边界、领域规则、应用协调、持久化端口和 HTTP 适配之间的依赖方向。

## 运行

需要 Node.js 22 或更高版本。

```powershell
npm install
npm run typecheck
npm test
npm run build
npm run dev
```

创建任务：

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3000/tasks `
  -ContentType "application/json" `
  -Body '{"title":"学习架构"}'
```

列出任务：

```powershell
Invoke-RestMethod http://localhost:3000/tasks
```

内存 Repository 会在进程结束后丢失数据。这是当前示例的明确边界，不是假装完成了数据库持久化。
