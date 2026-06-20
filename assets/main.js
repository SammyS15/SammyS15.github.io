/* =============================================================
   main.js — interactivity for all pages
   Theme toggle · starfield hero · typed roles · scroll reveal ·
   publication rendering + filtering · timeline. Pages opt into
   features by including the relevant container IDs.
   ============================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Inline SVG icons ---------- */
  const ICONS = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>',
    scholar: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 1 8.5l11 6.5 9-5.32V16h2V8.5z"/><path d="M5 13.18v3.32L12 21l7-4.5v-3.32l-7 4.14z" opacity=".75"/></svg>',
    arxiv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l9 16M20 4l-7 12M4 20l5-7"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5A10.5 10.5 0 0 0 8.7 22c.52.1.7-.23.7-.5v-1.9c-2.9.63-3.52-1.25-3.52-1.25-.48-1.2-1.16-1.53-1.16-1.53-.95-.65.07-.64.07-.64 1.05.07 1.6 1.08 1.6 1.08.94 1.6 2.45 1.14 3.05.87.1-.68.37-1.14.66-1.4-2.32-.26-4.76-1.16-4.76-5.16 0-1.14.4-2.07 1.07-2.8-.1-.27-.46-1.33.1-2.78 0 0 .88-.28 2.88 1.07a9.9 9.9 0 0 1 5.24 0c2-1.35 2.87-1.07 2.87-1.07.57 1.45.21 2.51.1 2.78.67.73 1.07 1.66 1.07 2.8 0 4.01-2.45 4.9-4.78 5.16.38.32.71.95.71 1.92v2.85c0 .28.19.61.71.5A10.5 10.5 0 0 0 12 1.5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2H21l-6.6 7.5L22 22h-6.3l-4.9-6.4L5.1 22H2.3l7-8L2 2h6.4l4.4 5.9zm-1.1 18h1.7L7 3.8H5.2z"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></svg>',
    abstract: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    cap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"/></svg>',
    galaxy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="2.2"/><path d="M12 4.5c4 0 7.5 3 7.5 5.5S16.5 14 12 14m0 5.5c-4 0-7.5-3-7.5-5.5S7.5 10 12 10"/></svg>',
    wave: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M2 12c2-5 4-5 6 0s4 5 6 0 4-5 6 0"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5M4 19h16M8 16l3.5-4 3 2.5L20 8"/></svg>',
    telescope: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m3 12 6-2 1.5 4-6 2zM9 10l9-4 2 4-9 4M11 14v6m-2 0h4"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 9-3 3 3 3M16 9l3 3-3 3M13 6l-2 12"/></svg>',
  };

  const PUB_GRADS = [
    "linear-gradient(135deg,#8b7cff,#38e0e7)",
    "linear-gradient(135deg,#f472b6,#8b7cff)",
    "linear-gradient(135deg,#38e0e7,#5b8cff)",
    "linear-gradient(135deg,#ffb86b,#f472b6)",
    "linear-gradient(135deg,#5b8cff,#9d7cff)",
  ];

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    // sessionStorage (not localStorage): every fresh visit starts in dark
    // mode, but a toggle still persists while navigating during that visit.
    sessionStorage.setItem("theme", t);
    if (window.__starfield) window.__starfield.recolor();
  }
  (function initTheme() {
    setTheme(sessionStorage.getItem("theme") || "dark");
  })();

  /* ---------- Build chrome (theme btn icons, mobile menu, socials) ---------- */
  function buildChrome() {
    const tt = $(".theme-toggle");
    if (tt) tt.innerHTML = `<span class="sun">${ICONS.sun}</span><span class="moon">${ICONS.moon}</span>`;

    const burger = $(".hamburger");
    if (burger) burger.innerHTML = ICONS.menu;

    // Mobile menu mirrors the desktop nav links
    const links = $(".nav-links");
    if (links && !$(".mobile-menu")) {
      const mm = document.createElement("div");
      mm.className = "mobile-menu";
      mm.innerHTML = "<ul>" + links.innerHTML + "</ul>";
      document.body.appendChild(mm);
    }

    // Socials from PROFILE
    $$("[data-socials]").forEach((el) => {
      el.innerHTML = socialsHTML();
    });
  }

  function socialsHTML() {
    if (typeof PROFILE === "undefined") return "";
    const L = PROFILE.links;
    const items = [
      ["email", L.email, "Email"],
      ["scholar", L.scholar, "Google Scholar"],
      ["arxiv", L.arxiv, "arXiv"],
      ["github", L.github, "GitHub"],
      ["linkedin", L.linkedin, "LinkedIn"],
      ["twitter", L.twitter, "X / Twitter"],
    ];
    return items
      .filter(([, url]) => url && url !== "#")
      .map(
        ([k, url, label]) =>
          `<a href="${url}" aria-label="${label}" title="${label}"${
            url.startsWith("mailto") ? "" : ' target="_blank" rel="noopener"'
          }>${ICONS[k]}</a>`
      )
      .join("");
  }

  /* ---------- Nav behaviour ---------- */
  function navBehaviour() {
    const nav = $(".nav");
    const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const burger = $(".hamburger");
    const mm = $(".mobile-menu");
    if (burger && mm) {
      burger.addEventListener("click", () => {
        const open = mm.classList.toggle("open");
        burger.innerHTML = open ? ICONS.close : ICONS.menu;
      });
      $$(".mobile-menu a").forEach((a) =>
        a.addEventListener("click", () => {
          mm.classList.remove("open");
          burger.innerHTML = ICONS.menu;
        })
      );
    }

    // Active link by filename
    const here = location.pathname.split("/").pop() || "index.html";
    $$(".nav-links a, .mobile-menu a").forEach((a) => {
      const href = a.getAttribute("href");
      if (href === here || (here === "index.html" && href === "index.html")) a.classList.add("active");
    });
  }

  /* ---------- Scroll reveal ---------- */
  function scrollReveal() {
    const els = $$(".reveal");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Typed roles ---------- */
  function typedRoles() {
    const el = $("[data-typed]");
    if (!el || typeof PROFILE === "undefined") return;
    const words = PROFILE.roles;
    if (prefersReduced) { el.textContent = words[0]; return; }
    let wi = 0, ci = 0, deleting = false;
    function tick() {
      const w = words[wi];
      el.textContent = w.slice(0, ci);
      if (!deleting && ci < w.length) ci++;
      else if (deleting && ci > 0) ci--;
      else if (!deleting && ci === w.length) { deleting = true; return setTimeout(tick, 1500); }
      else { deleting = false; wi = (wi + 1) % words.length; }
      setTimeout(tick, deleting ? 45 : 95);
    }
    tick();
  }

  /* ---------- Starfield canvas ---------- */
  function starfield() {
    // Ensure a single full-viewport canvas behind every page. On the home
    // page the canvas already exists inside the hero — move it to <body> so
    // it becomes the global fixed background; create it on other pages.
    let canvas = $("#starfield");
    if (!canvas) { canvas = document.createElement("canvas"); canvas.id = "starfield"; }
    if (canvas.parentElement !== document.body) document.body.prepend(canvas);
    const ctx = canvas.getContext("2d");
    let w, h, stars, orbs, shooting = [], raf;
    const isLight = () => root.getAttribute("data-theme") === "light";
    const starColor = () =>
      getComputedStyle(root).getPropertyValue("--star").trim() || "rgba(255,255,255,0.9)";
    const streakColor = () => "170,190,255";
    let col = starColor();
    let scol = streakColor();

    // Light-mode aurora palette (sky / indigo / teal / blue / violet / cyan)
    const ORB_PALETTE = ["56,189,248", "129,140,248", "45,212,191", "96,165,250", "167,139,250", "34,211,238"];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Stars (dark mode)
      const count = Math.min(220, Math.floor((w * h) / 7000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.8 + 0.2,        // depth for parallax + size
        r: Math.random() * 1.3 + 0.2,
        tw: Math.random() * Math.PI * 2,      // twinkle phase
        ts: Math.random() * 0.04 + 0.01,      // twinkle speed
      }));

      // Drifting aurora orbs (light mode)
      orbs = Array.from({ length: 6 }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        rad: (Math.random() * 0.16 + 0.24) * Math.min(w, h),
        color: ORB_PALETTE[i % ORB_PALETTE.length],
        alpha: Math.random() * 0.08 + 0.2,
        ph: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.00035 + 0.00018,   // very slow drift
        ax: (Math.random() * 0.1 + 0.06) * w,
        ay: (Math.random() * 0.1 + 0.06) * h,
      }));
    }

    function spawnShooting() {
      if (prefersReduced || isLight()) return;
      const fromLeft = Math.random() > 0.5;
      shooting.push({
        x: fromLeft ? -50 : w + 50,
        y: Math.random() * h * 0.5,
        vx: (fromLeft ? 1 : -1) * (5 + Math.random() * 4),
        vy: 2 + Math.random() * 2,
        life: 1,
      });
    }

    function drawStars() {
      const baseAlpha = parseFloat(col.match(/[\d.]+\)$/)?.[0]) || 0.9;
      for (const s of stars) {
        s.tw += s.ts;
        const flick = 0.55 + Math.abs(Math.sin(s.tw)) * 0.45;
        const px = s.x;
        const py = s.y;
        ctx.beginPath();
        ctx.globalAlpha = baseAlpha * flick * s.z;
        ctx.fillStyle = col;
        ctx.arc(px, py, s.r * s.z + 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = shooting.length - 1; i >= 0; i--) {
        const m = shooting[i];
        m.x += m.vx; m.y += m.vy; m.life -= 0.012;
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 6, m.y - m.vy * 6);
        grad.addColorStop(0, `rgba(${scol},${Math.max(0, m.life)})`);
        grad.addColorStop(1, `rgba(${scol},0)`);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 6, m.y - m.vy * 6);
        ctx.stroke();
        if (m.life <= 0 || m.x < -80 || m.x > w + 80) shooting.splice(i, 1);
      }
      ctx.globalAlpha = 1;
    }

    function drawOrbs(t) {
      ctx.globalAlpha = 1;
      for (const o of orbs) {
        const x = o.x + Math.sin(t * o.sp + o.ph) * o.ax;
        const y = o.y + Math.cos(t * o.sp * 0.8 + o.ph) * o.ay;
        const g = ctx.createRadialGradient(x, y, 0, x, y, o.rad);
        g.addColorStop(0, `rgba(${o.color},${o.alpha})`);
        g.addColorStop(0.6, `rgba(${o.color},${o.alpha * 0.4})`);
        g.addColorStop(1, `rgba(${o.color},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      if (isLight()) drawOrbs(performance.now());
      else drawStars();
      raf = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    if (prefersReduced) { draw(); cancelAnimationFrame(raf); /* one static frame */ }
    else { draw(); setInterval(spawnShooting, 4200); }

    window.__starfield = { recolor: () => { col = starColor(); scol = streakColor(); } };
  }

  /* ---------- Publications rendering ---------- */
  function boldName(authors) {
    return authors.replace(/\*\*(.+?)\*\*/g, '<span class="me">$1</span>');
  }
  function roleBadge(role) {
    if (role === "first") return '<span class="badge role">First author</span>';
    if (role === "cofirst") return '<span class="badge role">Co-first author</span>';
    return "";
  }
  function pubCard(p, idx) {
    const grad = PUB_GRADS[idx % PUB_GRADS.length];
    const links = [];
    if (p.links?.arxiv) links.push(`<a class="pub-link" href="${p.links.arxiv}" target="_blank" rel="noopener">${ICONS.arxiv} arXiv</a>`);
    if (p.links?.pdf) links.push(`<a class="pub-link" href="${p.links.pdf}" target="_blank" rel="noopener">${ICONS.pdf} PDF</a>`);
    if (p.links?.code) links.push(`<a class="pub-link" href="${p.links.code}" target="_blank" rel="noopener">${ICONS.code} Code</a>`);
    if (p.abstract) links.push(`<button class="pub-link" data-abstract>${ICONS.abstract} Abstract</button>`);

    return `
    <article class="pub-card reveal${p.spotlight ? " spotlight" : ""}" data-tags="${(p.tags || []).join("|")}" data-year="${p.year}" data-text="${(p.title + " " + p.authors).toLowerCase().replace(/"/g, "")}">
      <div class="pub-thumb" style="background:${grad}">
        <span>✦</span>
        <span class="pub-year-badge">${p.year}</span>
      </div>
      <div class="pub-body">
        <div class="pub-badges">
          ${roleBadge(p.role)}
          ${p.spotlight ? `<span class="badge spotlight">Spotlight</span>` : ""}
          ${p.venue ? `<span class="badge venue">${p.venue}</span>` : ""}
          ${(p.tags || []).map((t) => `<span class="badge">${t}</span>`).join("")}
        </div>
        <h3>${p.links?.arxiv ? `<a href="${p.links.arxiv}" target="_blank" rel="noopener">${p.title}</a>` : p.title}</h3>
        <p class="pub-authors">${boldName(p.authors)}</p>
        <div class="pub-links">${links.join("")}</div>
        <div class="pub-abstract"><div><p>${p.abstract || ""}</p></div></div>
      </div>
    </article>`;
  }

  function renderSelectedPubs() {
    const host = $("#selected-pubs");
    if (!host || typeof PUBLICATIONS === "undefined") return;
    const sel = PUBLICATIONS.filter((p) => p.selected);
    host.innerHTML = sel.map((p, i) => pubCard(p, i)).join("");
  }

  function renderAllPubs() {
    const host = $("#all-pubs");
    if (!host || typeof PUBLICATIONS === "undefined") return;
    host.innerHTML = PUBLICATIONS.map((p, i) => pubCard(p, i)).join("");

    // Build topic chips dynamically
    const chipHost = $("#topic-chips");
    if (chipHost) {
      const topics = ["All", ...Array.from(new Set(PUBLICATIONS.flatMap((p) => p.tags || [])))];
      chipHost.innerHTML = topics
        .map((t, i) => `<button class="chip${i === 0 ? " active" : ""}" data-topic="${t}">${t}</button>`)
        .join("");
    }
    setupFilters();
  }

  function setupFilters() {
    const search = $("#pub-search");
    const chipHost = $("#topic-chips");
    let topic = "All";
    let query = "";

    function apply() {
      let visible = 0;
      $$("#all-pubs .pub-card").forEach((card) => {
        const tags = card.dataset.tags.split("|");
        const matchTopic = topic === "All" || tags.includes(topic);
        const matchQuery = !query || card.dataset.text.includes(query);
        const show = matchTopic && matchQuery;
        card.classList.toggle("hide", !show);
        if (show) visible++;
      });
      const empty = $("#pub-empty");
      if (empty) empty.style.display = visible ? "none" : "block";
    }

    if (chipHost) {
      chipHost.addEventListener("click", (e) => {
        const btn = e.target.closest(".chip");
        if (!btn) return;
        $$(".chip", chipHost).forEach((c) => c.classList.remove("active"));
        btn.classList.add("active");
        topic = btn.dataset.topic;
        apply();
      });
    }
    if (search) {
      search.addEventListener("input", () => {
        query = search.value.trim().toLowerCase();
        apply();
      });
    }
  }

  /* ---------- Abstract toggle (delegated) ---------- */
  function abstractToggle() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-abstract]");
      if (!btn) return;
      const card = btn.closest(".pub-card");
      const ab = card && $(".pub-abstract", card);
      if (ab) ab.classList.toggle("open");
    });
  }

  /* ---------- Render interests & news ---------- */
  function renderInterests() {
    const host = $("#interests");
    if (!host || typeof INTERESTS === "undefined") return;
    host.innerHTML = INTERESTS.map(
      (it, i) => `
      <div class="interest-card reveal d${(i % 4) + 1}">
        <div class="interest-icon">${ICONS[it.icon] || ICONS.spark}</div>
        <h3>${it.title}</h3>
        <p>${it.text}</p>
      </div>`
    ).join("");
  }
  function renderNews() {
    const host = $("#news");
    if (!host || typeof NEWS === "undefined") return;
    host.innerHTML = NEWS.map(
      (n) => `
      <div class="news-item reveal">
        <span class="news-date">${n.date}</span>
        <p>${n.html}</p>
      </div>`
    ).join("");
  }

  /* ---------- Fill profile-driven text nodes ---------- */
  function fillProfile() {
    if (typeof PROFILE === "undefined") return;
    $$("[data-profile]").forEach((el) => {
      const key = el.dataset.profile;
      if (PROFILE[key]) el.textContent = PROFILE[key];
    });
    // Footer year
    $$("[data-year-now]").forEach((el) => (el.textContent = new Date().getFullYear()));
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    buildChrome();
    const tt = $(".theme-toggle");
    if (tt) tt.addEventListener("click", () =>
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark")
    );
    navBehaviour();
    fillProfile();
    renderInterests();
    renderNews();
    renderSelectedPubs();
    renderAllPubs();
    typedRoles();
    starfield();
    abstractToggle();
    scrollReveal();
  });
})();
