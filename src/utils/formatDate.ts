// utils/formatDate.ts
export function formatDateJST(dateStr: string): string {
  const date = new Date(dateStr)

  // JSTに変換（UTC+9）
  const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000)

  const yyyy = jst.getFullYear()
  const mm = String(jst.getMonth() + 1).padStart(2, "0")
  const dd = String(jst.getDate()).padStart(2, "0")
  const hh = String(jst.getHours() - 9).padStart(2, "0")
  const min = String(jst.getMinutes()).padStart(2, "0")

  return `${yyyy}年${mm}月${dd}日 ${hh}:${min}`
}
