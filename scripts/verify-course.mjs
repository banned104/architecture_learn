import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = join(root, "docs");
const failures = [];

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const files = walk(root).filter(
  (path) => !path.includes("node_modules") && !path.includes(`${join("examples", "task-api", "dist")}`),
);
const markdownFiles = files.filter((path) => path.endsWith(".md"));
const chapterFiles = walk(docsRoot).filter((path) => /[\\/]\d{2}-[^\\/]+\.md$/.test(path));
const numbers = chapterFiles
  .map((path) => Number(/^(\d{2})-/.exec(basename(path))?.[1]))
  .sort((a, b) => a - b);

if (numbers.join(",") !== Array.from({ length: 26 }, (_, index) => index + 1).join(",")) {
  failures.push(`章节编号不是连续 01—26：${numbers.join(", ")}`);
}

for (const path of files) {
  if (statSync(path).size === 0) failures.push(`空文件：${path}`);
}

for (const path of markdownFiles) {
  const text = readFileSync(path, "utf8");
  const fences = text.match(/^```/gm)?.length ?? 0;
  if (fences % 2 !== 0) failures.push(`代码围栏未配对：${path}`);

  for (const match of text.matchAll(/```mermaid\s*\r?\n([\s\S]*?)```/g)) {
    const declaration = match[1].trimStart().split(/\r?\n/, 1)[0];
    if (!/^(?:flowchart|graph|sequenceDiagram|stateDiagram-v2|classDiagram|erDiagram|journey|gantt|pie|mindmap|timeline|gitGraph|C4Context|C4Container)\b/.test(declaration)) {
      failures.push(`Mermaid 缺少受支持的图类型声明：${path}`);
    }
  }
}

for (const path of chapterFiles) {
  const text = readFileSync(path, "utf8");
  for (const marker of ["什么时候不需要", "请用自己的话解释", "练习", "小结"]) {
    if (!text.includes(marker)) failures.push(`章节缺少“${marker}”：${path}`);
  }
}

for (const path of markdownFiles) {
  const text = readFileSync(path, "utf8");
  const links = text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g);
  for (const match of links) {
    const target = match[1].split("#", 1)[0];
    if (!target || /^(https?:|mailto:)/.test(target)) continue;
    const localPath = resolve(dirname(path), decodeURIComponent(target));
    if (!existsSync(localPath)) failures.push(`失效相对链接：${path} -> ${target}`);
  }
}

const readerDocs = markdownFiles.filter(
  (path) => !path.includes(`${join("docs", "progress")}`) && !path.includes(`${join("docs", "superpowers")}`),
);
for (const path of readerDocs) {
  const text = readFileSync(path, "utf8");
  if (/\b(?:TODO|TBD|FIXME)\b/.test(text)) failures.push(`读者文档含未完成标记：${path}`);
}

const unsafePattern = /\bas any\b|@ts-ignore|@ts-nocheck/;
for (const path of files.filter((item) => /\.(?:ts|tsx)$/.test(item))) {
  if (unsafePattern.test(readFileSync(path, "utf8"))) {
    failures.push(`发现危险 TypeScript 绕过模式：${path}`);
  }
}

for (const command of ["npm run typecheck", "npm test", "npm run build"]) {
  const result = spawnSync(command, {
    cwd: join(root, "examples", "task-api"),
    encoding: "utf8",
    shell: true,
    stdio: "pipe",
  });
  if (result.status !== 0) {
    failures.push(`${command} 失败：\n${result.stdout}\n${result.stderr}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`课程验证通过：26 章，${markdownFiles.length} 个 Markdown，TypeScript 门禁全部通过。`);
}
