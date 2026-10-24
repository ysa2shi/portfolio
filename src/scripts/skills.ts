// スキルの星図・リストの操作(SkillsSection から読み込む)
const root = document.querySelector<HTMLElement>("[data-skills]");

if (root) {
  const nodes = [...root.querySelectorAll<SVGGElement>(".node")];
  const chips = [...root.querySelectorAll<HTMLButtonElement>(".chip")];
  const edgeEls = [...root.querySelectorAll<SVGPathElement>(".edge")];
  const rels = [...root.querySelectorAll<HTMLElement>(".lcat")];
  const filters = [
    ...root.querySelectorAll<HTMLButtonElement>(".legend button"),
  ];
  const detail = root.querySelector<HTMLElement>(".detail");

  const info = new Map(
    nodes.map((n) => [
      n.dataset.id!,
      {
        name: n.dataset.name!,
        cat: n.dataset.cat!,
        tier: n.dataset.tier!,
        nb: (n.dataset.nb ?? "").split(",").filter(Boolean),
      },
    ]),
  );
  const names = (ids: string[]) => ids.map((i) => info.get(i)!.name);
  const related = root.dataset.related ?? "";
  const sep = root.dataset.sep ?? "、";

  let pinned: string | null = null;
  let hovered: string | null = null;
  let catSel: string | null = null;

  const write = (el: HTMLElement, title: string, body: string) => {
    const b = document.createElement("b");
    b.textContent = title;
    el.replaceChildren(b, document.createTextNode(body));
  };

  const apply = () => {
    const id = hovered ?? pinned;
    let on: Set<string> | null = null;
    if (id) on = new Set([id, ...info.get(id)!.nb]);
    else if (catSel) {
      on = new Set(
        [...info].filter(([, v]) => v.cat === catSel).map(([k]) => k),
      );
    }

    root.querySelector("svg")?.toggleAttribute("data-active", on !== null);
    for (const el of [...nodes, ...chips]) {
      const key = el.dataset.id!;
      el.classList.toggle("dim", !!on && !on.has(key));
      el.classList.toggle("on", !!id && key === id);
    }
    for (const e of edgeEls) {
      const a = e.dataset.a!;
      const b = e.dataset.b!;
      const hit = id ? a === id || b === id : !!on && on.has(a) && on.has(b);
      e.classList.toggle("on", hit);
      e.classList.toggle("dim", !!on && !hit);
    }

    // リスト: 押したチップのカードの中に、つながりを出す(ホバーでは出さない)
    for (const box of rels) {
      const rel = box.querySelector<HTMLElement>(".rel")!;
      const p = pinned ? info.get(pinned)! : null;
      const show = !!p && p.cat === box.dataset.cat;
      rel.classList.toggle("show", show);
      if (show && p) {
        write(rel, p.name, `${related}: ${names(p.nb).join(sep) || "—"}`);
      }
    }

    // 星図: 下の説明欄
    if (detail) {
      if (id) {
        const v = info.get(id)!;
        write(
          detail,
          v.name,
          `${v.cat} / ${v.tier} / ${related}: ${names(v.nb).join(sep) || "—"}`,
        );
      } else if (catSel) {
        const list = [...info.values()]
          .filter((v) => v.cat === catSel)
          .map((v) => v.name);
        write(detail, catSel, list.join(sep));
      } else {
        detail.textContent = "";
      }
    }
  };

  const preview = (id: string | null) => {
    hovered = id;
    apply();
  };
  const pin = (id: string) => {
    pinned = pinned === id ? null : id;
    apply();
  };

  // マウスのホバーで一時的に強調し、クリックで固定する(タッチはクリックのみ)
  const bindPreview = (el: HTMLElement | SVGElement) => {
    const id = el.dataset.id!;
    el.addEventListener("pointerenter", (e) => {
      if ((e as PointerEvent).pointerType === "mouse") preview(id);
    });
    el.addEventListener("pointerleave", () => preview(null));
    el.addEventListener("click", () => pin(id));
  };

  for (const n of nodes) {
    const id = n.dataset.id!;
    bindPreview(n);
    n.addEventListener("focus", () => preview(id));
    n.addEventListener("blur", () => preview(null));
    n.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        pin(id);
      }
    });
  }
  chips.forEach(bindPreview);
  for (const f of filters) {
    const cat = f.dataset.cat!;
    const set = (v: string | null) => {
      catSel = v;
      apply();
    };
    f.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "mouse") set(cat);
    });
    f.addEventListener("pointerleave", () => set(null));
    f.addEventListener("focus", () => set(cat));
    f.addEventListener("blur", () => set(null));
  }

  // 星図の出だしのアニメーションを最初からやり直す
  root.querySelector(".replay")?.addEventListener("click", () => {
    root
      .querySelector(".sky svg")
      ?.getAnimations({ subtree: true })
      .forEach((a) => {
        a.cancel();
        a.play();
      });
  });

  // 表示の切り替え(スマホ幅は CSS で常にリスト)
  const buttons = root.querySelectorAll<HTMLButtonElement>(
    ".view-toggle button",
  );
  const setView = (v: string) => {
    root.dataset.view = v;
    buttons.forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.v === v)),
    );
    try {
      localStorage.setItem("skillsView", v);
    } catch {
      // 保存できない環境では、そのページ内だけ切り替える
    }
  };
  buttons.forEach((b) =>
    b.addEventListener("click", () => setView(b.dataset.v!)),
  );
  let saved: string | null = null;
  try {
    saved = localStorage.getItem("skillsView");
  } catch {
    // 読めない環境では星図を既定にする
  }
  if (saved === "list" || saved === "map") setView(saved);
}

export {};
