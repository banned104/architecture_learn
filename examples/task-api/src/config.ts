export function parsePort(input: string | undefined): number {
  const value = input ?? "3000";
  const port = Number(value);

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error(`PORT 必须是 1 到 65535 的整数，实际收到：${value}`);
  }

  return port;
}
