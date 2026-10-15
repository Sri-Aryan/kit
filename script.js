// SecurityKit — landing page behaviour

// Paste your checkout link here (Stripe Payment Link, Polar, Lemon Squeezy, Gumroad, ...).
const CHECKOUT_URL = "";

document.querySelectorAll("[data-checkout]").forEach(a => {
  if (CHECKOUT_URL) a.href = CHECKOUT_URL;
  else a.addEventListener("click", e => { e.preventDefault(); alert("Checkout link not set yet: add it to CHECKOUT_URL in script.js."); });
});

const GROUPS = [
  {
    id: "workflows", name: "Workflows",
    desc: "Start here: whole-project audits, everyday change reviews, and fixing what was found.",
    skills: [
      ["sk-help", "List every SecurityKit command, grouped, with a one-line description"],
      ["sk-audit", "Run every relevant skill and produce one combined, deduplicated report and score"],
      ["sk-review", "Fast security review of the current diff, branch or PR only"],
      ["sk-fix", "Work through findings from any report, applying approved fixes with re-verification"],
    ],
  },
  {
    id: "apis", name: "APIs",
    desc: "HTTP, REST, GraphQL and webhook surfaces, and the contracts that describe them.",
    skills: [
      ["sk-api", "API audit: auth and ownership on every endpoint, errors, validation, missing tests"],
      ["sk-rest", "REST baseline: HTTPS, methods, content types, size limits, headers, CORS, errors"],
      ["sk-graphql", "GraphQL: introspection, depth/cost limits, batching, field-level authorization"],
      ["sk-openapi", "OpenAPI/Swagger spec vs code: undocumented and stale endpoints, auth mismatches"],
      ["sk-webhooks", "Webhooks received (signatures, replay) and sent (SSRF, signing)"],
    ],
  },
  {
    id: "identity", name: "Identity & access",
    desc: "Who the user is, how they prove it, and what their credentials are worth.",
    skills: [
      ["sk-auth", "Login, sessions, MFA, enumeration, brute force, account recovery, SSO linking"],
      ["sk-password", "Password hashing parameters, policy, change and reset flows, credential stuffing"],
      ["sk-tokens", "JWT verification, token randomness and storage, refresh rotation, API keys"],
      ["sk-oauth2", "OAuth 2.0 / OIDC: PKCE, state, redirect URIs, ID tokens, audiences, scopes"],
    ],
  },
  {
    id: "injection", name: "Injection & input",
    desc: "Every place user data reaches an interpreter, a browser, a URL fetcher or a parser.",
    skills: [
      ["sk-inject", "All injection: SQL, NoSQL, command, code, SSTI, LDAP, XPath, XXE, header, log"],
      ["sk-xss", "Cross-site scripting: DOM sinks, escaping bypasses, sanitizers, CSP"],
      ["sk-ssrf", "Server-side request forgery: URL fetches, private IPs, DNS rebinding, cloud metadata"],
      ["sk-redirect", "Open redirects: next/returnUrl parameters, bypassable validation, login flows"],
      ["sk-deserialize", "Unsafe deserialization (pickle, YAML, Java/.NET/PHP) and prototype pollution"],
      ["sk-upload", "File uploads: type checks, names, size, storage, serving, presigned URLs, zip slip"],
    ],
  },
  {
    id: "data", name: "Data & logic",
    desc: "Databases, money, limits and workflows: the bugs scanners alone don't find.",
    skills: [
      ["sk-database", "Raw queries, row scoping, DB exposure, TLS, privileges and hardening"],
      ["sk-business", "Business logic abuse: client-set prices, coupon reuse, skipped steps, limits"],
      ["sk-race", "Race conditions: double spend, check-then-act, missing locks, idempotency"],
      ["sk-payments", "Payments: server-side amounts, webhook verification, refunds, card data scope"],
      ["sk-ratelimit", "Rate limits and quotas: login, OTP, expensive endpoints, IP spoofing, bypasses"],
      ["sk-email", "Email and SMS: header injection, poisoned links, spam relays, SMS pumping"],
    ],
  },
  {
    id: "ai", name: "AI & agents",
    desc: "LLM features, prompt injection, tool-using agents, MCP servers and retrieval.",
    skills: [
      ["sk-ai", "LLM features vs OWASP LLM Top 10: unsafe output, leaks, PII, cost abuse, keys"],
      ["sk-prompt-injection", "Prompt injection: untrusted channels, system prompts, tool approvals, outputs"],
      ["sk-agents", "Agents and MCP: tool permissions, inputs, sandboxes, human approval, server trust"],
      ["sk-rag", "RAG pipelines: poisoning, per-chunk access control, tenant isolation, vector stores"],
    ],
  },
  {
    id: "infra", name: "Secrets & infra",
    desc: "What ships with the code: credentials, containers and the pipelines that deploy them.",
    skills: [
      ["sk-secrets", "Hardcoded and leaked secrets in code, config, git history, CI and images"],
      ["sk-docker", "Dockerfiles, Compose and Kubernetes: root, privileges, mounts, images, secrets"],
      ["sk-cicd", "CI/CD pipelines: triggers, script injection, token permissions, pinning, runners"],
    ],
  },
  {
    id: "design", name: "Design & testing",
    desc: "Threat models before you build, and tests that keep controls from regressing.",
    skills: [
      ["sk-design", "Threat model: assets, trust boundaries, data flows, STRIDE per component"],
      ["sk-tests", "Security test gaps (authn, authz, validation) and generation of the missing tests"],
      ["sk-fuzz", "Property-based tests and fuzzing for parsers and input handlers"],
    ],
  },
];

