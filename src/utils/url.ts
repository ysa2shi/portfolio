/**
 * 外部のフィードから受け取った URL を、リンクや画像に使ってよいか確かめる。
 * http(s) 以外(javascript: など)は undefined にする
 */
export function httpUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:" ? value : undefined;
  } catch {
    return undefined;
  }
}
