export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export const currentTheme = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

export const toggleTheme = (): Theme => {
  const next: Theme = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // 保存できない環境(プライベートモードなど)では、そのページ内だけ切り替える
  }
  return next;
};