const ALL = GROUPS.flatMap(g => g.skills.map(([cmd, desc]) => ({ cmd, desc, group: g })));

// ---------- Ticker ----------
(function ticker() {
  const inEl = document.getElementById("tickIn");
  const outEl = document.getElementById("tickOut");
  const chips = ALL.map(s => `<span class="chip"><b>/</b>${s.cmd}</span>`).join("");
  inEl.innerHTML = chips + chips;

  const results = [
    ["✓", "0 critical"],
    ["!", "missing ownership check · invoices.ts:88", "warn"],
    ["✓", "queries parameterized"],
    ["✓", "JWT alg pinned"],
    ["!", "OTP not rate limited · otp.ts:21", "warn"],
    ["✓", "no secrets in git history"],
    ["✓", "webhook signatures verified"],
    ["!", "container runs as root · Dockerfile:1", "warn"],
    ["✓", "regression test added"],
    ["✓", "score 92/100"],
  ];
  const out = results.map(([s, t, c]) => `<span class="${c || ""}"><b>${s}</b>${t}</span>`).join("");
  outEl.innerHTML = out + out;
})();

// ---------- Catalog ----------
(function catalog() {
  const tabs = document.getElementById("tabs");
  const grid = document.getElementById("skillGrid");
  const desc = document.getElementById("groupDesc");
  const q = document.getElementById("q");
  let active = "all";

  const tabDefs = [{ id: "all", name: "All", count: ALL.length }, ...GROUPS.map(g => ({ id: g.id, name: g.name, count: g.skills.length }))];
  tabs.innerHTML = tabDefs.map(t =>
    `<button class="tab" role="tab" data-id="${t.id}" aria-selected="${t.id === active}">${t.name}<span class="ct">${t.count}</span></button>`
  ).join("");

  function render() {
    const term = q.value.trim().toLowerCase();
    let list = active === "all" ? ALL : ALL.filter(s => s.group.id === active);
    if (term) list = list.filter(s => (s.cmd + " " + s.desc + " " + s.group.name).toLowerCase().includes(term));

    const g = GROUPS.find(g => g.id === active);
    desc.textContent = term
      ? `${list.length} skill${list.length === 1 ? "" : "s"} matching "${q.value.trim()}"`
      : g ? g.desc : "Every skill, across eight areas. Pick an area to narrow it down.";

    grid.innerHTML = list.length
      ? list.map((s, i) => `
        <div class="skill" style="animation-delay:${Math.min(i, 12) * 25}ms">
          <div class="cmd"><div><span>/</span>${s.cmd}</div>${active === "all" ? `<span class="grp">${s.group.name}</span>` : ""}</div>
          <p>${s.desc}</p>
        </div>`).join("")
      : `<div class="empty">No skills match "${q.value.trim()}".</div>`;
  }

  tabs.addEventListener("click", e => {
    const b = e.target.closest(".tab");
    if (!b) return;
    active = b.dataset.id;
    tabs.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", t === b));
    render();
  });
  q.addEventListener("input", render);
  render();
})();

