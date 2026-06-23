/* ===============================================================
   Observatory Log — interactivity
   Starfield + shooting stars (kept from the original) · page-load
   stagger · scroll reveal · publication log + filter.
   Content from assets/data.js (shared with the other versions).
   =============================================================== */
(function () {
  "use strict";
  const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Helpers ---------- */
  const boldName = (a) => a.replace(/\*\*(.+?)\*\*/g, '<span class="me">$1</span>');
  function roleLabel(r) {
    if (r === "first") return '<span class="pill role">First author</span>';
    if (r === "cofirst") return '<span class="pill role">Co-first author</span>';
    return "";
  }
  function socialsHTML() {
    if (typeof PROFILE === "undefined") return "";
    const L = PROFILE.links;
    const items = [["email", L.email, "Email"], ["scholar", L.scholar, "Scholar"],
      ["arxiv", L.arxiv, "arXiv"], ["github", L.github, "GitHub"],
      ["linkedin", L.linkedin, "LinkedIn"], ["twitter", L.twitter, "X"]];
    return items.filter(([, u]) => u && u !== "#")
      .map(([, u, label]) => `<a href="${u}"${u.startsWith("mailto") ? "" : ' target="_blank" rel="noopener"'}>${label} ↗</a>`)
      .join("");
  }
  function logEntry(p, idx) {
    const links = [];
    if (p.links && p.links.arxiv) links.push(`<a href="${p.links.arxiv}" target="_blank" rel="noopener">arXiv ↗</a>`);
    if (p.links && p.links.pdf) links.push(`<a href="${p.links.pdf}" target="_blank" rel="noopener">PDF ↗</a>`);
    if (p.links && p.links.code) links.push(`<a href="${p.links.code}" target="_blank" rel="noopener">Code ↗</a>`);
    const id = String(idx + 1) /* .padStart(2, "0"); */
    const title = p.links && p.links.arxiv ? `<a href="${p.links.arxiv}" target="_blank" rel="noopener">${p.title}</a>` : p.title;
    return `
      <article class="le reveal" data-tags="${(p.tags || []).join("|")}" data-text="${(p.title + " " + p.authors).toLowerCase().replace(/"/g, "")}">
        <div class="le-yr">${p.year}<span class="id">№ ${id}</span></div>
        <div class="le-main">
          <div class="le-meta">
            ${roleLabel(p.role)}
            ${p.spotlight ? '<span class="pill spot">✦ Spotlight</span>' : ""}
            ${p.venue ? `<span class="pill venue">${p.venue}</span>` : ""}
            ${(p.tags || []).map((t) => `<span class="pill">${t}</span>`).join("")}
          </div>
          <h3>${title}</h3>
          <p class="le-auth">${boldName(p.authors)}</p>
          <div class="le-links">${links.join("")}</div>
        </div>
      </article>`;
  }

  /* ---------- Render ---------- */
  function render() {
    $$("[data-socials]").forEach((el) => (el.innerHTML = socialsHTML()));

    const idx = $("#index");
    // if (idx && typeof INTERESTS !== "undefined") {
    //   idx.innerHTML = INTERESTS.map((it, i) =>
    //     `<li class="reveal"><span class="n">${String(i + 1).padStart(2, "0")}</span><div><h3>${it.title}</h3><p>${it.text}</p></div></li>`).join("");
    // }
    if (idx && typeof INTERESTS !== "undefined") {
      idx.innerHTML = INTERESTS.map((it, i) =>
        `<li class="reveal"><span class="n">${String(i + 1)}</span><div><h3>${it.title}</h3><p>${it.text}</p></div></li>`).join("");
    }
    const tx = $("#transmissions");
    if (tx && typeof NEWS !== "undefined") {
      tx.innerHTML = NEWS.map((n) => `<div class="tx-row reveal"><span class="d">${n.date}</span><p>${n.html}</p></div>`).join("");
    }
    const sel = $("#selected");
    if (sel && typeof PUBLICATIONS !== "undefined") {
      sel.innerHTML = PUBLICATIONS.filter((p) => p.selected).map((p, i) => logEntry(p, i)).join("");
    }
    const all = $("#log");
    if (all && typeof PUBLICATIONS !== "undefined") {
      all.innerHTML = PUBLICATIONS.map((p, i) => logEntry(p, i)).join("");
      const chipHost = $("#chips");
      if (chipHost) {
        const topics = ["All", ...Array.from(new Set(PUBLICATIONS.flatMap((p) => p.tags || [])))];
        chipHost.innerHTML = topics.map((t, i) => `<button class="chip${i === 0 ? " active" : ""}" data-topic="${t}">${t}</button>`).join("");
      }
      setupFilter();
    }
    $$("[data-profile]").forEach((el) => { if (typeof PROFILE !== "undefined" && PROFILE[el.dataset.profile]) el.textContent = PROFILE[el.dataset.profile]; });
    $$("[data-year-now]").forEach((el) => (el.textContent = new Date().getFullYear()));
  }

  function setupFilter() {
    const chipHost = $("#chips"), search = $("#pub-search");
    let topic = "All", q = "";
    function apply() {
      let n = 0;
      $$("#log .le").forEach((e) => {
        const okT = topic === "All" || e.dataset.tags.split("|").includes(topic);
        const okQ = !q || e.dataset.text.includes(q);
        const show = okT && okQ;
        e.classList.toggle("hide", !show);
        if (show) n++;
      });
      const empty = $("#empty"); if (empty) empty.style.display = n ? "none" : "block";
    }
    if (chipHost) chipHost.addEventListener("click", (e) => {
      const b = e.target.closest(".chip"); if (!b) return;
      $$(".chip", chipHost).forEach((c) => c.classList.remove("active"));
      b.classList.add("active"); topic = b.dataset.topic; apply();
    });
    if (search) search.addEventListener("input", () => { q = search.value.trim().toLowerCase(); apply(); });
  }

  /* ---------- Chrome ---------- */
  function chrome() {
    const nav = $(".nav");
    if (nav && !$(".mobile")) {
      const m = document.createElement("nav");
      m.className = "mobile"; m.innerHTML = nav.innerHTML;
      document.body.appendChild(m);
    }
    const burger = $(".burger"), mob = $(".mobile");
    if (burger && mob) {
      burger.addEventListener("click", () => mob.classList.toggle("open"));
      $$(".mobile a").forEach((a) => a.addEventListener("click", () => mob.classList.remove("open")));
    }
    const here = location.pathname.split("/").pop() || "index.html";
    $$(".nav a, .mobile a").forEach((a) => {
      const h = a.getAttribute("href");
      if (h === here || (here === "" && h === "index.html")) a.classList.add("active");
    });
  }

  /* ---------- Reveal + load ---------- */
  function reveals() {
    const els = $$(".reveal");
    if (prefersReduced || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Starfield + shooting stars (dark only, no cursor-follow) ---------- */
  function starfield() {
    let canvas = $("#starfield");
    if (!canvas) { canvas = document.createElement("canvas"); canvas.id = "starfield"; document.body.prepend(canvas); }
    const ctx = canvas.getContext("2d");
    let w, h, stars, shooting = [], raf;
    const accentRGB = getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim() || "248,216,150";

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(800, Math.floor((w * h) / 2000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        z: Math.random() * 0.8 + 0.2, r: Math.random() * 1.3 + 0.2,
        tw: Math.random() * Math.PI * 2, ts: Math.random() * 0.004 + 0.001,
      }));
    }
    function spawnShooting() {
      if (prefersReduced) return;
      const fromLeft = Math.random() > 0.5;
      shooting.push({ x: fromLeft ? -50 : w + 50, y: Math.random() * h * 0.55,
        vx: (fromLeft ? 1 : -1) * (5 + Math.random() * 4), vy: 2 + Math.random() * 2, life: 1 });
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.tw += s.ts;
        const flick = 0.5 + Math.abs(Math.sin(s.tw)) * 0.5;
        ctx.beginPath();
        ctx.globalAlpha = 0.9 * flick * s.z;
        ctx.fillStyle = "rgba(243,238,226,0.95)";
        ctx.arc(s.x, s.y, s.r * s.z + 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = shooting.length - 1; i >= 0; i--) {
        const m = shooting[i];
        m.x += m.vx; m.y += m.vy; m.life -= 0.012;
        const g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 6, m.y - m.vy * 6);
        g.addColorStop(0, `rgba(${accentRGB},${Math.max(0, m.life)})`);
        g.addColorStop(1, `rgba(${accentRGB},0)`);
        ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - m.vx * 6, m.y - m.vy * 6); ctx.stroke();
        if (m.life <= 0 || m.x < -80 || m.x > w + 80) shooting.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize);
    resize();
    if (prefersReduced) { draw(); cancelAnimationFrame(raf); }
    else { draw(); setInterval(spawnShooting, 4000); }
  }

  document.addEventListener("DOMContentLoaded", () => {
    render(); chrome(); starfield(); reveals();
    requestAnimationFrame(() => document.body.classList.add("loaded"));
  });
})();
