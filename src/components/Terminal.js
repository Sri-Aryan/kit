// Animated terminal showing a sample /sk-audit run. Lines appear once it scrolls into view.

import { onVisible, prefersReducedMotion } from "../lib/dom.js";

// One /sk-audit progress line: "[n/total]  /sk-name: result".
const progress = (n, cmd, result) =>
  `<span class="t-dim">${`[${n}/14]`.padEnd(7)}</span> <span class="t-p">/${cmd}</span>: ${result}`;

const LINES = [
  `<span class="t-p">&gt;</span> <span class="t-b">/sk-audit</span>`,
  ``,
  `<span class="t-ok">●</span> <span class="t-b">Plan</span>       <span class="t-dim">Express API · JWT auth · Postgres · S3 uploads · OpenAI calls · Dockerfile</span>`,
  `             <span class="t-dim">14 skills apply. Run them?</span> yes`,
  ``,
  progress(1, "sk-secrets", `no findings <span class="t-dim">· score 100/100</span>`),
  progress(2, "sk-deps", `1 finding (<span class="t-low">Low 1</span>) <span class="t-dim">· score 99/100</span>`),
  progress(3, "sk-auth", `<span class="t-dim">starting (login / sessions, src/auth/login.ts:12)</span>`),
  progress(3, "sk-auth", `no findings <span class="t-dim">· score 100/100</span>`),
  progress(5, "sk-api", `1 finding (<span class="t-high">High 1</span>) <span class="t-dim">· score 90/100</span>`),
  progress(9, "sk-ratelimit", `1 finding (<span class="t-med">Medium 1</span>) <span class="t-dim">· score 96/100</span>`),
  `        <span class="t-dim">…</span>`,
  progress(14, "sk-docker", `1 finding (<span class="t-low">Low 1</span>) <span class="t-dim">· score 99/100</span>`),
  `<span class="t-dim">All 14 skills done (13 reports, 1 skipped): merging</span>`,
  ``,
  `<span class="t-ok">●</span> <span class="t-b">Confirm</span>    <span class="t-dim">63 candidates read · 56 dismissed with reasons · 7 confirmed with evidence</span>`,
  ``,
  `  <span class="t-high">HIGH</span>  <span class="t-file">src/routes/invoices.ts:88</span>   invoice fetched by id without ownership check   <span class="t-dim">CWE-639</span>`,
  `  <span class="t-med">MED </span>  <span class="t-file">src/auth/otp.ts:21</span>          OTP verification has no attempt limit          <span class="t-dim">CWE-307</span>`,
  `  <span class="t-med">MED </span>  <span class="t-file">src/server.ts:14</span>            CORS reflects any Origin with credentials      <span class="t-dim">CWE-942</span>`,
  `  <span class="t-low">LOW </span>  <span class="t-dim">+ 4 more in the report</span>`,
  ``,
  `<span class="t-ok">●</span> <span class="t-b">Report</span>     <span class="t-file">security-report-audit.md</span>`,
  `<span class="t-ok">✓</span> <span class="t-b">Score 78/100</span>  <span class="t-dim">0 critical · 1 high · 2 medium · 4 low · 2 duplicates merged</span>`,
  ``,
  `<span class="t-dim">Next: run</span> <span class="t-p">/sk-fix</span> <span class="t-dim">to work through findings with your approval.</span> <span class="caret"></span>`,
];

export function Terminal({ title = "your-project · claude" } = {}) {
  return `
    <div class="term-wrap rv">
      <div class="term">
        <div class="term-bar"><i></i><i></i><i></i><span>${title}</span></div>
        <div class="term-body" id="term">${LINES.map(l => `<div class="ln">${l || "&nbsp;"}</div>`).join("")}</div>
      </div>
    </div>`;
}

export function mountTerminal() {
  const el = document.getElementById("term");
  const rows = [...el.children];
  onVisible(el, () => {
    if (prefersReducedMotion()) return rows.forEach(r => r.classList.add("on"));
    rows.forEach((r, i) => setTimeout(() => r.classList.add("on"), 250 + i * (i < 2 ? 300 : 200)));
  });
}