// ---------- Terminal demo ----------
(function terminal() {
  const el = document.getElementById("term");
  const lines = [
    `<span class="t-p">&gt;</span> <span class="t-b">/sk-audit</span>`,
    ``,
    `<span class="t-ok">●</span> <span class="t-b">Inventory</span>  <span class="t-dim">48 endpoints · 112 queries · 3 upload handlers · 6 model calls</span>`,
    `<span class="t-ok">●</span> <span class="t-b">Skills</span>     <span class="t-dim">/sk-api /sk-auth /sk-tokens /sk-inject /sk-upload /sk-ratelimit /sk-ai /sk-secrets /sk-docker …</span>`,
    `<span class="t-ok">●</span> <span class="t-b">Scan</span>       <span class="t-dim">63 candidates → .securitykit/*-scan.json</span>`,
    `<span class="t-ok">●</span> <span class="t-b">Confirm</span>    <span class="t-dim">reading the code behind each candidate…</span>`,
    `             <span class="t-dim">56 dismissed with reasons · 7 confirmed with evidence</span>`,
    ``,
    `  <span class="t-high">HIGH</span>  <span class="t-file">src/routes/invoices.ts:88</span>   invoice fetched by id without ownership check   <span class="t-dim">CWE-639</span>`,
    `  <span class="t-med">MED </span>  <span class="t-file">src/auth/otp.ts:21</span>          OTP verification has no attempt limit          <span class="t-dim">CWE-307</span>`,
    `  <span class="t-med">MED </span>  <span class="t-file">src/server.ts:14</span>            CORS reflects any Origin with credentials      <span class="t-dim">CWE-942</span>`,
    `  <span class="t-low">LOW </span>  <span class="t-dim">+ 4 more in the report</span>`,
    ``,
    `<span class="t-ok">●</span> <span class="t-b">Report</span>     <span class="t-file">security-report-audit.md</span>`,
    `<span class="t-ok">✓</span> <span class="t-b">Score 78/100</span>  <span class="t-dim">0 critical · 1 high · 2 medium · 4 low</span>`,
    ``,
    `<span class="t-dim">Next: run</span> <span class="t-p">/sk-fix</span> <span class="t-dim">to work through findings with your approval.</span> <span class="caret"></span>`,
  ];
  el.innerHTML = lines.map(l => `<div class="ln">${l || "&nbsp;"}</div>`).join("");
  const rows = [...el.children];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let started = false;

  function play() {
    if (started) return;
    started = true;
    if (reduce) { rows.forEach(r => r.classList.add("on")); return; }
    rows.forEach((r, i) => setTimeout(() => r.classList.add("on"), 250 + i * (i < 2 ? 300 : 260)));
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries, obs) => {
      if (entries.some(e => e.isIntersecting)) { play(); obs.disconnect(); }
    }, { threshold: .25 }).observe(el);
  } else play();
})();

// ---------- Score gauge ----------
(function gauge() {
  const arc = document.getElementById("gaugeArc");
  const val = document.getElementById("gaugeVal");
  const target = 78, C = 326.7;
  let done = false;
  function run() {
    if (done) return; done = true;
    arc.style.strokeDashoffset = C * (1 - target / 100);
    const t0 = performance.now();
    (function step(t) {
      const p = Math.min(1, (t - t0) / 1400);
      val.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((e, o) => { if (e[0].isIntersecting) { run(); o.disconnect(); } }, { threshold: .4 }).observe(arc.closest(".gauge"));
  } else run();
})();

// ---------- Copy buttons ----------
document.addEventListener("click", async e => {
  const b = e.target.closest("[data-copy]");
  if (!b) return;
  const label = b.querySelector("span");
  try {
    await navigator.clipboard.writeText(b.dataset.copy);
    label.textContent = "Copied";
  } catch {
    label.textContent = "Press Ctrl+C";
  }
  b.classList.add("done");
  setTimeout(() => { label.textContent = "Copy"; b.classList.remove("done"); }, 1600);
});

// ---------- Theme toggle ----------
(function theme() {
  const btn = document.getElementById("themeToggle");
  const root = document.documentElement;
  const isDark = () => root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  const sync = () => btn.querySelector("use").setAttribute("href", isDark() ? "#i-sun" : "#i-moon");
  btn.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("sk-theme", next); } catch {}
    sync();
  });
  sync();
})();

// ---------- Nav + reveal ----------
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 8);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".rv").forEach(el => io.observe(el));
} else {
  document.querySelectorAll(".rv").forEach(el => el.classList.add("in"));
}

document.getElementById("yr").textContent = new Date().getFullYear();
