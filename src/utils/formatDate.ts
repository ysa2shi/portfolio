// utils/formatDate.ts
export function formatDateJST(dateStr: string): string {
  const date = new Date(dateStr)

  // JSTに変換（UTC+9）
  const jst = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)

  return jst
}
