document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector<HTMLElement>(".hamburger")
  const navLinks = document.querySelector<HTMLElement>(".nav-links")

  // ハンバーガーメニューのクリックイベント
  hamburger?.addEventListener("click", (event) => {
    event.stopPropagation() // クリックイベントが親要素に伝播しないようにする
    hamburger.classList.toggle("active")
    navLinks?.classList.toggle("expanded")
  })

  // ドキュメント全体のクリックイベント
  document.addEventListener("click", (event) => {
    if (navLinks?.classList.contains("expanded")) {
      hamburger?.classList.remove("active")
      navLinks.classList.remove("expanded")
    }
  })

  // ナビゲーション内のクリックイベント（閉じないようにする）
  navLinks?.addEventListener("click", (event) => {
    event.stopPropagation() // クリックイベントが親要素に伝播しないようにする
  })
})
